import Online from "./online";
import StoriesCarousel from "./storiesCarousel"
import Userfriend from "./userfriend";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { format } from "date-fns";
import FriendsList from "./FriendsList";

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext( AuthContext );
  
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
  }, [ currentUser.followings, currentUser._id ]);

  const HomeRightBar = () => {
    return (
      <>
        <div className="stories row">
          <StoriesCarousel/>
        </div>

        <FriendsList />
      </>
    );
  }

  const ProfileRightBar = () => {

    return(
      <>
        <h4 className="rightBarTitle">User Informations</h4>
        <div className="userInfo row">

          <div className="col-md-4">  
            <h3 className="key">City : </h3>
            <h3 className="key">From : </h3>
            <h3 className="key">Relationship : </h3>
            <h3 className="key">Email : </h3>
            <h3 className="key">DOB : </h3>
          </div>
          <div className="col-md-8">
            <h3 className="value">{ user.city || '...' }</h3>
            <h3 className="value">{ user.from || user.city || '...' }</h3>
            <h3 className="value">{ user.sex === 1 ? 'Single' : user.sex === 2 ? 'Commited' : "Prefer not to say" }</h3>
            <h3 className="value">{ user.email }</h3>
            <h3 className="value">{ user.dob ? format( new Date(user.dob), 'dd MMMM yyyy') : '' }</h3>
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
