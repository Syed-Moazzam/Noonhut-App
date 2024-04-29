import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import './Poultry.css'

export default function Poultry() {
  const [poultryProducts, setPoultryProducts] = useState([]);

  useEffect(() => {
    const fetchPoultryProducts = async () => {
      const poultryCollectionRef = collection(db, "Nesto_ajm_1_t2PYfYeHJAgtLDpB7Sq5hcLJnLa2");
      const data = await getDocs(poultryCollectionRef);
      setPoultryProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchPoultryProducts();
  });
  
  return (
    <div className="container-of-poultry-products">
      <h1>Poultry</h1>
      <div className="sub-container-of-poultry-products">
        {poultryProducts.map((poultryProduct) => {
          return (
            <div className={poultryProduct.CATEGORY === "poultry" ? "show-poultry-item" : "hide-poultry-item"}>
              <img src={poultryProduct.PRODUCT_PICTURE} className="images-of-poultry-component" alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
