import React from 'react'
import "./BoxOfBuyersWallet.css"

export default function BoxOfBuyersWallet({eachObject}) {
  return (
    <div className='container-of-box'>
        <div className="box-of-buyers-wallet">
            <div className="div-for-icons-and-description">
                <div className='div-for-icon-of-buyers-wallet'>{eachObject.icon}</div>
                <div className="description">
                    <p>{eachObject.heading}</p>
                    <h4>{eachObject.description}</h4>
                </div>
            </div>
            <hr />
            <div className="bottom-description">
                <div id='first-div-of-bottom-description'>
                    <span className={eachObject.arrowUp} id="arrow-up-span-fo-bottom-description"></span>
                    <span>{eachObject.value}</span>
                </div>
                <div>{eachObject.bottomDescription}</div>
            </div>
        </div>
    </div>
  )
}
