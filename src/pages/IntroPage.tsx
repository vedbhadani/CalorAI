import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import styles from './IntroPage.module.css';

export const IntroPage = () => {
  const navigate = useNavigate();
  return (
    <div className={`page-bg ${styles.page}`}>
      <div className="app-container">
        <div className={styles.header}>
          <h1 className={styles.title}>Design Your Food Plan</h1>
        </div>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.heroEmoji}>😋</span>
          <h2 className={styles.cardTitle}>Build Your Taste Profile</h2>
          <p className={styles.cardDesc}>Swipe right on foods you love, left on foods you don't.</p>
          <p className={styles.cardSubDesc}>This helps us recommend meals you'll love eating.</p>
          <button className={styles.ctaBtn} onClick={() => navigate('/swipe')}>
            Start Swiping
          </button>
          <p className={styles.timeNote}>Takes about 2 minutes.</p>
        </motion.div>
      </div>
    </div>
  );
};
