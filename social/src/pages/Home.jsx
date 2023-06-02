import { ExpandLessSharp } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";
import Feed from "../components/feed";
import Rightbar from "../components/rightbar";

export default function Home(){
    return (
        <>
        
        <Topbar/>

        <div className="homeContainer row">
            <Sidebar/>
            <div className="feed col-md-6">
                <Feed/>
            </div>
            <div className="rightBar col-md-4">
                <Rightbar/>
            </div>
        
        </div>
            <Tooltip title="Back to Top">
                <div id="backToTop"><ExpandLessSharp className='icon'/></div>
            </Tooltip>
        </>
    );
}
