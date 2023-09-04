import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Message({ currentUser }) {
    const { user } = useContext( AuthContext );
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
    console.log(currentUser)
    return (
        <>
            { 
            currentUser === 'sender'
            ? 
                <div className="message sender">
                    <div className="avatar">
                        <img 
                            src={ user.profilePicture ? public_folder + user.profilePicture : `${public_folder}profiles/default.jpg`  } 
                            alt="avatar" 
                        />
                    </div>
                    <div className="message-content">
                        Hey man !!
                    </div>
                </div>
            :
                <div className="message receiver">
                    <div className="avatar">
                        <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="avatar" />
                    </div>
                    <div className="message-content">
                        Hello
                    </div>
                </div>
            }
        </>
    )
}
