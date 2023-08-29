import Topbar from '../components/topbar'
import Sidebar from '../components/sidebar'
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { countries } from '../data';

export default function Settings() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user, dispatch } = useContext( AuthContext );
    // For logout
    const logout = () => {
        try {
            window.location.href = '/login';
            dispatch({ type: 'LOGOUT', payload: user });
        } catch (error) {
            console.log(error);
        }
    }
    // For update user
    const dob = useRef( 'dob' ), relation = useRef( 'relation' ), desc = useRef( 'desc' ), username = useRef( 'username' ), profile_pic = useRef( 'profile_pic' ), cover_pic = useRef( 'cover_pic' ), fname = useRef( 'fname' ), lname = useRef( 'lname' ), email = useRef( 'email' ), new_password = useRef( 'new_password' ), confirm_password = useRef( 'confirm_password' ), city = useRef( 'city' ), from = useRef( 'from' );

    const [profile_Pic, setProfile_pic] = useState( null );
    const [cover_Pic, setCover_pic] = useState( null );

    const post_profile = ( e_profile ) => {
        setProfile_pic( e_profile.target.files[0] );
    }

    const post_cover = ( e_cover ) => {
        setCover_pic( e_cover.target.files[0] );
    }

    const update = async( event )=>{
        event.preventDefault();

        const updated_data = {
            userId: user._id,
            firstname: fname.current.value,
            lastname: lname.current.value,
            username: username.current.value,
            email: email.current.value,
            dob: dob.current.value,
            desc : desc.current.value,
            city: city.current.value,
            from : from.current.value,
            sex : relation.current.value,
        }

        if ( profile_Pic ) {
            const data_1 = new FormData();
            const profile_Pic_file = Date.now() + profile_Pic.name;
            data_1.append( 'name', profile_Pic_file );
            data_1.append( 'file', profile_Pic );
            updated_data.profilePicture = profile_Pic_file;
            try {
                await axios.post( process.env.REACT_APP_BASE_PATH_API+'upload', data_1 );
            } catch (error) {
                console.log( error );   
            }
        }   

        if ( cover_Pic ) {
            const data_2 = new FormData();
            const cover_Pic_file = Date.now() + cover_Pic.name;
            data_2.append( 'name', cover_Pic_file );
            data_2.append( 'file', cover_Pic );
            updated_data.coverPicture = cover_Pic_file;
            try {
                await axios.post( process.env.REACT_APP_BASE_PATH_API+'upload', data_2 );
            } catch (error) {
                console.log( error );   
            }
        }   

        if ( confirm_password.current.value ) {
            if ( new_password.current.value !== confirm_password.current.value ) {
                confirm_password.current.setCustomValidity("Password don't match!");
            } else {
                try {
                    const updated_user = await axios.put( process.env.REACT_APP_BASE_PATH_API+'users/'+user._id, updated_data );
                    dispatch({ type: 'UPDATE', payload: updated_user});
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                }    
            }
        } else {
            try {
                const updated_user = await axios.put( process.env.REACT_APP_BASE_PATH_API+'users/'+user._id, updated_data );
                console.log(updated_user.data)
                dispatch({ type: 'UPDATE', payload: updated_user.data});
                window.location.reload();
            } catch (error) {
                console.log(error);
            }

        }
    }

    const changesize = ()=>{
        document.querySelector('#desc').addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = `${this.scrollHeight}px`;
        })
    }

    
    return (
        <>
            <Topbar/>
            <div className="settings-page row">
                <Sidebar/>

                <div className="settings col-md-10">
                    <div className="row align-items-baseline">
                        <div className="col-md-10">
                            <h2 className='title'>Settings</h2>
                        </div>
                        <div className="col">
                            <button className="logout">
                                <span onClick={ logout }>
                                    <LogoutIcon />Log out
                                </span>
                            </button>
                        </div>
                    </div>
                    

                    <form id='settings-form'>
                        <ul className="settings-list">

                            <li className="row mt-3 px-1">
                                <div className="mb-3 col-md-3 profile-picture d-flex flex-column align-items-center">
                                    <img 
                                        src={ profile_Pic
                                                ? URL.createObjectURL(profile_Pic)
                                                : user.profilePicture
                                                ? PF + user.profilePicture
                                                : `${PF}profiles/default.jpg` } 
                                        alt="profile-pic" 
                                    />
                                    <label htmlFor="profile-pic" className='btn'>Upload Profile Picture</label>
                                    <input 
                                        type="file" 
                                        className="form-control d-none" 
                                        id="profile-pic"
                                        ref={ profile_pic } 
                                        onChange={ post_profile }
                                        accept='.png,.jpg,.jpeg'
                                    />
                                </div>  
                                <div className="mb-3 col-md-9 cover-picture d-flex flex-column align-items-center">
                                    <img 
                                        src={ cover_Pic
                                                ? URL.createObjectURL( cover_Pic )
                                                : user.coverPicture 
                                                ? PF+user.coverPicture 
                                                : `${PF}posts/posts1.webp` } 
                                        alt="cover-pic" 
                                    />
                                    <label htmlFor="cover-pic" className='btn'>Upload Cover Picture</label>
                                    <input 
                                        type="file" 
                                        className="form-control d-none" 
                                        id="cover-pic"
                                        ref={ cover_pic } 
                                        onChange={ post_cover }
                                        accept='.png,.jpg,.jpeg'
                                    />
                                </div>  
                            </li>

                            <li className="row mt-3 px-1">
                                <div className="mb-3 col-md-12">
                                    <label htmlFor="desc" className="form-label">About :</label>
                                    <textarea 
                                        type="text" 
                                        autoComplete="off" 
                                        className="form-control" 
                                        defaultValue={ user.desc } 
                                        placeholder='Describe yourself....'
                                        id="desc" 
                                        ref={ desc }
                                        rows={ 3 }
                                        onChangeCapture={ changesize }
                                    />
                                </div> 
                            </li>

                            <li className="row mt-3 px-1">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="fname" className="form-label">First Name :</label>
                                    <input 
                                        type="text" 
                                        autoComplete="off" 
                                        className="form-control" 
                                        defaultValue={ user.firstname } 
                                        id="fname" 
                                        ref={ fname }
                                    />
                                </div>  
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="lname" className="form-label">Last Name :</label>
                                    <input 
                                        type="text" 
                                        autoComplete="off" 
                                        className="form-control" 
                                        defaultValue={ user.lastname } 
                                        id="lname" 
                                        ref={ lname }
                                    />
                                </div>  
                            </li>
                                                        
                            <li className="row mt-3 px-1">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="username" className="form-label">Username :</label>
                                    <input 
                                        type="text" 
                                        autoComplete="off" 
                                        className="form-control" 
                                        defaultValue={ user.username } 
                                        id="username" 
                                        ref={ username }
                                    />
                                </div>  
                                <div className='input-field col-md-6 mb-3'>
                                    <label htmlFor="email" className="form-label">Relationship status :</label>
                                    <select defaultValue={ user.sex } className="form-select form-select-md mb-3" ref={ relation }>
                                        <option value="0">Prefer Not to say</option>
                                        <option key='1' value='1'>Single</option>
                                        <option key='2' value='2'>Committed</option>
                                    </select>
                                </div>
                            </li>

                            <li className="row mt-3 px-1">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="email" className="form-label">Email :</label>
                                    <input 
                                        type="text" 
                                        autoComplete="off" 
                                        className="form-control" 
                                        defaultValue={ user.email } 
                                        id="email" 
                                        ref={ email }
                                    />
                                </div>  
                                <div className='input-field col-md-6 mb-3'>
                                    <label htmlFor="email" className="form-label">Date of Birth :</label>
                                    <input 
                                        type="date"
                                        className="registerDOB mb-3"
                                        placeholder='Date Of Birth'
                                        defaultValue={ user.dob }
                                        ref={ dob }
                                        required
                                    />
                                </div>
                            </li>

                            <li className="row mt-3 px-1">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="from" className="form-label">From :</label>
                                    <select defaultValue={ user.from && user.from  } className="form-select form-select-md mb-3" ref={ from } > 
                                        <option defaultValue="" disabled>Select a country</option>
                                        { countries.map((country) => (
                                            <option key={country.code} value={country.name}>{ country.name }</option>
                                        ))}
                                    </select>
                                </div>  
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="city" className="form-label">City :</label>
                                    <input 
                                        type="text" 
                                        autoComplete="off" 
                                        className="form-control" 
                                        defaultValue={ user.city ? user.city : '' } 
                                        id="city" 
                                        ref={ city }
                                        placeholder='Your city name'
                                    />
                                </div>  
                            </li>
                            
                            <li className="row mt-3 px-1">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="new_password" className="form-label">Password :</label>
                                    <input 
                                        type="password" 
                                        autoComplete="off" 
                                        className="form-control" 
                                        placeholder='•••••••••••••••' 
                                        id="new_password" 
                                        ref={ new_password }
                                    />
                                </div>  
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="confirm-password" className="form-label">Confirm Password :</label>
                                    <input 
                                        type="password" 
                                        autoComplete="off" 
                                        className="form-control" 
                                        placeholder='•••••••••••••••' 
                                        id="confirm-password"
                                        ref={ confirm_password }
                                    />
                                </div>  
                            </li>
                            
                        </ul>
                        <button type="submit" className='btn' onClick={ update }>Update & Save</button>
                    </form>

                </div>
            </div>

        </>
    )
}
