import { Tooltip } from "@mui/material";
import Feed from "../components/feed";
import Rightbar from "../components/rightbar";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { ExpandLessSharp, Settings } from "@mui/icons-material";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username  = useParams().username;
    const [user, setUser] = useState([]);
    const { user : currentUser, dispatch } = useContext( AuthContext);
    const [follower, setFollower] = useState( 
        currentUser.followings.includes( user._id )
    );
    
    useEffect(()=>{
        setFollower( currentUser.followings.includes( user._id ) );
    }, [user])
    
    useEffect(()=>{
        const fetchUser = async () => {
            const res = username == currentUser.username
            ? await axios.get(process.env.REACT_APP_BASE_PATH_API+'users/?username='+ currentUser.username  )
            : await axios.get(process.env.REACT_APP_BASE_PATH_API+'users/?username='+username);
            setUser(res.data);
        };
        fetchUser();
    }, [ username, currentUser ]);
    
    const handleFollow = async () => {
        try {
            
            if ( follower ) {
                await axios.put( `${ process.env.REACT_APP_BASE_PATH_API }users/${ user._id }/unfollow/`,{ 
                  userId : currentUser._id 
                } );
                dispatch({ type: 'UNFOLLOW', payload: user._id });
            } else {
                await axios.put( `${ process.env.REACT_APP_BASE_PATH_API }users/${ user._id }/follow/`,{ 
                  userId : currentUser._id 
                } );
                dispatch({ type: 'FOLLOW', payload: user._id });
            }
  
            setFollower( !follower );
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
        <Topbar/>
        <div className="profile-page row">
            <Sidebar/>
            
            <div className="col-md-10">
                
                <div className="profile-right row">

                    <div className="col-md-12 profile-section">
                        <div className="userProfile">
                            <div className="coverPicture">
                                <img src={ user.coverPicture || `${PF}posts/posts1.webp` } alt="cover-photo" className="cover" />
                            </div>

                            <div className="profile-picture">
                                <img src={ user.profilePicture || `${PF}profiles/default.jpg` } alt="profile" className="userDP" />
                            </div>
                            
                            <div className="profileDetails">
                                <div>
                                    <h3 className="name">{ user.username }</h3>
                                    <p className="about">{ user.desc }</p>
                                </div>

                                <div className="mt-3 follow">
                                    <h3 className="count"><b>{ user.followers ? user.followers.length : '0' }</b> Followers</h3>
                                    <h3 className="count"><b>{ user.followings ? user.followings.length : '0' }</b> Following</h3>

                                    { user.username === currentUser.username 
                                        ? '' 
                                        : <button 
                                            className={ follower ? 'unfollow-btn' : 'follow-btn' } 
                                            onClick={ handleFollow }
                                        >
                                            { follower ? 'Unfollow' : 'Follow' }
                                        </button>
                                    }

                                </div>
                            </div>
                            { user.username === currentUser.username 
                                ? <Link to={ `/settings` }>
                                        <Tooltip title="Settings">
                                            <Settings className="settingsIcon"/>
                                        </Tooltip>
                                  </Link>
                                : ''
                            }
                        </div>
                    </div>

                    <div className="feed col-md-7">
                        <Feed username={ username }/>
                    </div>
                    <div className="rightBar col-md-5">

                        <Rightbar user={ user }/>
                        
                    </div>
                    
                </div>
            </div>
        </div>
            <Tooltip title="Back to Top">
                <div id="backToTop"><ExpandLessSharp className='icon'/></div>
            </Tooltip>
        </>
    )
}
