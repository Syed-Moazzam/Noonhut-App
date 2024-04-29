import React from 'react';
import "./Testimony.css";
import rating1 from "../Images/pic-1.png";
import rating2 from "../Images/pic-2.png";
import rating3 from "../Images/pic-3.png";
import { Link } from 'react-router-dom';

export default function Reviews() {
  return (
    <div id="review-section">
        <div className="review-headings">
            <h4>Testimony</h4>
            <h1>Our Satisfied Customers Say</h1>
        </div>

        <div className="sub-container-of-review">
            <div className="box-of-review">
                <div className="img-and-rating-review">
                    <img src={rating1} alt=""/>
                    <div className="name-and-rating-of-review">
                        <h2>John Deo</h2>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star-half-stroke"></i>
                    </div>
                    <i className="fa-solid fa-quote-right"></i>
                </div>

                <div className="content-of-review">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, aut provident laudantium consequuntur tempora adipisci in iure repellendus a molestias voluptas, autem dolore ea labore magnam est sequi.</p>
                </div>
            </div>

            <div className="box-of-review">
                <div className="img-and-rating-review">
                    <img src={rating2} alt=""/>
                    <div className="name-and-rating-of-review">
                        <h2 id="angelina-jolie">Erica David</h2>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star-half-stroke"></i>
                    </div>
                    <i className="fa-solid fa-quote-right"></i>
                </div>

                <div className="content-of-review">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, aut provident laudantium consequuntur tempora adipisci in iure repellendus a molestias voluptas, autem dolore ea labore magnam est sequi.</p>
                </div>
            </div>

            <div className="box-of-review">
                <div className="img-and-rating-review">
                    <img src={rating3} alt=""/>
                    <div className="name-and-rating-of-review">
                        <h2>Will Smith</h2>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star-half-stroke"></i>
                    </div>
                    <i className="fa-solid fa-quote-right"></i>
                </div>

                <div className="content-of-review">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, aut provident laudantium consequuntur tempora adipisci in iure repellendus a molestias voluptas, autem dolore ea labore magnam est sequi.</p>
                </div>
            </div>
        </div>

        <div className="div-for-become-a-seller-btn">
            <Link to="//www.instacart.com" target="_blank">BECOME A SELLER</Link>
        </div>
    </div>
  )
}
