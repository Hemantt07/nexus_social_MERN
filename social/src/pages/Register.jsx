import { useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Register() {
    const fname = useRef(), lname = useRef(), email = useRef(), password = useRef(), confirmPassword = useRef(), dob = useRef();
    const { users, isFetching, error, dispatch } = useContext( AuthContext );
    const history = useNavigate();

    const handleClick = async(e)=>{
        e.preventDefault();
        if ( password.current.value !== confirmPassword.current.value ) {
            confirmPassword.current.setCustomValidity("Password don't match!");
        } else {
            const user = {
                username: fname.current.value+' '+lname.current.value,
                email: email.current.value,
                password: email.current.value,
                dob: dob.current.value
            }

            try {
                await axios.post( 'http://localhost:5000/auth/register', user );         
                history('/login');
            } catch (error) {
                // console.log(error);
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
                    <input 
                        type="text"
                        className="registerFirstName mb-3"
                        placeholder='First Name'
                        ref={fname}
                        required
                    />
                    <input 
                        type="text"
                        className="registerLastName mb-3"
                        placeholder='Last Name'
                        ref={lname}
                    />
                    <input 
                        type="date"
                        className="registerDOB mb-3"
                        placeholder='Date Of Birth'
                        ref={dob}
                        required
                    />
                    <input
                        type="email"
                        className="registerMail mb-3"
                        placeholder='Email'
                        ref={email}
                        required
                    />
                    <input 
                        type="password"
                        minLength='8'
                        className="registerPassword mb-3"
                        placeholder='Password'
                        ref={password}
                        required
                    />
                    <input 
                        type="password"
                        minLength='8'
                        className="registerPasswordConfirm mb-3"
                        placeholder='Confirm Password'
                        ref={confirmPassword}
                        required
                    />
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
