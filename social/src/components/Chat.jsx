import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { Send } from '@mui/icons-material'
import axios from 'axios'
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

export default function Chat({conversation, sender}) {
    const [messages, setMessages] = useState([]);
    const [messagesend, setMessagesend] = useState(false);
    const {user} = useContext(AuthContext);
    const changesize = ()=>{
        document.querySelector('.message-input').addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = `${this.scrollHeight}px`;
        })
    }
    
    useEffect(()=>{
        const fetchMessages = async()=>{
            try {
                const res =  await axios.get(process.env.REACT_APP_BASE_PATH_API+'messages/'+conversation);
                setMessages(res.data.sort(( p1, p2 )=>{
                    return new Date( p1.createdAt ) - new Date( p2.createdAt );
                }))
            } catch (error) {
                toast.error(error.response.data)
            }
        }
        
        fetchMessages()
    }, [conversation, messagesend])

    
    const content = useRef();
    
    const createMessage = async()=>{
        const messageData = {
            'messageContent' : content.current.value,
            'conversationId' : conversation,
            'senderId' : user._id
        }
        if ( content.current.value === '' ) {
            content.current.focus()
        } else {
            try {
                await axios.post(process.env.REACT_APP_BASE_PATH_API+'messages', messageData);
                setMessagesend(!messagesend)
                content.current.value = '';
            } catch (error) {
                toast.error(error.response.data)
            }
        }
    }

    return (
        <div className="chat-box col-md-6">
            <div className="chat">
                <div className="user-info">

                </div>
                <div className="chat-inner">
                    {
                        messages.length !== 0 
                        ? messages.map((message) => (
                            <Message 
                                key={message._id}
                                message={message}
                                sender={sender} 
                            /> 
                        ))
                        : 'No mesages'
                    }
                </div>
                <div className="message-input-box">
                    <div className="wrapper">
                        <textarea 
                            type="text" 
                            placeholder='' 
                            className='message-input'
                            onChangeCapture={ changesize }
                            rows={1}
                            ref={content}
                        />
                        <button onClick={createMessage} className='message-button' disabled={ content == '' ? 'disabled' : ''} >
                            <Send />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
