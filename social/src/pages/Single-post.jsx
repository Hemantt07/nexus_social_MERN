import { useParams } from "react-router";
import Post from "../components/post";
import { useEffect, useState } from "react";
import axios from "axios";
import Topbar from "../components/topbar";
import Sidebar from "../components/sidebar";

export default function SinglePost() {
    const postId = useParams().postId;
    const [ post, setPost ] = useState();
    
    useEffect(()=>{ 
        const fetchPost = async () =>{
            try {
                const post_1 = await axios.get(`${ process.env.REACT_APP_BASE_PATH_API }posts/${ postId }`);
                console.log(post_1)
                setPost( post_1.data );
            } catch (error) {
                console.log( error )
            }
        }
        console.log('Use')  
        fetchPost();
    }, [postId]);

    return (
        <>
            <Topbar />
            <div className="row">
                <Sidebar />
                <div className="col-md-6">
                    { post ? <Post post={ post }/> :'' }
                </div>
            </div>
        </>
    )
}
