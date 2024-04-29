import React, { useState } from 'react';
import "./SignUp.css";
import { Link } from 'react-router-dom';
import noonHutLogo from '../Images/Noon Hut.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../Firebase';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = ({ setShowSellerConsole, setShowSignupComponent, setShowLoginComponent }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [storeName, setStoreName] = useState("");
    const [branchCity,  setBranchCity] = useState("");
    const [branchNumber, setBranchNumber] = useState("");
    const [sellerName, setSellerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

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

    const createAccount = () => {
        createUserWithEmailAndPassword(auth, email, password).then(async(result) => {
            const sellerDoc = doc(db, "sellers_profile", result.user.uid);
            await setDoc(sellerDoc, {
                EMAIL: email,
                PASSWORD: password,
                STORE_NAME: storeName,
                BRANCH_CITY: branchCity,
                BRANCH_NUMBER: branchNumber,
                PERSON_NAME: sellerName,
                PHONE_NUMBER: phoneNumber,
                TIME_ACC_CREATE: new Date()
            });
            setShowSellerConsole(true);
            setShowSignupComponent(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    const openLoginComponent = () => {
        setShowLoginComponent(true);
        setShowSignupComponent(false);
    }

    return (
        <div className='container-of-sign-up-form'>
            <div className="noonhut-name-at-top-of-signup">
                <img src={noonHutLogo} alt="" />
            </div>
            <div className="sign-up-form">
                <h1>Sign up</h1>
                <p id='enter-your-email-paragraph-sign-up'>Welcome to Instacart! Create an account to get started.</p>

                <div className="div-for-input-of-sign-up-form">
                    <input type="email" placeholder='Email' onChange={(e) => {setEmail(e.target.value + '.nhs')}} />
                </div>

                <div className="div-for-input-of-sign-up-form" id='password-input-of-sign-up-form'>
                    <input type={type} placeholder='Password' onChange={(e) => {setPassword(e.target.value)}} />
                    <i className={icon} onClick={toggleIconAndType}></i>
                </div>

                <div className="div-for-input-of-sign-up-form">
                    <input type="text" placeholder='Store Name' onChange={(e) => {setStoreName(e.target.value)}}/>
                </div>

                <div className="div-for-input-of-sign-up-form">
                    <input type="text" placeholder="Branch City (e.g. 'AJM' For Ajman)" onChange={(e) => {setBranchCity(e.target.value)}}/>
                </div>

                <div className="div-for-input-of-sign-up-form">
                    <input type="text" placeholder='Branch Number' onChange={(e) => {setBranchNumber(e.target.value)}}/>
                </div>

                <div className="div-for-input-of-sign-up-form">
                    <input type="text" placeholder='Your Full Name' onChange={(e) => {setSellerName(e.target.value)}} />
                </div>

                <div className="div-for-input-of-sign-up-form">
                    <input type="tel" placeholder='Phone Number' onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                </div>
                {/* <p className='invalid-credential-of-sign-up'>{errorMsg1}</p> */}

                {/* <p className='invalid-credential-of-sign-up'>{errorMsg2}</p> */}
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

export default SignUp;