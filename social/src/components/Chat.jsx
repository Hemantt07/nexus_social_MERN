import React from 'react'
import Message from './Message'
import { Send } from '@mui/icons-material'

export default function Chat({conversation}) {
    const message = {
        'id' : '24378',
        'content' : 'Hello',
        'receiver_id' : '64b7a2f209d11d164095cf12'
    }

    const changesize = ()=>{
        document.querySelector('.message-input').addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = `${this.scrollHeight}px`;
        })
    }
    return (
        <div className="chat-box col-md-6">
            <div className="chat">
                <div className="user-info">

                </div>
                <div className="chat-inner">
                    <Message currentUser={ 'sender' } message={message} /> 
                    <Message currentUser={ 'receiver' } message={message} /> 
                    <Message currentUser={ 'sender' } message={message} /> 
                    <Message currentUser={ 'receiver' } message={message} /> 
                    <Message currentUser={ 'sender' } message={message} /> 
                    <Message currentUser={ 'receiver' } message={message} /> 
                    <Message currentUser={ 'sender' } message={message} /> 
                    <Message currentUser={ 'receiver' } message={message} /> 
                    <Message currentUser={ 'sender' } message={message} /> 
                    <Message currentUser={ 'receiver' } message={message} /> 
                </div>
                <div className="message-input-box">
                    <div className="wrapper">
                        <textarea 
                            type="text" 
                            placeholder='' 
                            className='message-input'
                            onChangeCapture={ changesize }
                            rows={1}
                        />
                        <button type="submit" className='message-button'>
                            <Send />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
