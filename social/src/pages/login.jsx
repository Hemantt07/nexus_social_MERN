import React from 'react'

export default function Login() {
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
            <div className="login-form row">
                <input type="text" className="loginMail col-12 mb-3" placeholder='Username or Email' />
                <input type="mail" className="loginPassword col-12 mb-3" placeholder='Password' />
                <button type="submit" className='loginButton mb-3'>Login</button>
                <span className='forgotPass mb-3'>Forgot Password?</span>
                <hr />
                <button className="registerButton">
                    Create New Account
                </button>
            </div>
        </div>

    </div>
  )
}
