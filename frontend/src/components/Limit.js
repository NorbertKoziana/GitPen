import React, { useState, useEffect } from 'react'
import '../style.css'
import {useAuth} from '../UserProvider'
import {usePopup} from '../PopupProvider';
import axios from 'axios'

function Limit(){

    const [limit, setLimit] = useState('');

    const { user } = useAuth();

    const {handleOpenPopup} = usePopup();

    useEffect(() => {
        async function getLimit(){
            try{
                const response = await axios.get("/github/limit",{
                    withCredentials: true,
                });
                
                setLimit(response.data.rate.remaining)
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