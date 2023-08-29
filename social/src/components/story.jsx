import axios from "axios";
import { useEffect, useState } from "react";

export default function Story( {story} ) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);
  
  useEffect(()=>{
    const fetchUser = async () => {
        const res = await axios.get(process.env.REACT_APP_BASE_PATH_API+'users/?userId='+ story.userId  )
        setUser(res.data);
    };
    fetchUser();
  }, [ story ]);

  return (
      user ?

      <div className='story'>
        <div className="storyImg">
          <img src={ story.storyImg ? PF+story.storyImg : `${PF}profiles/default.jpg`} alt="story" />
        </div>
        <div className="content">
            <img src={ PF+user.profilePicture} alt="profile" className="profileImg" />
            <span className="userName">{user.username}</span>
        </div>
      </div> : ''
      
  )
}

