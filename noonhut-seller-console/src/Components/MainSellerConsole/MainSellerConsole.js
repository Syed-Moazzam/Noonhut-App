import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableViewIcon from '@mui/icons-material/TableView';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import StoreIcon from '@mui/icons-material/Store';
import WalletIcon from '@mui/icons-material/Wallet';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import noonHut from '../Images/Noon Hut.png';
import "./MainSellerConsole.css";
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase';

const MainSellerConsole = ({ children }) => {
    const location = useLocation();

    const logoutOfSellerConsole = async () => {
        await signOut(auth);
        window.location.reload();
    }

    return (
        <div className="container-of-main-seller-console">
            <div className="sidebar-of-seller-console">
                <div className="logo">
                    <img src={noonHut} alt="" id='noonhut-name-image-of-seller-console-sidebar' />
                </div>

                <div className="store-name">
                    <h3>Sellers: Store Name</h3>
                </div>

                <div className="links-of-seller-console-sidebar">
                    <Link to="/" className={location.pathname === "/" ? "active" : ""}>
                        <DashboardIcon />
                        <span>Dashboard</span>
                    </Link>
                </div>

                <div className="links-of-seller-console-sidebar">
                    <Link to="/seller-console/sales-and-order" className={location.pathname === "/seller-console/sales-and-order" ? "active" : ""}>
                        <TableViewIcon />
                        <span>Sales & Order</span>
                    </Link>
                </div>

                <div className="links-of-seller-console-sidebar">
                    <Link to="/seller-console/popular" className={location.pathname === "/seller-console/popular" ? "active" : ""}>
                        <WorkspacePremiumIcon />
                        <span>Popular</span>
                    </Link>
                </div>

                <div className="links-of-seller-console-sidebar">
                    <Link to="/seller-console/my-store" className={location.pathname === "/seller-console/my-store" ? "active" : ""}>
                        <StoreIcon />
                        <span>My Store</span>
                    </Link>
                </div>

                <div className="links-of-seller-console-sidebar">
                    <Link to="/seller-console/seller-wallet" className={location.pathname === "/seller-console/seller-wallet" ? "active" : ""}>
                        <WalletIcon />
                        <span>Sellers Wallet</span>
                    </Link>
                </div>

                <div className="links-of-seller-console-sidebar">
                    <Link to="/seller-console/seller-profile" className={location.pathname === "/seller-console/seller-profile" ? "active" : ""}>
                        <PersonIcon />
                        <span>Profile</span>
                    </Link>
                </div>

                <div className="links-of-seller-console-sidebar">
                    <Link onClick={logoutOfSellerConsole}>
                        <LogoutIcon />
                        <span>Sign-out</span>
                    </Link>
                </div>
            </div>

            <div className="right-side-content-of-seller-console">
                {children}
            </div>
        </div>
    )
}

export default MainSellerConsole;