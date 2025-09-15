"use client";

import React, { useEffect, useState } from "react";
import { useBackgroundStore } from "@/store/backgroundStore";
import AnimatedBlobs from "./AnimatedBlobs";

const registry = {
  animatedBlobs: AnimatedBlobs,
} as const;

export default function BackgroundManager() {
  const enabled = useBackgroundStore((s) => s.enabled);
  const type = useBackgroundStore((s) => s.type);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || !enabled) return null;

  const Comp = registry[type] ?? AnimatedBlobs;
  return <Comp />;
}

