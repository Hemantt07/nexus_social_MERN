import Online from "./online";
import StoriesCarousel from "./storiesCarousel"
import { Close } from '@mui/icons-material';
import Userfriend from "./userfriend";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Rightbar({ user }) {

  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext( AuthContext );
  
  useEffect(()=>{
    const fetchFriends = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_BASE_PATH_API+'users/following/' + currentUser._id  );
        setFriends(res.data);
      } catch (error) {
        console.log( error )
      }
    };
    fetchFriends();
  }, [ user ]);

  const HomeRightBar = () => {
    return (
      <>
        <div className="stories row">
          <StoriesCarousel/>
        </div>

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

            { friends.length === 0 
              ? <h1 className='error'>No one is online</h1> 
              : friends.map((user)=>(

              <Online key={user._id} user={user} />

              )) 
            }
            
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
            <h3 className="key">DOB : </h3>
          </div>
          <div className="col-md-9">
            <h3 className="value">{ user.city || '...' }</h3>
            <h3 className="value">{ user.from || user.city || '...' }</h3>
            <h3 className="value">{ user.sex === 1 ? 'Male' : user.sex === 2 ? 'Female' : "Prefer not to say" }</h3>
            <h3 className="value">{ user.email }</h3>
            <h3 className="value">{ user.dob }</h3>
          </div>

        </div>

        <div className="userfriend">
          <h3 className="head">Your Friends</h3>
          <ul className="friendlist row">

            { friends.length === 0
              ? ''
              : friends.map((friend)=>(

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
