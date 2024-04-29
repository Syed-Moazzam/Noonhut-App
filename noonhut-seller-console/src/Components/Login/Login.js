import React, { useState } from 'react';
import './Login.css';
import noonHutLogo from '../Images/Noon Hut.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase';

const Login = ({ setShowSellerConsole, setShowLoginComponent, setShowSignupComponent, setShowResetPassword }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [type, setType] = useState("password");
    const [icon, setIcon] = useState("fa-solid fa-eye-slash");

    const toggleIconAndType = () => {
        if (type === "password" && icon === "fa-solid fa-eye-slash")
        {
            setType("text");
            setIcon("fa-solid fa-eye");
        }
        else
        {
            setType("password");
            setIcon("fa-solid fa-eye-slash");
        }
    }

    const openSignUpComponent = () => {
        setShowSignupComponent(true);
        setShowLoginComponent(false);
    }

    const openResetPasswordComponent = () => {
        setShowResetPassword(true);
        setShowLoginComponent(false);
    }

    const loginToAccount = async () => {
        try
        {
            await signInWithEmailAndPassword(auth, email, password);
            setShowSellerConsole(true);
            setShowLoginComponent(false);
        }
        catch (error)
        {
            console.log(error);
        }
    }

    return (
        <div className='container-of-login-form'>
            <div className="noonhut-name-at-top-of-login">
                <img src={noonHutLogo} alt="" />
            </div>
            <div className="login-form">
                <h1>Log in</h1>

                <div className="div-for-inputs-of-login-form">
                    <input type="text" placeholder='Email' onChange={(e) => {setEmail(e.target.value + '.nhs')}}/>
                </div>
                {/* <p className='invalid-credentials-of-login'>{loginErrorMsg1}</p> */}

                <div className="div-for-inputs-of-login-form">
                    <input type={type} placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}/>
                    <i className={icon} onClick={toggleIconAndType}></i>
                </div>
                {/* <p className='invalid-credentials-of-login'>{loginErrorMsg2}</p> */}

                <div className="forgot-password-div">
                    <span>Forgot Password?</span>
                    <button onClick={openResetPasswordComponent}>Reset it</button>
                </div>

                <div className="login-btn-div">
                    <button onClick={loginToAccount}>Log in</button>
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

export default Login;