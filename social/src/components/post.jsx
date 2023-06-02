import { Favorite, MoreVert, QuestionAnswer } from '@mui/icons-material';
import { Users } from "../post-data";
import { useState } from 'react';

export default function Post({post}) {

  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [isActive, setActive] = useState(false);

  const likeHandler =()=>{
    setActive( !isActive )
    setLike( isLiked ? like-1 : like+1 )
    setIsLiked( !isLiked )
  }

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

                    <Favorite onClick={likeHandler} className={`likeIcon ${isActive ? "active" : null}`}/>

                    <span className="reactionsCount">{like}</span>
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
