import { useState, useEffect, useRef, useCallback } from 'react';
import { TIMER_CONFIG } from '../constants/timer';

export default function useTimer(focusDuration, breakDuration) {
  const focus = focusDuration ?? TIMER_CONFIG.FOCUS;
  const brk = breakDuration ?? TIMER_CONFIG.SHORT_BREAK;

  const [secondsLeft, setSecondsLeft] = useState(focus);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [session, setSession] = useState(1);
  const [completedToday, setCompletedToday] = useState(0);
  const intervalRef = useRef(null);

  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (!isRunning) { clearTimer(); return; }
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          handleSessionEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  }, [isRunning, isFocus]);

  const handleSessionEnd = useCallback(() => {
    if (isFocus) {
      setCompletedToday(p => p + 1);
      setSession(p => p + 1);
      setIsFocus(false);
      setSecondsLeft(brk);
    } else {
      setIsFocus(true);
      setSecondsLeft(focus);
    }
    setIsRunning(false);
  }, [isFocus, focus, brk]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    clearTimer();
    setIsRunning(false);
    setSecondsLeft(isFocus ? focus : brk);
  };
  const skip = () => {
    clearTimer();
    setIsRunning(false);
    handleSessionEnd();
  };

  const progress = isFocus
    ? 1 - secondsLeft / focus
    : 1 - secondsLeft / brk;

  return { secondsLeft, isRunning, isFocus, session, completedToday, progress, start, pause, reset, skip };
}