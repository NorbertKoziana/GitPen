import React, { useState, useEffect, useRef } from 'react'
import '../style.css';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import 'github-markdown-css'
import { useLocation } from 'react-router-dom';

function EditorPage(){
    const [editorInput, setEditorInput] = useState("");
    const [notePreview, setNotePreview] = useState("");
    const [changesSaved, setChangesSaved] = useState(true);

    const firstRender = useRef(true);

    const location = useLocation().state;
    const readmeId = location ? location.readmeId : null;

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
                setNotePreview(marked.parse(editorInput).toString())
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

    function handleFormChange(event){
        setEditorInput(event.target.value)
    }
     
    useEffect(() => {
        async function fetchData(){
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

        const response = await fetch(`http://localhost:8080/readme/${readmeId}/update`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({content: editorInput})
        })

        if(response.ok){
            setChangesSaved(true);
        }else{
            console.log("Readme wasn't saved, try again.")
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
                <form className='editor-form' onSubmit={e => e.preventDefault()}>
                    <textarea className='editor-input' name='editor' value={editorInput} onChange={handleFormChange} />
                </form>
                <div className='editor-preview markdown-body'
                    dangerouslySetInnerHTML={markup}    
                />
            </div>
        </>
    )
}

export default EditorPage;