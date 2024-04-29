import React from 'react'
import arrayOfBuyersWallet from './ArrayOfBuyersWallet'
import BoxOfBuyersWallet from './BoxOfBuyersWallet'
import "./BuyersWallet.css"

export default function BuyersWallet() {
  return (
    <div className="container-of-buyers-wallet">
      <h2>My Wallet</h2>
      <div className="sub-container-of-buyers-wallet">
        {arrayOfBuyersWallet.map((eachObject) => {
          return <BoxOfBuyersWallet eachObject={eachObject} key={eachObject.heading}/>
        })}
      </div>
    </div>
  )
}
