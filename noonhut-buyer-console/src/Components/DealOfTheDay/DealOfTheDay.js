import React from 'react'
import "./DealOfTheDay.css"
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"

export default function DealOfTheDay() {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const countDownTimer = () => {
    let targetDate = new Date("Oct 19, 2022").getTime();

    let interval = setInterval(()=>{
      let currentDate = new Date().getTime();
      let distance = targetDate - currentDate;

      let dys = Math.floor(distance / (24 * 60 * 60 * 1000));
      let hrs = Math.floor((distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
      let mins = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      let sec = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance <= 0)
      {
        clearInterval(interval);
      }
      else
      {
        setDays(dys);
        setHours(hrs);
        setMinutes(mins);
        setSeconds(sec);
      }
    }, 1000)
  };

  useEffect(() => {
    countDownTimer();
  });
  
  return (
    <div className='deal-of-the-day-container'>
        <div className="text-of-deal-container">
            <h5>Best Price For You</h5>
            <h1>Deal of the day</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium ab veniam soluta doloremque vero velit.</p>
            <h2><Link>Spinach</Link></h2>
            <p id='price-of-deal-of-the-day'><span>$10</span> now $5 only</p>

            <div className="container-of-timer">
              <div className='days-div'>
                <p>{days}</p>
                <span>DAYS</span>
              </div>

              <div className="hours-div">
                <p>{hours}</p>
                <span>HOURS</span>
              </div>

              <div className="minutes-div">
                <p>{minutes}</p>
                <span>MINUTES</span>
              </div>

              <div className="seconds-div">
                <p>{seconds}</p>
                <span>SECONDS</span>
              </div>
            </div>
        </div>
    </div>
  )
}
