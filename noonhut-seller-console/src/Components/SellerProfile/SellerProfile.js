import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuList } from '@mui/material';
import Dashboard from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import "./SellerProfile.css";
import SearchIcon from '@mui/icons-material/Search';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const SellerProfile = () => {
    const [dropDown, setDropDown] = useState(false);
    const [loggedInSeller, setLoggedInSeller] = useState();
    const [sellerData, setSellerData] = useState({
        storeID: "",
        storeName: "",
        personName: "",
        email: "",
        branchCity: "",
        branchNumber: "",
        timeStampCreation: "",
        storeLocation: "",
        storeCoordinates: "",
        storeCity: "",
        country: "",
        bankName: "",
        bankCity: "",
        iban: "",
        swiftCode: "",
        bankAccountName: ""
    });

    const { storeID, storeName, personName, email, branchCity, branchNumber, timeStampCreation, storeLocation, storeCoordinates, storeCity, country, bankName, bankCity, iban, swiftCode, bankAccountName } = sellerData;

    const toggleDropDown = () => {
        setDropDown((prevState) => !prevState);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentSeller) => {
            setLoggedInSeller(currentSeller);
        });

        const fetchSellerData = async () => {
            const sellerDocRef = doc(db, "sellers_profile", loggedInSeller.uid);
            const sellerInfo = await getDoc(sellerDocRef);
            
            setSellerData({
                storeID: loggedInSeller.uid,
                storeName: sellerInfo.data().STORE_NAME,
                personName: sellerInfo.data().PERSON_NAME,
                email: sellerInfo.data().EMAIL,
                branchCity: sellerInfo.data().BRANCH_CITY,
                branchNumber: sellerInfo.data().BRANCH_NUMBER,
                timeStampCreation: loggedInSeller.metadata.creationTime,
                storeLocation: sellerInfo.data().STORE_LOC,
                storeCoordinates: sellerInfo.data().STORE_COORD,
                storeCity: sellerInfo.data().STORE_CITY,
                country: sellerInfo.data().COUNTRY,
                bankName: sellerInfo.data().BANK_NAME,
                bankCity: sellerInfo.data().BANK_CITY,
                iban: sellerInfo.data().IBAN,
                swiftCode: sellerInfo.data().SWIFT_CODE,
                bankAccountName: sellerInfo.data().BANK_ACC_NAME
            });
        }
        
        if (loggedInSeller)
        {
            fetchSellerData();
        }

    }, [loggedInSeller]);

    const tableHead = [
        "Store ID",
        "Store Name",
        "Full Name Of Person",
        "Email",
        "Branch City", 
        "Branch Number",
        "Time-stamp Of Creation",
        "Time-Stamp Of Approval/Rejection",
        "Time-stamp Of Suspension",
        "Store Location",
        "Store Coordinates",
        "Store City",
        "Country",
        "Bank Name",
        "Bank City",
        "IBAN",
        "Swift Code",
        "Bank Account Name",
    ];

    const editDetails = async () => {
        const storeLocation = prompt("Enter Your Store Location:");
        const storeCoordinates = prompt("Enter Your Store Coordinates:");
        const storeCity = prompt("Enter Your Store City:");
        const country = prompt("Enter Your Country:");
        const bankName = prompt("Enter Bank Name:");
        const bankCity = prompt("Enter Bank City:");
        const iban = prompt("Enter your IBAN:");
        const swiftCode = prompt("Enter your Swift Code:");
        const bankAccountName = prompt("Enter your Bank Account Name:");

        const sellerDocRef = doc(db, "sellers_profile", loggedInSeller.uid);
        await updateDoc(sellerDocRef, {
            STORE_LOC: storeLocation,
            STORE_COORD: storeCoordinates,
            STORE_CITY: storeCity,
            COUNTRY: country,
            BANK_NAME: bankName,
            BANK_CITY: bankCity,
            IBAN: iban,
            SWIFT_CODE: swiftCode,
            BANK_ACC_NAME: bankAccountName
        });
        window.location.reload();
    }

    return (
        <div className="container-of-seller-profile">
            <div className="navbar-of-seller-profile">
                <div className='name-of-component-profile'>
                    <p>My Profile</p>
                </div>

                <div className="div-for-dashboard-and-profile-icon-profile">
                    <div className="search-bar-div-profile">
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
                            <MenuList id="menu-list-of-navbar-profile">
                                <Link to="/seller-console/seller-profile">Profile</Link>
                                <Link to="">Sign-out</Link>
                            </MenuList>
                        }
                    </div>
                </div>
            </div>

            <div className="div-for-edit-details-btn-seller-profile">
                <button className='edit-details-btn-of-seller-profile' onClick={editDetails}>
                    <span>EDIT DETAILS</span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
            </div>

            <TableContainer className='mui-table-container-of-profile'>
                <div>
                    <h5>My Profile</h5>
                </div>
                <Table className='mui-table-of-profile'>
                    <TableHead>
                        <TableRow>
                            {tableHead.map((head, key) => {
                                return <TableCell key={key}>{head}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>{storeID}</TableCell>
                            <TableCell>{storeName}</TableCell>
                            <TableCell>{personName}</TableCell>
                            <TableCell>{email}</TableCell>
                            <TableCell>{branchCity}</TableCell>
                            <TableCell>{branchNumber}</TableCell>
                            <TableCell>{timeStampCreation}</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>{storeLocation}</TableCell>
                            <TableCell>{storeCoordinates}</TableCell>
                            <TableCell>{storeCity}</TableCell>
                            <TableCell>{country}</TableCell>
                            <TableCell>{bankName}</TableCell>
                            <TableCell>{bankCity}</TableCell>
                            <TableCell>{iban}</TableCell>
                            <TableCell>{swiftCode}</TableCell>
                            <TableCell>{bankAccountName}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default SellerProfile;