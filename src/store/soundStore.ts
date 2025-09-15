"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SoundState {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  setSoundEnabled: (value: boolean) => void;
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      isSoundEnabled: true,
      toggleSound: () =>
        set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
      setSoundEnabled: (value) => set({ isSoundEnabled: value }),
    }),
    {
      name: "sound-preferences",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
);
