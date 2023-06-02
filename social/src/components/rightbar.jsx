import { Users } from "../post-data";
import Online from "./online";
import StoriesCarousel from "./storiesCarousel"
import { Close } from '@mui/icons-material';

export default function Rightbar() {
  return (
      <div className="rightBarWrapper">

        <div className="stories"><StoriesCarousel/></div>

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

            { Users.map((user)=>(

              <Online key={user.id} user={user} />

            )) }
            
          </ul>

        </div>
      </div>
  )
}
