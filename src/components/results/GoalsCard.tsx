import { memo } from 'react';
import { motion } from 'framer-motion';

interface GoalsCardProps {
  goals: string[];
}

export const GoalsCard = memo(({ goals }: GoalsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        border: '1px solid transparent',
        background:
          'linear-gradient(var(--glass-bg), var(--glass-bg)) padding-box, ' +
          'var(--glass-border) border-box',
        backdropFilter: 'blur(24px) saturate(180%)',
        borderRadius: 'var(--radius-card)',
        padding: '24px 20px',
        width: '100%',
        maxWidth: 408,
        boxShadow: 'var(--shadow-card)',
        marginBottom: 24,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 20 }}>💪</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
          Lifestyle & Goals
        </span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
        We'll use this to tailor our advice & meal plan
      </p>

      {/* Goals list with green checkmarks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {goals.map((goal, i) => (
          <div key={goal}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0' }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'var(--accent-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 10px rgba(11, 212, 0, 0.3)',
              }}>
                <span style={{ color: '#000', fontSize: 16, fontWeight: 900 }}>✓</span>
              </div>
              <span style={{ fontSize: 17, color: 'var(--text-primary)', fontWeight: 600 }}>
                {goal}
              </span>
            </div>
            {i < goals.length - 1 && (
              <div style={{ height: 1, background: 'var(--border-divider)', margin: '0 0 0 48px' }} />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
});

GoalsCard.displayName = 'GoalsCard';
