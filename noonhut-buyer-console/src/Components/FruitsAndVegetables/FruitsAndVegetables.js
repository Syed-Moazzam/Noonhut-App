import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react';
import { db } from '../../Firebase'
import './FruitsAndVegetables.css';

export default function FruitsAndVegetables() {
  const [fruitAndVegProducts, setFruitAndVegProducts] = useState([]);

  useEffect(() => {
    const fetchFruitAndVegProducts = async () => {
      const fruitAndVegCollectionRef = collection(db, "Nesto_ajm_1_t2PYfYeHJAgtLDpB7Sq5hcLJnLa2");
      const data = await getDocs(fruitAndVegCollectionRef);
      setFruitAndVegProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    fetchFruitAndVegProducts();
  })
  return (
    <div className="container-of-fruits-and-vegetables-products">
      <h1>Fruits and Vegetables</h1>
      <div className="sub-container-of-fruits-and-vegetables-products">
        {fruitAndVegProducts.map((fruitAndVegProduct) => {
          return (
            <div className={fruitAndVegProduct.CATEGORY === "fruits and vegetables" && fruitAndVegProduct.PRODUCT_PICTURE ? "show-fruit-and-veg-item" : "hide-fruit-and-veg-item"}>
              <img src={fruitAndVegProduct.PRODUCT_PICTURE} className="images-of-fruit-and-veg-component" alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
