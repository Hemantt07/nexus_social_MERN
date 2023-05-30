import "./sidebar.css";
import { MoreHoriz, Replay, SportsEsports, Bookmark, Group, PlayCircle, ChatBubble, RssFeed } from '@mui/icons-material';

export default function Sidebar() {
  return (
    <div className="sideBar col-2">
      <div className="sidebarWrapper">
        <ul className="sidebarList">

        <li className="item">
            <RssFeed className="icon"/>
            <span className="text">Feed</span>
          </li>
          
          <li className="item">
            <ChatBubble className="icon" />
            <span className="text">Chats</span>
          </li>
          
          <li className="item">
            <PlayCircle className="icon"/>
            <span className="text">Videos</span>
          </li>
          
          <li className="item">
            <Group className="icon"/>
            <span className="text">Groups</span>
          </li>
          
          <li className="item">
            <Bookmark className="icon"/>
            <span className="text">Saved</span>
          </li>
          
          <li className="item">
            <SportsEsports className="icon"/>
            <span className="text">Gaming</span>
          </li>
          
          <li className="item">
            <Replay className="icon"/>
            <span className="text">Memories</span>
          </li>

        </ul>

        <button className="sideButton">
            <MoreHoriz className="icon"/>
            <span className="text">More</span>
        </button><hr className="sidebarHr" />

        <ul className="friendsList">

        <li className="friend">
            <img src="assets/images/profile2.jpeg" alt="" className="friendImg" />
            <span className="text">Sumisha</span>
          </li>

          <li className="friend">
            <img src="assets/images/profile2.jpeg" alt="" className="friendImg" />
            <span className="text">Sumisha</span>
          </li>

          <li className="friend">
            <img src="assets/images/profile2.jpeg" alt="" className="friendImg" />
            <span className="text">Sumisha</span>
          </li>

          <li className="friend">
            <img src="assets/images/profile2.jpeg" alt="" className="friendImg" />
            <span className="text">Sumisha</span>
          </li>

          <li className="friend">
            <img src="assets/images/profile2.jpeg" alt="" className="friendImg" />
            <span className="text">Sumisha</span>
          </li>

          <li className="friend">
            <img src="assets/images/profile2.jpeg" alt="" className="friendImg" />
            <span className="text">Sumisha</span>
          </li>

        </ul>

      </div>
    </div>
  )
}
