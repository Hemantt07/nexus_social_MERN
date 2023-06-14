import Share from "./share"
import Post from "./post";
import { Posts } from "../post-data";
import { useEffect, useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    
  })
  return (
      <div className="feedWrapper">
        <Share/>

        {/* { Posts.map((p) => (
          <Post key={p.id} post={p}/>
        ))} */}

      </div>
  )
}
