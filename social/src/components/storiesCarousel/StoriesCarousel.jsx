import Story from "../story/Story"
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  

export default function StoriesCarousel() {
    return (          
        <OwlCarousel items={4} className="owl-theme" dots margin={25} >  
                <Story/> <Story/> <Story/> <Story/> <Story/>
        </OwlCarousel> 
      )  
}
