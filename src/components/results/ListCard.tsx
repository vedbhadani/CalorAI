import { motion } from 'framer-motion';

interface ListCardProps {
  emoji: string;
  title: string;
  subtitle: string;
  items: string[];
  iconType?: 'heart' | 'check';
  style?: React.CSSProperties;
}

export const ListCard = ({ emoji, title, subtitle, items, iconType = 'check', style }: ListCardProps) => {
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
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        ...style
      }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
        <span style={{ fontSize: 20 }}>{emoji}</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>{title}</span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>{subtitle}</p>

      {/* List items with blue heart icons and dividers */}
      <div 
        className="custom-scrollbar"
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1, 
          overflowY: 'auto', 
          paddingRight: 4,
        }}
      >
        {items.length > 0 ? (
          items.map((item, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 0' }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'var(--accent-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 0 10px rgba(0, 145, 255, 0.3)'
                }}>
                  <span style={{ color: '#fff', fontSize: iconType === 'heart' ? 14 : 16, fontWeight: 900 }}>
                    {iconType === 'heart' ? '♥' : '✓'}
                  </span>
                </div>
                <span style={{ fontSize: 17, color: 'var(--text-primary)', fontWeight: 600 }}>{item}</span>
              </div>
              {/* Horizontal Divider between items */}
              {i < items.length - 1 && (
                <div style={{ height: 1, background: 'var(--border-divider)', margin: '0 0 0 48px' }} />
              )}
            </div>
          ))
        ) : (
          <div style={{ color: 'var(--text-tertiary)', fontSize: 14, fontStyle: 'italic', marginTop: 20 }}>
            No items in this category
          </div>
        )}
      </div>
    </motion.div>
  );
};
