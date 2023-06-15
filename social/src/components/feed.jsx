import Share from "./share"
import Post from "./post";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await axios.get('posts/timeline/647f2e30bca1bc420d29cd2d');
      setPosts(res.data);
      console.log(res);
    };
    fetchPosts();
  }, []);

  return (
      <div className="feedWrapper">
        <Share/>

        { posts.map((p) => (
          <Post key={p.id} post={p}/>
        ))}

      </div>
  )
}
