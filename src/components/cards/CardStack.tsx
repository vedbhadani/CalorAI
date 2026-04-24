import { AnimatePresence } from 'framer-motion';
import { useSwipeContext } from '../../context/SwipeContext';
import { FoodCard } from './FoodCard';

export const CardStack = () => {
  const { foods, currentIndex, recordSwipe } = useSwipeContext();

  // Show up to 3 cards in the stack
  const visibleFoods = foods.slice(currentIndex, currentIndex + 3);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatePresence>
        {visibleFoods.map((food, i) => (
          <FoodCard
            key={food.id}
            food={food}
            onSwipe={(dir) => recordSwipe(food, dir)}
            isTop={i === 0}
            stackIndex={i}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
