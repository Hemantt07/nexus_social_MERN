import { MoreVert, QuestionAnswer } from '@mui/icons-material';

export default function Post() {
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">

                <div className="topLeft">
                    <img src="assets/images/profile.png" alt="" className="userDP" />
                    <span className="userName">Reshav Dhiman</span>
                    <span className="date">19 mins ago</span>
                </div>

                <div className="topRight">
                    <MoreVert className="icon"/> 
                </div>

            </div>
            <div className="postCenter">

                <div className="postCaption">
                    Its my first post : )
                </div>

                <div className="postImg">
                    <img src="assets/images/post1.jpeg" alt="post1" />
                </div>

            </div>

            <div className="postBottom">
                <div className="bottomLeft">

                    <div className="heartReact"></div>
                    <div className="hahaReact"></div>
                    {/* <div className="wowReact"></div> */}

                    <span className="reactionsCount">201</span>
                </div>
                <div className="bottomRight">
                    <QuestionAnswer className="icon"/>
                    <span className="commentCount">12 Comments</span>
                </div>
            </div>

        </div>
    </div>
  )
}
