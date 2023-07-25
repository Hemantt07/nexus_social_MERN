import Topbar from '../components/topbar'
import Sidebar from '../components/sidebar'
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import CountaryDropdown from '../components/countary-dropdown';

export default function Settings() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user, dispatch } = useContext( AuthContext );
    const logout = () => {
        try {
            window.location.href = '/login';
            dispatch({ type: 'LOGOUT', payload: user });
        } catch (error) {
            console.log(error);
        }
    }
    const [selectedCountry, setSelectedCountry] = useState('');
    const handleCountryChange = (country) => {
        setSelectedCountry(country);
    };

    const dob = useRef( 'dob' );
    return (
        <>
            <Topbar/>
            <div className="settings-page row">
                <Sidebar/>

                <div className="settings col-md-10">
                    <h2 className='title'>Settings</h2>

                    <form id='settings-form'>
                        <ul className="settings-list">

                            <li className="row mt-3 px-1">
                                <div className="mb-3 col-md-3 profile-picture d-flex flex-column align-items-center">
                                    <img 
                                        src={ user.profilePicture  ? PF+user.profilePicture : `${PF}profiles/default.jpg` } 
                                        alt="profile-picture" 
                                    />
                                    <label htmlFor="profile-pic" className='btn'>Upload Profile Picture</label>
                                    <input type="file" className="form-control d-none"id="profile-pic" />
                                </div>  
                                <div className="mb-3 col-md-9 cover-picture d-flex flex-column align-items-center">
                                    <img 
                                        src={ user.coverPicture ? PF+user.coverPicture : `${PF}posts/posts1.webp` } 
                                        alt="cover-picture" 
                                    />
                                    <label htmlFor="cover-pic" className='btn'>Upload Cover Picture</label>
                                    <input type="file" className="form-control d-none"id="cover-pic" />
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
                                    />
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
                                    />
                                </div>  
                                <div className='input-field col-md-6 mb-3'>
                                    <label htmlFor="email" className="form-label">Date of Birth :</label>
                                    <input 
                                        type="date"
                                        className="registerDOB mb-3"
                                        placeholder='Date Of Birth'
                                        ref={ dob }
                                        required
                                    />
                                </div>
                            </li>

                            <li className="row mt-3 px-1">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="from" className="form-label">From :</label>
                                    <CountaryDropdown onChange={handleCountryChange} />

                                </div>  
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="city" className="form-label">City :</label>
                                    <input 
                                        type="text" 
                                        autoComplete="off" 
                                        className="form-control" 
                                        defaultValue={ user.city ? user.city : '' } 
                                        id="city" 
                                    />
                                </div>  
                            </li>
                            
                            <li className="row mt-3 px-1">
                                <div className="mb-3 col-md-6">
                                    <label htmlFor="password" className="form-label">Password :</label>
                                    <input 
                                        type="password" 
                                        autoComplete="off" 
                                        className="form-control" 
                                        placeholder='•••••••••••••••' 
                                        id="password" 
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
                                    />
                                </div>  
                            </li>
                            
                        </ul>
                        <button type="submit" className='btn'>Save</button>
                    </form>

                    <button className="logout">
                        <span onClick={ logout }>
                            <LogoutIcon />Log out
                        </span>
                    </button>
                </div>
            </div>

        </>
    )
}
