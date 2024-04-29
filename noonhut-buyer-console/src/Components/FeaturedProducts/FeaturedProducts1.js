import React from 'react'
import "./FeaturedProducts1.css"

export default function FeaturedProducts1({eachObject}) {
  return (
    <div className="featured-products-box">
        <img src={eachObject.image} alt=""/>
        <h5>{eachObject.heading}</h5>
        <p>{eachObject.paragraph}</p>
        <div className="add-to-cart-hidden-div">
          <button><i className="fa-solid fa-cart-shopping"></i></button>
          <button><i className="fa-solid fa-heart"></i></button>
        </div>
    </div>
  )
}
