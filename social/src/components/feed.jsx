import Share from "./share"
import Post from "./post";

export default function Feed() {
  return (
    <div className="feed col-6">
      <div className="feedWrapper">
        <Share/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
    </div>
  )
}
