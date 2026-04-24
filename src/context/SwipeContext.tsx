import { createContext, useContext, useMemo, useCallback } from 'react';
import type { Food, SwipeRecord, SwipeDirection } from '../types';
import { useSwipeStore } from '../store/useSwipeStore';

interface SwipeContextType {
  foods: Food[];
  currentIndex: number;
  swipeHistory: SwipeRecord[];
  liked: Food[];
  disliked: Food[];
  superlikes: Food[];
  unsure: Food[];
  isComplete: boolean;
  recordSwipe: (food: Food, direction: SwipeDirection) => void;
  undoSwipe: () => void;
  reset: () => void;
}

const SwipeContext = createContext<SwipeContextType | null>(null);

/**
 * SwipeProvider wraps the Zustand store with React Context so consumers
 * can access swipe state via either useSwipeContext() (Context API) or
 * useSwipeStore() (Zustand) — satisfying both requirements from the spec.
 */
export const SwipeProvider = ({ children }: { children: React.ReactNode }) => {
  const foods = useSwipeStore((s) => s.foods);
  const currentIndex = useSwipeStore((s) => s.currentIndex);
  const swipeHistory = useSwipeStore((s) => s.swipeHistory);
  const storeRecordSwipe = useSwipeStore((s) => s.recordSwipe);
  const storeUndoSwipe = useSwipeStore((s) => s.undoSwipe);
  const storeReset = useSwipeStore((s) => s.reset);

  // Memoize derived arrays to avoid re-filtering on every render
  const liked = useMemo(
    () => swipeHistory.filter((r) => r.direction === 'like').map((r) => r.food),
    [swipeHistory]
  );
  const disliked = useMemo(
    () => swipeHistory.filter((r) => r.direction === 'dislike').map((r) => r.food),
    [swipeHistory]
  );
  const superlikes = useMemo(
    () => swipeHistory.filter((r) => r.direction === 'superlike').map((r) => r.food),
    [swipeHistory]
  );
  const unsure = useMemo(
    () => swipeHistory.filter((r) => r.direction === 'unsure').map((r) => r.food),
    [swipeHistory]
  );
  const isComplete = currentIndex >= foods.length;

  // Stable callback references
  const recordSwipe = useCallback(
    (food: Food, direction: SwipeDirection) => storeRecordSwipe(food, direction),
    [storeRecordSwipe]
  );
  const undoSwipe = useCallback(() => storeUndoSwipe(), [storeUndoSwipe]);
  const reset = useCallback(() => storeReset(), [storeReset]);

  const value = useMemo(
    () => ({
      foods, currentIndex, swipeHistory,
      liked, disliked, superlikes, unsure, isComplete,
      recordSwipe, undoSwipe, reset,
    }),
    [foods, currentIndex, swipeHistory, liked, disliked, superlikes, unsure, isComplete, recordSwipe, undoSwipe, reset]
  );

  return (
    <SwipeContext.Provider value={value}>
      {children}
    </SwipeContext.Provider>
  );
};

export const useSwipeContext = () => {
  const ctx = useContext(SwipeContext);
  if (!ctx) throw new Error('useSwipeContext must be used inside SwipeProvider');
  return ctx;
};
