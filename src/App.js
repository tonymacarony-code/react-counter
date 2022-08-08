import React, { useState, useEffect } from "react";

import AnimateNumber from "./AnimateNumber";
import "./styles.css";

export default function App() {
  const calculateTimeLeft = () => {
    const difference =
      +new Date("2022-08-12T18:20:00+05:30").getTime() - Date.now();
    let timeLeft = null;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(Math.floor(difference / (1000 * 60 * 60)));
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    if (difference > 0) {
      timeLeft = {
        days: days,
        hours: hours - days * 24,
        minutes: minutes,
        seconds: seconds
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  }, [timeLeft]);

  return (
    <div className="App">
      <AnimateNumber
        value={timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
      />
      :
      <AnimateNumber
        value={timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
      />
      :
      <AnimateNumber
        value={
          timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes
        }
      />
      :
      <AnimateNumber
        value={
          timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds
        }
      />
    </div>
  );
}
