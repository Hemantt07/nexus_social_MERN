import Share from "./share"
import Post from "./post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const currentUser = useContext( AuthContext );

  const fetchPosts = async () => {
    const res = username !== currentUser.user.username
      ? await axios.get('http://localhost:5000/posts/profile/'+ username)
      : await axios.get('http://localhost:5000/posts/timeline/'+currentUser.user._id );
    setPosts(res.data);
  };
  useEffect(()=>{
    fetchPosts();
  }, [username]);

 
  return (
      <div className="feedWrapper">
        { username == currentUser.user.username ? <Share /> : '' }

        { posts.length == 0 
          ? <h1 className='error'> User has not posed anything yet</h1> 
          : posts.map((p) => (
            <Post key={p._id} post={p}/>
          ))
        }

      </div>
  )
}
