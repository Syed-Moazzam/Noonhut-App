import React from 'react'
import "./SportsEvent.css"

export default function SportsEvent() {
  return (
    <div className='container-of-sports-events'>
        <h1>FIFA World Cup 2022</h1>
        <h4>Bet On Your Favourite Winning Team</h4>
        <table className='table-of-sport-event'>
            <tbody>
                <tr>
                    <th>Country A</th>
                    <th></th>
                    <th>Country B</th>
                    <th>Match Date</th>
                    <th>Kick Off Time</th>
                    <th>Timer</th>
                </tr>
            </tbody>
            
            <tbody>
                <tr>
                    <td className='td-element-of-betting-btn'>
                        <button className='btn-for-team-bet-in-table'>Brazil</button>
                    </td>
                    <td>VS</td>
                    <td className='td-element-of-betting-btn'>
                        <button className='btn-for-team-bet-in-table'>Germany</button>
                    </td>
                    <td>10-05-2022</td>
                    <td>01:00 P.M.</td>
                    <td>60 Minutes</td>
                </tr>
            </tbody>

            <tbody>
                <tr>
                    <td className='td-element-of-betting-btn'>
                        <button className='btn-for-team-bet-in-table'>Argentina</button>
                    </td>
                    <td>VS</td>
                    <td className='td-element-of-betting-btn'>
                        <button className='btn-for-team-bet-in-table'>Porugal</button>
                    </td>
                    <td>10-05-2022</td>
                    <td>03:00 P.M.</td>
                    <td>60 Minutes</td>
                </tr>
            </tbody>
            
            <tbody>
                <tr>
                    <td className='td-element-of-betting-btn'>
                        <button className='btn-for-team-bet-in-table'>England</button>
                    </td>
                    <td>VS</td>
                    <td className='td-element-of-betting-btn'>
                        <button className='btn-for-team-bet-in-table'>France</button>
                    </td>
                    <td>10-05-2022</td>
                    <td>05:00 P.M.</td>
                    <td>60 Minutes</td>
                </tr>
            </tbody>

            <tbody>
                <tr>
                    <td className='td-element-of-betting-btn'>
                        <button className='btn-for-team-bet-in-table'>Denmark</button>
                    </td>
                    <td>VS</td>
                    <td className='td-element-of-betting-btn'>
                        <button className='btn-for-team-bet-in-table'>Uruguay</button>
                    </td>
                    <td>10-05-2022</td>
                    <td>07:00 P.M.</td>
                    <td>60 Minutes</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
