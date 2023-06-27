import React, { useContext, useRef } from 'react'
import { loginCall } from '../apiCalls';
import { AuthContext } from '../context/AuthContext';
import { CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext( AuthContext );

    const handleClick = (e)=>{
        e.preventDefault();
        loginCall( { 
            email: email.current.value, 
            password: password.current.value 
        }, dispatch );
    }

    return (
        <div className='loginPage row'>

            <div className="col-md-6 login-left">
                <div>
                    <h4 className="title">Nexus Social</h4>
                    <p className="description">
                        Let's connect to the world with the help of <b>Nexus Social.</b>
                    </p>
                </div>
            </div>

            <div className="col-md-6 login-right">
                <form className="login-form row" onSubmit={ handleClick }>
                    <input 
                        type="email"
                        className="loginMail col-12 mb-3"
                        placeholder='Username or Email'
                        ref={ email }
                        required
                    />
                    <input 
                        type="password" 
                        className="loginPassword col-12 mb-3" 
                        placeholder='Password'
                        minLength={ 6 }
                        ref={ password } 
                        required
                    />

                    <button type="submit" className='loginButton mb-3' disabled ={ isFetching } >
                        { isFetching ? <CircularProgress /> : 'Login' }
                    </button>

                    <span className='forgotPass mb-3'>Forgot Password?</span>
                    <hr />

                    <div className="registerButton">
                        <Link to="/register">
                            { isFetching ? <CircularProgress /> : 'Create New Account' }
                        </Link>
                    </div>
                </form>

            </div>

        </div>
    )
}
