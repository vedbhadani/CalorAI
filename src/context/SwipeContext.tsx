import { createContext, useContext, useState, useEffect } from 'react';
import type { Food, SwipeRecord, SwipeDirection } from '../types';
import foodsData from '../assets/foods.json';

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

const STORAGE_KEY = 'calorai_swipe_state';

export const SwipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [foods] = useState<Food[]>(foodsData.foods as Food[]);
  
  // Initialize from localStorage
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_index`);
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [swipeHistory, setSwipeHistory] = useState<SwipeRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_history`);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_index`, currentIndex.toString());
    localStorage.setItem(`${STORAGE_KEY}_history`, JSON.stringify(swipeHistory));
  }, [currentIndex, swipeHistory]);

  const liked    = swipeHistory.filter(r => r.direction === 'like').map(r => r.food);
  const disliked = swipeHistory.filter(r => r.direction === 'dislike').map(r => r.food);
  const superlikes = swipeHistory.filter(r => r.direction === 'superlike').map(r => r.food);
  const unsure   = swipeHistory.filter(r => r.direction === 'unsure').map(r => r.food);
  const isComplete = currentIndex >= foods.length;

  const recordSwipe = (food: Food, direction: SwipeDirection) => {
    setSwipeHistory(h => [...h, { food, direction, timestamp: Date.now() }]);
    setCurrentIndex(i => i + 1);
  };

  const undoSwipe = () => {
    if (swipeHistory.length === 0) return;
    setSwipeHistory(h => h.slice(0, -1));
    setCurrentIndex(i => Math.max(0, i - 1));
  };

  const reset = () => { 
    setSwipeHistory([]); 
    setCurrentIndex(0); 
    localStorage.removeItem(`${STORAGE_KEY}_index`);
    localStorage.removeItem(`${STORAGE_KEY}_history`);
  };

  return (
    <SwipeContext.Provider value={{
      foods, currentIndex, swipeHistory,
      liked, disliked, superlikes, unsure, isComplete,
      recordSwipe, undoSwipe, reset
    }}>
      {children}
    </SwipeContext.Provider>
  );
};

export const useSwipeContext = () => {
  const ctx = useContext(SwipeContext);
  if (!ctx) throw new Error('useSwipeContext must be used inside SwipeProvider');
  return ctx;
};
