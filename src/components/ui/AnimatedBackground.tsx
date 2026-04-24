import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './AnimatedBackground.module.css';

export const AnimatedBackground = () => {
  // Motion values to track the target position based on mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs to smooth the mouse following movement
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse offset from the center of the screen
      const xOffset = e.clientX - window.innerWidth / 2;
      const yOffset = e.clientY - window.innerHeight / 2;
      
      // Set the target to the INVERTED offset (scaled for subtleness)
      mouseX.set(-xOffset * 0.4);
      mouseY.set(-yOffset * 0.4);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={styles.container}>
      {/* Large Green Blob Wrapper (reacts to mouse) */}
      <motion.div 
        className={styles.blobWrapper}
        style={{ x: springX, y: springY }}
      >
        {/* The Blob itself (floats randomly across the screen) */}
        <motion.div
          className={`${styles.blob} ${styles.large}`}
          animate={{
            x: ["0vw", "70vw", "35vw", "10vw", "0vw"],
            y: ["70vh", "10vh", "60vh", "30vh", "70vh"],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Medium Blue Blob Wrapper (reacts to mouse) */}
      <motion.div 
        className={styles.blobWrapper}
        style={{ x: springX, y: springY }}
      >
        {/* The Blob itself (floats randomly across the screen) */}
        <motion.div
          className={`${styles.blob} ${styles.medium}`}
          animate={{
            x: ["80vw", "10vw", "50vw", "0vw", "80vw"],
            y: ["0vh", "70vh", "30vh", "80vh", "0vh"],
            scale: [1, 0.8, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};
