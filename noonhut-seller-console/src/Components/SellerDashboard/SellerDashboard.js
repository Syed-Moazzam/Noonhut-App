import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Dashboard } from '@material-ui/icons';
import PersonIcon from '@mui/icons-material/Person';
import { MenuList } from '@mui/material';
import "./SellerDashboard.css";
import ArrayOfSellerDashboard from './ArrayOfSellerDashboard';

const SellerDashboard = () => {
    const [dropDown, setDropDown] = useState(false);

    const toggleDropDown = () => {
        setDropDown((prevState) => !prevState);
    }
    
  return (
    <div className="container-of-seller-dashboard">
        <div className="navbar-of-seller-dashboard">
            <div className='name-of-component-dashboard'>
                <p>Dashboard</p>
            </div>

            <div className="div-for-dashboard-and-profile-icon-dashboard">
                <div className="dashboard-icon">
                    <Link to="/" className='links-for-icons-of-navbar'>
                        <Dashboard/>
                    </Link>
                </div>
                <div className="profile-icon">
                    <button onClick={toggleDropDown} className='links-for-icons-of-navbar'>
                        <PersonIcon/>
                    </button>
                    {
                        dropDown && 
                        <MenuList id="menu-list-of-navbar-dashboard">
                            <Link to="/seller-console/seller-profile">Profile</Link>
                            <Link to="">Sign-out</Link>
                        </MenuList>
                    }
                </div>
            </div>
        </div>
        <div className='container-of-seller-dashboard-boxes'>
            {ArrayOfSellerDashboard.map((eachObject) => {
                return (
                    <div className='container-of-box-dashboard'>
                        <div className="box-of-seller-dashboard">
                            <div className="div-for-icons-and-description-dashboard">
                                <div className='div-for-icon-of-seller-dashboard'>{eachObject.icon}</div>
                                <div className="description-dashboard">
                                    <p>{eachObject.heading}</p>
                                    <h4>{eachObject.description}</h4>
                                </div>
                            </div>
                            <hr />
                            <div className="bottom-description-dashboard">
                                <div id='first-div-of-bottom-description-dashboard'>
                                    <span className={eachObject.arrowUp} id="arrow-up-span-of-bottom-description-dashboard"></span>
                                    <span>{eachObject.value}</span>
                                </div>
                                <div>{eachObject.bottomDescription}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default SellerDashboard;