import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReadmePreview from './ReadmePreview';
import {usePopup} from '../PopupProvider'
import '../styles/user-readmes.css'

function UserReadmes(){

    const [readmes, setReadmes] = useState(null);
    const [page, setPage] = useState(0);

    const {handleOpenPopup} = usePopup();

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await fetch("http://localhost:8080/readme/all/user/me?" + 
                    new URLSearchParams({
                        pageNumber: page.toString()
                    }).toString(),
                {
                    method: "GET",
                    credentials: "include"
                });

                console.log(response.status)
                if(response.ok){
                    const readmes = await response.json();
                    setReadmes(readmes);
                }
            }catch(error){
                handleOpenPopup("error", "Could not load your readmes.")
            }

        }
        fetchData();
    }, [page]);

    const navigate = useNavigate();

    function renderReadmes(){
        if(readmes === null)
            return;

        return readmes.content.map(readme => {
            return (
                <div className='readme' 
                    key={readme.id}
                    onClick={() => navigate("/editor", { state: { readmeId: readme.id } })}
                >
                    <p>Created at: {readme.lastModified.replace("T", " ")}</p>
                    <ReadmePreview content={readme.content} />
                </div>
            )
        })
    }

    function prevPage(){
        setPage(oldPage => {
            if(oldPage > 0)
                return oldPage - 1;
            return oldPage;
        });
    }

    function nextPage(){
        setPage(oldPage => {
            if(oldPage < readmes.totalPages - 1)
                return oldPage + 1;
            return oldPage;
        });
    }

    return (
        <div className='UserReadmes'>
            <div className='black-button' onClick={prevPage}>
                Prev Page
            </div>
            <div className='black-button' onClick={nextPage}>
                Next Page
            </div>
            <div className='readme-container'>
                {renderReadmes()}
            </div>
        </div>
    )
}

export default UserReadmes;