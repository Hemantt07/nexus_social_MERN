import "./post.css"
import { MoreVert } from '@mui/icons-material';

export default function Post() {
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="topLeft">
                    <img src="assets/profile.jpeg" alt="" className="userDP" />
                    <span className="userName">Reshav Dhiman</span>
                    <span className="date">19 mins ago</span>
                </div>

                <div className="topRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter"></div>
            <div className="postBottom"></div>
        </div>
    </div>
  )
}
