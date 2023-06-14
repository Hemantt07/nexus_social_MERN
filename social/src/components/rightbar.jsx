import { Users } from "../post-data";
import Online from "./online";
import StoriesCarousel from "./storiesCarousel"
import { Close } from '@mui/icons-material';
import Userfriend from "./userfriend";

export default function Rightbar( {user} ) {

  const HomeRightBar = () => {
    return (
      <>
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
      </>
    );
  }

  const ProfileRightBar = () => {
    return(
      <>
        <h4 className="rightBarTitle">User Informations</h4>

        <div className="userInfo row">

          <span className="col-md-2 key">City : </span><span className="col-md-10 value">Mohali ( IN )</span>
          <span className="col-md-2 key">From : </span><span className="col-md-10 value">Himachal Pradesh ( IN )</span>
          <span className="col-md-2 key">Sex : </span><span className="col-md-10 value">Male</span>
          <span className="col-md-2 key">Email : </span><span className="col-md-10 value">reshav07@gmail.com</span>

        </div>

        <div className="userfriend">
          <h3 className="head">Your Friends</h3>
          <ul className="friendlist row">

            { Users.map((friend)=>(

              <Userfriend key={friend.id} friend={friend} />

            )) }

          </ul>
        </div>

      </>
    )
  }

  return (
      <div className="rightBarWrapper">
        { user ? <ProfileRightBar /> : <HomeRightBar /> }
      </div>
  )
}
