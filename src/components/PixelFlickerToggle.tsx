"use client";

import { useEffect, useState } from "react";
import { Sparkles, SparklesIcon } from "lucide-react";
import { useBackgroundStore } from "@/store/backgroundStore";

export default function PixelFlickerToggle() {
  const enabled = useBackgroundStore((s) => s.pixelFlickerEnabled);
  const toggle = useBackgroundStore((s) => s.togglePixelFlicker);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const Icon = Sparkles;
  const label = enabled ? "Pixel effect: on" : "Pixel effect: off";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={label}
      title={label}
      className="p-2.5 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-200/70 dark:border-gray-700/70 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

