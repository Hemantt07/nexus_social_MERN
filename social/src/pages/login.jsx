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
            <div className="login-form">
                <input type="text" className="loginName" />
                <input type="mail" className="loginMail" />
                <button type="submit" className='loginButton'>Login</button>
            </div>
        </div>

    </div>
  )
}
