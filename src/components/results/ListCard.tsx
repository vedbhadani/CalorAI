import { motion } from 'framer-motion';

interface ListCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  items: string[];
  iconColor: 'blue' | 'green';
}

export const ListCard = ({ emoji, title, subtitle, items, iconColor }: ListCardProps) => {
  if (items.length === 0) return null;

  const checkColor = iconColor === 'blue' ? 'var(--accent-blue)' : 'var(--accent-green)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-card)',
        padding: '24px 20px',
        marginBottom: 16,
        width: '100%',
      }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 24 }}>{emoji}</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>{subtitle}</p>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border-divider)', marginBottom: 12 }} />

      {/* List items with blue checkmarks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: checkColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</span>
            </div>
            <span style={{ fontSize: 15, color: 'var(--text-primary)', fontWeight: 500 }}>{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
