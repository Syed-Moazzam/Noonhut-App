import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import DealOfTheDay from '../DealOfTheDay/DealOfTheDay'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import Footer from '../Footer/Footer'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import SportsEvent from '../SportsEvent/SportsEvent'
import Testimony from '../Testimony/Testimony'
import Sidebar from '../Sidebar/Sidebar';
import Meat from '../Meat/Meat';
import Fish from '../Fish/Fish';
import Poultry from '../Poultry/Poultry';
import FruitsAndVegetables from '../FruitsAndVegetables/FruitsAndVegetables';
import Dairy from '../Dairy/Dairy';
import Bakery from '../Bakery/Bakery';
import Spices from '../Spices/Spices';
import DriedFruits from '../DriedFruits/DriedFruits';
import MyBasketOrders from '../MyBasketOrders/MyBasketOrders';
import BuyersProfile from '../BuyersProfile/BuyersProfile';
import BuyersWallet from '../BuyersWallet/BuyersWallet';

export default function LandingPage({ meatCategory, setMeatCategory }) {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Navbar setShowLandingPage={setShowLandingPage} setShowSidebar={setShowSidebar} showSidebar={showSidebar} meatCategory={meatCategory} setMeatCategory={setMeatCategory} />
      {showLandingPage && <div>
        <Home setShowLandingPage={setShowLandingPage} setShowSidebar={setShowSidebar} />
        <FeaturedProducts />
        <DealOfTheDay />
        <SportsEvent />
        <Testimony />
        <Footer />
      </div>}

      {
        showSidebar &&
        <Sidebar>
          <Routes>
            <Route path="/" element={<Meat meatCategory={meatCategory} setMeatCategory={setMeatCategory} />} />
            <Route path='/stores/fish' element={<Fish />} />
            <Route path='/stores/poultry' element={<Poultry />} />
            <Route path='/stores/fruits-and-vegetables' element={<FruitsAndVegetables />} />
            <Route path='/stores/dairy' element={<Dairy />} />
            <Route path='/stores/bakery' element={<Bakery />} />
            <Route path='/stores/spices' element={<Spices />} />
            <Route path='/stores/dried-fruits' element={<DriedFruits />} />
            <Route path='/my-basket-orders' element={<MyBasketOrders />} />
            <Route path='/buyers-profile' element={<BuyersProfile />} />
            <Route path='/buyers-wallet' element={<BuyersWallet />} />
          </Routes>
        </Sidebar>
      }
    </>
  )
}
