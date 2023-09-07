import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Message({ message, sender }) {
    const { user } = useContext( AuthContext );
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser = message.senderId === user._id ? 'receiver' : 'sender'; 

    return (
        <>
            { 
            currentUser === 'receiver'
            ? 
                <div className="message receiver">
                    <div className="avatar">
                        <img 
                            src={ user.profilePicture ? public_folder + user.profilePicture : `${public_folder}profiles/default.jpg`  } 
                            alt="receiverAvatar" 
                        />
                    </div>
                    <div className="message-content">
                       { message.content }
                    </div>
                </div>
            :
                <div className="message sender">
                    <div className="avatar">
                        <img 
                            src={ sender.profilePicture ? public_folder + sender.profilePicture : `${public_folder}profiles/default.jpg` }  
                            alt="senderAvatar"
                        />
                    </div>
                    <div className="message-content">
                        { message.content }
                    </div>
                </div>
            }
        </>
    )
}
