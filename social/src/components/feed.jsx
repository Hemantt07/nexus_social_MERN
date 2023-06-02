import Share from "./share"
import Post from "./post";
import { Posts } from "../post-data";

export default function Feed() {
  return (
      <div className="feedWrapper">
        <Share/>

        { Posts.map((p) => (
          <Post key={p.id} post={p}/>
        ))}

      </div>
  )
}
