/* import React from 'react';
import { useStopwatch } from 'react-timer-hook';

function MyTimeEnd() {
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  const stopTimer = () => {
    pause();
  };

  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '40px'}}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

export default MyTimeEnd;
 */