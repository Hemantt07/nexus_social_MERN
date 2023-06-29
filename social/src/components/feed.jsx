import Share from "./share"
import Post from "./post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext( AuthContext );

  const fetchPosts = async () => {
    const res = username !== user.username
      ? await axios.get('http://localhost:5000/posts/profile/'+ username)
      : await axios.get('http://localhost:5000/posts/timeline/'+ user._id );
    setPosts(
      res.data.sort(( p1, p2 )=>{
        return new Date( p2.createdAt ) - new Date( p1.createdAt );
      })
    );
  };
  useEffect(()=>{
    fetchPosts();
  }, [username, user._id]);

 
  return (
      <div className="feedWrapper">
        { username === user.username ? <Share /> : '' }

        { posts.length === 0 
          ? <h1 className='error'> User has not posed anything yet</h1> 
          : posts.map((p) => (
            <Post key={p._id} post={p}/>
          ))
        }

      </div>
  )
}
