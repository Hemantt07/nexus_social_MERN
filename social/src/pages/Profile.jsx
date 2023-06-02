import { Tooltip } from "@mui/material";
import Feed from "../components/feed";
import Rightbar from "../components/rightbar";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { ExpandLessSharp, Settings } from "@mui/icons-material";

export default function Profile() {
  return (
    <>
        
    <Topbar/>

    <div className="profile-page row">
        <Sidebar/>
        
        <div className="col-md-10">
            
            <div className="profile-right row">

                <div className="col-md-12 profile-section">
                    <div className="userProfile">
                        <img src="assets/images/posts/post8.jpeg" alt="cover-photo" className="cover" />
                        <img src="assets/images/profiles/profile.png" alt="profile" className="userDP" />
                        <h3 className="name">Reshav Dhiman</h3>
                        <Tooltip title="Settings">
                            <Settings className="settingsIcon"/>
                        </Tooltip>
                    </div>
                    
                </div>

                <div className="feed col-md-7">
                    <Feed/>
                </div>
                <div className="rightBar col-md-5">
                    <Rightbar/>
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
