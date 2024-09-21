import React, { useEffect, useState } from "react";

const Home = () => {
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);

  useEffect(() => {
    let interval;
    if (run) {
      interval = setInterval(() => {
        console.log(time);
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    if (time === 10) {
      setRun(false);
    }
    return () => clearInterval(interval);
  }, [run, time]);

  return (
    <div className="home">
      <h1>{time}</h1>
      <button onClick={() => setRun(true)}>Start</button>
      <button onClick={() => setRun(false)}>Stop</button>
    </div>
  );
};

export default Home;
