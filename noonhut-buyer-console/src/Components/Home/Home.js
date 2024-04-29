import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import pic1 from '../Images/bg_1.jpg'
import pic2 from '../Images/bg_2.jpg'
import pic3 from "../Images/shipped.png"
import pic4 from "../Images/vegetable.png"
import pic5 from "../Images/badge.png"
import pic6 from "../Images/customer-service.png"
import Categories from '../Categories/Categories'
import "./Home.css"

export default function Home({setShowLandingPage, setShowSidebar}) {
    const scrollRef = useRef();

    const scrollToCategories = () => {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    return (
        <>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active div-of-home" data-bs-interval="3000">
                        <div className="overlay"></div>
                        <img src={pic1} className="img-of-home" alt="" />
                        <div className='text-of-home-div1'>
                            <h1>We serve Fresh Vegetables &amp; Fruits</h1>
                            <h2>We deliver organic vegetables &amp; fruits</h2>
                            <p className='view-details-btn-of-home'><Link to="" onClick={scrollToCategories}>View Details</Link></p>
                        </div>
                    </div>
                    <div className="carousel-item div-of-home" data-bs-interval="3000">
                        <div className="overlay"></div>
                        <img src={pic2} className="img-of-home" alt="" />
                        <div className='text-of-home-div2'>
                            <h1>100% Fresh &amp; Organic Foods</h1>
                            <h2>We deliver organic vegetables &amp; fruits</h2>
                            <p className='view-details-btn-of-home'><Link to="" onClick={scrollToCategories}>View Details</Link></p>
                        </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <i className="fa-solid fa-angle-left left-right-icons"></i>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <i className="fa-solid fa-angle-right left-right-icons"></i>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="services-section">
                <div className="services-box">
                    <span id='span-1'><img src={pic3} alt="" /></span>
                    <h3 className="heading">FREE SHIPPING</h3>
                    <p>ON ORDER OVER $100</p>
                </div>
            
                <div className="services-box">
                    <span id='span-2'><img src={pic4} alt="" /></span>
                    <h3 className="heading">ALWAYS FRESH</h3>
                    <p>PRODUCT WELL PACKAGE</p>
                </div>

                <div className="services-box">
                    <span id='span-3'><img src={pic5} alt="" /></span>
                    <h3 className="heading">SUPERIOR QUALITY</h3>
                    <p>QUALITY PRODUCTS</p>
                </div>

                <div className="services-box">
                    <span id='span-4'><img src={pic6} alt="" /></span>
                    <h3 className="heading">SUPPORT</h3>
                    <p>24/7 SUPPORT</p>
                </div>
            </div>
            <Categories setShowLandingPage={setShowLandingPage} setShowSidebar={setShowSidebar} ref={scrollRef}/>
        </>
    )
}
