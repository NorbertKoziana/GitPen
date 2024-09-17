import React from 'react'
import { NavLink } from 'react-router-dom';
import '../style.css';
import {useAuth} from '../UserProvider'

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
                <div className='navbar-logout' onClick={logout}>
                    Logout
                </div>
            </>
        )
    }

    return (
        <div className='navbar'>
            <NavLink to="/"
                className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                }
                >
                Homepage
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