import React from 'react'

export default function Register() {
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
            <div className="login-form row">
                <input type="text" className="registerFirstName mb-3" placeholder='First Name' />
                <input type="text" className="registerLastName mb-3" placeholder='Last Name' />
                <input type="date" className="registerDOB mb-3" placeholder='Date Of Birth' />
                <input type="text" className="registerMail mb-3" placeholder='Email' />
                <input type="mail" className="registerPassword mb-3" placeholder='Password' />
                <input type="mail" className="registerPasswordConfirm mb-3" placeholder='Confirm Password' />
                <button type="submit" className='registerButton mb-3'>Sign Up</button>
                <span className='forgotPass mb-3'>Forgot Password?</span>
                <hr />
                <button className="registerButton">
                    Allready have an Account? Login
                </button>
            </div>
        </div>

    </div>
  )
}
