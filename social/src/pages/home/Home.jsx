import "./Home.css";
import Topbar from "../../components/TopBar/topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/Feed/feed";
import Rightbar from "../../components/Rightbar/rightbar";

export default function Home(){
    return (
        <>
        
        <Topbar/>

        <div className="homeContainer row">
            <Sidebar/>
            <Feed/> 
            <Rightbar/>
        </div>

        </>
    );
}
