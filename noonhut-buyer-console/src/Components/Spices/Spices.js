import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import './Spices.css'

export default function Spices() {
  const [spicesProducts, setSpicesProducts] = useState([]);

  useEffect(() => {
    const fetchSpicesProducts = async () => {
      const spicesCollectionRef = collection(db, "Nesto_ajm_1_t2PYfYeHJAgtLDpB7Sq5hcLJnLa2");
      const data = await getDocs(spicesCollectionRef);
      setSpicesProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchSpicesProducts();
  });

  return (
    <div className="container-of-spices-products">
      <h1>Spices</h1>
      <div className="sub-container-of-spices-products">
        {spicesProducts.map((spicesProduct) => {
          return (
            <div className={spicesProduct.CATEGORY === "spices" ? "show-spices-item" : "hide-spices-item"}>
              <img src={spicesProduct.PRODUCT_PICTURE} className="images-of-spices-component" alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
