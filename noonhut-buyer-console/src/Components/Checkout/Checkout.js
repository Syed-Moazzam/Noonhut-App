import React, { useState, useEffect, useRef } from 'react';
import "./Checkout.css";
import noonhutLogo from "../Images/Noon Hut.png";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NearMeIcon from '@mui/icons-material/NearMe';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Checkout = ({ setMeatCategory }) => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [loggedInBuyer, setLoggedInBuyer] = useState();
  const [xCoord, setXCoord] = useState(0);
  const [yCoord, setYCoord] = useState(0);
  const [shiftedArray, setShiftedArray] = useState([]);
  const buyerCoordinates = useRef(null);

  let priceSlicing = 0, totalAmount = 0;
  let slicingForStripe = useRef({
    slicedPrice: ""
  });

  let totalAmountForStripe = useRef({
    finalPrice: 0
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentBuyer) => {
      setLoggedInBuyer(currentBuyer);
    });

    const fetchCartProducts = async () => {
      const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
      const getBuyerData = await getDoc(buyerProfileRef);
      const buyerEmail = getBuyerData.data().EMAIL;
      const buyerName = buyerEmail.slice(0, buyerEmail.indexOf("@"));

      const buyersCartCollection = collection(db, `${buyerName + "_cart_" + loggedInBuyer.uid}`);
      const data = await getDocs(buyersCartCollection);
      setCartProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    if (loggedInBuyer) {
      fetchCartProducts();
    }

    const calculatePriceForStripe = () => {
      cartProducts.map((product) => {
        return (
          <>
            <div style={{ display: "none" }}>{slicingForStripe.current.slicedPrice = (product.PRICE).slice(1)}</div>
            <div style={{ display: "none" }}>{totalAmountForStripe.current.finalPrice += Number(slicingForStripe.current.slicedPrice)}</div>
          </>
        )
      })
    }

    calculatePriceForStripe();

    const shiftCartProducts = async () => {
      // extracting buyer's name from email address
      const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
      const getBuyerData = await getDoc(buyerProfileRef);
      const buyerEmail = getBuyerData.data().EMAIL;
      const buyerName = buyerEmail.slice(0, buyerEmail.indexOf("@"));

      const buyerCartRef = collection(db, `${buyerName + "_cart_" + loggedInBuyer.uid}`);
      const data = await getDocs(buyerCartRef);
      setShiftedArray(data.docs.map((doc) => (doc.data())));
    }

    if (loggedInBuyer) {
      shiftCartProducts();
    }
  }, [loggedInBuyer, cartProducts.length]);

  const getLocation = (e) => {
    e.preventDefault();
    buyerCoordinates.current.style.display = "block";

    navigator.geolocation.getCurrentPosition((position) => {
      setXCoord(position.coords.latitude);
      setYCoord(position.coords.longitude);
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  }

  const makePayment = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: totalAmountForStripe.current.finalPrice * 100,
          token
        })
      });

      if (response.status === 200) {
        swal("Congratulations!", "Your payment was successful!", "success");
        navigate("/");

        // reference to buyer's profile to access buyer's name
        const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
        const getBuyerData = await getDoc(buyerProfileRef);
        const buyerEmail = getBuyerData.data().EMAIL;
        const buyerName = buyerEmail.slice(0, buyerEmail.indexOf("@"));

        const salesAndOrdersDoc = doc(db, "sales_and_orders_seller_console", `${buyerName + "_buyer"}`);
        await setDoc(salesAndOrdersDoc, {
          ORDER_ID: (buyerName + "_cart_" + loggedInBuyer.uid),
          TIME_BASKET_PREP: new Date(),
          CART_SALES_AMOUNT: ("$" + totalAmountForStripe.current.finalPrice),
          TOTAL_ITEMS_IN_CART: (cartProducts.length),
          CUSTOMER_NAME: buyerName,
          STATUS_OF_BASKET: ("preparing").toLowerCase()
        });

        const newBuyerCart = collection(db, `${buyerName + "_orders"}`);
        shiftedArray.map(async (newItem) => {
          return (
            <div style={{ display: "none" }}>{await addDoc(newBuyerCart, newItem)}</div>
          )
        });

        let oldItemRef = "";
        cartProducts.map(async (oldItem) => {
          return (
            <>
              <div style={{ display: "none" }}>{oldItemRef = doc(db, `${buyerName + "_cart_" + loggedInBuyer.uid}`, oldItem.id)}</div>
              <div style={{ display: "none" }}>{await deleteDoc(oldItemRef)}</div>
            </>
          )
        })

        await updateDoc(buyerProfileRef, {
          ITEMS_IN_CART: 0
        });

        setMeatCategory(0);
      }
    } catch (error) {
      console.log(error);
      swal("Sorry!", "Your payment was not successful!", "error");
    }
  }

  return (
    <>
      {console.log(shiftedArray)}
      <div className='header-of-checkout'>
        <Link to="/"><img src={noonhutLogo} alt="" /></Link>
      </div>
      <div className="container-of-body-checkout">
        <form className="left-form-of-body-checkout" onSubmit={handleFormSubmit}>
          <div>
            <label className='labels-of-checkout'>
              <LocationOnIcon className="icons-of-checkout" />
              <span>Add Delivery Address</span>
            </label>
            <div className='div-for-current-location'>
              <button id='current-location-btn' onClick={(e) => getLocation(e)}>
                <NearMeIcon />
                <span>Use Current Location</span>
              </button>
              <span ref={buyerCoordinates} id="span-for-buyer-coordinates">Coordinates: {xCoord}, {yCoord}</span>
            </div>
          </div>
          <hr />

          <div>
            <label htmlFor="street" className='labels-of-checkout'>
              <AddRoadIcon className="icons-of-checkout" />
              <span>Street Address</span>
            </label>
            <input type="text" id='street' placeholder='233 E Airport Rd' className='inputs-of-checkout' />
          </div>
          <hr />

          <div>
            <label htmlFor="apt" className='labels-of-checkout'>
              <HomeIcon className="icons-of-checkout" />
              <span>Apt, Floor, Suite etc.</span>
            </label>
            <input type="text" id='apt' className='inputs-of-checkout' />
          </div>
          <hr />

          <div>
            <label htmlFor="phone" className='labels-of-checkout'>
              <PhoneIcon className="icons-of-checkout" />
              <span>Mobile Number</span>
            </label>
            <input type="tel" id='phone' className='inputs-of-checkout' />
          </div>
          <hr />

          <div>
            <label htmlFor="delivery-time" className='labels-of-checkout'>
              <AccessTimeIcon className="icons-of-checkout" />
              <span>Suggested Delivery Time</span>
            </label>
            <select id="delivery-time" className='select-of-checkout'>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
          <hr />

          <div>
            <label htmlFor="instructions-textarea" className='labels-of-checkout'>
              <LocalShippingIcon className="icons-of-checkout" />
              <span>Delivery Instructions (optional)</span>
            </label>
            <textarea cols="30" rows="10" id='intructions-textarea' className='textarea-for-delivery-instructions'></textarea>
          </div>

          <div className="div-for-showing-total-items">
            <img src={noonhutLogo} alt="" />
            <div>
              <p>{cartProducts.length} items</p>
              {cartProducts.map((product) => {
                return <img className='item-images-of-buyers-cart' src={product.PRODUCT_PICTURE} alt="" />
              })}
            </div>
          </div>
          <StripeCheckout stripeKey='pk_test_51IxTFRAotqhqkVaWnTPe3xsk8woxKWkH04A4Ew8RBrBCVmo9Pw3GVf1ky7wA0Og9S7ioUPo5olQKBmfwG5hIYRzu00JT0ekbUs'
            name='Pay With Credit Card'
            shippingAddress
            billingAddress
            amount={totalAmountForStripe.current.finalPrice * 100}
            description={`Your Total Amount is $${totalAmountForStripe.current.finalPrice}`}
            token={makePayment}
          >
            <button className='proceed-to-payment-btn'>Proceed To Payment</button>
          </StripeCheckout>
        </form>

        <div>
          <div className="right-div-of-body-checkout">
            <p id='loyalty-rewards-para-of-checkout'>Loyalty Rewards</p>
            <div>
              <img src={noonhutLogo} id="logo-of-right-div-checkout" alt="" />
              <input type="text" placeholder='Card Number' className='input-for-card-number-checkout' />
            </div>
            <hr />

            <div className="div-for-total-amount">
              <div className="satisfaction-guarantee">
                <img src="https://www.instacart.com/image-server/96x96/www.instacart.com/assets/checkout/quality_guarantee/ribbon-a93eef7e76db2d7610608da27c5a9f5cb489ba37932c9624309ea1756817018e.png" alt="" />
                <p>
                  <span id='span-of-satisfaction-guarantee'>100% satisfaction guarantee</span>
                  <span id='place-order-with-peace'>Place your order with peace of mind.</span>
                </p>
              </div>

              <div className="item-subtotal-div">
                <p>
                  <span className='span-of-price-details'>Item subtotal</span>
                  {cartProducts.map((product) => {
                    return (
                      <>
                        <span style={{ display: "none" }}>{priceSlicing = ((product.PRICE).slice(1))}</span>
                        <span style={{ display: "none" }}>{totalAmount = totalAmount + Number(priceSlicing)}</span>
                      </>
                    )
                  })}
                  <span className='price-spans-of-item-subtotal'>{`${"$" + totalAmount}`}</span>
                </p>

                <p>
                  <span className='span-of-price-details'>Service fee</span>
                  <span className='price-spans-of-item-subtotal'>$0</span>
                </p>

                <p>
                  <span className='span-of-price-details'>Deilvery fee</span>
                  <span className='price-spans-of-item-subtotal'>$0</span>
                </p>
                <hr />

                <p>
                  <span className='span-of-price-details'>Subtotal</span>
                  <span className='price-spans-of-item-subtotal' style={{ fontWeight: "bolder" }}>{`${"$" + totalAmount}`}</span>
                </p>
              </div>
              <hr />

              <button className='add-promo-code-btn'>Add promo code or gift card</button>
            </div>
          </div>

          <div className="div-for-terms-and-conditions-checkout">
            <p>By placing your order, you agree to be bound by the Noonhut <span className='span-of-terms-and-conditions-checkout'>Terms of Service</span> and <span className='span-of-terms-and-conditions-checkout'>Privacy Policy.</span> Your credit/debit card will be <strong>temporarily authorized for the above subtotal.</strong> Your statement will reflect the final order total after order completion. Noonhut may charge retailers a fee in connection with orders placed using Noonhut's services. <span className='span-of-terms-and-conditions-checkout'>Learn more</span></p>

            <p>A bag fee may be added to your final total if required by law or the retailer. The fee will be visible on your receipt after delivery.</p>

            <p>Prices may vary from those in store.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout;