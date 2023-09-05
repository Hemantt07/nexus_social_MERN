import { Send, Favorite, MoreVert, QuestionAnswer } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { saveAs } from 'file-saver'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

export default function Post( { post } ) {
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.length);
    const [users, setUser] = useState({});
    const { user } = useContext( AuthContext );
    const [isActive, setActive] = useState( post.likes.includes( user._id ) );
    const [isLiked, setIsLiked] = useState( post.likes.includes( user._id ) );
    const [showModal, setShowModal] = useState(false);
    
    const likeHandler = async ()=>{
        try {
            await axios.put( `${ process.env.REACT_APP_BASE_PATH_API }posts/${ post._id }/like`, { userId: user._id } );
        } catch (error) {
            toast.error(error.response.data);
        }
        setActive( !isActive )
        setLike( isLiked ? like-1 : like+1 )
        setIsLiked( !isLiked )
    }
    
    const deletePost = async() => {
        try {
            if ( window.confirm('Do you want to delete this post ?') ) {
                await axios.delete( `${ process.env.REACT_APP_BASE_PATH_API }posts/${ post._id}`, { userId: user._id } );
                window.location.reload();
            }
        } catch (error) {
            toast.error(error.response.data);
        }
    }
    
    useEffect(()=>{
        const fetchUser = async () => {
            const user = await axios.get(`${ process.env.REACT_APP_BASE_PATH_API }users/?userId=${post.userId}`);
            setUser(user.data);
        }
        fetchUser();
    },[post.userId]);

    const openPost = ()=>{
        setShowModal( true );
        document.body.style.overflow = 'hidden';
    }

    const hideModal = ()=>{
        setShowModal( false );
        document.body.style.overflow = 'auto';
    }

    return (
        <>
            <div className="post" id={`post${ post._id }`}>
                <div className="postWrapper">
                    <div className="postTop">   
                        <Link to={`/profile/${users.username}`}>
                        <div className="topLeft">
                            <img 
                                src={ users.profilePicture ? public_folder+users.profilePicture : `${public_folder}profiles/default.jpg` }
                                alt="" className="userDP"
                                />
                            <span className="userName">
                            { users.firstname+" "+users.lastname }
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
                                    <Link download={ public_folder+post.img }>
                                        <li onClick={ ()=> saveAs( public_folder+post.img, post._id+'.jpg' ) }>
                                            Save
                                        </li>
                                    </Link>
                                </ul>
                            </Popup>
                            
                        </div>
                    </div>
                    <div className="postCenter" onClick={ openPost }>
                        { post.desc 
                            ? <pre className='postCaption'>
                                { post.desc }
                            </pre>
                            : ''
                        }
                        { post.img ?  
                            <div className="postImg">
                                <img src={ public_folder+post.img } alt={`post${post._id}`} />
                            </div>
                        : '' }
                    </div>

                    <div className="postBottom">
                        <div className="bottomLeft">

                            <Favorite onClick={likeHandler} className={`likeIcon ${isActive ? "active" : null}`}/>

                            <span className="reactionsCount">{like}</span>
                        </div>
                        <div className="bottomRight" onClick={ openPost }>
                            <QuestionAnswer className="icon"/>
                            <span className="commentCount">{post.comment} Comments</span>
                        </div>
                    </div>
                    <div id="single-post" className={`${showModal ? 'show' : ''}`}>
                       <div className="modal-post row ">
                        <CloseIcon className='cancel-icon' onClick={ hideModal }/>
                            { post.img ?  
                            <div className="col-md-5 postWrapper_1">
                                <div className="post" id={`post${post._id}`}>
                                    <div className="postWrapper">
                                        <div className="postCenter">
                                            <div className="postImg">
                                                <img src={ public_folder+post.img } alt={`post${post._id}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                : '' }
                            <div className="col-md-5 postWrapper_2">
                                <div className="comment-section post">
                                    <div className="postWrapper">
                                        <div className='comment-section-inner'>
                                            <div className="postTop">   
                                                <Link to={`/profile/${users.username}`}>
                                                <div className="topLeft">
                                                    <img 
                                                        src={ users.profilePicture ? public_folder+users.profilePicture : `${public_folder}profiles/default.jpg` }
                                                        alt="" className="userDP"
                                                        />
                                                    <span className="userName">
                                                    { users.firstname+" "+users.lastname }
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
                                                            <Link download={ public_folder+post.img }>
                                                                <li onClick={ ()=> saveAs( public_folder+post.img, post._id+'.jpg' ) }>
                                                                    Save
                                                                </li>
                                                            </Link>
                                                        </ul>
                                                    </Popup>
                                                    
                                                </div>
                                            </div>
                                            { post.desc 
                                                ? <pre  className='postCaption'>
                                                    { post.desc }
                                                  </pre>
                                                : ''
                                            }
                                        </div>
                                        <div className="postCenter">
                                            <h1 className='error'>Be first to comment</h1>
                                        </div>
                                        <div className="comment-section-inner">
                                            <div className="postBottom">
                                                <div className="bottomLeft">
                                                    <Favorite onClick={likeHandler} className={`likeIcon ${isActive ? "active" : null}`}/>
                                                    <span className="reactionsCount">{like}</span>
                                                </div>
                                                <div className="bottomRight">
                                                    <QuestionAnswer className="icon"/>
                                                    <input type="text" placeholder='Leave a comment..' className='comment-input' />
                                                    <button type="submit" className='comment-button'>
                                                        <Send />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                       </div>
                    </div> 
                </div>
            </div> 
        </>
    )
}
