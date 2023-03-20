import React from 'react';
import { useStopwatch } from 'react-timer-hook';

function MyTime() {
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
  } = useStopwatch({ autoStart: true });


  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '40px'}}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={start}>Start</button>
    </div>
  );
}

export default MyTime;