"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type BackgroundType = "animatedBlobs" | "none"; // extendable (e.g., "particles", "canvasNoise")

interface BackgroundState {
  enabled: boolean;
  type: BackgroundType;
  toggleEnabled: () => void;
  setEnabled: (value: boolean) => void;
  setType: (type: BackgroundType) => void;
}

export const useBackgroundStore = create<BackgroundState>()(
  persist(
    (set) => ({
      enabled: true,
      type: "animatedBlobs",
      toggleEnabled: () => set((s) => ({ enabled: !s.enabled })),
      setEnabled: (value) => set({ enabled: value }),
      setType: (type) => set({ type }),
    }),
    {
      name: "background-preferences",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
);

