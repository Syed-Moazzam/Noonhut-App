import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage';
import Checkout from './Components/Checkout/Checkout';
import './App.css';

function App() {
  const [meatCategory, setMeatCategory] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<LandingPage meatCategory={meatCategory} setMeatCategory={setMeatCategory} />} />
        <Route path='/checkout' element={<Checkout setMeatCategory={setMeatCategory} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
