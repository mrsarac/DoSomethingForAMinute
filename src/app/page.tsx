"use client";

import React, { useState, useEffect, useRef } from "react";
import { CountdownTimer } from "src/components/CountdownTimer";
import { TIMER_CONFIG } from "src/constants/timer";
import { useTitleStore } from "src/store/titleStore";

export default function Home() {
  const [resetKey, setResetKey] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState<number>(
    TIMER_CONFIG.DEFAULT_SECONDS
  );
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { title, setTitle } = useTitleStore();
    const [storeLoaded, setStoreLoaded] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Simulate store loading
        setTimeout(() => {
            setStoreLoaded(true);
        }, 100);
    }, []);


  const handleReset = () => {
    setResetKey((prev) => prev + 1);
    setCurrentSeconds(TIMER_CONFIG.DEFAULT_SECONDS);
  };

  const handleTimerUpdate = (seconds: number) => {
    setCurrentSeconds(seconds);
  };

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
      setIsEditing(false);
  };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            if (inputRef.current) {
                inputRef.current.blur();
            }
        }
    };

  if (!mounted) {
    return (
      <main className="min-h-screen grid place-items-center text-black px-4">
        <div className="grid gap-6 sm:gap-8">
          <header className={`text-center ${storeLoaded ? 'opacity-100 transition-opacity duration-200' : 'opacity-0'}`}>
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={title}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                onKeyDown={handleKeyDown}
                maxLength={100}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-center bg-transparent border-0 focus:outline-none"
                autoFocus
              />
            ) : (
              <h1
                onClick={handleTitleClick}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif cursor-pointer"
              >
                {title} for a minute
              </h1>
            )}
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              A simple timer to help you focus for one minute
            </p>
          </header>
          <section className="-mt-8 sm:-mt-12" aria-label="Timer Section">
            <CountdownTimer key={resetKey} onTimerUpdate={handleTimerUpdate} />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen grid place-items-center bg-custom-bg text-custom-text">
      <div className="grid gap-6 sm:gap-8">
        <header className={`flex flex-col gap-2 text-center ${storeLoaded ? 'opacity-100 transition-opacity duration-200' : 'opacity-0'}`}>
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={handleKeyDown}
              maxLength={100}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-center bg-transparent border-0 focus:outline-none"
              autoFocus
            />
          ) : (
            <h1
              onClick={handleTitleClick}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif cursor-pointer"
            >
              {title} for a minute
            </h1>
          )}
          <p className="text-sm sm:text-base text-gray-600">
            A simple timer to help you focus for one minute
          </p>
        </header>
        <section className="-mt-4 md:-mt-8" aria-label="Timer Section">
          <CountdownTimer key={resetKey} onTimerUpdate={handleTimerUpdate} />
        </section>
        <footer className="text-center text-xs sm:text-sm text-gray-500">
          {currentSeconds === 0 ? (
            <button
              onClick={handleReset}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm sm:text-base"
            >
              {title} for a minute
            </button>
          ) : (
            <></>
          )}
        </footer>
      </div>
    </main>
  );
}
