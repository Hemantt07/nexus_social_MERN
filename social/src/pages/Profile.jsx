import { Tooltip } from "@mui/material";
import Feed from "../components/feed";
import Rightbar from "../components/rightbar";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Settings } from "@mui/icons-material";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
    const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;
    const username  = useParams().username;
    const [user, setUser] = useState([]);
    const [dpublic_folderull, setDpublic_folderull] = useState(false);
    const { user : currentUser, dispatch } = useContext( AuthContext);
    const [followed, setFollowed] = useState( 
        currentUser.followings.includes( user._id )
    );

    if ( !followed ) {
        var follower = currentUser.followers.includes( user._id );
    }

    console.log(follower)

    useEffect(()=>{
        setFollowed( currentUser.followings.includes( user._id ) );
    }, [currentUser, user._id])
    
    useEffect(()=>{
        const fetchUser = async () => {
            const res = username === currentUser.username
            ? await axios.get(process.env.REACT_APP_BASE_PATH_API+'users/?userId='+ currentUser._id  )
            : await axios.get(process.env.REACT_APP_BASE_PATH_API+'users/?username='+username);
            setUser(res.data);
        };
        fetchUser();
    }, [ username, currentUser ]);

    const handleFollow = async () => {
        try {
            if ( followed ) {
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
  
            setFollowed( !followed );
        } catch (error) {
            toast.error(error.response.data);
        }
    }

    const openDp = async ()=>{
        setDpublic_folderull(!dpublic_folderull);
        if ( document.body.style.overflow === 'hidden' ) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
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
                                <img 
                                    src={ user.coverPicture ? public_folder+user.coverPicture : `${public_folder}posts/posts1.webp` } 
                                    alt="cover-pic" 
                                    className="cover" 
                                />
                            </div>

                            <div className="profile-picture">
                                <img 
                                    src={ user.profilePicture  ? public_folder+user.profilePicture : `${public_folder}profiles/default.jpg` } 
                                    alt="profile-pic" 
                                    className="userDP" 
                                    onClick={ openDp }
                                />
                                <div className={`full-screen ${dpublic_folderull ? 'open' : ''}`}  onClick={ openDp }>
                                    <img 
                                        src={ user.profilePicture  ? public_folder+user.profilePicture : `${public_folder}profiles/default.jpg` } 
                                        alt="profile-pic" 
                                        className="userDP" 
                                    />  
                                </div>
                            </div>
                            
                            <div className="profileDetails">
                                <div>
                                    <h3 className="name">{ user.firstname+" "+user.lastname }</h3>
                                    <p className="about">{ user.desc }</p>
                                </div>

                                <div className="mt-3 follow">
                                    <h3 className="count"><b>{ user.followers ? user.followers.length : '0' }</b> Followers</h3>
                                    <h3 className="count"><b>{ user.followings ? user.followings.length : '0' }</b> Following</h3>

                                    { user.username === currentUser.username 
                                        ? '' 
                                        : <button 
                                            className={ followed ? 'unfollow-btn' : 'follow-btn' } 
                                            onClick={ handleFollow }
                                        >
                                            { 
                                                followed
                                                ? 'Unfollow'
                                                : follower
                                                  ? 'Follow back'
                                                  : 'Follow'
                                            }
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
        </>
    )
}
