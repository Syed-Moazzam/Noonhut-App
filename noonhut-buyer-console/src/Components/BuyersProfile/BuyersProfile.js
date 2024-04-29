import React, { useEffect, useState } from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import "./BuyersProfile.css";
import { auth, db } from '../../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function BuyersProfile() {
  const [loggedInBuyer, setLoggedInBuyer] = useState();
  const [editDetails, setEditDetails] = useState(false);

  const [buyerName, setBuyerName] = useState("");
  const [buyerLocation, setBuyerLocation] = useState("");
  const [buyerCoordinates, setBuyerCoordinates] = useState("");
  const [buyerCity, setBuyerCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [allBuyerData,  setAllBuyerData] = useState({
    buyer_name: "",
    buyer_location: "",
    buyer_coordinates: "",
    buyer_city: "",
    buyer_phoneNumber: ""
  });

  let headerArray = ["Buyer ID", "Email", "Time-stamp Of Account Creation", "Time-stamp Of Account Suspension", "Buyer Name", "Buyer Location", "Buyer Coordinates", "Buyer City", "Phone Number"];

  useEffect(() => {
    onAuthStateChanged(auth, (currentBuyer) => {
      setLoggedInBuyer(currentBuyer);
    });

    const fetchBuyerData = async () => {
      const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
      const buyerProfileInfo = await getDoc(buyerProfileRef);

      setAllBuyerData({
        buyer_name: buyerProfileInfo.data().BUYER_NAME,
        buyer_location: buyerProfileInfo.data().BUYER_LOC,
        buyer_coordinates: buyerProfileInfo.data().BUYER_COOR,
        buyer_city: buyerProfileInfo.data().BUYER_CITY,
        buyer_phoneNumber: buyerProfileInfo.data().PHONE
      });
    }

    if (loggedInBuyer)
    {
      fetchBuyerData();
    }
  }, [loggedInBuyer]);

  const updateDetailsOfBuyer = async () => {
    const buyerProfileRef = doc(db, "buyers_profile", loggedInBuyer.uid);
    await updateDoc(buyerProfileRef, {
      BUYER_NAME: buyerName,
      BUYER_LOC: buyerLocation,
      BUYER_COOR: buyerCoordinates,
      BUYER_CITY: buyerCity,
      PHONE: phoneNumber
    });
  }

  return (
    <>
      <div style={{ position: "relative" }}>
        <h2 id='heading-of-my-profile'>My Profile</h2>
        <button id='edit-details-btn-of-buyers-profile' onClick={() => setEditDetails(true)}>
          <span>EDIT DETAILS</span>
          <i className="fa-sharp fa-solid fa-pen-to-square"></i>
        </button>

        <button id='save-changes-btn-of-buyers-profile' onClick={updateDetailsOfBuyer}>
          <span>SAVE CHANGES</span>
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
      </div>
      <TableContainer className='table-container-of-buyers-profile'>
        <div>
          <h5>My Profile</h5>
        </div>
        <Table className='table-of-buyers-profile'>
          <TableHead>
            <TableRow className="columns-of-table-buyers-profile">
              {headerArray.map((item1, key) => {
                return <TableCell key={key}>{item1}</TableCell>
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            <tr>
              {
                loggedInBuyer ?
                  <>
                    <td>{loggedInBuyer.uid}</td>
                    <td>{loggedInBuyer.email}</td>
                    <td>{loggedInBuyer.metadata.creationTime}</td>
                  </>
                  : ""
              }
              <td></td>
              <td>
                <span className={editDetails ? "not-visible-span" : "visible-span"}>{allBuyerData.buyer_name}</span>
                <input type="text" className={editDetails ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => setBuyerName(e.target.value)} />
              </td>
              <td>
                <span className={editDetails ? "not-visible-span": "visible-span"}>{allBuyerData.buyer_location}</span>
                <input type="text" className={editDetails ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => setBuyerLocation(e.target.value)} />
              </td>
              <td>
                <span className={editDetails ? "not-visible-span" : "visible-span"}>{allBuyerData.buyer_coordinates}</span>
                <input type="text" className={editDetails ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => setBuyerCoordinates(e.target.value)} />
              </td>
              <td>
                <span className={editDetails ? "not-visible-span" : "visible-span"}>{allBuyerData.buyer_city}</span>
                <input type="text" className={editDetails ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => setBuyerCity(e.target.value)} />
              </td>
              <td>
                <span className={editDetails ? "not-visible-span" : "visible-span"}>{allBuyerData.buyer_phoneNumber}</span>
                <input type="text" className={editDetails ? "visible-inputs" : "not-visible-inputs"} onChange={(e) => setPhoneNumber(e.target.value)} />
              </td>
            </tr>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
