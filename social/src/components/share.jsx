import { Send, LocalOffer, EmojiEmotions, LocationOn, PermMedia } from '@mui/icons-material';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext( AuthContext );
    const content = useRef();
    const [file, setFile] = useState( null );
    const postPhoto = (e)=>{
        setFile(e.target.files[0]);
        console.log(file)
    } 

    const formHandler = async (e)=>{
        e.preventDefault();
        const newPost = {
            userId : user._id,
            desc : content.current.value,
        }
        if ( file ) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append( 'name', fileName );
            data.append( 'file', file );
            newPost.img = fileName;
            try {
                await axios.post( 'http://localhost:5000/upload', data );
            } catch (error) {
                console.log( error );   
            }
        }        

        try {
            await axios.post( 'http://localhost:5000/posts/', newPost )
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="share">
            <form className="shareWrapper"  onSubmit={ formHandler }>
                <div className="shareTop"> 

                    <div className="shareProfileImg">
                        <img src={ user.profilePicture || `${PF}profiles/default.jpg` } alt="profile" />
                    </div>
                    <input type="text" 
                        placeholder={ `What's in your mind ${ user.username }?` } 
                        className="shareInput"
                        ref={ content }
                        required
                    />

                </div>
                { file 
                    ? 
                    <div className="postImg">
                        <img src="" alt="" />
                    </div>
                    : '' 
                }
                    <hr className="shareHr" />
                <div className="shareBottom row" >

                    <div className="shareOptions col-md-10">

                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor="#6CA6CD" className="icon" />
                            <span className="text">Video or Photo</span>
                            <input 
                                type="file"
                                name="file"
                                id="file"
                                accept='.png,.jpg,.jpeg'
                                onChange={ postPhoto }
                            />
                        </label>
                        
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

                    <button className="shareButton col-md-2" type='submit'>
                        <span>Share</span>
                        <Send className="icon"/>
                    </button>

                </div>
            </form>
        </div>
    )
}
