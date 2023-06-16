import Share from "./share"
import Post from "./post";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/posts/timeline/647f2e30bca1bc420d29cd2d');
    setPosts(res.data);
  };

  useEffect(()=>{
    fetchPosts();
  }, []);

  return (
      <div className="feedWrapper">
        <Share/>

        { posts.map((p) => (
          <Post key={p._id} post={p}/>
        ))}

      </div>
  )
}
