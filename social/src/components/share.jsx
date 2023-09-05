import { Send, LocalOffer, LocationOn, PermMedia } from '@mui/icons-material';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Close } from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext( AuthContext );
    const content = useRef();
    const [file, setFile] = useState( null );
    const [error, setError] = useState( true );
    const postPhoto = (e)=>{
        setFile(e.target.files[0]);
    }
    useEffect( ()=>{
        if ( file ) {
            setError( false )
        }
    },[file] )

    const onTextChange = (e) => {
        e.target.value !== '' || file ? setError( false ) : setError( true )
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
                await axios.post( process.env.REACT_APP_BASE_PATH_API+'upload', data );
            } catch (error) {
                console.log( error );
            }
        }        
        
        if ( content.current.value !== '' || file ) {
            try {
                await axios.post( process.env.REACT_APP_BASE_PATH_API+'posts/', newPost )
                window.location.reload();
            } catch (error) {
                toast.error(error.response.data);
            }
        }

    }
    
    const changesize = ()=>{
        document.querySelector('#share-content').addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = `${this.scrollHeight}px`;
        })
    }

    return (
        <div className="share">
            <form className="shareWrapper"  onSubmit={ formHandler }>
                <div className="shareTop"> 

                    <div className="shareProfileImg">
                        <img src={ user.profilePicture ? PF + user.profilePicture : `${PF}profiles/default.jpg` } alt="profile" />
                    </div>
                    <textarea type="text" 
                        placeholder={ `What's in your mind ${ user.firstname+" "+user.lastname }?`} 
                        className="shareInput"
                        ref={ content }
                        onChange={ onTextChange }
                        rows={ 1 }
                        id="share-content"
                        onChangeCapture={ changesize }
                    />

                </div>
                <hr className="shareHr" />
                { file 
                    ? 
                    <div className="postImg">
                        <img src={ URL.createObjectURL( file ) } alt="" />
                        <Close className="closeIcon" onClick={ ()=> setFile(null) }/>
                    </div>
                    : '' 
                }
                <div className="shareBottom row" >

                    <div className="shareOptions col-md-10">

                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor="#6CA6CD" className="icon" />
                            <span className="text">Photo</span>
                            <input 
                                type="file"
                                name="file"
                                id="file"
                                accept='.jpeg, .gif, .png, .apng, .svg, .bmp, .bmp, .png , .webp'
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
                        
                    </div>

                    <button 
                        className="shareButton col-md-2" 
                        type='submit'
                        disabled={ error }
                    >
                        <span>Share</span>
                        <Send className="icon"/>
                    </button>

                </div>
            </form>
        </div>
    )
}
