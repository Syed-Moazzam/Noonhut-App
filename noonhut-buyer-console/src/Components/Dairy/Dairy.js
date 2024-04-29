import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import './Dairy.css'

export default function Dairy() {
  const [dairyProducts, setDairyProducts] = useState([]);

  useEffect(() => {
    const fetchDairyProducts = async () => {
      const dairyCollectionRef = collection(db, "Nesto_ajm_1_t2PYfYeHJAgtLDpB7Sq5hcLJnLa2");
      const data = await getDocs(dairyCollectionRef);
      setDairyProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchDairyProducts();
  });

  return (
    <div className="container-of-dairy-products">
      <h1>Dairy</h1>
      <div className="sub-container-of-dairy-products">
        {dairyProducts.map((dairyProduct) => {
          return (
            <div className={dairyProduct.CATEGORY === "dairy" ? "show-dairy-item" : "hide-dairy-item"}>
              <img src={dairyProduct.PRODUCT_PICTURE} className="images-of-dairy-component" alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
