"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useTheme } from "next-themes";
import { CountdownTimer } from "src/components/CountdownTimer";
import { TIMER_CONFIG } from "src/constants/timer";
import { useTitleStore } from "src/store/titleStore";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const hexToRgb = (hex: string): [number, number, number] => {
  const sanitized = hex.replace("#", "");
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((char) => char + char)
          .join("")
      : sanitized.padStart(6, "0").slice(0, 6);

  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);

  return [r, g, b];
};

const interpolateColor = (start: string, end: string, factor: number) => {
  const [sr, sg, sb] = hexToRgb(start);
  const [er, eg, eb] = hexToRgb(end);
  const clampedFactor = clamp(factor, 0, 1);

  const r = Math.round(sr + (er - sr) * clampedFactor);
  const g = Math.round(sg + (eg - sg) * clampedFactor);
  const b = Math.round(sb + (eb - sb) * clampedFactor);

  return `rgb(${r}, ${g}, ${b})`;
};

export default function Home() {
  const [resetKey, setResetKey] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState<number>(
    TIMER_CONFIG.DEFAULT_SECONDS
  );
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { title, setTitle } = useTitleStore();
  const [storeLoaded, setStoreLoaded] = useState(false);
  const [storeHydrated, setStoreHydrated] = useState(false);

  const isDarkMode = (resolvedTheme ?? theme) === "dark";

  const countdownProgress = useMemo(() => {
    const normalizedSeconds = clamp(
      currentSeconds,
      TIMER_CONFIG.MIN_SECONDS,
      TIMER_CONFIG.DEFAULT_SECONDS
    );
    return 1 - normalizedSeconds / TIMER_CONFIG.DEFAULT_SECONDS;
  }, [currentSeconds]);

  const { baseColor, accentColor } = useMemo(() => {
    if (isDarkMode) {
      const background = interpolateColor("#111827", "#312E81", countdownProgress);
      const accent = interpolateColor("#1F2937", "#4338CA", countdownProgress);
      return { baseColor: background, accentColor: accent };
    }

    const background = interpolateColor("#EDEDED", "#FFE4E6", countdownProgress);
    const accent = interpolateColor("#F4F4F5", "#FBCFE8", countdownProgress);
    return { baseColor: background, accentColor: accent };
  }, [countdownProgress, isDarkMode]);

  const dynamicBackgroundStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at 50% 20%, ${accentColor} 0%, ${baseColor} 55%, ${baseColor} 100%)`,
      backgroundColor: baseColor,
      transition: "background 600ms ease, background-color 600ms ease",
    }),
    [accentColor, baseColor]
  );
  const appliedBackgroundStyle = mounted ? dynamicBackgroundStyle : undefined;

  useEffect(() => {
    setMounted(true);
    // Ensure persisted Zustand state is applied on client
    const titlePersist = useTitleStore.persist;

    const unsubTitle = titlePersist.onFinishHydration(() => {
      setStoreHydrated(true);
    });
    if (titlePersist.hasHydrated?.()) {
      setStoreHydrated(true);
    } else {
      titlePersist.rehydrate();
    }

    // Simulate small fade-in after store load
    const t = setTimeout(() => setStoreLoaded(true), 100);
    return () => {
      unsubTitle();
      clearTimeout(t);
    };
  }, []);


  const handleReset = useCallback(() => {
    setResetKey((prev) => prev + 1);
    setCurrentSeconds(TIMER_CONFIG.DEFAULT_SECONDS);
  }, []);

  const handleTimerUpdate = useCallback((seconds: number) => {
    setCurrentSeconds(seconds);
  }, []);

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

  if (!mounted || !storeHydrated) {
    // Render a loading state or a consistent structure on the server and initial client render.
    return (
      <main
        className="min-h-screen grid place-items-center bg-custom-bg text-custom-text dark:bg-gray-900 dark:text-gray-100"
        style={appliedBackgroundStyle}
      >
        <div className="grid gap-6 sm:gap-8">
          <header className={`flex flex-col gap-2 text-center opacity-0`}>
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif cursor-pointer"
              suppressHydrationWarning
            >
              {title} for a minute
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              A simple timer to help you focus for one minute
            </p>
          </header>
          <section className="-mt-4 md:-mt-8" aria-label="Timer Section">
            <CountdownTimer key={resetKey} onTimerUpdate={handleTimerUpdate} />
          </section>
          <footer className="text-center text-xs sm:text-sm text-gray-500">
          </footer>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen grid place-items-center bg-custom-bg text-custom-text dark:bg-gray-900 dark:text-gray-100"
      style={appliedBackgroundStyle}
    >
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
              suppressHydrationWarning
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
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 rounded-lg transition-colors text-sm sm:text-base"
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
