'use client'

import React, { useState, useEffect, useRef } from 'react';
import { TimerProps } from '@/types/timer';
import { formatTime } from '@/utils/timeFormatter';
import { TIMER_CONFIG } from '@/constants/timer';
import { Source_Serif_4 } from 'next/font/google';
import { useSoundStore } from '@/store/soundStore';

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
});

const COMPLETION_SOUND_SRC =
  'data:audio/wav;base64,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';

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isAudioUnlockedRef = useRef(false);
  const isSoundEnabled = useSoundStore((state) => state.isSoundEnabled);


  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const audio = new Audio(COMPLETION_SOUND_SRC);
    audio.preload = 'auto';
    audio.volume = 0.35;
    audioRef.current = audio;

    const unlockAudio = () => {
      const instance = audioRef.current;
      if (!instance || isAudioUnlockedRef.current) {
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        return;
      }

      instance.muted = true;
      const playPromise = instance.play();

      if (playPromise) {
        playPromise
          .then(() => {
            instance.pause();
            instance.currentTime = 0;
            instance.muted = false;
            isAudioUnlockedRef.current = true;
            window.removeEventListener('pointerdown', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
          })
          .catch(() => {
            instance.muted = false;
          });
      } else {
        instance.muted = false;
        isAudioUnlockedRef.current = true;
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      }
    };

    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      audioRef.current = null;
    };
  }, [isClient]);

  useEffect(() => {
    if (!isSoundEnabled && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isSoundEnabled]);

  useEffect(() => {
    if (!isClient) return;
    if (!isSoundEnabled) return;
    if (seconds !== TIMER_CONFIG.MIN_SECONDS) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.muted = false;
    const playPromise = audio.play();
    if (playPromise) {
      playPromise.catch(() => {
        /* Swallow autoplay rejection to avoid console noise */
      });
    }
  }, [seconds, isClient, isSoundEnabled]);

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
