import { Tooltip } from "@mui/material";
import Feed from "../components/feed";
import Rightbar from "../components/rightbar";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { ExpandLessSharp, Settings } from "@mui/icons-material";
import { useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username  = useParams().username;
    const [user, setUser] = useState([]);
    const currentUser = useContext( AuthContext);

    useEffect(()=>{
        const fetchUser = async () => {
          const res = username == currentUser.user.username 
            ? await axios.get('http://localhost:5000/users/?username='+ currentUser.user.username  )
            : await axios.get('http://localhost:5000/users/?username='+username);
          setUser(res.data);
        };
      fetchUser();
    }, []);

    return (
        <>
        <Topbar/>
        <div className="profile-page row">
            <Sidebar/>
            
            <div className="col-md-10">
                
                <div className="profile-right row">

                    <div className="col-md-12 profile-section">
                        <div className="userProfile">
                            <img src={ user.coverPicture || `${PF}images/posts/posts1.webp` } alt="cover-photo" className="cover" />
                            <img src={ user.profilePicture || `${PF}images/profiles/default.jpg` } alt="profile" className="userDP" />
                            
                            <div className="profileDetails">
                                <div>
                                    <h3 className="name">{ user.username }</h3>
                                    <p className="about">{ user.desc }</p>
                                </div>
                                <div className="follow">
                                    <h3 className="count"> { user.followers ? user.followers.length : '0' } </h3>
                                    <p>Followers</p>
                                </div>
                                <div className="follow">
                                    <h3 className="count"> { user.followings ? user.followings.length : '0' } </h3>
                                    <p>Followings</p>
                                </div>

                                { username == currentUser.user.username 
                                    ? '' 
                                    : <button className="follow-btn">Follow</button>
                                }
                                
                            </div>
                            <Tooltip title="Settings">
                                <Settings className="settingsIcon"/>
                            </Tooltip>
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
