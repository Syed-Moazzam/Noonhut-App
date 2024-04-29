import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SavingsIcon from '@mui/icons-material/Savings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
let arrayOfBuyersWallet = [
    {
        icon: <AccountBalanceWalletIcon/>,
        heading: "Total Balance",
        description: "281",
        arrowUp: "fa-solid fa-arrow-up",
        value: "1%",
        bottomDescription: "than last month"
    },
    {
        icon: <CardGiftcardIcon/>,
        heading: "Gift Cards",
        description: "10",
        arrowUp: "fa-solid fa-arrow-up",
        value: "55%",
        bottomDescription: "than last week"
    },
    {
        icon: <LocalOfferIcon/>,
        heading: "Vouchers",
        description: "10",
        arrowUp: "fa-solid fa-arrow-up",
        value: "55%",
        bottomDescription: "than last month"
    },
    {
        icon: <CurrencyExchangeIcon/>,
        heading: "Cashback",
        description: "300",
        arrowUp: "fa-solid fa-arrow-up",
        value: "10%",
        bottomDescription: "than last month"
    },
    {
        icon: <SavingsIcon/>,
        heading: "Savings",
        description: "2000",
        arrowUp: "fa-solid fa-arrow-up",
        value: "1%",
        bottomDescription: "than last month",
    },
    {
        icon: <MonetizationOnIcon/>,
        heading: "Referral Earnings",
        description: "2,300",
        arrowUp: "fa-solid fa-arrow-up",
        value: "3%",
        bottomDescription: "than last month"
    },
];

export default arrayOfBuyersWallet;