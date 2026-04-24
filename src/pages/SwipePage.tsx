import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeContext } from '../context/SwipeContext';
import { useSwipe } from '../hooks/useSwipe';
import { CardStack } from '../components/cards/CardStack';
import { ActionButtons } from '../components/swipe/ActionButtons';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import styles from './SwipePage.module.css';

export const SwipePage = () => {
  const navigate = useNavigate();
  const { foods, currentIndex, isComplete, recordSwipe, undoSwipe } = useSwipeContext();
  const currentFood = foods[currentIndex];

  // Keyboard support (→ ← ↑ ↓ and WASD)
  useSwipe((dir) => {
    if (currentFood) recordSwipe(currentFood, dir);
  }, !isComplete);

  useEffect(() => {
    if (isComplete) navigate('/results');
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
          <CardStack />
        </div>

        {/* 4 Action Buttons */}
        <ActionButtons onAction={(dir) => { if (currentFood) recordSwipe(currentFood, dir); }} />
      </div>
    </div>
  );
};
