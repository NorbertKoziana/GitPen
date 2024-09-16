import React from 'react'
import { useState, useEffect } from 'react';
import '../style.css'
import DOMPurify from 'dompurify';
import 'github-markdown-css'

function ReadmePreview(props){

    const [readmePreview, setReadmePreview] = useState("");
    const {content} = props;

    const markup = { 
        __html: DOMPurify.sanitize(
            readmePreview
        )
    };

    useEffect(() => {
        async function fetchData(){
            const response = await fetch("http://localhost:8080/github/markdown",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({text: content}),
                credentials: "include"
            })

            if(response.ok){
                const data = await response.text();
                setReadmePreview(data);
            }else{
                console.log("Something went wrong.")
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