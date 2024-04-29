import React from 'react';
import "./ResetPassword.css";
import noonHutLogo from '../Images/Noon Hut.png';

const ResetPassword = ({ setShowLoginComponent, setShowSignupComponent, setShowResetPassword }) => {
    const backToLogin = () => {
        setShowLoginComponent(true);
        setShowResetPassword(false);
    }

    const openSignUpComponent = () => {
        setShowSignupComponent(true);
        setShowResetPassword(false);
    }

    return (
        <div className="reset-password-container">
            <div className="noonhut-name-at-top-of-reset-password">
                <img src={noonHutLogo} alt="" />
            </div>
            <div className="reset-password-form">
                <button className="go-back-btn-of-reset" onClick={backToLogin}><i className="fa-solid fa-arrow-left"></i></button>
                <h1>Forgot Password?</h1>
                <p>We&apos;ll send you a link to reset your password.</p>
                <div className="div-for-input-of-reset-password">
                    <input type="text" placeholder='Email' />
                </div>
                {/* <p className='invalid-credential-of-reset-password' ref={resetPasswordInvalidEmail}>Enter a valid email address.</p> */}
                <p className='invalid-credential-of-reset-password'>Enter a valid email address.</p>

                <div className="reset-password-btn-div">
                    {/* <button onClick={openInboxComponent}>Reset password</button> */}
                    <button>Reset password</button>
                </div>
                <hr />
                <div className="dont-have-an-account-div">
                    <p>Don&apos;t have an account?</p>
                    <button onClick={openSignUpComponent}>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;