import { Send, LocalOffer, EmojiEmotions, LocationOn, PermMedia } from '@mui/icons-material';

export default function Share() {
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop"> 

                <div className="shareProfileImg">
                    <img src="assets/images/profiles/profile.png" alt="" />
                </div>
                <input type="text" 
                    placeholder="What's in your mind Reshav ?" 
                    className="shareInput" 
                />

            </div>
                <hr className="shareHr" />
            <div className="shareBottom">

                <div className="shareOptions">

                    <div className="shareOption">
                        <PermMedia htmlColor="#6CA6CD" className="icon" />
                        <span className="text">Video or Photo</span>
                    </div>
                    
                    <div className="shareOption">
                        <LocalOffer htmlColor="#dc3545" className="icon" />
                        <span className="text">Tags</span>
                    </div>
                    
                    <div className="shareOption">
                        <LocationOn htmlColor="#0d6efd" className="icon" />
                        <span className="text">Location</span>
                    </div>
                    
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="#ffc107" className="icon" />
                        <span className="text">Feelings</span>
                    </div>
                    
                </div>

                <button className="shareButton">
                    <span>Share</span>
                    <Send className="icon"/>
                </button>

            </div>
        </div>
    </div>
  )
}
