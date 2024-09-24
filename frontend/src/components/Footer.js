import React from 'react'
import '../style.css';
import logo from '../images/logo_black.png'
import github from '../images/github.png'
import '../styles/footer.css'

function Footer(){
    return (
        <div className='footer'>
            <img src={logo} alt="" className='logo'/>
            <div className='paragraph-wrapper'>
                Created by: 
                <a href="https://github.com/NorbertKoziana" target="_blank" className='github-link link-footer'>
                    <p>Norbert Koziana </p>
                    <img src={github} alt="" />
                </a>
            </div>
        </div>
    )
}

export default Footer;