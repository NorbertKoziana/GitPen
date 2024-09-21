import React from 'react'
import { NavLink } from 'react-router-dom';
import '../style.css';
import {useAuth} from '../UserProvider'
import '../styles/navbar.css'
import blackLogo from '../images/logo_black.png';
import whiteLogo from '../images/logo_white.png';

function Navbar(){

    const { user, logout } = useAuth();

    function renderSignin(){
        return (
            <>
                <NavLink to="/signin"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                    >
                    Sign in
                </NavLink>
            </>
        )
    }

    function renderLogout(){
        return (
            <>
                <NavLink to="/repos"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                    >
                    Create new readme
                </NavLink>
                <NavLink to="/readmes"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                    >
                    Display your readmes
                </NavLink>
                <a href="#" onClick={logout}>
                    Logout
                </a>
            </>
        )
    }

    return (
        <div className='navbar'>
            <NavLink to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "logo-link pending" : isActive ? "logo-link active" : "logo-link"
                }
                >
                {({ isActive }) => (
                    isActive ? 
                    <img src={whiteLogo} alt='logo' className='logo'/> : 
                    <img src={blackLogo} alt='logo' className='logo'/>
                )}
            </NavLink>
            <NavLink to="/editor"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
                >
                Editor
            </NavLink>
            {user ? renderLogout() : renderSignin()}
        </div>
    )
}

export default Navbar;