import Story from "./story"
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import 'reactjs-popup/dist/index.css';
import { signal } from "@preact/signals";
import axios from 'axios';


export default function StoriesCarousel() {
    const { user } = useContext( AuthContext );
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const story_img = useRef(null);
    const story = signal(null);
    const [stories, setStories] = useState(null);
    const postStory = async (e) => {
        story.value = await e.target.files[0];
        const storyData = {
            'userId' : user._id,
        }
        if ( story.value ) {
            const data = new FormData();
            const fileName = Date.now() + story.value.name;
            
            data.append('name', fileName);
            data.append('file', story.value);
            storyData.storyImg = fileName;
            try {
                await axios.post(process.env.REACT_APP_BASE_PATH_API + 'upload', data);
            } catch (error) {
                console.log(error);
            }

            try {
                await axios.post( process.env.REACT_APP_BASE_PATH_API+'stories/', storyData )
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(()=>{
        const fetchStories = async ()=>{
            try {
                const res = await axios.get( process.env.REACT_APP_BASE_PATH_API+'stories/all/' )
                setStories(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchStories()
    },[stories])

    return (   
      <>
        <div className='story user'> 
            <div className="storyImg">
                <img src={ user.profilePicture ? PF+user.profilePicture : `${PF}profiles/default.jpg` } alt="profile" />
            </div>
            <label className="content"  htmlFor={ `story-img` }>
                <AddIcon className="profileImg"/>
                <span className="userName">Add to your Story </span>
            </label>
            <input type="file" name="story-img" id="story-img" ref={ story_img } onChange={ postStory } />
        </div>
        <OwlCarousel items={4} className="owl-theme" dots margin={35} >

          { stories ? stories.map((stori)=>(

            <Story key={stori._id} story={stori}/>

            )) : '' }

        </OwlCarousel> 
      </>       
      )  
}
