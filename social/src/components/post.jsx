import { Favorite, MoreVert, QuestionAnswer } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from "axios";
import { format } from 'date-fns';

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [isActive, setActive] = useState(false);
    const [user, setUser] = useState({});
    const date = format(Date.parse(post.createdAt), 'kk:mm MM/dd');
    
    const likeHandler =()=>{
        setActive( !isActive )
        setLike( isLiked ? like-1 : like+1 )
        setIsLiked( !isLiked )
    }

    useEffect(()=>{
        const fetchUser = async () => {
            const user = await axios.get(`http://localhost:5000/users/${post.userId}`);
            setUser(user.data);
        }
        fetchUser();
    },[]);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="post" id={`post${post._id}`}>
            <div className="postWrapper">
                <div className="postTop">

                    <div className="topLeft">
                        <img 
                            src={ user.profilePicture || `${PF}images/profiles/default.jpg` }
                            alt="" className="userDP"
                        />
                        <span className="userName">
                            { user.username }
                        </span>
                        <span className="date">{date}</span>
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
                        <img src={ post.img } alt={`post${post._id}`} />
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
