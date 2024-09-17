import React, { useState, useEffect } from 'react'
import '../style.css'
import {useAuth} from '../UserProvider'
import {usePopup} from '../PopupProvider';

function Limit(){

    const [limit, setLimit] = useState('');

    const { user } = useAuth();

    const {handleOpenPopup} = usePopup();

    useEffect(() => {
        async function getLimit(){
            try{
                const response = await fetch("http://localhost:8080/github/limit",{
                    method: "GET",
                    credentials: "include",
                })
                
                if(response.ok){
                    const limit = await response.json();
                    setLimit(limit.rate.remaining)
                }
            }catch(error){
                handleOpenPopup("error", "Could not fetch your limit.")
            }

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