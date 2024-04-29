import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import './Bakery.css'

export default function Bakery() {
  const [bakeryProducts, setBakeryProducts] = useState([]);

  useEffect(() => {
    const fetchBakeryProducts = async () => {
      const bakeryCollectionRef = collection(db, "Nesto_ajm_1_t2PYfYeHJAgtLDpB7Sq5hcLJnLa2");
      const data = await getDocs(bakeryCollectionRef);
      setBakeryProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchBakeryProducts();
  });

  return (
    <div className="container-of-bakery-products">
      <h1>Bakery</h1>
      <div className="sub-container-of-spices-products">
        {bakeryProducts.map((bakeryProduct) => {
          return (
            <div className={bakeryProduct.CATEGORY === "bakery" ? "show-bakery-item" : "hide-bakery-item"}>
              <img src={bakeryProduct.PRODUCT_PICTURE} className="images-of-bakery-component" alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
