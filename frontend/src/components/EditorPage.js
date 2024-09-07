import React, { useState } from 'react'
import '../style.css';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import useAuth from '../UseAuth';
import NoteSelection from './NoteSelection';

function EditorPage(){

    //jesli uzytkownik niezalogowany to sprawdz czy jest cos zapisane w localstorage, jesli uzytkownik jest zalogowany to wtedy wyslij zapytanie do api, w momencie jak coś jest zapisane w localstorage i uzytkonwik sie loguje to wtedy czyszcze localstorage i wysylam zapytanie do api o utworzenie takiej notatki
    const [editorInput, setEditorInput] = useState("# Create your readme");

    const html = marked.parse(editorInput);
    const markup = { 
        __html: DOMPurify.sanitize(
            html
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
            <div className='editor-preview'
                dangerouslySetInnerHTML={markup}    
            />
        </div>
    )
}

export default EditorPage;