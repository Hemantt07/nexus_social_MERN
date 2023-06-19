import Online from "./online";
import StoriesCarousel from "./storiesCarousel"
import { Close } from '@mui/icons-material';
import Userfriend from "./userfriend";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Rightbar( {user} ) {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users/usersList/all');
    setUsers(res.data);
  };

  useEffect(()=>{
    fetchUsers();
  }, []);

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

            { users.map((user)=>(

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

          <span className="col-md-2 key">City : </span><span className="col-md-10 value">{ user.city }</span>
          <span className="col-md-2 key">From : </span><span className="col-md-10 value">{ user.from }</span>
          <span className="col-md-2 key">Sex : </span><span className="col-md-10 value">Male</span>
          <span className="col-md-2 key">Email : </span><span className="col-md-10 value">{ user.email }</span>

        </div>

        <div className="userfriend">
          <h3 className="head">Your Friends</h3>
          <ul className="friendlist row">

            { users.map((friend)=>(

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
