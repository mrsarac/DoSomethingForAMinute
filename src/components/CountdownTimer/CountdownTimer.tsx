'use client'

import React, { useState, useEffect } from 'react';
import { TimerProps } from '@/types/timer';
import { formatTime } from '@/utils/timeFormatter';
import { TIMER_CONFIG } from '@/constants/timer';

export const CountdownTimer: React.FC<TimerProps & { onTimerUpdate?: (seconds: number) => void }> = ({
  initialSeconds = TIMER_CONFIG.DEFAULT_SECONDS,
  onComplete,
  onTimerUpdate
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (seconds <= TIMER_CONFIG.MIN_SECONDS) {
      onComplete?.();
      onTimerUpdate?.(seconds);
      return;
    }
    
    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        const newSeconds = prevSeconds - 1;
        onTimerUpdate?.(newSeconds);
        return newSeconds;
      });
    }, TIMER_CONFIG.UPDATE_INTERVAL);

    return () => clearInterval(timer);
  }, [mounted, onComplete, onTimerUpdate]);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="min-w-[100px] text-center inline-block text-[14rem] leading-none tracking-wider font-serif">
          {formatTime(initialSeconds)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="min-w-[100px] text-center inline-block text-[14rem] leading-none tracking-wider font-serif">
        {formatTime(seconds)}
      </div>
    </div>
  );
};
