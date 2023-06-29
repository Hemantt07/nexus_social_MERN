import { Favorite, ChatBubble, Search, Person, Brightness6 } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

export default function Topbar(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext( AuthContext ) || [];
 
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
                <input type="text" placeholder='Search Nexus Social...' className="search" />
            </div>
            <div className="topbarRight col-md-4">
                <div className="topbarLinks">

                    <div className="item">Home</div>
                    <div className="item">Explore</div>
                </div>
                <div className="topBarIcons">
                    <div className="item">
                        <Tooltip title="Dark/Light mode">
                            <Brightness6 id="switchMode"/>
                        </Tooltip>
                    </div>
                    <div className="item">
                        <Tooltip title="Friends">
                            <Person/>
                        </Tooltip>
                        <span className="counter">1</span>
                    </div>
                    <div className="item">
                        <Tooltip title="Chats">
                            <ChatBubble/>
                        </Tooltip>
                        <span className="counter">9+</span>
                    </div>
                    <div className="item">
                        <Tooltip title="Notifications">
                            <Favorite/> 
                        </Tooltip>
                        <span className="counter">1</span>
                    </div>
                </div>

                <Tooltip title="Profile">
                    <Link to={ `/profile/${ user.username || '' }` }>
                        <div className="profile">
                            <img src={ user.profilePicture || `${PF}profiles/profile.png`} alt="profile-picture" />
                        </div>
                    </Link>
                </Tooltip>
            </div>
        </div>
    );
}
