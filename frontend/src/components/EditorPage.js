import React, { useState, useEffect, useRef } from 'react'
import '../style.css';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import 'github-markdown-css'
import { useLocation } from 'react-router-dom';
import {usePopup} from 'PopupProvider';

function EditorPage(){
    const [editorInput, setEditorInput] = useState("");
    const [notePreview, setNotePreview] = useState("");
    const [changesSaved, setChangesSaved] = useState(true);

    const firstRender = useRef(true);

    const location = useLocation().state;
    const readmeId = location ? location.readmeId : null;

    const {handleOpenPopup} = usePopup();

    const textareaSelection = useRef({
        start: null,
        end: null
    })

    useEffect(() => {
        let textarea = document.querySelector(".editor-input");
        if(textareaSelection.current.start !== null){
            textarea.focus();
            textarea.setSelectionRange(textareaSelection.current.start, textareaSelection.current.end)
            textareaSelection.current.start = null;
        }

    }, [editorInput])

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

            try{
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
                    handleOpenPopup("warning", "Something went wrong, using marked library instead of github API. Results may differ a bit when you paste them into github.")
                    setNotePreview(marked.parse(editorInput).toString())
                }
            }catch(error){
                handleOpenPopup("error", "Could not generate preview, try again later.")
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
            try{
                const response = await fetch(`http://localhost:8080/readme/${readmeId}/user/me/`,{
                    method: "GET",
                    credentials: "include",
                })
    
                if(response.ok){
                    const data = await response.text();
                    setEditorInput(data);
                }
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
                handleOpenPopup("success", "Your progress was saved.")
            }else{
                throw new Error();
            }
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

    function addBold(){
        let textarea = document.querySelector(".editor-input");

        let before = textarea.value.slice(0, textarea.selectionStart);
        let selected = textarea.value.slice(textarea.selectionStart, textarea.selectionEnd);
        let after = textarea.value.slice(textarea.selectionEnd, textarea.value.length);

        textareaSelection.current.start = textarea.selectionStart;
        textareaSelection.current.end = textarea.selectionEnd + 2;
      
        setEditorInput(before + "*" + selected + "*" + after)
    }

    function addCollapsableItems(){
        let textarea = document.querySelector(".editor-input");

        let before = textarea.value.slice(0, textarea.selectionStart);

        let generated = 
`<details>
  <summary>Markdown</summary>

- <kbd>[Markdown Editor](https://binarytree.dev/me)</kbd>
- <kbd>[Table Of Content](https://binarytree.dev/toc)</kbd>
- <kbd>[Markdown Table Generator](https://binarytree.dev/md_table_generator)</kbd>

</details>`

        let after = textarea.value.slice(textarea.selectionStart, textarea.value.length);

        textareaSelection.current.start = textarea.selectionStart;
        textareaSelection.current.end = textarea.selectionStart + generated.length;
      
        setEditorInput(before + generated + after)
    }

    console.log(textareaSelection.current)

    return (
        <>
            {location && generateUpdateButton()}
            <div className='editor-page'>
                <div className='editor-form'>
                    <p onClick={addBold}>BOLD</p>
                    <p onClick={addCollapsableItems}>Collapsable</p>
                    <form onSubmit={e => e.preventDefault()}>
                        <textarea className='editor-input' name='editor' value={editorInput} onChange={handleFormChange} />
                    </form>
                </div>
                <div className='editor-preview markdown-body'
                    dangerouslySetInnerHTML={markup}    
                />
            </div>
        </>
    )
}

export default EditorPage;