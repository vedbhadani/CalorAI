import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeContext } from '../context/SwipeContext';
import { useSwipe } from '../hooks/useSwipe';
import { CardStack, type CardStackHandle } from '../components/cards/CardStack';
import { ActionButtons } from '../components/swipe/ActionButtons';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import type { SwipeDirection } from '../types';
import styles from './SwipePage.module.css';

export const SwipePage = () => {
  const navigate = useNavigate();
  const { foods, currentIndex, isComplete, undoSwipe } = useSwipeContext();
  const cardStackRef = useRef<CardStackHandle>(null);
  const wasComplete = useRef(isComplete);

  const handleAction = useCallback((dir: SwipeDirection) => {
    cardStackRef.current?.triggerTopCardSwipe(dir);
  }, []);

  // Keyboard support (→ ← ↑ ↓ and WASD)
  useSwipe(handleAction, !isComplete, false);

  useEffect(() => {
    // Only navigate if isComplete just became true this session
    // (i.e. it was false before and is now true — not already true on mount)
    if (!wasComplete.current && isComplete) {
      navigate('/results');
    }
    wasComplete.current = isComplete;
  }, [isComplete, navigate]);

  const progress = (currentIndex / foods.length) * 100;

  return (
    <div className={`page-bg ${styles.page}`}>
      {/* Progress bar at very top */}
      <ProgressBar progress={progress} />

      <div className="app-container">
        <div className={styles.topBar}>
          <button className={styles.undoBtn} onClick={undoSwipe}>↩</button>
          <span className={styles.counter}>{currentIndex}/{foods.length}</span>
          <ThemeToggle />
        </div>

        {/* Card Stack */}
        <div className={styles.cardArea}>
          <CardStack ref={cardStackRef} />
        </div>

        {/* 4 Action Buttons */}
        <ActionButtons onAction={handleAction} />
      </div>
    </div>
  );
};
