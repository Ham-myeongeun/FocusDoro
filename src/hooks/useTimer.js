import { useState, useEffect, useRef, useCallback } from 'react';
import { loadSettings } from '../utils/storage';

export default function useTimer(focusMinProp, breakMinProp) {
  const [focusSec, setFocusSec] = useState(25 * 60);
  const [breakSec, setBreakSec] = useState(5 * 60);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocus, setIsFocus] = useState(true);
  const [session, setSession] = useState(1);
  const [completedToday, setCompletedToday] = useState(0);
  const intervalRef = useRef(null);
  const isFocusRef = useRef(true);
  const focusSecRef = useRef(25 * 60);
  const breakSecRef = useRef(5 * 60);
  const isRunningRef = useRef(false);

  const applySettings = useCallback((focusMin, breakMin) => {
    if (isRunningRef.current) return;
    const f = focusMin * 60;
    const b = breakMin * 60;
    focusSecRef.current = f;
    breakSecRef.current = b;
    setFocusSec(f);
    setBreakSec(b);
    if (isFocusRef.current) setSecondsLeft(f);
    else setSecondsLeft(b);
  }, []);

  useEffect(() => {
    loadSettings().then(({ focusMin, breakMin }) => {
      applySettings(focusMin, breakMin);
    });
  }, [focusMinProp, breakMinProp]);

  const clearTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleSessionEnd = useCallback(() => {
    if (isFocusRef.current) {
      setCompletedToday(p => p + 1);
      setSession(p => p + 1);
      isFocusRef.current = false;
      setIsFocus(false);
      setSecondsLeft(breakSecRef.current);
    } else {
      isFocusRef.current = true;
      setIsFocus(true);
      setSecondsLeft(focusSecRef.current);
    }
    setIsRunning(false);
    isRunningRef.current = false;
  }, []);

  useEffect(() => {
    isRunningRef.current = isRunning;
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
  }, [isRunning]);

  const start = () => { setIsRunning(true); isRunningRef.current = true; };
  const pause = () => { setIsRunning(false); isRunningRef.current = false; };
  const reset = () => {
    clearTimer();
    setIsRunning(false);
    isRunningRef.current = false;
    setSecondsLeft(isFocusRef.current ? focusSecRef.current : breakSecRef.current);
  };
  const skip = () => {
    clearTimer();
    setIsRunning(false);
    isRunningRef.current = false;
    handleSessionEnd();
  };

  const total = isFocus ? focusSec : breakSec;
  const progress = total > 0 ? 1 - secondsLeft / total : 0;

  return { secondsLeft, isRunning, isFocus, session, completedToday, progress, start, pause, reset, skip, applySettings };
}