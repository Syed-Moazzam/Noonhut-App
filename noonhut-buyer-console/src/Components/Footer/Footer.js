import React from 'react'
import "./Footer.css"
import instacartCarrot from "../Images/instacart-carrot.png"
import geant from "../Images/geant.jpg"
import lulu from "../Images/lulu.jpg"
import nesto from "../Images/nesto.png"
import safari from "../Images/safari.png"
import sharjah from "../Images/sharjah-coop.png"
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
        <div className="company-logos">
            <div><img src={nesto} alt=""/></div>
            <div><img src={geant} alt=""/></div>
            <div><img src={lulu} alt=""/></div>
            <div><img src={safari} alt=""/></div>
            <div><img src={sharjah} alt=""/></div>
        </div>

        {/* Affiliate Section */}
        <div className="container-for-affiliate-section">
            <div className="become-affiliate-div">
                <div id='first-div-of-become-affiliate'>
                    <img src={instacartCarrot} alt=""/>
                    <h5>Become An Affiliate</h5>
                </div>

                <div id='div-for-ios-android-icons'>
                    <Link>
                        <i className="fa-brands fa-apple"></i>
                        <span>iOS</span>
                    </Link>

                    <Link>
                        <i className="fa-brands fa-google-play"></i>
                        <span>Android</span>
                    </Link>
                </div>
            </div>

            <div className="make-money-with-us-div">
                <h5>Make Money With Us</h5>
                <p><Link>Shopper Oppurtunities</Link></p>
                <p><Link>Become a Shopper</Link></p>
                <p><Link>In-Store Employee For Instacart</Link></p>
                <p><Link>Earnings</Link></p>
            </div>

            <div className="top-cities-div">
                <h5>Top Cities</h5>
                <p>Sharjah</p>
                <p>Ajman</p>
                <p>Umm ul Quwain</p>
                <p>Ras al Khaimah</p>
            </div>

            <div className="more-cities-div">
                <h5>More Cities</h5>
                <p>Sharjah</p>
                <p>Ajman</p>
                <p>Umm ul Quwain</p>
                <p>Ras al Khaimah</p>
            </div>

            <div className="shopper-help-div">
                <h5>Shopper Help</h5>
                <p><Link>Help</Link></p>
                <p><Link>Contact</Link></p>
                <p><Link>Safety</Link></p>
            </div>
        </div>

        {/* Shopper Section */}
        <div className="container-for-shopper-section">
            <div className="become-shopper-div">
                <div id='first-div-of-become-shopper'>
                    <img src={instacartCarrot} alt=""/>
                    <h5>Become A Shopper</h5>
                </div>

                <div id='div-for-ios-android-icons'>
                    <Link>
                        <i className="fa-brands fa-apple"></i>
                        <span>iOS</span>
                    </Link>

                    <Link>
                        <i className="fa-brands fa-google-play"></i>
                        <span>Android</span>
                    </Link>
                </div>
            </div>

            <div className="make-money-with-us-div">
                <h5>Make Money With Us</h5>
                <p><Link>Shopper Oppurtunities</Link></p>
                <p><Link>Become a Shopper</Link></p>
                <p><Link>In-Store Employee For Instacart</Link></p>
                <p><Link>Earnings</Link></p>
            </div>

            <div className="top-cities-div">
                <h5>Top Cities</h5>
                <p>Sharjah</p>
                <p>Ajman</p>
                <p>Umm ul Quwain</p>
                <p>Ras al Khaimah</p>
            </div>

            <div className="more-cities-div">
                <h5>More Cities</h5>
                <p>Sharjah</p>
                <p>Ajman</p>
                <p>Umm ul Quwain</p>
                <p>Ras al Khaimah</p>
            </div>

            <div className="shopper-help-div">
                <h5>Shopper Help</h5>
                <p><Link>Help</Link></p>
                <p><Link>Contact</Link></p>
                <p><Link>Safety</Link></p>
            </div>
        </div>

        {/* Rider Section */}
        <div className="container-for-rider-section">
            <div className="become-rider-div">
                <div id='first-div-of-become-rider'>
                    <img src={instacartCarrot} alt=""/>
                    <h5>Become A Rider</h5>
                </div>

                <div id='div-for-ios-android-icons'>
                    <Link>
                        <i className="fa-brands fa-apple"></i>
                        <span>iOS</span>
                    </Link>

                    <Link>
                        <i className="fa-brands fa-google-play"></i>
                        <span>Android</span>
                    </Link>
                </div>
            </div>

            <div className="make-money-with-us-div">
                <h5>Make Money With Us</h5>
                <p><Link>Shopper Oppurtunities</Link></p>
                <p><Link>Become a Shopper</Link></p>
                <p><Link>In-Store Employee For Instacart</Link></p>
                <p><Link>Earnings</Link></p>
            </div>

            <div className="top-cities-div">
                <h5>Top Cities</h5>
                <p>Sharjah</p>
                <p>Ajman</p>
                <p>Umm ul Quwain</p>
                <p>Ras al Khaimah</p>
            </div>

            <div className="more-cities-div">
                <h5>More Cities</h5>
                <p>Sharjah</p>
                <p>Ajman</p>
                <p>Umm ul Quwain</p>
                <p>Ras al Khaimah</p>
            </div>

            <div className="shopper-help-div">
                <h5>Shopper Help</h5>
                <p><Link>Help</Link></p>
                <p><Link>Contact</Link></p>
                <p><Link>Safety</Link></p>
            </div>
        </div>

        <div className='footer'>
            <div className="legal">
                <p>Legal</p>
            </div>

            <div className="terms-of-use">
                <p>Terms Of Use</p>
                <p>Privacy Policy</p>
            </div>

            <div className="social-media-icons">
                <Link to="//www.facebook.com/Instacart" target="_blank"><i className="fa-brands fa-facebook"></i></Link>
                <Link to="//www.twitter.com/instacart" target="_blank"><i className="fa-brands fa-twitter"></i></Link>
                <Link to="//www.intagram.com/instacart" target="_blank"><i className="fa-brands fa-instagram"></i></Link>
                <Link to="//www.pinterest.com/instacart" target="_blank"><i className="fa-brands fa-pinterest"></i></Link>
            </div>
        </div>
    </div>
  )
}
