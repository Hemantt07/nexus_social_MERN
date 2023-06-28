import { Favorite, MoreVert, QuestionAnswer } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [users, setUser] = useState({});
    const { user } = useContext( AuthContext );
    
    const likeHandler = async ()=>{
        try {
            console.log(user);
            await axios.put( `http://localhost:5000/posts/${ post._id }/like`, { userId: user._id } );
        } catch (error) {
            console.log(error);
        }
        setActive( !isActive )
        setLike( isLiked ? like-1 : like+1 )
        setIsLiked( !isLiked )
    }
    
    useEffect(()=>{
        const fetchUser = async () => {
            const user = await axios.get(`http://localhost:5000/users/?userId=${post.userId}`);
            setUser(user.data);
        }
        fetchUser();
    },[post.userId]);
    
    const [isActive, setActive] = useState( post.likes.includes( user._id ) );
    const [isLiked, setIsLiked] = useState( post.likes.includes( user._id ) );
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    return (
        <div className="post" id={`post${post._id}`}>
            <div className="postWrapper">
                <Link to={`/profile/${users.username}`}>
                <div className="postTop">   
                    <div className="topLeft">
                        <img 
                            src={ users.profilePicture ? users.profilePicture : `${PF}images/profiles/default.jpg` }
                            alt="" className="userDP"
                        />
                        <span className="userName">
                            { users.username }
                        </span>
                        <span className="date">{format(post.createdAt)}</span>
                    </div>
                    <div className="topRight">
                        <MoreVert className="icon"/> 
                    </div>
                </div>
                </Link>
                <div className="postCenter">

                    <div className="postCaption">
                        {post?.desc}
                    </div>

                    { post.img ?  
                    <div className="postImg">
                        <img src={ post.img } alt={`post${post._id}`} />
                    </div>
                    : '' }

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
