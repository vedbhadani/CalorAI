import { motion } from 'framer-motion';

interface Highlight {
  emoji: string;
  label: string;
}

export const HighlightsCard = ({ highlights }: { highlights: Highlight[] }) => {
  if (highlights.length === 0) return null;

  return (
    <div style={{
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      paddingBottom: 8,
      marginBottom: 20,
      scrollbarWidth: 'none',
    }}>
      {highlights.map((h, i) => (
        <motion.div
          key={h.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          style={{
            minWidth: 120,
            padding: '20px 16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-card)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 32 }}>{h.emoji}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center' }}>{h.label}</span>
        </motion.div>
      ))}
    </div>
  );
};
