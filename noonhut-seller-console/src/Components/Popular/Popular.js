import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Dashboard from '@mui/icons-material/Dashboard';
import { MenuList } from '@material-ui/core';
import PersonIcon from '@mui/icons-material/Person';
import "./Popular.css";
import ArrayOfPopular1 from './ArrayOfPopular1';
import ArrayOfPopular2 from './ArrayOfPopular2';

const Popular = () => {
    const [dropDown, setDropDown] = useState(false);
    const toggleDropDown = () => {
        setDropDown((prevState) => !prevState);
    }

    return (
        <div className="container-of-seller-popular">
            <div className="navbar-of-seller-popular">
                <div className='name-of-component-popular'>
                    <p>Popular</p>
                </div>

                <div className="div-for-dashboard-and-profile-icon-popular">
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
                            <MenuList id="menu-list-of-navbar-popular">
                                <Link to="/seller-console/seller-profile">Profile</Link>
                                <Link to="">Sign-out</Link>
                            </MenuList>
                        }
                    </div>
                </div>
            </div>

            <div className="div-for-start-and-end-date-popular">
                <div className="start-date-popular">
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" id="startDate" />
                </div>
                <div className="end-date-popular">
                    <label htmlFor="endDate">End Date:</label>
                    <input type="date" id="endDate" />
                </div>
            </div>

            <div className='container-of-seller-popular-boxes'>
                {ArrayOfPopular1.map((eachObject) => {
                    return (
                        <div className='container-of-box-popular'>
                            <div className="box-of-seller-popular">
                                <div className="div-for-icons-and-description-popular">
                                    <div className='div-for-icon-of-seller-popular'>{eachObject.icon}</div>
                                    <div className="description-popular">
                                        <p>{eachObject.heading}</p>
                                        <h4>{eachObject.description}</h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="bottom-description-popular">
                                    <div id='first-div-of-bottom-description-popular'>
                                        <span className={eachObject.arrowUp} id="arrow-up-span-of-bottom-description-popular"></span>
                                        <span>{eachObject.value}</span>
                                    </div>
                                    <div>{eachObject.bottomDescription}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='container-of-seller-popular-boxes'>
                {ArrayOfPopular2.map((eachObject) => {
                    return (
                        <div className='container-of-box-popular'>
                            <div className="box-of-seller-popular">
                                <div className="div-for-icons-and-description-popular">
                                    <div className='div-for-icon-of-seller-popular'>{eachObject.icon}</div>
                                    <div className="description-popular">
                                        <p>{eachObject.heading}</p>
                                        <h4>{eachObject.description}</h4>
                                    </div>
                                </div>
                                <hr />
                                <div className="bottom-description-popular">
                                    <div id='first-div-of-bottom-description-popular'>
                                        <span className={eachObject.arrowUp} id="arrow-up-span-of-bottom-description-popular"></span>
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

export default Popular;