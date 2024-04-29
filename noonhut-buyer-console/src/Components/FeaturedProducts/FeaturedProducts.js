import React from 'react'
import featuredArray from './ArrayOfFeatured'
import FeaturedProducts1 from './FeaturedProducts1'
import "./FeaturedProducts.css"

export default function FeaturedProducts() {
  return (
    <div className='container-of-featured-products'>
      <div className="headings-of-featured">
        <h4>Featured Products</h4>
        <h1>Our Products</h1>
      </div>

      <div className="products-container">
        {featuredArray.map((eachObject) => {
          return <FeaturedProducts1 eachObject={eachObject} key={eachObject.heading} />
        })}
      </div>
    </div>
  )
}
