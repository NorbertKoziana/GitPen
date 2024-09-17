import React from 'react'
import '../style.css'

function Signup(){
    return (
        <div className='signup'>
            <a href="http://localhost:8080/oauth2/authorization/github" className='login-github-button'>
                Log in using Github account
            </a>
        </div>
    )
}

export default Signup;