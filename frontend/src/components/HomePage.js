import React from 'react'
import '../style.css';
import Limit from './Limit'
import homepagePencil from '../images/homepage_pencil.jpeg'
import { NavLink } from 'react-router-dom';
import '../styles/homepage.css'
import {useAuth} from '../UserProvider'

function HomePage(){

    const {user} = useAuth();

    function renderSignupPrompt(){
        return (
            <>
                <p>
                    Sign in using github account to be able to load readmes from your repositories and save them locally.
                </p>
                <NavLink to="/signin" className="signin-button">
                    Sign in
                </NavLink>
            </>
        )
    }

    function renderUserInfo(){
        return (
            <>
                <p>
                    Your are logged in as: {user.login}
                </p>
                <p>
                    Your rate limit to github API: <Limit />
                </p>
            </>
        )
    }


    return (
    <div className='home-page'>
        <div className='home-container'>
            <div className='home-left-section'>
                <img src={homepagePencil} alt="" className='home-main-image' />
            </div>
            <div className='home-right-section'>
                <h1>
                    GitPen - your personal github readme creator
                </h1>
                {user ? renderUserInfo() : renderSignupPrompt()}
            </div>
        </div>
    </div>
    )
}

export default HomePage;