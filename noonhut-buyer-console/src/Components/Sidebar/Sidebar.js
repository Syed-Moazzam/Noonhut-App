import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../Firebase';
import noonHut from '../Images/Noon Hut.png';
import "./Sidebar.css";

export default function Sidebar({ children }) {
  let location = useLocation();
  let visible_links_of_stores_sidebar = useRef();
  let hidden_links_of_stores_sidebar = useRef();

  const [loggedInBuyer, setLoggedInBuyer] = useState();

  const toggleLinksOfSidebar = () => {
    visible_links_of_stores_sidebar.current.style.display = "none";
    hidden_links_of_stores_sidebar.current.style.display = "block";
  }

  const goBackToStores = () => {
    visible_links_of_stores_sidebar.current.style.display = "block";
    hidden_links_of_stores_sidebar.current.style.display = "none";
  }

  const Logout = async () => {
    await signOut(auth);
    window.location.reload();
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentBuyer) => {
      setLoggedInBuyer(currentBuyer);
    });
  });

  return (
    <div className='container-of-sidebar'>
      <div className="sidebar">
        <h5 id='buyers-email-address'>{loggedInBuyer ? loggedInBuyer.email : ""}</h5>
        <div className="logo">
          <img src={noonHut} alt="" id='noonhut-name-image-of-sidebar' />
        </div>

        <div id={loggedInBuyer ? "links-of-sidebar" : ""} className="links-of-sidebar" ref={visible_links_of_stores_sidebar}>
          <div className="store-div">
            <Link onClick={toggleLinksOfSidebar}>
              <i className="fa-solid fa-house icons-of-sidebar"></i>
              <span className='span-of-sidebar-links'>Stores</span>
            </Link>
          </div>

          {loggedInBuyer ?
            <>
              <div className="my-basket">
                <Link to="/my-basket-orders" className={location.pathname === "/my-basket-orders" ? "active" : ""}>
                  <i className="fa-solid fa-basket-shopping icons-of-sidebar"></i>
                  <span className='span-of-sidebar-links'>My Basket Orders</span>
                </Link>
              </div>

              <div className="buyers-profile">
                <Link to="/buyers-profile" className={location.pathname === "/buyers-profile" ? "active" : ""}>
                  <i className="fa-solid fa-user icons-of-sidebar"></i>
                  <span className='span-of-sidebar-links'>My Profile</span>
                </Link>
              </div>

              <div className="buyers-wallet">
                <Link to="/buyers-wallet" className={location.pathname === "/buyers-wallet" ? "active" : ""}>
                  <i className="fa-solid fa-wallet icons-of-sidebar"></i>
                  <span className='span-of-sidebar-links'>My Wallet</span>
                </Link>
              </div>

              <div className="sign-out-div-of-sidebar">
                <button onClick={Logout}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>Sign-out</span>
                </button>
              </div>
            </> : ""
          }
        </div>

        <div className="hidden-links-of-stores-sidebar" ref={hidden_links_of_stores_sidebar}>
          <div className="go-back-icon-of-sidebar-links"><i onClick={goBackToStores} className="fa-solid fa-arrow-left"></i></div>
          <div className="meat-div">
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              <i className="fa-solid fa-drumstick-bite icons-of-sidebar"></i>
              <span className='span-of-sidebar-links'>Meat</span>
            </Link>
          </div>

          <div className="fish-div">
            <Link to="/stores/fish" className={location.pathname === "/stores/fish" ? "active" : ""}>
              <i className="fa-solid fa-fish icons-of-sidebar"></i>
              <span className='span-of-sidebar-links'>Fish</span>
            </Link>
          </div>

          <div className="poultry-div">
            <Link to="/stores/poultry" className={location.pathname === "/stores/poultry" ? "active" : ""}>
              <i className="fa-solid fa-egg icons-of-sidebar"></i>
              <span className='span-of-sidebar-links'>Poultry</span>
            </Link>
          </div>

          <div className="fruits-and-vegetable-div">
            <Link to="/stores/fruits-and-vegetables" className={location.pathname === "/stores/fruits-and-vegetables" ? "active" : ""}>
              <i className="fa-solid fa-carrot icons-of-sidebar"></i>
              <span className='span-of-sidebar-links'>Fruits & Vegetables</span>
            </Link>
          </div>

          <div className="dairy-div">
            <Link to="/stores/dairy" className={location.pathname === "/stores/dairy" ? "active" : ""}>
              <i className="fa-solid fa-cow icons-of-sidebar"></i>
              <span className='span-of-sidebar-links'>Dairy</span>
            </Link>
          </div>

          <div className="bakery-div">
            <Link to="/stores/bakery" className={location.pathname === "/stores/bakery" ? "active" : ""}>
              <i className="fa-solid fa-bread-slice icons-of-sidebar"></i>
              <span className='span-of-sidebar-links'>Bakery</span>
            </Link>
          </div>

          <div className="spices-div">
            <Link to="/stores/spices" className={location.pathname === "/stores/spices" ? "active" : ""}>
              <i className="fa-solid fa-pepper-hot icons-of-sidebar"></i>
              <span className='span-of-sidebar-links'>Spices</span>
            </Link>
          </div>

          <div className="dried-fruits-div">
            <Link to="/stores/dried-fruits" className={location.pathname === "/stores/dried-fruits" ? "active" : ""}>
              <i className="fa-sharp fa-solid fa-apple-whole icons-of-sidebar"></i>
              <span className='span-of-sidebar-links'>Dried Fruits</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="right-side-content" id={location.pathname === "/buyers-wallet" ? "right-side-content" : ""}>
        {children}
      </div>
    </div>
  )
}
