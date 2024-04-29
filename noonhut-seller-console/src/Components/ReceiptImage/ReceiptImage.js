import React, { useEffect, useRef, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import html2canvas from 'html2canvas';
import "./ReceiptImage.css";

const ReceiptImage = ({ customerName, setShowReceiptImage }) => {
  const [orderItems, setOrderItems] = useState([]);
  let slicedPrice = "", finalPrice = 0;
  const orderSummaryRef = useRef(null);
  const downloadBtnRef = useRef(null);
  const [receiptNo, setReceiptNo] = useState(1);

  useEffect(() => {
    const fetchOrderSummary = async () => {
      const orderCollectionRef = collection(db, `${customerName + "_orders"}`);
      const data = await getDocs(orderCollectionRef);
      setOrderItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchOrderSummary();

    const closeOrderSummary = (e) => {
      if (orderSummaryRef.current.contains(e.target) === false && downloadBtnRef.current.contains(e.target) === false)
      {
        setShowReceiptImage(false);
      }
    }

    document.body.addEventListener("mousedown", closeOrderSummary);

    return () => {
      document.body.removeEventListener("mousedown", closeOrderSummary);
    }
  });

  const handleDownloadImage = async () => {
    const element = orderSummaryRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = `${customerName + '_order.jpg'}`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <div className="container-of-receipt-image">
      <div className="download-and-close-btn-of-receipt">
        <button onClick={handleDownloadImage} ref={downloadBtnRef}>
          <i className="fa-solid fa-download"></i>
        </button>

        <button onClick={() => setShowReceiptImage(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="order-summary-box" ref={orderSummaryRef}>
        <h2>Order Summary</h2>
        <h3>Receipt No: {receiptNo}</h3>
        <div className="blank-div-of-receipt-image1"></div>
        {orderItems.map((item) => {
          return (
            <div className='each-item-of-receipt-image'>
              <img src={item.PRODUCT_PICTURE} alt="" id='item-image-of-receipt'/>
              <div className='item-description-of-receipt-image'>
                <p>{item.PRODUCT_NAME}</p>
                <span id='item-quantity-of-receipt-image'>{item.PRODUCT_QUANTITY}</span>
                <span id='item-price-of-receipt-image'>{item.PRICE}</span>
              </div>
            </div>
          )
        })}

        <div className="blank-div-of-receipt-image2"></div>
        <div className="total-amount-of-receipt-image">
          <i className="fa-solid fa-money-check-dollar"></i>
          <h3 id='total-amount-heading-receipt-image'>Total Amount</h3>
          {orderItems.map((item) => {
            return (
              <>
                <div style={{display: "none"}}>{slicedPrice = (item.PRICE).slice(1)}</div>
                <div style={{display: "none"}}>{finalPrice += Number(slicedPrice)}</div>
              </>
            )
          })}
          <span id='price-span-of-receipt-image'>{"$" + finalPrice}</span>
        </div>
        
        <hr className='hr-of-receipt-image'/>
        <div className="status-of-order-receipt-image">
          <i className="fa-solid fa-chart-line"></i>
          <h3 id='status-heading-receipt-image'>Status</h3>
          <span id='paid-span-of-receipt-image'>Paid</span>
        </div>

        <hr className="hr-of-receipt-image" />
        <h2 id='thanks-for-shopping-receipt-image'>Thanks for shopping!</h2>
      </div>
    </div>
  )
}

export default ReceiptImage;