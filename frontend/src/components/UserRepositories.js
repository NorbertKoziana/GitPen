import React, { useState, useEffect } from "react";
import '../style.css'
import { useNavigate } from 'react-router-dom'
import {usePopup} from 'PopupProvider';
import '../styles/user-repositories.css'
import Divider from '@mui/material/Divider';
import githubInstall from '../images/github_install.png'
import axios from 'axios'

function UserRepositories(){

    const [repos, setRepos] = useState([]);

    const {handleOpenPopup} = usePopup();

    useEffect(() => {
        async function fetchRepos(){
            try{
                const response = await axios.get("http://localhost:8080/github/repos",{
                    withCredentials: true
                })
    
                setRepos(response.data);
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
                <h3>{value.name}</h3>
                <p className="clickable" onClick={() => CreateReadmeUsingGithub(value.owner.login, value.name)}>
                    Click here to create new readme starting with your current readme.
                </p>
                <p className="clickable" onClick={() => CreateReadmeUsingAi(value.owner.login, value.name)}>
                    Click here to use AI to create readme based on your prompt and repository content.
                </p>
            </div>)
        });
    }

    const navigate = useNavigate();

    async function CreateReadmeUsingGithub(owner, repo){
        try{
            const response = await axios.post(`http://localhost:8080/readme/github/${owner}/${repo}`,
            null,
            {
                withCredentials: true,
                withXSRFToken: true
            })
    
            navigate("/editor", { state: { readmeId: response.data } })
        }catch(error){
            if(error.status === 404)
                handleOpenPopup("info", "Could not find your readme, check if readme.md exists in your repository.")
            else
                handleOpenPopup("error", "Could not create readme using your github repository, try again.")
        }
    }


    //To be implemented
    async function CreateReadmeUsingAi(owner, repo){
        handleOpenPopup("info", "This function is not implemented yet.")
    }

    async function CreateEmptyReadme(){
        try{
            const response = await axios.post("http://localhost:8080/readme/empty",
            null,
            {
                withCredentials: true,
                withXSRFToken: true
            })
    
            navigate("/editor", { state: { readmeId: response.data } })
        }catch(error){
            handleOpenPopup("error", "Could not create empty repository, try again.")
        }
    }

    return (
        <div className="user-repositories">
            <div className="new-readme-button black-button" onClick={CreateEmptyReadme}>
                Start with empty readme
            </div>
            <Divider flexItem >
                or create readme based on your existing repository
            </Divider>
            <h3 className="permission-prompt">
                If you don't see your repository change its visibility to public or install app on the desired private repository by clicking the icon:  
                <a href="https://github.com/apps/gitpen-v1/installations/new">
                    <img src={githubInstall} alt="install github" className="github-install-icon" />
                </a>
            </h3>
            <div className="repositories-container">
                {displayRepositories()}
            </div>
        </div>
    )
}

export default UserRepositories;