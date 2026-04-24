import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSwipeContext } from '../context/SwipeContext';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { HighlightsCard } from '../components/results/HighlightsCard';
import { ListCard } from '../components/results/ListCard';
import { deriveHighlights, getRecommendedCuisines } from '../utils/tasteAnalysis';
import foodsData from '../assets/foods.json';
import styles from './ResultsPage.module.css';

export const ResultsPage = () => {
  const navigate = useNavigate();
  const { liked, disliked, superlikes, reset } = useSwipeContext();

  const allLiked = [...liked, ...superlikes]; // superlikes count as liked
  const highlights = deriveHighlights(allLiked);
  const cuisines = getRecommendedCuisines(allLiked, foodsData.cuisines);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'My CalorAI Taste Profile', url: window.location.href });
    }
  };

  return (
    <motion.div className={`page-bg ${styles.page}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="app-container">
        <div className={styles.topBar}><ThemeToggle /></div>

        {/* Header */}
        <h1 className={styles.pageTitle}>Your Taste Profile</h1>
        <p className={styles.pageSubtitle}>Tailored to your unique needs. We'll use this for recommendations and meals plans</p>

        {/* Key Highlights horizontal scroll card */}
        <div className={styles.sectionLabel}>Key Highlights:</div>
        <HighlightsCard highlights={highlights} />

        {/* Foods You Love */}
        <ListCard
          emoji="❤️"
          title="Foods You Love"
          subtitle="We'll Recommend These"
          items={allLiked.map(f => f.name)}
          iconColor="blue"
        />

        {/* Foods You Hate */}
        <ListCard
          emoji="🥊"
          title="Foods You Hate"
          subtitle="These will never be on the menu"
          items={disliked.map(f => f.name)}
          iconColor="blue"
        />

        {/* Your Favorite Cuisines */}
        <ListCard
          emoji="🏆"
          title="Your Favorite Cuisines"
          subtitle="Flavors you love, all in one place"
          items={cuisines.map(c => c.name)}
          iconColor="blue"
        />

        {/* Bottom buttons */}
        <div className={styles.bottomBtns}>
          <button
            className={styles.btnPrimary}
            onClick={() => { reset(); navigate('/swipe'); }}
          >
            Retake Quizz
          </button>
          <button className={styles.btnOutline} onClick={handleShare}>
            Share
          </button>
        </div>
      </div>
    </motion.div>
  );
};
