import React, { useState, useEffect, useRef } from 'react'
import '../style.css';
import DOMPurify from 'dompurify';
import 'github-markdown-css'
import { useLocation } from 'react-router-dom';
import {usePopup} from 'PopupProvider';
import MarkdownEditor from "@uiw/react-markdown-editor";
import {collapsible, table} from './MarkdownEditorCustomToolbar'
import '../styles/editor.css'
import axios from 'axios';

function EditorPage(){
    const [editorInput, setEditorInput] = useState("");
    const [notePreview, setNotePreview] = useState("");
    const [changesSaved, setChangesSaved] = useState(true);

    const firstRender = useRef(true);

    const location = useLocation().state;
    const readmeId = location ? location.readmeId : null;

    const {handleOpenPopup} = usePopup();

    useEffect(() => {
        async function fetchData(){
            if(!firstRender.current){
                setChangesSaved(false);
            }else{
                firstRender.current = false;
            }

            if(!readmeId){
                localStorage.setItem("editorInput", editorInput);
            }

            try {
                const response = await axios.post('/github/markdown',
                { text: editorInput },
                {
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                    withXSRFToken: true,
                });
            
                setNotePreview(response.data);
            } catch (error) {
              handleOpenPopup('error', 'Could not generate preview, try again later.');
            }


        }
        const timeoutId = setTimeout(fetchData, 1000);

        return () => clearTimeout(timeoutId);
    }
    , [editorInput, readmeId]);
    
    const markup = { 
        __html: DOMPurify.sanitize(
            notePreview
        )
    };
     
    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(`/readme/${readmeId}/user/me/`,{
                    withCredentials: true
                })
    
                setEditorInput(response.data.toString());
            }catch(error){
                handleOpenPopup("error", "Could not load readme from database, try again.")
            }

        }
        if(readmeId === null){
            const savedInput = localStorage.getItem("editorInput");
            if(savedInput)
                setEditorInput(savedInput);
        }else{
            fetchData();
        }
    }, [readmeId]);

    async function updateReadme(){
        if(changesSaved)
            return;

        try{
            const response = await axios.patch(`/readme/${readmeId}/update`,
            {content: editorInput},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                withXSRFToken: true
            });
    
            setChangesSaved(true);
            handleOpenPopup("success", "Your progress was saved.")
        }catch(error){
            handleOpenPopup("error", "Could not save your progress, try again.")
        }

    }

    function generateUpdateButton(){
        return (
            <div className={`update-readme-button ${changesSaved ? 'saved' : 'not-saved'}`} onClick={updateReadme}>
                Save changes to local database
            </div>
        )
    }

    return (
        <>
            {location && generateUpdateButton()}
            <div className='editor-page'>
                <div className='editor-form'>
                    <MarkdownEditor
                        value={editorInput}
                        onChange={(value) => {
                            setEditorInput(value);
                        }}
                        enablePreview={false}
                        className="editor-input"
                        toolbars={["bold", "italic", "undo", "redo", "header", "strike", "underline", "quote", "olist", "ulist",
                            "todo", "link", "image", "code", "codeBlock", collapsible, table
                        ]}
                    />
                </div>
                <div className='editor-preview markdown-body'
                    dangerouslySetInnerHTML={markup}    
                />
            </div>
        </>
    )
}

export default EditorPage;