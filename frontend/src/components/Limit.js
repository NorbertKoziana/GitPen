import React, { useState, useEffect } from 'react'
import '../style.css'

function Limit(){

    const [limit, setLimit] = useState('');

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
    , [])

    return(
        <div className='limit'>
            {limit}
        </div>
    )
}

export default Limit;