import React from 'react'
import '../style.css'
import { useRouteError } from 'react-router-dom'

function ErrorPage(){

    const error = useRouteError();
    console.log(error);

    return (
        <div className='error-page'>
            <p>{error.statusText || error.message}</p>
        </div>
    )
}

export default ErrorPage;