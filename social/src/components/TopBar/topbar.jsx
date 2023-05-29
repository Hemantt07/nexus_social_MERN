import './topbar.css';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Topbar(){
    return (
        <div className='topbar'>
            <div className="topbarLeft">
                <span className="logo">Socinetic</span>
            </div>
            <div className="topbarCenter">
                <SearchIcon/>
                <input type="text" placeholder='Search' className="search" />
            </div>
            <div className="topbarRight">
                <div className="topBarLinks">
                    <div className="item">
                        <PersonIcon/>
                        <span className="counter">1</span>
                    </div>
                    <div className="item">
                        <ChatBubbleIcon/>
                        <span className="counter">1</span>
                    </div>
                    <div className="item">
                        <NotificationsNoneIcon/>
                        <span className="counter">1</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
