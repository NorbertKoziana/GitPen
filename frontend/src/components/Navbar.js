import React from 'react'
import { NavLink } from 'react-router-dom';
import '../style.css';
import useAuth from '../UseAuth'

function Navbar(){

    const { user, logout } = useAuth();

    function renderLoginAndRegister(){
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
            <div className='navbar-logout' onClick={logout}>
                Logout
            </div>
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
            {user ? renderLogout() : renderLoginAndRegister()}
        </div>
    )
}

export default Navbar;