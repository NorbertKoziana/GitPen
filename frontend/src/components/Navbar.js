import React from 'react'
import { NavLink } from 'react-router-dom';
import '../style.css';
import {useAuth} from '../UserProvider'
import '../styles/navbar.css'
import logo from '../images/logo.png';

function Navbar(){

    const { user, logout } = useAuth();

    function renderSignup(){
        return (
            <>
                <NavLink to="/signup"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                    >
                    Sign up
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
                <NavLink to="#"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                    onClick={logout}
                    >
                    Logout
                </NavLink>
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
                <img src={logo} alt='logo' className='logo'/>
            </NavLink>
            <NavLink to="/editor"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
                >
                Editor
            </NavLink>
            {user ? renderLogout() : renderSignup()}
        </div>
    )
}

export default Navbar;