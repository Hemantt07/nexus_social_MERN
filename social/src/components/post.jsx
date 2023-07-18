import { Favorite, MoreVert, QuestionAnswer } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { saveAs } from 'file-saver'

export default function Post({post}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.length);
    const [users, setUser] = useState({});
    const { user } = useContext( AuthContext );
    const [isActive, setActive] = useState( post.likes.includes( user._id ) );
    const [isLiked, setIsLiked] = useState( post.likes.includes( user._id ) );
    
    const likeHandler = async ()=>{
        try {
            await axios.put( `${ process.env.REACT_APP_BASE_PATH_API }posts/${ post._id }/like`, { userId: user._id } );
        } catch (error) {
            console.log(error);
        }
        setActive( !isActive )
        setLike( isLiked ? like-1 : like+1 )
        setIsLiked( !isLiked )
    }
    
    const deletePost = async() => {
        try {
            console.log( user._id, post._id )
            await axios.delete( `${ process.env.REACT_APP_BASE_PATH_API }posts/${ post._id}`, { userId: user._id } );
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
        const fetchUser = async () => {
            const user = await axios.get(`${ process.env.REACT_APP_BASE_PATH_API }users/?userId=${post.userId}`);
            setUser(user.data);
        }
        fetchUser();
    },[post.userId]);

    return (
        <div className="post" id={`post${post._id}`}>
            <div className="postWrapper">
                <div className="postTop">   
                    <Link to={`/profile/${users.username}`}>
                    <div className="topLeft">
                        <img 
                            src={ users.profilePicture ? PF+users.profilePicture : `${PF}profiles/default.jpg` }
                            alt="" className="userDP"
                            />
                        <span className="userName">
                            { users.username }
                        </span>
                        <span className="date">{ format(post.createdAt) }</span>
                    </div>
                    </Link>
                    <div className="topRight">
                        <Popup trigger=
                            {<button className='more'> <MoreVert className="icon"/> </button>}
                            position="left top">
                            <ul className="moreList">
                                { users.username === user.username
                                    ? <>
                                        <li>Edit</li>
                                        <li onClick={ deletePost }>Delete</li>
                                      </>
                                    : ''
                                }
                                <Link download={ PF+post.img }>
                                    <li onClick={ ()=> saveAs( PF+post.img, post._id+'.jpg' ) }>
                                        Save
                                    </li>
                                </Link>
                            </ul>
                        </Popup>
                        
                    </div>
                </div>
                <div className="postCenter">

                    { post.desc 
                        ? <div className="postCaption">
                            { post.desc }
                          </div>
                        : ''
                    }

                    { post.img ?  
                    <div className="postImg">
                        <img src={ PF+post.img } alt={`post${post._id}`} />
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
