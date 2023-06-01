import { MoreVert, QuestionAnswer } from '@mui/icons-material';
import { Users } from "../post-data";

export default function Post({post}) {

  const user = Users.filter( u=>u.id===1 );

  return (
    <div className="post" id={`post${post.id}`}>
        <div className="postWrapper">
            <div className="postTop">

                <div className="topLeft">
                    <img 
                        src={ Users.filter(u=>u.id === post.userId)[0].profilePicture }
                        alt="" className="userDP"
                    />
                    <span className="userName">
                        { Users.filter(u=>u.id === post.userId)[0].username }
                    </span>
                    <span className="date">{post.date}</span>
                </div>

                <div className="topRight">
                    <MoreVert className="icon"/> 
                </div>

            </div>
            <div className="postCenter">

                <div className="postCaption">
                    {post?.desc}
                </div>

                <div className="postImg">
                    <img src={post.photo} alt={`post${post.id}`} />
                </div>

            </div>

            <div className="postBottom">
                <div className="bottomLeft">

                    <div className="heartReact"></div>
                    <div className="wowReact"></div>

                    <span className="reactionsCount">{post.like}</span>
                </div>
                <div className="bottomRight">
                    <QuestionAnswer className="icon"/>
                    <span className="commentCount">{post.comment} Comments</span>
                </div>
            </div>

        </div>
    </div>
  )
}
