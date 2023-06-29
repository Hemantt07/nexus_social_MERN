import Online from "./online";
import StoriesCarousel from "./storiesCarousel"
import { Close } from '@mui/icons-material';
import Userfriend from "./userfriend";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Rightbar( {user} ) {

  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext( AuthContext );

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/users/following/'+currentUser._id  );
    setFriends(res.data);
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

            { friends.map((user)=>(

              <Online key={user._id} user={user} />

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

          <div className="col-md-3">  
            <h3 className="key">City : </h3>
            <h3 className="key">From : </h3>
            <h3 className="key">Sex : </h3>
            <h3 className="key">Email : </h3>
          </div>
          <div className="col-md-9">
            <h3 className="value">{ user.city || '...' }</h3>
            <h3 className="value">{ user.from || user.city || '...' }</h3>
            <h3 className="value">{ user.sex === 1 ? 'Male' : user.sex === 2 ? 'Female' : "Prefer not to say" }</h3>
            <h3 className="value">{ user.email }</h3>
          </div>

        </div>

        <div className="userfriend">
          <h3 className="head">Your Friends</h3>
          <ul className="friendlist row">

            { friends.map((friend)=>(

              <Userfriend key={friend._id} friend={friend} />

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
