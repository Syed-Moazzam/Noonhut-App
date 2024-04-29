import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { MenuList } from '@material-ui/core';
import "./SellerWallet.css";
import ArrayOfSellerWallet from './ArrayOfSellerWallet';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SellerWallet = () => {
    const [dropDown, setDropDown] = useState(false);
    const toggleDropDown = () => {
        setDropDown((prevState) => !prevState);
    }

    const tableHead = [
        "Store ID",
        "Total Balance as of Date",
        "Total Balance",
        "Funds Available For Settlement",
        "Recent Payouts",
        "Recent Payout Date",
    ];

    const tableBody = [
        "Dakota Rice",
        "Niger",
        "Oud-Turnhout",
        "$36,738",
        "Minerva Hooper",
        "Curaçao",
    ]

    return (
        <div className="container-of-seller-wallet">
            <div className="navbar-of-seller-wallet">
                <div className='name-of-component-wallet'>
                    <p>My Wallet</p>
                </div>

                <div className="div-for-dashboard-and-profile-icon-wallet">
                    <div className="search-bar-div-wallet">
                        <input type="text" placeholder='Search'/>
                        <SearchIcon/>
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
                            <MenuList id="menu-list-of-navbar-wallet">
                                <Link to="/seller-console/seller-profile">Profile</Link>
                                <Link to="">Sign-out</Link>
                            </MenuList>
                        }
                    </div>
                </div>
            </div>

            <div className='container-of-seller-wallet-boxes'>
                {ArrayOfSellerWallet.map((eachObject) => {
                    return (
                        <div className='container-of-box-wallet'>
                            <div className="box-of-seller-wallet">
                                <div className="div-for-icons-and-description-wallet">
                                    <div className='div-for-icon-of-seller-wallet'>{eachObject.icon}</div>
                                    <div className="description-wallet">
                                        <p>{eachObject.heading}</p>
                                        <h4>{eachObject.description}</h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="bottom-description-wallet">
                                    <div id='first-div-of-bottom-description-wallet'>
                                        <span className={eachObject.arrowUp} id="arrow-up-span-of-bottom-description-wallet"></span>
                                        <span>{eachObject.value}</span>
                                    </div>
                                    <div>{eachObject.bottomDescription}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <TableContainer className='mui-table-container-of-wallet'>
                <div>
                    <h5>My Wallet</h5>
                </div>
                <Table className='mui-table-of-wallet'>
                    <TableHead>
                        <TableRow>
                            {tableHead.map((head) => {
                                return <TableCell>{head}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {tableBody.map((body) => {
                                return <TableCell>{body}</TableCell>
                            })}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default SellerWallet;