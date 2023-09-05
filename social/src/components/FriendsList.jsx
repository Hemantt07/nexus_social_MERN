import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import Online from './online';
import { Search } from '@mui/icons-material';

export default function FriendsList({page}) {
    const [friends, setFriends] = useState([]);
    const { user: currentUser } = useContext( AuthContext );

    useEffect(()=>{
        const fetchFriends = async () => {
          try {
            const res = await axios.get(process.env.REACT_APP_BASE_PATH_API+'users/following/' + currentUser._id  );
            setFriends(res.data);
          } catch (error) {
            console.log( error )
          }
        };
        fetchFriends();
    }, [ currentUser.followings, currentUser._id ]);

    return (
        <div className={`friendOnline ${ page === 'chat' ? `col-md-3` : 'mt-3' }`}>
            {  
                page === 'chat' 
                ?
                <div className="searcwrap mb-3">
                    <button type="submit" className='searchBtn'>
                        <Search className='searchIcon'/>
                    </button> 
                    <input 
                        type="text" 
                        placeholder='Search Friends...' 
                        className="search"
                    />
                </div>
                : <p className="head">Online Friends</p>
            }
            <ul className="onlineFriendsList">

            { friends.length === 0 
                ? <h1 className='error'>No one is online</h1> 
                : friends.map((user)=>(

                <Online key={user._id} user={user} />

                )) 
            }
            
            </ul>

        </div>
  )
}
