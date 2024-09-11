import React, { useState, useEffect } from "react";
import '../style.css'

function UserRepositories(){

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        async function fetchRepos(){
            const response = await fetch("http://localhost:8080/github/repos",{
                method: "GET",
                credentials: "include"
            })

            if(response.ok){
                const data = await response.json();
                setRepos(data);
                console.log(data);
            }else{
                console.error(response.status)
            }
        }
        fetchRepos();
    }, [])//might want to add user here?

    function displayRepositories(){
        return repos.map((value) => {
            return value.private ? <div className="private-repo" key={value.id}>{value.name}</div>
            : <div className="public-repo" key={value.id}>{value.name}</div>
        })
    }

    return (
        <>
            <h3 className="permission-prompt">
                If you dont see your repository change its visibility to public or install app on the desired repository by clicking the link: 
                <a href="https://github.com/apps/gitpen-v1/installations/new">INSTALL</a>
            </h3>
            <div className="user-repositories">
                {displayRepositories()}
            </div>
        </>
    )
}

export default UserRepositories;