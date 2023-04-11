import { useStopwatch } from "react-timer-hook";

  

export function useCustomStopWatch(autoStart: boolean  = false){
    const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart });

  return {
    seconds, minutes, hours, isRunning, start, pause, reset
  }
}