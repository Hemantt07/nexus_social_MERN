import Topbar from '../components/topbar'
import Chat from '../components/Chat'
import FriendsList from '../components/FriendsList'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Conversation from '../components/Conversation'

export default function Messenger() {
  const {user} = useContext(AuthContext)
  const [conversations, setConversations] = useState([])
  const [conversation, setConversation] = useState()
  const [sender, setSender] = useState()
  
  useEffect(()=>{
      const fetchConvos = async ()=>{
          try {
              const convoList = await axios.get( `${process.env.REACT_APP_BASE_PATH_API}conversations/${user._id}` );
              setConversations(convoList.data);
          } catch (error) {
              console.log(error)
              toast.error(error)
          }
      }

      fetchConvos();
  },[user._id])
  
  return (
    <>
      <Topbar/>
      <div className="messenger-page row">
        <div className='convowrapper col-md-3 pe-0'>
              <h4 className="title w-100 py-3 ps-2 m-0">Messages</h4>
              <ul className='convo-list'>
              {
                  conversations.length === 0
                  ? <h3>Start a Conversation</h3>
                  : conversations.map((convo)=>(
                      <Conversation 
                        key={convo._id} 
                        convo={convo} 
                        setConversation={setConversation}
                        setSender={setSender}
                      />
                  ))
              }
              </ul>
        </div>

          <Chat 
            conversation={conversation}
            sender={sender}
          />
          <FriendsList page="chat" />
      </div>
    </>
  )
}
