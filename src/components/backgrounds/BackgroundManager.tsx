"use client";

import React, { useEffect, useState } from "react";
import { useBackgroundStore } from "@/store/backgroundStore";
import AnimatedBlobs from "./AnimatedBlobs";
import PixelFlicker from "./PixelFlicker";

const registry = {
  animatedBlobs: AnimatedBlobs,
} as const;

export default function BackgroundManager() {
  const enabled = useBackgroundStore((s) => s.enabled);
  const type = useBackgroundStore((s) => s.type);
  const pixelFlickerEnabled = useBackgroundStore((s) => s.pixelFlickerEnabled);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const Comp = registry[type] ?? AnimatedBlobs;
  return (
    <>
      {enabled && <Comp />}
      {pixelFlickerEnabled && <PixelFlicker />}
    </>
  );
}
