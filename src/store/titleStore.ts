"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TitleState {
  title: string;
  setTitle: (title: string) => void;
}

export const useTitleStore = create<TitleState>()(
  persist(
    (set) => ({
      title: 'Do Something',
      setTitle: (title) => set({ title }),
    }),
    {
      name: 'title-storage',
      // Defer applying persisted state until client, to avoid SSR mismatches
      skipHydration: true,
    }
  )
);
