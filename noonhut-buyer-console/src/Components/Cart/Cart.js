import React, { useEffect, useState, useRef } from 'react';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import "./Cart.css";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../Firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import noonhutLogo from '../Images/Noon Hut.png';
import VerifiedIcon from '@mui/icons-material/Verified';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const Cart = ({ setShowCart, meatCategory }) => {
    const [toggle, setToggle] = useState(false);
    const [loggedInBuyer, setLoggedInBuyer] = useState();
    const [cartProducts, setCartProducts] = useState([]);
    const [clickedButtonId, setClickedButtonId] = useState("");
    const cartRef = useRef();

    let priceSlicing = 0, totalAmount = 0;

    const toggleOnOff = () => {
        setToggle((prevState) => !prevState);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentBuyer) => {
            setLoggedInBuyer(currentBuyer);
        });

        const fetchCartProducts = async () => {
            // extracting buyers' name from email address
            const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
            const getBuyerData = await getDoc(buyerProfileRef);
            const buyerEmail = getBuyerData.data().EMAIL;
            const buyerName = buyerEmail.slice(0, buyerEmail.indexOf("@"));

            const cartCollectionRef = collection(db, `${buyerName + "_cart_" + loggedInBuyer.uid}`);
            const data = await getDocs(cartCollectionRef);
            setCartProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        if (loggedInBuyer) {
            fetchCartProducts();
        }

        const closeCart = (e) => {
            if (cartRef.current.contains(e.target) === false) {
                setShowCart(false);
            }
        }
        document.body.addEventListener("mousedown", closeCart);

        return () => {
            document.body.removeEventListener("mousedown", closeCart);
        }
    }, [cartProducts, loggedInBuyer, setShowCart]);

    const toggleQuantityButtons = (id) => {
        setClickedButtonId(id);
    }

    const removeItemFromCart = async (id) => {
        //extracting buyer's name from email address
        const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
        const getBuyerData = await getDoc(buyerProfileRef);
        const buyerEmail = getBuyerData.data().EMAIL;
        const buyerName = buyerEmail.slice(0, buyerEmail.indexOf("@"));
        
        const productRef = doc(db, `${buyerName + "_cart_" + loggedInBuyer.uid}`, id);
        await deleteDoc(productRef);
        let itemsInCart = getBuyerData.data().ITEMS_IN_CART;
        itemsInCart -= 1;

        await updateDoc(buyerProfileRef, {
            ITEMS_IN_CART: itemsInCart
        });
    }

    const decrementCartItemQuantity = async (id, quantity) => {
        let decreasedValue = quantity;

        // extracting buyer's name from email address
        const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
        const getBuyerData = await getDoc(buyerProfileRef);
        const buyerEmail = getBuyerData.data().EMAIL;
        const buyerName = buyerEmail.slice(0, buyerEmail.indexOf("@"));

        // accessing the initial cost of product
        const actualProductRef = doc(db, "Nesto_ajm_1_rsYRf0uUTAeUwwPT90VVjbRh5Xx2", id);
        const getActualData = await getDoc(actualProductRef);
        const actualPrice = getActualData.data().PRICE;
        const sliceActualPrice = actualPrice.slice(1);
        const actualPriceToNumber = Number(sliceActualPrice);

        const cartProductRef = doc(db, `${buyerName + "_cart_" + loggedInBuyer.uid}`, id);
        const getCartData = await getDoc(cartProductRef);
        const productPrice = getCartData.data().PRICE;
        const priceSlicing2 = productPrice.slice(1);
        const updatedPrice = Number(priceSlicing2) - actualPriceToNumber;

        const updatedPriceToString = updatedPrice.toString();
        const finalPrice = "$" + updatedPriceToString;

        if (decreasedValue === 1) {
            decreasedValue -= 1;
            await deleteDoc(cartProductRef);
            let decrease = getBuyerData.data().ITEMS_IN_CART;
            decrease -= 1;
            await updateDoc(buyerProfileRef, {
                ITEMS_IN_CART: decrease
            });
        }
        else {
            decreasedValue -= 1;
            await updateDoc(cartProductRef, {
                PRODUCT_QUANTITY: decreasedValue,
                PRICE: finalPrice
            });
        }
    }

    const incrementCartItemQuantity = async (id, quantity) => {
        let increasedValue = quantity;
        increasedValue += 1;

        // extracting buyer's name from email address
        const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
        const getBuyerData = await getDoc(buyerProfileRef);
        const buyerEmail = getBuyerData.data().EMAIL;
        const buyerName = buyerEmail.slice(0, buyerEmail.indexOf("@"));

        // accessing initial value of the product
        const actualProductRef = doc(db, "Nesto_ajm_1_rsYRf0uUTAeUwwPT90VVjbRh5Xx2", id);
        const getActualData = await getDoc(actualProductRef);
        const actualPrice = getActualData.data().PRICE;
        const sliceActualPrice = actualPrice.slice(1);
        const actualPriceToNumber = Number(sliceActualPrice);

        const cartProductRef = doc(db, `${buyerName + "_cart_" + loggedInBuyer.uid}`, id);
        const getCartData = await getDoc(cartProductRef);

        // extracting the previous cost of product
        const productPrice = getCartData.data().PRICE;
        let priceSlicing1 = productPrice.slice(1);
        let updatedPrice = actualPriceToNumber + Number(priceSlicing1);
        let updatedPriceToString = updatedPrice.toString();
        let finalPrice = "$" + updatedPriceToString;

        await updateDoc(cartProductRef, {
            PRODUCT_QUANTITY: increasedValue,
            PRICE: finalPrice
        });
    }

    return (
        <>
            <div className="container-of-cart-component">
                <div className="main-cart" ref={cartRef}>
                    <div className="close-cart-div">
                        <i className="fa-solid fa-xmark" onClick={() => { setShowCart(false) }}></i>
                    </div>

                    <div className="make-this-order-a-gift">
                        <div className="text-of-make-this-order-a-gift">
                            <i className="fa-solid fa-gift"></i>
                            <p>Make this order a gift</p>
                        </div>
                        {toggle ? <ToggleOnIcon id='toggle-on-icon-of-cart' onClick={toggleOnOff} /> : <ToggleOffIcon id='toggle-off-icon-of-cart' onClick={toggleOnOff} />}
                    </div>

                    {loggedInBuyer && meatCategory > 0 ?
                        <div className='container-of-cart-products'>
                            <div className='div-for-company-name-and-logo'>
                                <img src={noonhutLogo} alt="" />
                                <div style={{ width: "344px" }}>
                                    <p id='company-name-div-of-cart'>Noonhut</p>
                                    <p id='verified-icon-para-of-cart'>
                                        <VerifiedIcon id="verified-icon-of-cart" />
                                        <span>100% satisfaction guarantee</span>
                                    </p>
                                </div>
                                {cartProducts.map((product) => {
                                    return (
                                        <>
                                            <span style={{ display: "none" }}>{priceSlicing = ((product.PRICE).slice(1))}</span>
                                            <span style={{ display: "none" }}>{totalAmount = totalAmount + Number(priceSlicing)}</span>
                                        </>
                                    )
                                })}
                                <span style={{ fontWeight: "bold" }}>{`${"$" + totalAmount}`}</span>
                            </div>
                            <div id="empty-div-between-logo-and-items"></div>
                            {cartProducts.map((product) => {
                                return (
                                    <div className='each-cart-product'>
                                        <img src={product.PRODUCT_PICTURE} alt="" />
                                        <p className={clickedButtonId === product.id ? "increase-width-of-product-description" : ""}>
                                            <span>{product.PRODUCT_NAME}</span>
                                            <button className='remove-btn-for-cart-items' onClick={() => removeItemFromCart(product.id)}>
                                                <DeleteIcon style={{ fontSize: "20px" }} />
                                                <span>Remove</span>
                                            </button>
                                        </p>
                                        {clickedButtonId === product.id ? "" : <button onClick={() => toggleQuantityButtons(product.id)}>{product.PRODUCT_QUANTITY}</button>}
                                        {clickedButtonId === product.id && <div className="hidden-quantity-div-for-items">
                                            <button id='minus-btn-of-hidden-items-of-cart' onClick={() => decrementCartItemQuantity(product.id, product.PRODUCT_QUANTITY)}><i className="fa-solid fa-minus"></i></button>
                                            <span>{product.PRODUCT_QUANTITY}</span>
                                            <button id='plus-btn-of-hidden-items-of-cart' onClick={() => incrementCartItemQuantity(product.id, product.PRODUCT_QUANTITY)}><i className="fa-solid fa-plus"></i></button>
                                        </div>}
                                        <span>{product.PRICE}</span>
                                    </div>
                                )
                            })}
                        </div>
                        : <div className="limited-time-free-delivery">
                            <div className="content-of-limited-time-div">
                                <img src="https://d2guulkeunn7d8.cloudfront.net/assets/EmptyStateGeneric-3950e2389a69f52d5457206d8ce16636.svg" alt="" />
                                {loggedInBuyer && meatCategory === 0 ? <p>Your personal cart is empty.</p> : loggedInBuyer && meatCategory > 0 ? <p>Hello!</p> : <p>Limited Time, Free Delivery!</p>}
                                <button className="shop-now-btn">Shop Now</button>
                            </div>
                        </div>}

                    <div className="go-to-checkout-container-div">
                        <Link to="/checkout" className={!loggedInBuyer || (loggedInBuyer && cartProducts.length === 0) ? "disabled-checkout-btn" : "enabled-checkout-btn"}>
                            <span>Go To Checkout</span>
                            <span id='span-for-total-amount'>{`${"$" + totalAmount}`}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;