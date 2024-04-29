import React, { useEffect, useState } from 'react';
import './Meat.css';
import { auth, db } from '../../Firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Meat({ meatCategory, setMeatCategory }) {
  const [itemQuantity, setItemQuantity] = useState(0);
  const [loggedInBuyer, setLoggedInBuyer] = useState("");
  const [meatProducts, setMeatProducts] = useState([]);
  const [mouseOutText, setMouseOutText] = useState("");
  const [hoverElementId, setHoverElementId] = useState("");
  const [clickedElementId, setClickedElementId] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentBuyer) => {
      setLoggedInBuyer(currentBuyer);
    });

    const fetchMeatProducts = async () => {
      const meatCollectionRef = collection(db, "Nesto_ajm_1_rsYRf0uUTAeUwwPT90VVjbRh5Xx2");
      const data = await getDocs(meatCollectionRef);
      setMeatProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchMeatProducts();
  });

  const handleMouseOver = (id) => {
    setHoverElementId(id);
    setMouseOutText("");
  }

  const handleMouseOut = () => {
    setMouseOutText("Add");
  }

  const updateMeatCategoryValue = async (meat) => {
    const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
    await updateDoc(buyerProfileRef, {
      ITEMS_IN_CART: meat
    });
  }

  const createCart = async (id, cart) => {
    // extracting buyer's name from email address
    const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
    const getBuyerData = await getDoc(buyerProfileRef);
    const buyerEmail = getBuyerData.data().EMAIL;
    const buyerName = buyerEmail.slice(0, buyerEmail.indexOf("@"));

    // creating buyer's cart collection
    const productRef = doc(db, "Nesto_ajm_1_rsYRf0uUTAeUwwPT90VVjbRh5Xx2", id);
    const getProductData = await getDoc(productRef);
    const productName = getProductData.data().PRODUCT_NAME;
    const productPrice = getProductData.data().PRICE;
    const productImage = getProductData.data().PRODUCT_PICTURE;

    const cartProductRef = doc(db, `${buyerName + "_cart_" + loggedInBuyer.uid}`, id);
    await setDoc(cartProductRef, {
      PRODUCT_NAME: productName,
      PRICE: productPrice,
      PRODUCT_PICTURE: productImage,
      PRODUCT_QUANTITY: cart
    });
  }

  const updateCart = async (id, updatedValue) => {
    // extracting buyer's name from email address
    const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
    const getBuyerData = await getDoc(buyerProfileRef);
    const buyerEmail = getBuyerData.data().EMAIL;
    const buyerName = buyerEmail.slice(0, buyerEmail.indexOf("@"));

    const cartProductRef = doc(db, `${buyerName + "_cart_" + loggedInBuyer.uid}`, id);
    await updateDoc(cartProductRef, {
      PRODUCT_QUANTITY: updatedValue
    })
  }

  const addToCart = async (id, quantity) => {
    setClickedElementId(id);

    // extracting buyer's name from email address
    const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
    const getBuyerData = await getDoc(buyerProfileRef);
    const buyerEmail = getBuyerData.data().EMAIL;
    const buyerName = buyerEmail.slice(0, buyerEmail.indexOf("@"));

    // referring to buyer's cart
    const productExists = doc(db, `${buyerName + "_cart_" + loggedInBuyer.uid}`, id);
    const product = await getDoc(productExists);

    if (product.exists()) 
    {
      setItemQuantity(product.data().PRODUCT_QUANTITY);
      setItemQuantity((itemQuantity) => {
        const updatedValue = itemQuantity + 1;
        updateCart(id, updatedValue);
        return updatedValue;
      });
    }
    else
    {
      setItemQuantity(quantity);
      setItemQuantity((itemQuantity) => {
        const cart = itemQuantity + 1;
        createCart(id, cart);
        return cart;
      });

      setMeatCategory((meatCategory) => {
        const meat = meatCategory + 1;
        updateMeatCategoryValue(meat);
        return meat; 
      });
    }
  }

  const increase = async (id, increasedValue) => {
    // extracting buyer's name from his/her email address
    const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
    const getBuyerData = await getDoc(buyerProfileRef);
    const buyerEmail = getBuyerData.data().EMAIL;
    const buyerName = buyerEmail.slice(0, buyerEmail.indexOf("@"));

    const actualProductRef = doc(db, "Nesto_ajm_1_rsYRf0uUTAeUwwPT90VVjbRh5Xx2", id);
    const getActualData = await getDoc(actualProductRef);
    const actualPrice = getActualData.data().PRICE;
    const slicedActualPrice = actualPrice.slice(1);

    const cartProductRef = doc(db, `${buyerName + "_cart_" + loggedInBuyer.uid}`, id);
    const getCartData = await getDoc(cartProductRef);
    const cartProductPrice = getCartData.data().PRICE;
    const slicedCartProductPrice = cartProductPrice.slice(1);

    const finalPrice = Number(slicedActualPrice) + Number(slicedCartProductPrice);
    const finalPriceToString = "$" + finalPrice.toString();

    await updateDoc(cartProductRef, {
      PRODUCT_QUANTITY: increasedValue,
      PRICE: finalPriceToString
    });
  }

  const increaseItemQuantity = (id) => {
    setItemQuantity((itemQuantity) => {
      const increasedValue = itemQuantity + 1;
      increase(id, increasedValue);
      return increasedValue;
    });
  }

  const decrease = async (id, decreasedValue) => {
    // extracting buyer's name from email address
    const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
    const getBuyerData = await getDoc(buyerProfileRef);
    const buyerEmail = getBuyerData.data().EMAIL;
    const buyerName = buyerEmail.slice(0, buyerEmail.indexOf("@"));

    const actualProductRef = doc(db, "Nesto_ajm_1_rsYRf0uUTAeUwwPT90VVjbRh5Xx2", id);
    const getActualData = await getDoc(actualProductRef);
    const actualPrice = getActualData.data().PRICE;
    const slicedActualPrice = actualPrice.slice(1);

    const cartProductRef = doc(db, `${buyerName + "_cart_" + loggedInBuyer.uid}`, id);
    const getCartData = await getDoc(cartProductRef);
    const cartProductPrice = getCartData.data().PRICE;
    const slicedCartProductPrice = cartProductPrice.slice(1);
    
    const finalPrice = Number(slicedCartProductPrice) - Number(slicedActualPrice);
    const finalPriceToString = "$" + finalPrice.toString();

    await updateDoc(cartProductRef, {
      PRODUCT_QUANTITY: decreasedValue,
      PRICE: finalPriceToString
    });

    if (decreasedValue === 0) {
      setClickedElementId("");
      await deleteDoc(cartProductRef);
      let itemsInCart = getBuyerData.data().ITEMS_IN_CART;
      itemsInCart -= 1;
      setMeatCategory(meatCategory - 1);

      await updateDoc(buyerProfileRef, {
        ITEMS_IN_CART: itemsInCart
      });
    }
  }

  const decreaseItemQuantity = (id) => {
    setItemQuantity((itemQuantity) => {
      const decreasedValue = itemQuantity - 1;
      decrease(id, decreasedValue);
      return decreasedValue;
    });
  }

  return (
    <div className="container-of-meat-products">
      <h1>Meat</h1>
      <div className="sub-container-of-meat-products">
        {meatProducts.map((meatProduct, index) => {
          return (
            <div className={meatProduct.CATEGORY === "meat" && meatProduct.PRODUCT_PICTURE ? "show-meat-item" : "hide-meat-item"} key={index} onMouseOver={() => handleMouseOver(meatProduct.id)} onMouseOut={handleMouseOut}>
              <img src={meatProduct.PRODUCT_PICTURE} className="images-of-meat-component" alt="" />

              <button className={clickedElementId === meatProduct.id ? "not-show-add-to-cart-btn" : "add-to-cart-btn"} onClick={() => addToCart(meatProduct.id, meatProduct.QUANTITY)}>
                <i className="fa-solid fa-plus"></i>
                <span>{mouseOutText !== "" ? mouseOutText : hoverElementId === meatProduct.id ? "Add To Cart" : "Add"}</span>
              </button>

              <button className={clickedElementId === meatProduct.id ? "show-item-quantity" : "not-show-item-quantity"}>
                <i className="fa-solid fa-minus minus-icon" onClick={() => decreaseItemQuantity(meatProduct.id)}></i>
                <span id='span-of-item-quantity'>{itemQuantity}</span>
                <i className="fa-solid fa-plus plus-icon" onClick={() => increaseItemQuantity(meatProduct.id)}></i>
              </button>

              <p className='p-tag-for-item-details' id='p1-of-item-details'>{meatProduct.PRICE}</p>
              <p className='p-tag-for-item-details' id='p2-of-item-details'>{meatProduct.PRODUCT_NAME}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
