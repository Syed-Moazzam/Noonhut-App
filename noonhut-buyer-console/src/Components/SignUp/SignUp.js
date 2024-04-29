import React, { useEffect, useRef, useState } from 'react'
import "./SignUp.css"
import { Link } from 'react-router-dom'
import { db } from '../../Firebase';
import { auth } from '../../Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function SignUp({showSidebar, setShowLogin, setShowSignUp, setLoggedInBuyer}) {
    let signUpRef = useRef();
    const signUpEmailRef = useRef();
    let signUpPasswordRef = useRef();

    const [icon, setIcon] = useState("fa-solid fa-eye-slash");
    const [type, setType] = useState("password");
    const [errorMsg1, setErrorMsg1] = useState("");
    const [errorMsg2, setErrorMsg2] = useState("");
    
    useEffect(() => {
        const closeSignUp = (e) => {
            if (signUpRef.current.contains(e.target) === false && showSidebar === false)
            {
                setShowSignUp(false);
                document.body.style.overflow = "scroll";
            }
            else if (signUpRef.current.contains(e.target) === false && showSidebar === true)
            {
                setShowSignUp(false);
                document.body.style.overflow = "hidden";
            }
        }
        document.body.addEventListener("mousedown", closeSignUp);

        return () => {
            document.body.removeEventListener("mousedown", closeSignUp);
        }
    });
    
    const closeSignUp1 = () => {
        if (showSidebar === true)
        {
            setShowSignUp(false);
            document.body.style.overflow = "hidden";
        }
        else
        {
            setShowSignUp(false);
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

    const createAccount = () => {
        createUserWithEmailAndPassword(auth, signUpEmailRef.current.value, signUpPasswordRef.current.value).then(async(cred) => {
            const buyerDoc = doc(db, "buyers_profile", cred.user.uid);
            await setDoc(buyerDoc, {EMAIL: signUpEmailRef.current.value, PASSWORD: signUpPasswordRef.current.value, TIME_CREATION: new Date(), ITEMS_IN_CART: 0});
            onAuthStateChanged(auth, (currentBuyer) => {
                setLoggedInBuyer(currentBuyer);
            });

            setErrorMsg1("");
            setErrorMsg2("");
            signUpEmailRef.current.style.boxShadow = "rgb(114 118 126) 0px 0px 0px 1px";
            signUpEmailRef.current.style.background = "white";
            signUpPasswordRef.current.style.boxShadow = "rgb(114 118 126) 0px 0px 0px 1px";
            signUpPasswordRef.current.style.background = "white";
            setShowSignUp(false);
            document.body.style.overflow = "scroll";
        }).catch((error) => {
            // for email
            if (error.code === "auth/missing-email")
            {
                const missingEmail = (error.code).toString();
                const showMsg = missingEmail.replace("auth/missing-email", "Enter a valid email address.");
                setErrorMsg1(showMsg);
                signUpEmailRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
                signUpEmailRef.current.style.background = "rgb(255, 246, 246)";
            }
            else if (error.code === "auth/email-already-in-use")
            {
                const unavailableEmail = (error.code).toString();
                const showMsg = unavailableEmail.replace("auth/email-already-in-use", "This email already has an account - login to continue.");
                setErrorMsg1(showMsg);
                signUpEmailRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
                signUpEmailRef.current.style.background = "rgb(255, 246, 246)";
            }
            else if (error.code === "auth/invalid-email")
            {
                const invalidEmail = (error.code).toString();
                const showMsg = invalidEmail.replace("auth/invalid-email", "Enter a valid email address.");
                setErrorMsg1(showMsg);
                signUpEmailRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
                signUpEmailRef.current.style.background = "rgb(255, 246, 246)";
            }
            else
            {
                setErrorMsg1("");
                signUpEmailRef.current.style.boxShadow = "rgb(114 118 126) 0px 0px 0px 1px";
                signUpEmailRef.current.style.background = "white";
            }

            // for password
            if (error.code === "auth/weak-password")
            {
                const weakPassword = (error.code).toString();
                const showMsg = weakPassword.replace("auth/weak-password", "Enter a password that is atleast 6 characters long.");
                setErrorMsg2(showMsg);
                signUpPasswordRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
                signUpPasswordRef.current.style.background = "rgb(255, 246, 246)";
            }
            else if (error.code === "auth/invalid-email")
            {
                if ((signUpPasswordRef.current.value).length < 6)
                {
                    const invalidEmailForPwd = (error.code).toString();
                    const showMsg = invalidEmailForPwd.replace("auth/invalid-email", "Enter a password that is atleast 6 characters long.");
                    setErrorMsg2(showMsg);
                    signUpPasswordRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
                    signUpPasswordRef.current.style.background = "rgb(255, 246, 246)";
                }
                else
                {
                    setErrorMsg2("");
                    signUpPasswordRef.current.style.boxShadow = "rgb(114 118 126) 0px 0px 0px 1px";
                    signUpPasswordRef.current.style.background = "white";
                }
            }
            else if (error.code === "auth/internal-error")
            {
                const internalError = (error.code).toString();
                const showMsg = internalError.replace("auth/internal-error", "Enter a password that is atleast 6 characters long.")
                setErrorMsg2(showMsg);
                signUpPasswordRef.current.style.boxShadow = "rgb(220 12 12) 0px 0px 0px 1px";
                signUpPasswordRef.current.style.background = "rgb(255, 246, 246)";
            }
            else 
            {
                setErrorMsg2("");
                signUpPasswordRef.current.style.boxShadow = "rgb(114 118 126) 0px 0px 0px 1px";
                signUpPasswordRef.current.style.background = "white";
            }
        })
    }

    const openLoginComponent = () => {
        setShowLogin(true);
        setShowSignUp(false);
    }

  return (
    <div className='container-of-sign-up-form'>
        <div className="sign-up-form" ref={signUpRef}>
            <button className="btn-for-close-sign-up-form" onClick={closeSignUp1}><i className="fa-solid fa-xmark"></i></button>
            <h1>Sign up</h1>
            <p id='enter-your-email-paragraph-sign-up'>Welcome to Instacart! Create an account to get started.</p>

            <div className="div-for-input-of-sign-up-form">
                <input type="email" placeholder='Email' ref={signUpEmailRef}/>
            </div>
            <p className='invalid-credential-of-sign-up'>{errorMsg1}</p>

            <div className="div-for-input-of-sign-up-form" id='password-input-of-sign-up-form'>
                <input type={type} placeholder='Password' ref={signUpPasswordRef}/>
                <i className={icon} onClick={changeIconAndType}></i>
            </div>
            <p className='invalid-credential-of-sign-up'>{errorMsg2}</p>
            <p id='agree-to-privacy-policy-paragraph-sign-up'>By continuing, you agree to our <Link to="">Terms of Service</Link> & <Link to="">Privacy Policy</Link></p>

            <div className="continue-btn-div">
                <button onClick={createAccount}>Continue</button>
            </div>

            <hr />
            <div className="already-have-an-account-div">
                <p>Already have an account?</p>
                <button onClick={openLoginComponent}>Log in</button>
            </div>
        </div>
    </div>
  )
}
