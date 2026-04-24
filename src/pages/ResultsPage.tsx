import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
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
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const allLiked = [...liked, ...superlikes];
  const highlights = deriveHighlights(allLiked);
  const cuisines = getRecommendedCuisines(allLiked, foodsData.cuisines);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth - 40;
    const index = Math.round(scrollLeft / width);
    if (index !== activeSlide) setActiveSlide(index);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'My CalorAI Taste Profile', url: window.location.href });
    }
  };

  return (
    <motion.div className={`page-bg ${styles.page}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="app-container">
        <div className={styles.topBar}><ThemeToggle /></div>

        <h1 className={styles.pageTitle}>Your Taste Profile</h1>
        <p className={styles.pageSubtitle}>Tailored to your unique needs. We'll use this for recommendations and meals plans</p>

        <div className={styles.sectionLabel}>Key Highlights:</div>
        <HighlightsCard highlights={highlights} />

        <div className={styles.sectionLabel}>Your Profile Breakdown:</div>
        <div 
          className={styles.carouselContainer} 
          onScroll={handleScroll}
          ref={carouselRef}
        >
          <div className={styles.carousel}>
            <div className={styles.carouselSlide}>
              <ListCard
                emoji="❤️"
                title="Foods You Love"
                subtitle="We'll Recommend These"
                items={allLiked.map(f => f.name)}
                iconColor="blue"
                iconType="heart"
                style={{ height: 450 }}
              />
            </div>

            <div className={styles.carouselSlide}>
              <ListCard
                emoji="🤷‍♂️"
                title="Foods You Hate"
                subtitle="These will never be on the menu"
                items={disliked.map(f => f.name)}
                iconColor="blue"
                iconType="check"
                style={{ height: 450 }}
              />
            </div>

            <div className={styles.carouselSlide}>
              <ListCard
                emoji="👨‍🍳"
                title="Your Favorite Cuisines"
                subtitle="Flavors you love, all in one place"
                items={cuisines.map(c => c.name)}
                iconColor="blue"
                iconType="check"
                style={{ height: 450 }}
              />
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className={styles.pagination}>
          {[0, 1, 2].map((i) => (
            <div 
              key={i} 
              className={`${styles.dot} ${activeSlide === i ? styles.dotActive : ''}`} 
            />
          ))}
        </div>

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
