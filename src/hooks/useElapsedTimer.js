import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for elapsed timer that auto-resets after 10 minutes
 * Returns elapsed time in seconds and a manual reset function
 */
export function useElapsedTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef(null);

  const MAX_TIME = 10 * 60; // 10 minutes in seconds

  const reset = useCallback(() => {
    setElapsed(0);
    setIsActive(true);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setElapsed(prev => {
        const newElapsed = prev + 1;

        // Auto-reset after 10 minutes
        if (newElapsed >= MAX_TIME) {
          setIsActive(false);
          return 0;
        }

        return newElapsed;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);

  return {
    elapsed,
    isActive,
    reset,
    minutes: Math.floor(elapsed / 60),
    seconds: elapsed % 60
  };
}
