import React from 'react'
import categoriesArray from './ArrayOfCategories'
import Categories1 from './Categories1'
import "./Categories.css"

const Categories = React.forwardRef((props, ref) => {
  return (
    <div className='container-of-categories' ref={ref}>
        <h1>Our Categories</h1>

        <div className="sub-container-of-categories">
            {categoriesArray.map((eachObject) => {
                return <Categories1 eachObject={eachObject} key={eachObject.paragraph} setShowSidebar={props.setShowSidebar} setShowLandingPage={props.setShowLandingPage}/>
            })}
        </div>
    </div>
  )
})

export default Categories;