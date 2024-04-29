import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import './DriedFruits.css'

export default function DriedFruits() {
  const [driedFruitsProducts, setDriedFruitsProducts] = useState([]);

  useEffect(() => {
    const fetchDriedFruitsProducts = async () => {
      const driedFruitsCollectionRef = collection(db, "Nesto_ajm_1_t2PYfYeHJAgtLDpB7Sq5hcLJnLa2");
      const data = await getDocs(driedFruitsCollectionRef);
      setDriedFruitsProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchDriedFruitsProducts();
  });
  
  return (
    <div className="container-of-dried-fruits-products">
      <h1>Dried Fruits</h1>
      <div className="sub-container-of-dried-fruits-products">
        {driedFruitsProducts.map((driedFruitsProduct) => {
          return (
            <div className={driedFruitsProduct.CATEGORY === "driedFruits" ? "show-dried-fruits-item" : "hide-dried-fruits-item"}>
              <img src={driedFruitsProduct.PRODUCT_PICTURE} className="images-of-dried-fruits-component" alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
