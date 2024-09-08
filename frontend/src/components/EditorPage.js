import React, { useState, useEffect } from 'react'
import '../style.css';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import useAuth from '../UseAuth';
import NoteSelection from './NoteSelection';
import 'github-markdown-css'

function EditorPage(){
    const [editorInput, setEditorInput] = useState("");
    const [notePreview, setNotePreview] = useState("");

    //if possible use gitub API, else (i.e. too much api requests) use markdown
    useEffect(() => {
        async function fetchData(){
            const response = await fetch("https://api.github.com/markdown",{
                method: "POST",
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28',
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({text: editorInput})
            })

            if(response.ok){
                const data = await response.text();
                setNotePreview(data);
            }else if(response.status === 403){
                console.log("Rate limit exceeded, using marked instead of github API.")
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