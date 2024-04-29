import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'
import "./MyBasketOrders.css"

export default function MyBasketOrders() {
  let headerArray = ["Store ID", "Order ID", "Time-stamp of Preparing Basket", "Cart Sales Amount", "Total Items In Cart", "Category", "Itemized Product List", "Store Name", "Rider Name", "Rider Source", "Status Of Basket", "Receipt No", "Receipt Image", "Basket Re-orders"];
  
  let rowArray = ["Moazzam","Moazzam", "Moazzam", "Moazzam", "Moazzam", "Moazzam", "Moazzam", "Moazzam", "Moazzam", "Moazzam", "Moazzam", "Moazzam", "Moazzam", "Moazzam"];

  return (
    <>
      <h2 id='heading-of-my-basket-orders'>My Basket Orders</h2>
      <TableContainer className='table-container-of-my-basket-orders'>
        <div>
          <h5>My Basket Orders</h5>
        </div>
        <Table className='table-of-my-basket-orders'>
          <TableHead>
            <TableRow className="columns-of-table-my-basket-orders">
              {headerArray.map((item1, key) => {
                return <TableCell key={key}>{item1}</TableCell>
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              {rowArray.map((item2, key) => {
                return <TableCell key={key}>{item2}</TableCell>
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
