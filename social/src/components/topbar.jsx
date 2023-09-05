import { Favorite, ChatBubble, Search, Person } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import Popup from 'reactjs-popup';
import Friendrequests from './friendrequests';
import axios from 'axios';
import FriendInline from './friend-inline';
import { toast } from 'react-toastify';

export default function Topbar(){
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext( AuthContext ) || [];
    const [usersList, setUsersList] = useState();
    const [searchList, setSearchList] = useState(false);
    const [friendReq, setFriendReq] = useState([]);

    const search = useRef();
    
    const searchHit = ()=>{
        setSearchList(true)
        const searchKey = search.current.value
        const searchUser = async () => {
            try {
                const userList = await axios.post('http://localhost:5000/users/?search='+searchKey);
                setUsersList( userList.data );
            } catch (error) {
                toast.error(error.response.data)
            }
        }
        searchUser();
    }

    useEffect(()=>{
        const fetchRequests = async ()=>{
            try {
                const res = await axios.get( process.env.REACT_APP_BASE_PATH_API+'users/followers/'+user._id );
                setFriendReq(res.data)
            } catch (error) {
                toast.error(error.response.data)
            }
        }

        fetchRequests();
    }, [user])

    document.body.addEventListener('click', ()=>{
    })
    
    return (
        <div className='topbar row'>

            <div className="topbarLeft col-md-2">
                <Link to="/">
                    <span className="logo">Nexus Social</span>
                </Link>
            </div>

            <div className="topbarCenter col-md-6">
                <button type="submit" className='searchBtn'>
                    <Search className='searchIcon'/>
                </button>
                <input 
                    type="text" 
                    placeholder='Search Nexus Social...' 
                    className="search" 
                    ref={ search }
                    onKeyUpCapture={searchHit}
                />
                <ul className={`searchedUsers ${ searchList ? `` : `d-none` }`}>
                    { usersList && usersList.length > 0 
                        ? usersList.map((user) => (
                            <FriendInline key={user._id} user={user} setSearchList={setSearchList} />
                        )) 
                        : <li>No users found</li> }
                </ul>
            </div>

            <div className="topbarRight col-md-4">
                <div className="topbarLinks">
                    <div className="item">Home</div>
                    <div className="item">Explore</div>
                </div>
                <div className="topBarIcons">

                    <div className="item">
                        <Popup className='friendsPopup' trigger=
                            { <Person/> }
                            position="bottom left">
                            <Friendrequests friendReq={friendReq}/>
                        </Popup>
                        <span className="counter"><span>{ friendReq.length < 10 ? friendReq.length : '9+' }</span></span>
                    </div>

                    <div className="item">
                        <Link to={ '/messenger' } > 
                            <Tooltip title="Chats">
                                <ChatBubble/>
                            </Tooltip>
                            <span className="counter"><span>9+</span></span>
                        </Link>
                    </div>

                    <div className="item">
                        <Tooltip title="Notifications">
                            <Favorite/> 
                        </Tooltip>
                        <span className="counter"><span>9+</span></span>
                    </div>

                </div>

                <Tooltip title="Profile">

                    <Link to={ `/profile/${ user.username || '' }` }>
                        <div className="profile">
                            <img 
                                src={ user.profilePicture  ? public_folder+user.profilePicture : `${public_folder}profiles/default.jpg` } 
                                alt="profile-pic" 
                            />
                        </div>
                    </Link>

                </Tooltip>
            </div>
        </div>
    );
}
