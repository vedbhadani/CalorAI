import { motion } from 'framer-motion';
import type { SwipeDirection } from '../../types';
import styles from './ActionButtons.module.css';

const BUTTONS = [
  { dir: 'dislike'   as SwipeDirection, icon: '✕', label: 'Swipe Left',  color: 'var(--btn-dislike)'   },
  { dir: 'unsure'    as SwipeDirection, icon: '?', label: 'Not Sure',    color: 'var(--btn-unsure)'    },
  { dir: 'superlike' as SwipeDirection, icon: '★', label: 'Super Like',  color: 'var(--btn-superlike)' },
  { dir: 'like'      as SwipeDirection, icon: '♥', label: 'Swipe Right', color: 'var(--btn-like)'      },
];

export const ActionButtons = ({ onAction }: { onAction: (dir: SwipeDirection) => void }) => (
  <div className={styles.row}>
    {BUTTONS.map(({ dir, icon, label, color }) => (
      <div key={dir} className={styles.btnWrapper}>
        <motion.button
          className={styles.btn}
          style={{ background: color }}
          onClick={() => onAction(dir)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
        >
          <span className={styles.icon}>{icon}</span>
        </motion.button>
        <span className={styles.label}>{label}</span>
      </div>
    ))}
  </div>
);
