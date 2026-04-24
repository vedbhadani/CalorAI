import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Food, SwipeRecord, SwipeDirection } from '../types';
import foodsData from '../assets/foods.json';

interface SwipeState {
  foods: Food[];
  currentIndex: number;
  swipeHistory: SwipeRecord[];
  recordSwipe: (food: Food, direction: SwipeDirection) => void;
  undoSwipe: () => void;
  reset: () => void;
}

export const useSwipeStore = create<SwipeState>()(
  persist(
    (set) => ({
      foods: foodsData.foods as Food[],
      currentIndex: 0,
      swipeHistory: [],

      recordSwipe: (food, direction) =>
        set((state) => ({
          swipeHistory: [...state.swipeHistory, { food, direction, timestamp: Date.now() }],
          currentIndex: state.currentIndex + 1,
        })),

      undoSwipe: () =>
        set((state) => {
          if (state.swipeHistory.length === 0) return state;
          return {
            swipeHistory: state.swipeHistory.slice(0, -1),
            currentIndex: Math.max(0, state.currentIndex - 1),
          };
        }),

      reset: () =>
        set({ swipeHistory: [], currentIndex: 0 }),
    }),
    {
      name: 'calorai_swipe_state',
      partialize: (state) => ({
        currentIndex: state.currentIndex,
        swipeHistory: state.swipeHistory,
      }),
    }
  )
);

// Derived selectors — components subscribe only to what they need
export const useLiked = () =>
  useSwipeStore((s) => s.swipeHistory.filter((r) => r.direction === 'like').map((r) => r.food));

export const useDisliked = () =>
  useSwipeStore((s) => s.swipeHistory.filter((r) => r.direction === 'dislike').map((r) => r.food));

export const useSuperlikes = () =>
  useSwipeStore((s) => s.swipeHistory.filter((r) => r.direction === 'superlike').map((r) => r.food));

export const useUnsure = () =>
  useSwipeStore((s) => s.swipeHistory.filter((r) => r.direction === 'unsure').map((r) => r.food));

export const useIsComplete = () =>
  useSwipeStore((s) => s.currentIndex >= s.foods.length);
