import { Send, LocalOffer, EmojiEmotions, LocationOn, PermMedia } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Share( user ) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // const [users, setUsers] = useState([]);
    // console.log(usera);
    // const fetchUsers = async () => {
    //   const res = axios.get('http://localhost:5000/users/?username='+ user.user)
    //    setUsers(res.data);
    // };

    // useEffect(()=>{
    //     fetchUsers();
    // }, [user]);

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop"> 

                    <div className="shareProfileImg">
                        <img src={ `${PF}images/profiles/default.jpg` } alt="profile" />
                    </div>
                    <input type="text" 
                        placeholder="What's in your mind Reshav?" 
                        className="shareInput" 
                    />

                </div>
                    <hr className="shareHr" />
                <div className="shareBottom row">

                    <div className="shareOptions col-md-10">

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

                    <button className="shareButton col-md-2">
                        <span>Share</span>
                        <Send className="icon"/>
                    </button>

                </div>
            </div>
        </div>
    )
}
