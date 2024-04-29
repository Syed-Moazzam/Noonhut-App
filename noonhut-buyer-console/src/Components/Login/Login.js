import React, { useEffect, useRef, useState } from 'react'
import google from "../Images/google-icon.png"
import facebook from "../Images/facebook-icon.png"
import "./Login.css";
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';

export default function Login({showSidebar, setShowLogin, setShowSignUp, setShowResetPassword, setLoggedInBuyer}) {
    let loginRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();

    const [icon,setIcon] = useState("fa-solid fa-eye-slash");
    const [type, setType] = useState("password");

    const [loginErrorMsg1, setLoginErrorMsg1] = useState("");
    const [loginErrorMsg2, setLoginErrorMsg2] = useState("");

    useEffect(() => {
        const closeLogin = (e) => {
            if (loginRef.current.contains(e.target) === false && showSidebar === false)
            {
                setShowLogin(false);
                document.body.style.overflow = "scroll";
            }
            else if (loginRef.current.contains(e.target) === false && showSidebar === true) {
                setShowLogin(false);
                document.body.style.overflow = "hidden";
            }
        }
        document.body.addEventListener("mousedown", closeLogin);

        return () => {
            document.body.removeEventListener("mousedown", closeLogin);
        }
    });

    const closeLogin1 = () => {
        if (showSidebar === true)
        {
            setShowLogin(false);
            document.body.style.overflow = "hidden";
        }
        else
        {
            setShowLogin(false);
            document.body.style.overflow = "scroll";
        }
    }
    
    const changeIconAndType = () => {
        if (type === "password" && icon === "fa-solid fa-eye-slash"){
            setIcon("fa-solid fa-eye");
            setType("text");
        }
        else{
            setIcon("fa-solid fa-eye-slash");
            setType("password");
        }
    }

    const LoginToAccount = async () => {
        try 
        {
            await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            onAuthStateChanged(auth, (currentBuyer) => {
                setLoggedInBuyer(currentBuyer);
            });
            setShowLogin(false);
            setLoginErrorMsg1("");
            setLoginErrorMsg2("");
            emailRef.current.style.boxShadow = "rgb(114 118 126) 0px 0px 0px 1px";
            emailRef.current.style.background = "white";
            passwordRef.current.style.boxShadow = "rgb(114 118 126) 0px 0px 0px 1px";
            passwordRef.current.style.background = "white";
            document.body.style.overflow = "scroll";
        }
        catch (error)
        {
            // for email
            if (error.code === "auth/user-not-found")
            {
                const unavailableEmail = (error.code).toString();
                const showMsg = unavailableEmail.replace("auth/user-not-found", "No account exists with this email address.");
                setLoginErrorMsg1(showMsg);
                emailRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
                emailRef.current.style.background = "rgb(255, 246, 246)";
            }
            else if (error.code === "auth/invalid-email")
            {
                const invalidEmail = (error.code).toString();
                const showMsg = invalidEmail.replace("auth/invalid-email", "Enter a valid email address.");
                setLoginErrorMsg1(showMsg);
                emailRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
                emailRef.current.style.background = "rgb(255, 246, 246)";
            }
            else
            {
                setLoginErrorMsg1("");
                emailRef.current.style.boxShadow = "rgb(114 118 126) 0px 0px 0px 1px";
                emailRef.current.style.background = "white";
            }

            // for password
            if (error.code === "auth/wrong-password")
            {
                const wrongPassword = (error.code).toString();
                const showMsg = wrongPassword.replace("auth/wrong-password", "Enter a valid password.");
                setLoginErrorMsg2(showMsg);
                passwordRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
                passwordRef.current.style.background = "rgb(255, 246, 246)";
            }
            else if (error.code === "auth/invalid-email")
            {
                if ((passwordRef.current.value).length < 6)
                {
                    const invalidEmailForPwd = (error.code).toString();
                    const showMsg = invalidEmailForPwd.replace("auth/invalid-email", "Enter a valid password.");
                    setLoginErrorMsg2(showMsg);
                    passwordRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
                    passwordRef.current.style.background = "rgb(255, 246, 246)";
                }
                else
                {
                    setLoginErrorMsg2("");
                    passwordRef.current.style.boxShadow = "rgb(114 118 126) 0px 0px 0px 1px";
                    passwordRef.current.style.background = "white";
                }
            }
            else if (error.code === "auth/internal-error")
            {
                const internalError = (error.code).toString();
                const showMsg = internalError.replace("auth/internal-error", "Enter a valid password.")
                setLoginErrorMsg2(showMsg);
                passwordRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
                passwordRef.current.style.background = "rgb(255, 246, 246)";
            }
            else if (error.code === "auth/too-many-requests")
            {
                const tooManyRequests = (error.code).toString();
                const showMsg = tooManyRequests.replace("auth/too-many-requests", "Too many requests have been received for this email address. Please try again later.");
                setLoginErrorMsg2(showMsg);
                passwordRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
                passwordRef.current.style.background = "rgb(255, 246, 246)";
            }
            else
            {
                setLoginErrorMsg2("");
                passwordRef.current.style.boxShadow = "rgb(114 118 126) 0px 0px 0px 1px";
                passwordRef.current.style.background = "white";
            }
        }
    }

    const openSignUpComponent = () => {
        setShowSignUp(true);
        setShowLogin(false);
    }

    const openResetPasswordComponent = () => {
        setShowResetPassword(true);
        setShowLogin(false);
    }

  return (
    <div className='container-of-login-form'>
        <div className="login-form" ref={loginRef}>
            <button className="btn-for-close-login-form" onClick={closeLogin1}><i className="fa-solid fa-xmark"></i></button>
            <h1>Log in</h1>

            <div className="div-for-inputs-of-login-form">
                <input type="text" placeholder='Email' ref={emailRef}/>
            </div>
            <p className='invalid-credentials-of-login'>{loginErrorMsg1}</p>

            <div className="div-for-inputs-of-login-form">
                <input type={type} placeholder='Password' ref={passwordRef}/>
                <i className={icon} onClick={changeIconAndType}></i>
            </div>
            <p className='invalid-credentials-of-login'>{loginErrorMsg2}</p>

            <div className="forgot-password-div">
                <span>Forgot Password?</span>
                <button onClick={openResetPasswordComponent}>Reset it</button>
            </div>

            <div className="login-btn-div">
                <button onClick={LoginToAccount}>Log in</button>
            </div>

            <div style={{textAlign: "center"}}>or</div>

            <div className="container-for-login-with-google-or-facebook">
                <button>
                    <img src={google} alt=""/>
                    <p>Continue with Google</p>
                </button>

                <button>
                    <img src={facebook} alt=""/>
                    <p>Continue with Facebook</p>
                </button>
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
