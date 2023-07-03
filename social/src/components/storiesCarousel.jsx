import Story from "./story"
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import { Stories } from "../post-data";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function StoriesCarousel() {
  const { user } = useContext( AuthContext );
    return (   
      <>
        <OwlCarousel items={4} className="owl-theme" dots margin={35} >
            {/* <div>
                <h4>Popup - GeeksforGeeks</h4>
                <Popup trigger=
                    {<button> Click to open popup </button>}
                    position="right center">
                    <ul className="moreList">
                      <li>Edit</li>
                      <li>Delete </li>
                    </ul>
                </Popup>
            </div> */}
          <div className='story user'>
              <div className="storyImg">
                  <img src={ user.profilePicture} alt="profile" />
              </div>
              <div className="content">
                  <AddIcon className="profileImg" />
                  <span className="userName">Add to your Story</span>
              </div>
          </div>

          { Stories.map((s)=>(
            <Story key={s.id} story={s}/>
            )) }

        </OwlCarousel> 
      </>       
      )  
}
