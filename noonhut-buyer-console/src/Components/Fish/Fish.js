import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import './Fish.css'

export default function Fish() {
  const [fishProducts, setFishProducts] = useState([]);

  useEffect(() => {
    const fetchFishProducts = async () => {
      const fishCollectionRef = collection(db, "Nesto_ajm_1_t2PYfYeHJAgtLDpB7Sq5hcLJnLa2");
      const data = await getDocs(fishCollectionRef);
      setFishProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchFishProducts();
  });

  return (
    <div className="container-of-fish-products">
      <h1>Fish</h1>
      <div className="sub-container-of-fish-products">
        {fishProducts.map((fishProduct) => {
          return (
            <div className={fishProduct.CATEGORY === "fish" ? "show-fish-item" : "hide-fish-item"}>
              <img src={fishProduct.PRODUCT_PICTURE} className="images-of-fish-component" alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
