import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainSellerConsole from './Components/MainSellerConsole/MainSellerConsole';
import SellerDashboard from './Components/SellerDashboard/SellerDashboard';
import SalesAndOrder from './Components/SalesAndOrder/SalesAndOrder';
import Popular from './Components/Popular/Popular';
import MyStore from './Components/MyStore/MyStore';
import SellerWallet from './Components/SellerWallet/SellerWallet';
import SellerProfile from './Components/SellerProfile/SellerProfile';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import ResetPassword from './Components/Login/ResetPassword';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';

function App() {
  const [showSellerConsole, setShowSellerConsole] = useState(false);
  const [showLoginComponent, setShowLoginComponent] = useState(true);
  const [showSignupComponent, setShowSignupComponent] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [loggedInSeller, setLoggedInSeller] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentSeller) => {
      setLoggedInSeller(currentSeller);
    });

    if (loggedInSeller)
    {
      setShowSellerConsole(true);
      setShowLoginComponent(false);
    }
    else
    {
      setShowLoginComponent(true);
      setShowSellerConsole(false);
    }
  }, [loggedInSeller]);

  return (
    <BrowserRouter>
      {showLoginComponent && <Login setShowSellerConsole={setShowSellerConsole} setShowLoginComponent={setShowLoginComponent} setShowResetPassword={setShowResetPassword} setShowSignupComponent={setShowSignupComponent} />}

      {showResetPassword && <ResetPassword setShowLoginComponent={setShowLoginComponent} setShowSignupComponent={setShowSignupComponent} setShowResetPassword={setShowResetPassword} />}
      
      {showSignupComponent && <SignUp setShowSellerConsole={setShowSellerConsole} setShowSignupComponent={setShowSignupComponent} setShowLoginComponent={setShowLoginComponent} />}

      {showSellerConsole && 
        <MainSellerConsole>
          <Routes>
            <Route path="/" element={<SellerDashboard />} />
            <Route path="/seller-console/sales-and-order" element={<SalesAndOrder />} />
            <Route path="/seller-console/popular" element={<Popular />} />
            <Route path="/seller-console/my-store" element={<MyStore />} />
            <Route path="/seller-console/seller-wallet" element={<SellerWallet />} />
            <Route path="/seller-console/seller-profile" element={<SellerProfile />} />
          </Routes>
        </MainSellerConsole>
      }
    </BrowserRouter>
  );
}

export default App;
