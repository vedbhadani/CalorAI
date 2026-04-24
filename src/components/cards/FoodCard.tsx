import { motion, useMotionValue, useTransform, useAnimation, type PanInfo } from 'framer-motion';
import type { Food, SwipeDirection } from '../../types';
import { foodEmojiMap, getCardText } from '../../assets/foodEmojis';
import styles from './FoodCard.module.css';

interface Props {
  food: Food;
  onSwipe: (dir: SwipeDirection) => void;
  isTop: boolean;
  stackIndex: number;
}

export const FoodCard = ({ food, onSwipe, isTop, stackIndex }: Props) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Visual transforms driven by drag position
  const rotate       = useTransform(x, [-200, 200], [-25, 25]);
  const likeOpacity  = useTransform(x, [0, 80], [0, 1]);
  const noOpacity    = useTransform(x, [-80, 0], [1, 0]);
  const upOpacity    = useTransform(y, [-80, 0], [1, 0]);
  const downOpacity  = useTransform(y, [0, 80], [0, 1]);

  const triggerSwipe = async (dir: SwipeDirection) => {
    const targets: Record<SwipeDirection, { x: number; y: number }> = {
      like:      { x: 500, y: 0 },
      dislike:   { x: -500, y: 0 },
      superlike: { x: 0, y: -500 },
      unsure:    { x: 0, y: 500 },
    };
    await controls.start({ ...targets[dir], opacity: 0, transition: { duration: 0.3 } });
    onSwipe(dir);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset: { x: ox, y: oy }, velocity: { x: vx, y: vy } } = info;
    const THRESHOLD = 120;
    const VELOCITY = 500;

    if (Math.abs(ox) > Math.abs(oy)) {
      if (ox > THRESHOLD || vx > VELOCITY)  triggerSwipe('like');
      else if (ox < -THRESHOLD || vx < -VELOCITY) triggerSwipe('dislike');
      else controls.start({ x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 300 } });
    } else {
      if (oy < -THRESHOLD || vy < -VELOCITY) triggerSwipe('superlike');
      else if (oy > THRESHOLD || vy > VELOCITY) triggerSwipe('unsure');
      else controls.start({ x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 300 } });
    }
  };

  // Stack visual offset for cards behind the top
  const stackStyle = stackIndex === 0
    ? {}
    : { scale: 1 - stackIndex * 0.04, y: stackIndex * 10, opacity: 1 - stackIndex * 0.15 };

  return (
    <motion.div
      className={styles.card}
      style={{ x, y, rotate, zIndex: 10 - stackIndex, ...stackStyle }}
      animate={controls}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileTap={isTop ? { cursor: 'grabbing' } : undefined}
    >
      {/* Direction badges — opacity tied to drag */}
      <motion.div className={`${styles.badge} ${styles.badgeTopRight}`} style={{ opacity: likeOpacity, background: '#4BD883', rotate: '16deg' }}>
        <span className={styles.badgeText}>Yes</span>
      </motion.div>
      <motion.div className={`${styles.badge} ${styles.badgeTopLeft}`} style={{ opacity: noOpacity, background: '#F95341', rotate: '-16deg' }}>
        <span className={styles.badgeText}>No</span>
      </motion.div>
      <motion.div className={`${styles.badge} ${styles.badgeTopCenter}`} style={{ opacity: upOpacity, background: 'linear-gradient(180deg, #7843FF 0%, #4CC6FF 100%)' }}>
        <span className={styles.badgeText} style={{ color: '#000' }}>Superlike 🌟</span>
      </motion.div>
      <motion.div className={`${styles.badge} ${styles.badgeBottomCenter}`} style={{ opacity: downOpacity, background: '#BFBFBF' }}>
        <span className={styles.badgeText} style={{ color: '#000' }}>Unsure</span>
      </motion.div>

      {/* Card content */}
      <div className={styles.content}>
        <span className={styles.emoji}>{foodEmojiMap[food.id] ?? '🍽️'}</span>
        <p className={styles.label}>{getCardText(food.name)}</p>
      </div>
    </motion.div>
  );
};
