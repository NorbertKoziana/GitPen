import React, { useState, useEffect } from 'react'
import '../style.css'
import useAuth from '../UseAuth'

function Limit(){

    const [limit, setLimit] = useState('');

    const { user } = useAuth();

    useEffect(() => {
        async function getLimit(){
            const response = await fetch("http://localhost:8080/github/limit",{
                method: "GET",
                credentials: "include",
            })
            
            const limit = await response.json();
            setLimit(limit.rate.remaining)
        }
        getLimit();
    }
    , [user])

    return(
        <div className='limit'>
            {limit}
        </div>
    )
}

export default Limit;