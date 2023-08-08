import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

export default function Friendrequests() {
    const [friendReq, setFriendReq] = useState(null);
    const { user } = useContext( AuthContext );

    useEffect(()=>{
        const fetchRequests = async ()=>{
            try {
                const res = await axios.get( process.env.REACT_APP_BASE_PATH_API+'users/followers/'+user._id );
                setFriendReq(res.body)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRequests()
    }, [])
  return (
    <div>friendrequests</div>
  )
}
