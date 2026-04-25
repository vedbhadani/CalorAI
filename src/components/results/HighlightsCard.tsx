import { memo } from 'react';
import { motion } from 'framer-motion';

interface Highlight {
  emoji: string;
  label: string;
}

export const HighlightsCard = memo(({ highlights }: { highlights: Highlight[] }) => {
  if (highlights.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px 16px', // Exact padding from spec
        marginBottom: 24,
        width: '100%', // Responsive width
        maxWidth: 408, // Max width from spec
        borderRadius: 'var(--radius-card)',
        border: '1px solid transparent',
        background: 
          'linear-gradient(var(--glass-bg), var(--glass-bg)) padding-box, ' +
          'var(--glass-border) border-box',
        backdropFilter: 'blur(24px) saturate(180%)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        gap: 10,
      }}>
        {highlights.map((h, i) => (
          <div key={h.label} style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              flex: 1,
            }}>
              <span style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro", sans-serif',
                fontSize: 49.91,
                lineHeight: '64.59px',
                letterSpacing: '-1.26px'
              }}>{h.emoji}</span>
              <span style={{ 
                fontSize: 14, 
                fontWeight: 700, 
                color: 'var(--text-primary)', 
                textAlign: 'center',
                lineHeight: 1.2
              }}>{h.label}</span>
            </div>
            {/* Vertical Divider with exact specs */}
            {i < highlights.length - 1 && (
              <div style={{ 
                width: 1, 
                height: 21, 
                background: 'var(--border-divider)',
                opacity: 1,
                margin: '0 8px',
                transform: 'rotate(0deg)' // User said angle 90, but we want it vertical
              }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-primary)', opacity: 1 }} />
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-primary)', opacity: 0.3 }} />
      </div>
    </motion.div>
  );
});

HighlightsCard.displayName = 'HighlightsCard';
