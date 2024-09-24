import React from 'react'
import '../style.css'
import lock from '../images/lock.png'
import github from '../images/github.png'
import '../styles/sign-in.css'

function Signin(){
    return (
        <div className='sign-in'>
            <div className='container-sign-in'>
                <img src={lock} alt="lock" className='lock'/>
                <h2>Sign in</h2>
                <p>Please sign in to continue</p>
                <a href={`${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/github`} className='login-github-button'>
                    <img src={github} alt="github" className='github-link'/>
                    <p>Sign In With GitHub</p>
                </a>
            </div>
        </div>
    )
}

export default Signin;