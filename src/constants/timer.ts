export const TIMER_CONFIG = {
  DEFAULT_SECONDS: 60,
  UPDATE_INTERVAL: 1000, // 1 second in milliseconds
  MIN_SECONDS: 0,
  MAX_SPEED_MULTIPLIER: 3, // Maximum speed multiplier for the timer
  ACCELERATION_INTERVAL: 1000, // Interval for increasing the acceleration factor
  ACCELERATION_MULTIPLIER: 2, // Multiplier for the acceleration factor
  
} as const;
