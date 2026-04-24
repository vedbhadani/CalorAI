import { memo } from 'react';
import { motion } from 'framer-motion';
import type { SwipeDirection } from '../../types';
import styles from './ActionButtons.module.css';

// Import icons from assets
import swipeleftIcon from '../../assets/swipeleft.svg';
import swiperightIcon from '../../assets/swiperight.svg';
import notsureIcon from '../../assets/notsure.svg';
import superlikeIcon from '../../assets/superlike.svg';

const BUTTONS = [
  { dir: 'dislike'   as SwipeDirection, icon: swipeleftIcon,  label: 'Swipe Left',  isLarge: true },
  { dir: 'unsure'    as SwipeDirection, icon: notsureIcon,    label: 'Not Sure',    isLarge: false },
  { dir: 'superlike' as SwipeDirection, icon: superlikeIcon,  label: 'Super Like',  isLarge: false },
  { dir: 'like'      as SwipeDirection, icon: swiperightIcon, label: 'Swipe Right', isLarge: true },
];

export const ActionButtons = memo(({ onAction }: { onAction: (dir: SwipeDirection) => void }) => (
  <div className={styles.row} role="toolbar" aria-label="Swipe actions">
    {BUTTONS.map(({ dir, icon, label, isLarge }) => (
      <div key={dir} className={styles.btnWrapper}>
        <motion.button
          className={`${styles.btn} ${isLarge ? styles.btnLarge : styles.btnSmall} ${styles[dir]}`}
          onClick={() => onAction(dir)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          aria-label={label}
        >
          <img src={icon} alt={label} className={styles.iconImg} />
        </motion.button>
        <span className={styles.label}>{label}</span>
      </div>
    ))}
  </div>
));

ActionButtons.displayName = 'ActionButtons';
