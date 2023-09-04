import React from 'react'
import Message from './Message'
import { Send } from '@mui/icons-material'

export default function Chat() {
  return (
    <div className="chat-box col-md-7">
        <div className="chat">
            <div className="chat-inner">
                <Message currentUser={ 'sender' }/>
                <Message currentUser={ 'receiver' }/>
                <Message currentUser={ 'sender' }/>
                <Message currentUser={ 'receiver' }/>
                <Message currentUser={ 'sender' }/>
                <Message currentUser={ 'receiver' }/>
                <Message currentUser={ 'sender' }/>
                <Message currentUser={ 'receiver' }/>
                <Message currentUser={ 'sender' }/>
                <Message currentUser={ 'receiver' }/>
            </div>
            <div className="message-input-box">
                <div className="wrapper">
                    <textarea type="text" placeholder='' className='message-input' />
                    <button type="submit" className='message-button'>
                        <Send />
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
