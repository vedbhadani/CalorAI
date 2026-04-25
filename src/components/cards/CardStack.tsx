import { forwardRef, useRef, useImperativeHandle } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSwipeContext } from '../../context/SwipeContext';
import { FoodCard, type FoodCardHandle } from './FoodCard';
import type { SwipeDirection } from '../../types';

export interface CardStackHandle {
  triggerTopCardSwipe: (dir: SwipeDirection) => void;
}

export const CardStack = forwardRef<CardStackHandle, object>((_, ref) => {
  const { foods, currentIndex, recordSwipe } = useSwipeContext();
  const cardRefs = useRef<Map<number, FoodCardHandle>>(new Map());

  // Show up to 3 cards in the stack
  const visibleFoods = foods.slice(currentIndex, currentIndex + 3);

  useImperativeHandle(ref, () => ({
    triggerTopCardSwipe: (dir: SwipeDirection) => {
      const topFoodId = visibleFoods[0]?.id;
      if (topFoodId !== undefined) {
        cardRefs.current.get(topFoodId)?.triggerSwipe(dir);
      }
    },
  }));

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatePresence>
        {visibleFoods.map((food, i) => (
          <FoodCard
            key={food.id}
            ref={(node) => {
              if (node) cardRefs.current.set(food.id, node);
              else cardRefs.current.delete(food.id);
            }}
            food={food}
            onSwipe={(dir) => recordSwipe(food, dir)}
            isTop={i === 0}
            stackIndex={i}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

CardStack.displayName = 'CardStack';
