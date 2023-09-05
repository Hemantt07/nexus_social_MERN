import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import FriendInline from './friend-inline';
import { toast } from 'react-toastify';

export default function Friendrequests({friendReq}) {
    const [allusers, setAllUsers] = useState([]);
    const { user } = useContext( AuthContext );

    useEffect(()=>{

        const fetchAllUsers = async () =>{
            try {
                const res = await axios.get( process.env.REACT_APP_BASE_PATH_API+'users/usersList/all/'+user._id );
                setAllUsers(res.data)
            } catch (error) {
                toast.error(error.response.data)
            }
        }

        fetchAllUsers();
    }, [user])

  return (
    <div className='friends-popup row'>
        { friendReq.length !== 0
            ?<div className="requests col">
                <h4>Follows you</h4>
                <ul className="list">
                    { friendReq.map((user)=>(
                        <FriendInline user={ user } key={ user._id } />
                    )) }
                </ul>
            </div> : ''}

        { allusers.length !== 0
            ? <div className="suggestions col">
                <h4>You may know</h4>
                <ul className="list">
                    { allusers.map((user)=>(
                        <FriendInline user={ user } key={ user._id } />
                    )) }
            </ul>
        </div> : ''}
    </div>
  )
}
