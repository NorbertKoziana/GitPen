import React, { useState, useEffect } from 'react'
import '../style.css';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import useAuth from '../UseAuth';
import NoteSelection from './NoteSelection';
import 'github-markdown-css'
import { useLocation } from 'react-router-dom';

function EditorPage(){
    const [editorInput, setEditorInput] = useState("");
    const [notePreview, setNotePreview] = useState("");

    useEffect(() => {
        async function fetchData(){
            const response = await fetch("http://localhost:8080/github/markdown",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({text: editorInput}),
                credentials: "include"
            })

            if(response.ok){
                const data = await response.text();
                setNotePreview(data);
            }else{
                console.log("Something went wrong, using marked instead of github API.")
                setNotePreview(marked.parse(editorInput))
            }
        }
        const timeoutId = setTimeout(fetchData, 1000);

        return () => clearTimeout(timeoutId);
    }
    , [editorInput]);
    
    const markup = { 
        __html: DOMPurify.sanitize(
            notePreview
        )
    };

    const { user } = useAuth();

    function handleFormChange(event){
        setEditorInput(event.target.value)
    }

    const location = useLocation().state;
     
    useEffect(() => {
        async function fetchData(){
            if(location == null)
                return;

            const { readmeId } = location;

            const response = await fetch(`http://localhost:8080/readme/${readmeId}/user/me/`,{
                method: "GET",
                credentials: "include",
            })

            if(response.ok){
                const data = await response.text();
                setEditorInput(data);
            }else{
                console.log("Something went wrong, could not load readme from database.")
            }
        }
        fetchData();
    }
    , [location]);


    return (
        <div className='editor-page'>
            {user === null ? "" : <NoteSelection />}
            <form className='editor-form' onSubmit={e => e.preventDefault()}>
                <textarea className='editor-input' name='editor' value={editorInput} onChange={handleFormChange} />
            </form>
            <div className='editor-preview markdown-body'
                dangerouslySetInnerHTML={markup}    
            />
        </div>
    )
}

export default EditorPage;