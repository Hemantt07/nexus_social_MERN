import { useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from 'axios';

export default function Register() {
    const fname = useRef(), lname = useRef(), email = useRef(), password = useRef(), confirmPassword = useRef(), dob = useRef();
    const history = useNavigate();
    const [ show, setShow ] = useState( false );
    const hide_show_password = async()=>{
        setShow( !show );
    }
    
    const handleClick = async( event )=>{
        event.preventDefault();
        if ( password.current.value !== confirmPassword.current.value ) {
            confirmPassword.current.setCustomValidity("Password don't match!");
        } else {
            const user = {
                firstname: fname.current.value,
                lastname: lname.current.value,
                username: ((fname.current.value+' '+lname.current.value).trim()).toLowerCase()+Math.random(),
                email: email.current.value,
                password: password.current.value,
                dob: dob.current.value
            }

            try {
                await axios.post( process.env.REACT_APP_BASE_PATH_API+'auth/register', user );         
                history('/login');
            } catch (error) {
                console.log(error);
            }

        }
    }

    return (
        <div className='registerPage row'>

            <div className="col-md-6 login-left">
                <div>
                    <h4 className="title">Nexus Social</h4>
                    <p className="description">
                        Let's connect to the world with the help of <b>Nexus Social.</b>
                    </p>
                </div>
            </div>

            <div className="col-md-6 login-right">
                <form className="login-form row" onSubmit={handleClick}>
                    <div className='input-field'>
                        <input 
                            type="text"
                            className="registerFirstName mb-3"
                            placeholder='First Name'
                            ref={fname}
                            required
                        />
                    </div>
                    <div className='input-field'>
                        <input 
                            type="text"
                            className="registerLastName mb-3"
                            placeholder='Last Name'
                            ref={lname}
                        />
                    </div>
                    <div className='input-field'>
                        <input 
                            type="date"
                            className="registerDOB mb-3"
                            placeholder='Date Of Birth'
                            ref={dob}
                            required
                        />
                    </div>
                    <div className='input-field'>
                        <input
                            type="email"
                            className="registerMail mb-3"
                            placeholder='Email'
                            ref={email}
                            required
                        />
                    </div>
                    <div className='input-field'>
                        <input 
                            type= 'password'
                            minLength='8'
                            className="registerPassword mb-3"
                            placeholder='Password'
                            ref= { password }
                            required
                        />
                    </div>
                    <div className='input-field'>
                        <input 
                            type={ show ? 'text' : 'password' }
                            minLength='8'
                            className="registerPasswordConfirm mb-3"
                            placeholder='Confirm Password'
                            ref={confirmPassword}
                            required
                        />
                        <RemoveRedEyeIcon className='eyebutton' onClick={ hide_show_password } />
                    </div>
                    <button type="submit" className='registerButton mb-3'>
                        Sign Up
                    </button>
                    <span className='forgotPass mb-3'>Forgot Password?</span>
                    <hr />
                    <div className="registerButton">
                        <Link to="/login">
                                Allready have an Account? Login
                        </Link>
                    </div>
                </form>
            </div>

        </div>
    )
}
