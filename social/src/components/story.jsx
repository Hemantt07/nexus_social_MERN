import axios from "axios";
import { useEffect, useState } from "react";

export default function Story( {story} ) {
  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);
  console.log(story)
  useEffect(()=>{
    const fetchUser = async () => {
        try {
          const res = await axios.get(process.env.REACT_APP_BASE_PATH_API+'users/?userId='+ story.userId  )
          setUser(res.data);
        } catch (error) {
          console.log(error)
        }
    };
    fetchUser();
  }, [ story ]);

  return (
      user ?

      <div className='story'>
        <div className="storyImg">
          <img src={ story.storyImg ? public_folder+story.storyImg : `${public_folder}profiles/default.jpg`} alt="story" />
        </div>
        <div className="content">
            <img src={ public_folder+user.profilePicture} alt="profile" className="profileImg" />
            <span className="userName">{user.username}</span>
        </div>
      </div> : ''
      
  )
}

