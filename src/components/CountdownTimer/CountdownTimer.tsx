'use client'

import React, { useState, useEffect } from 'react';
import { TimerProps } from '@/types/timer';
import { formatTime } from '@/utils/timeFormatter';
import { TIMER_CONFIG } from '@/constants/timer';
import { Source_Serif_4 } from 'next/font/google';

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
});

export const CountdownTimer: React.FC<TimerProps & { onTimerUpdate?: (seconds: number) => void }> = ({
  initialSeconds = TIMER_CONFIG.DEFAULT_SECONDS,
  onComplete,
  onTimerUpdate
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isClient, setIsClient] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [showSpeedMessage, setShowSpeedMessage] = useState(false);
  const [accelerationFactor, setAccelerationFactor] = useState(1);
  

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && seconds > 0) {
        setIsSpacePressed(true);
        setShowSpeedMessage(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        setIsSpacePressed(false);
        setShowSpeedMessage(false);
        setAccelerationFactor(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [seconds]);

  useEffect(() => {
    if (!isClient) return;

    if (seconds <= TIMER_CONFIG.MIN_SECONDS) {
      onComplete?.();
      onTimerUpdate?.(seconds);
      setAccelerationFactor(1);
      setShowSpeedMessage(false);
      return;
    }

    const interval = isSpacePressed
      ? TIMER_CONFIG.UPDATE_INTERVAL / accelerationFactor
      : TIMER_CONFIG.UPDATE_INTERVAL;

    const timer = setInterval(() => {
      setSeconds(prevSeconds => {
        const newSeconds = prevSeconds - 1;
        onTimerUpdate?.(newSeconds);
        return newSeconds;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isClient, seconds, onComplete, onTimerUpdate, isSpacePressed, accelerationFactor]);

  useEffect(() => {
    if (isSpacePressed) {
      const accelerationTimer = setInterval(() => {
        setAccelerationFactor(prevFactor => prevFactor * 2);
      }, 500);

      return () => clearInterval(accelerationTimer);
    }
  }, [isSpacePressed]);

  const timerDisplay = formatTime(seconds);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="min-w-[80px] sm:min-w-[100px] text-center inline-block text-7xl sm:text-8xl md:text-9xl lg:text-[14rem] leading-none tracking-wider font-serif">
        
        
        <div
          className={`${sourceSerif.className} tabular-nums lining-nums tracking-wider`}
          suppressHydrationWarning
          style={{fontVariantNumeric: 'tabular-nums lining-nums', letterSpacing: '0.1em', textSizeAdjust: '100%'}}
        >
          {timerDisplay}
        </div>
      </div>


      <div className="mt-4 h-4">
      {showSpeedMessage && (
        <div>
          <span className="font-bold">{accelerationFactor}x </span> time is accelerating...
        </div>
      )}
      </div>

      
    </div>
  );
};
