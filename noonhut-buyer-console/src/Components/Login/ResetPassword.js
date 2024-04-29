import React, { useEffect, useRef } from 'react'
import "./ResetPassword.css"

export default function ResetPassword({showSidebar, setShowResetPassword, setShowSignUp, setShowLogin}) {
    let resetPwdRef = useRef();
    let resetPasswordEmailRef = useRef();
    let resetPasswordInvalidEmail = useRef();
    let regexEmailCheck = /^[a-zA-Z_0-9]{3,20}@gmail.com$/;

    useEffect(() => {
        const closeResetPassword = (e) => {
            if (resetPwdRef.current.contains(e.target) === false && showSidebar === false)
            {
                setShowResetPassword(false);
                document.body.style.overflow = "scroll";
            }
            else if (resetPwdRef.current.contains(e.target) === false && showSidebar === true)
            {
                setShowResetPassword(false);
                document.body.style.overflow = "hidden";
            }
        }
        document.body.addEventListener("mousedown", closeResetPassword);

        return () => {
            document.body.removeEventListener("mousedown", closeResetPassword);
        }
    });

    const backToLogin = () => {
        setShowLogin(true);
        setShowResetPassword(false);
    }

    const openInboxComponent = () => {
        if (regexEmailCheck.test(resetPasswordEmailRef.current.value)){
            resetPasswordInvalidEmail.current.style.display = "none";
            resetPasswordEmailRef.current.style.boxShadow = "rgb(114 118 126) 0px 0px 0px 1px";
            resetPasswordEmailRef.current.style.background = "white";
        }
        else{
            resetPasswordInvalidEmail.current.style.display = "block";
            resetPasswordEmailRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
            resetPasswordEmailRef.current.style.background = "rgb(255, 246, 246)";
        }
    }

    const openSignUpComponent = () => {
        setShowSignUp(true);
        setShowResetPassword(false);
    }
    
  return (
    <div className="reset-password-container">
        <div className="reset-password-form" ref={resetPwdRef}>
            <button className="go-back-btn-of-reset" onClick={backToLogin}><i className="fa-solid fa-arrow-left"></i></button>
            <h1>Forgot Password?</h1>
            <p>We&apos;ll send you a link to reset your password.</p>
            <div className="div-for-input-of-reset-password">
                <input type="text" placeholder='Email' ref={resetPasswordEmailRef}/>
            </div>
            <p className='invalid-credential-of-reset-password' ref={resetPasswordInvalidEmail}>Enter a valid email address.</p>

            <div className="reset-password-btn-div">
                <button onClick={openInboxComponent}>Reset password</button>
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
