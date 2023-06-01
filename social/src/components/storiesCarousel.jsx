import Story from "./story"
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import { Stories } from "../post-data";

export default function StoriesCarousel() {
    return (          
        <OwlCarousel items={4} className="owl-theme" dots margin={35} > 

          { Stories.map((s)=>(
            <Story key={s.id} story={s}/>
          )) }

        </OwlCarousel> 
      )  
}
