import React from 'react'
import { useState, useEffect } from 'react';
import '../style.css'
import DOMPurify from 'dompurify';
import 'github-markdown-css'
import {usePopup} from '../PopupProvider'
import axios from 'axios'

function ReadmePreview(props){

    const [readmePreview, setReadmePreview] = useState("");
    const {content} = props;

    const markup = { 
        __html: DOMPurify.sanitize(
            readmePreview
        )
    };

    const {handleOpenPopup} = usePopup();

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.post("/github/markdown",
                {text: content},
                {
                    headers: {
                      "Content-Type": "application/json"
                    },
                    withCredentials: true,
                    withXSRFToken: true
                })
    
                setReadmePreview(response.data);
            }catch(error){
                handleOpenPopup("info", "Could not generate preview for your readmes")
            }
        }
        fetchData();
    }
    , [content]);

    return (
        <div className='readme-preview'>
            <div className='markdown-body' id='small-readme-preview'
                dangerouslySetInnerHTML={markup}
            >
            </div>
        </div>
    )
}

export default ReadmePreview;