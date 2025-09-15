"use client";

import { useEffect, useState } from "react";
import { Image, ImageOff } from "lucide-react";
import { useBackgroundStore } from "@/store/backgroundStore";

export default function BackgroundToggle() {
  const enabled = useBackgroundStore((s) => s.enabled);
  const toggleEnabled = useBackgroundStore((s) => s.toggleEnabled);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const Icon = enabled ? Image : ImageOff;
  const label = enabled ? "Disable background" : "Enable background";

  return (
    <button
      type="button"
      onClick={toggleEnabled}
      aria-label={label}
      title={label}
      className="p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200/70 dark:border-gray-700/70 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

