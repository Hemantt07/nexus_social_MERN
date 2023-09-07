import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

export default function Conversation(props) {
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
    const [sender, setSender] = useState({});
    const {user} = useContext(AuthContext);
    
    useEffect(()=>{
        const senderId = props.convo.members.find((m) => m !== user._id );
        const fetchSender = async ()=>{
            try {
                const res = await axios.get( `${process.env.REACT_APP_BASE_PATH_API}users/?userId=${senderId}` )
                setSender(res.data)
            } catch (error) {
                toast.error(error)
            }
        }
        fetchSender()
    },[props.convo.members, user._id])

    const handleClick = ()=>{
        props.setConversation( props.convo._id )
        props.setSender( sender )
    }

    return (
        <li 
            className={`convo ${props.convo.read ? `read` : `unread`}`} 
            onClick={ handleClick }
        >
            <div className="senderAvatar">
                <img 
                    src={ sender.profilePicture  ? public_folder+sender.profilePicture : `${public_folder}profiles/default.jpg` } 
                    alt="senderAvatarImg" 
                />
            </div>
            <div className="message-info">
                <p className="username">{ `${sender.firstname} ${sender.lastname}` }</p>
                <p className="message">Hello !</p>
            </div>
        </li>
    )
}
