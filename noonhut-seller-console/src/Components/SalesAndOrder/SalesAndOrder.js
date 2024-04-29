import React, { useEffect, useState } from 'react';
import "./SalesAndOrder.css";
import { Link } from 'react-router-dom';
import { Dashboard } from '@material-ui/icons';
import PersonIcon from '@mui/icons-material/Person';
import { MenuList } from '@mui/material';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import ReceiptImage from '../ReceiptImage/ReceiptImage';

const SalesAndOrder = () => {
  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = () => {
    setDropDown((prevState) => !prevState);
  }

  const [showReceiptImage, setShowReceiptImage] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const [salesAndOrders, setSalesAndOrders] = useState([]);
  let databaseTimeStamp = 0, prepTime = "";

  useEffect(() => {
    const fetchSalesAndOrderDocs = async () => {
      const salesAndOrdersCollection = collection(db, "sales_and_orders_seller_console");
      const data = await getDocs(salesAndOrdersCollection);
      setSalesAndOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchSalesAndOrderDocs();
  });

  let tableHead = [
    "Order ID",
    "Time-stamp of Preparing Basket",
    "Cart Sales Amount",
    "Total Items In Cart",
    "Customer Name",
    "Status Of Basket",
    "Receipt Image",
    "Receipt No",
    "Rider ID",
    "Rider Name",
  ];

  const openReceiptImage = (name) => {
    setCustomerName(name);
    setShowReceiptImage(true);
  }

  const updateBasketStatus = async (status, customerName) => {
    const docRef = doc(db, "sales_and_orders_seller_console", customerName + "_buyer");
    await updateDoc(docRef, {
      STATUS_OF_BASKET: status
    }) ;
  }

  return (
    <div className="container-of-seller-sales-and-order">
      <div className="navbar-of-seller-sales-and-order">
        <div className='name-of-component-sales-and-order'>
          <p>Sales and Order</p>
        </div>

        <div className="div-for-dashboard-and-profile-icon-sales-and-order">
          <div className="search-bar-div-sales-and-order">
            <input type="text" placeholder='Search' />
            <SearchIcon />
          </div>
          <div className="dashboard-icon">
            <Link to="/" className='links-for-icons-of-navbar'>
              <Dashboard />
            </Link>
          </div>
          <div className="profile-icon">
            <button onClick={toggleDropDown} className='links-for-icons-of-navbar'>
              <PersonIcon />
            </button>
            {
              dropDown &&
              <MenuList id="menu-list-of-navbar-sales-and-order">
                <Link to="/seller-console/seller-profile">Profile</Link>
                <Link to="">Sign-out</Link>
              </MenuList>
            }
          </div>
        </div>
      </div>

      <div className="div-for-start-and-end-date-sales-and-order">
        <div className="start-date-sales-and-order">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" />
        </div>
        <div className="end-date-sales-and-order">
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" />
        </div>
      </div>

      <TableContainer className='mui-table-container'>
        <div>
          <h5>Sales and Order</h5>
        </div>
        <Table className='mui-table'>
          <TableHead>
            <TableRow>
              {tableHead.map((head) => {
                return <TableCell>
                  <TableSortLabel active={true}>{head}</TableSortLabel>
                </TableCell>
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {salesAndOrders.map((doc) => {
              return (
                <tr>
                  <td className="td-element-of-sales-table">{doc.ORDER_ID}</td>
                  <td style={{ display: "none" }}>{databaseTimeStamp = (doc.TIME_BASKET_PREP).seconds * 1000}</td>
                  <td style={{ display: "none" }}>{prepTime = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(databaseTimeStamp)}</td>
                  <td>{prepTime}</td>
                  <td className="td-element-of-sales-table">{doc.CART_SALES_AMOUNT}</td>
                  <td className="td-element-of-sales-table">{doc.TOTAL_ITEMS_IN_CART}</td>
                  <td className="td-element-of-sales-table">{doc.CUSTOMER_NAME}</td>
                  <td className="td-element-of-sales-table">
                    <select id='toggle-btn-of-basket-status' onChange={(e) => updateBasketStatus(e.target.value, doc.CUSTOMER_NAME)}>
                      <option selected={doc.STATUS_OF_BASKET === "Preparing basket"}>Preparing basket</option>
                      <option selected={doc.STATUS_OF_BASKET === "Ready for pickup"}>Ready for pickup</option>
                      <option selected={doc.STATUS_OF_BASKET === "Rider on the way"}>Rider on the way</option>
                      <option selected={doc.STATUS_OF_BASKET === "Delivered"}>Delivered</option>
                    </select>
                  </td>
                  <td><button className='view-image-btn-of-sales-and-order' onClick={() => openReceiptImage(doc.CUSTOMER_NAME)}>View Image</button></td>
                </tr>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {showReceiptImage && <ReceiptImage customerName={customerName} setShowReceiptImage={setShowReceiptImage}/>}
    </div>
  )
}

export default SalesAndOrder;