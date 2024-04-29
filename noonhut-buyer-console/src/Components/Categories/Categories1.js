import React from 'react'
import { Link } from 'react-router-dom'
import "./Categories1.css"

export default function Categories1({eachObject, setShowSidebar, setShowLandingPage}) {
  const openSidebar = () => {
    setShowSidebar(true);
    setShowLandingPage(false);
    document.body.style.overflow = "hidden";
  }
  
  return (
    <div className="category-box">
        <Link to={eachObject.to} onClick={openSidebar}>
            <img src={eachObject.image} alt=""/>
            <p>{eachObject.paragraph}</p>
        </Link>
    </div>
  )
}
