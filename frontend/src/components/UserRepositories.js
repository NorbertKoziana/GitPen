import React, { useState, useEffect } from "react";
import '../style.css'
import { useNavigate } from 'react-router-dom'
import {usePopup} from 'PopupProvider';

function UserRepositories(){

    const [repos, setRepos] = useState([]);

    const {handleOpenPopup} = usePopup();

    useEffect(() => {
        async function fetchRepos(){
            try{
                const response = await fetch("http://localhost:8080/github/repos",{
                    method: "GET",
                    credentials: "include"
                })
    
                if(response.ok){
                    const data = await response.json();
                    setRepos(data);
                }
            }catch(error){
                handleOpenPopup("error", "Could not load your repositories from github")
            }

        }
        fetchRepos();
    }, [])

    function displayRepositories(){
        return repos.map((value) => {
            let selectedClass = value.private ? "private-repo" : "public-repo";
            return (
            <div className={`repo ${selectedClass}`} key={value.id}
            >
                <p>{value.name}</p>
                <p className="clickable" onClick={() => CreateReadmeUsingGithub(value.owner.login, value.name)}>
                    Create new readme starting with your current readme.
                </p>
                <p className="clickable" onClick={() => CreateReadmeUsingAi(value.owner.login, value.name)}>
                    Use AI to create readme for you without any effort.
                </p>
            </div>)
        });
    }

    const navigate = useNavigate();

    async function CreateReadmeUsingGithub(owner, repo){
        try{
            const response = await fetch(`http://localhost:8080/readme/github/${owner}/${repo}`,{
                method: "POST",
                credentials: "include"
            })
    
            if(response.ok){
                const readmeId = await response.json();
                navigate("/editor", { state: { readmeId: readmeId } })
            }
        }catch(error){
            handleOpenPopup("error", "Could not create readme using your github repository, try again.")
        }

    }


    //To be implemented
    async function CreateReadmeUsingAi(owner, repo){
        let repoId = 1;
        navigate("/editor", { state: { repoId } })
    }

    async function CreateEmptyReadme(){
        try{
            const response = await fetch("http://localhost:8080/readme/empty", {
                method: "POST",
                credentials: "include"
            })
    
            if(response.ok){
                const readmeId = await response.json();
                navigate("/editor", { state: { readmeId: readmeId } })
            }
        }catch(error){
            handleOpenPopup("error", "Could not create empty repository, try again.")
        }

    }

    return (
        <div className="user-repositories">
            <div className="new-readme-button" onClick={CreateEmptyReadme}>
                Create new empty readme.
            </div>
            <h3 className="permission-prompt">
                If you dont see your repository change its visibility to public or install app on the desired repository by clicking the link: 
                <a href="https://github.com/apps/gitpen-v1/installations/new">INSTALL</a>
            </h3>
            <div className="repositories-container">
                {displayRepositories()}
            </div>
        </div>
    )
}

export default UserRepositories;