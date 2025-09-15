"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSoundStore } from "@/store/soundStore";

export default function SoundToggle() {
  // Use separate selectors to avoid creating a new object per render (SSR safe)
  const isSoundEnabled = useSoundStore((state) => state.isSoundEnabled);
  const toggleSound = useSoundStore((state) => state.toggleSound);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const Icon = isSoundEnabled ? Volume2 : VolumeX;
  const label = isSoundEnabled
    ? "Disable completion sound"
    : "Enable completion sound";

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={label}
      title={label}
      className="p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200/70 dark:border-gray-700/70 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
