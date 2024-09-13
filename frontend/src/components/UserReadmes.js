import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function UserReadmes(){

    const [readmes, setReadmes] = useState(null);
    const [page, setPage] = useState(0);

    console.log(readmes);

    useEffect(() => {
        async function fetchData(){
            const response = await fetch("http://localhost:8080/readme/all/user/me?" + 
                new URLSearchParams({
                    pageNumber: page.toString()
                }).toString(),
            {
                method: "GET",
                credentials: "include"
            });

            const readmes = await response.json();
            setReadmes(readmes);
        }
        fetchData();
    }, [page]);

    const navigate = useNavigate();

    function renderReadmes(){
        if(readmes === null)
            return;

        return readmes.content.map(readme => {
            return (
                <div className='readme' onClick={() => navigate("/editor", { state: { readmeId: readme.id } })}>
                    <p>{readme.id}</p>
                    <p>{readme.lastModified}</p>
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
            if(oldPage < readmes.totalPages)
                return oldPage + 1;
            return oldPage;
        });
    }

    return (
        <div className='UserReadmes'>
            <h2 className='prev-page-button' onClick={prevPage}>
                Prev Page
            </h2>
            <h2 className='next-page-button' onClick={nextPage}>
                Next Page
            </h2>
            <div className='readme-container'>
                {renderReadmes()}
            </div>
        </div>
    )
}

export default UserReadmes;