import StoriesCarousel from "../storiesCarousel/StoriesCarousel"
import "./rightbar.css"
import { Close } from '@mui/icons-material';

export default function Rightbar() {
  return (
    <div className="rightBar col-4">
      <div className="rightBarWrapper">

        <div className="stories row"><StoriesCarousel/></div>

        <div className="adv">
          <img src="assets/images/ad1.jpeg" alt="ad1" />
          <p className="adText">
            Advertisement
            <Close className="closeIcon"/>
          </p>
        </div>

        <div className="friendOnline">
          <p className="head">Online Friends</p>
          <ul className="onlineFriendsList">

            <li className="friend">
              <div className="imgContainer">
                <img src="assets/images/profile5.jpeg" alt="" />
                <span className="onlineIcon"></span>
              </div>
              <p className="friendName">Riya Sankhyani</p>
            </li>
            
            <li className="friend">
              <div className="imgContainer">
                <img src="assets/images/profile4.jpeg" alt="" />
                <span className="onlineIcon"></span>
              </div>
              <p className="friendName">Riya Sankhyani</p>
            </li>
            
            <li className="friend">
              <div className="imgContainer">
                <img src="assets/images/profile4.jpeg" alt="" />
                <span className="onlineIcon"></span>
              </div>
              <p className="friendName">Riya Sankhyani</p>
            </li>
            
          </ul>

        </div>
      </div>
    </div>
  )
}
