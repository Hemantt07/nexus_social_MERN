import Story from "./story"
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  

export default function StoriesCarousel() {
    return (          
        <OwlCarousel items={4} className="owl-theme" dots margin={35} >  
                <Story/> <Story/> <Story/> <Story/> <Story/>
        </OwlCarousel> 
      )  
}
