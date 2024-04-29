import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

let ArrayOfSellerWallet = [
    {
        icon: <AccountBalanceWalletIcon/>,
        heading: "Total Balance",
        description: "281",
        arrowUp: "fa-solid fa-arrow-up",
        value: "1%",
        bottomDescription: "than last month"
    },
    {
        icon: <AttachMoneyIcon/>,
        heading: "Funds Available For Settlement",
        description: "2,300",
        arrowUp: "fa-solid fa-arrow-up",
        value: "55%",
        bottomDescription: "than last week"
    },
    {
        icon: <MonetizationOnIcon/>,
        heading: "Recent Payouts",
        description: "30k",
        arrowUp: "fa-solid fa-arrow-up",
        value: "55%",
        bottomDescription: "than last month"
    }
];

export default ArrayOfSellerWallet;