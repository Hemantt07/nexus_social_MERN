import { Favorite, ChatBubble, Search, Person, Brightness6 } from '@mui/icons-material';

export default function Topbar(){
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
                        <Brightness6/>
                    </div>
                    <div className="item">
                        <Person/>
                        <span className="counter">1</span>
                    </div>
                    <div className="item">
                        <ChatBubble/>
                        <span className="counter">9+</span>
                    </div>
                    <div className="item">
                        <Favorite/>
                        <span className="counter">1</span>
                    </div>
                </div>

                <div className="profile">
                    <img src="assets/images/profile.png" alt="" />
                </div>
            </div>
        </div>
    );
}
