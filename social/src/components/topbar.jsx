import { Favorite, ChatBubble, Search, Person, Brightness6, TtyOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useEffect } from 'react';

export default function Topbar(){

    const switchMode = () => {
        
    }

    return (
        <div className='topbar row'>
            <div className="topbarLeft col-md-2">
                <span className="logo">Nexus Social</span>
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
                    <div className="profile">
                        <img src="assets/images/profiles/profile.png" alt="" />
                    </div>
                </Tooltip>
            </div>
        </div>
    );
}
