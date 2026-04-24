import { memo } from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
}

export const ProgressBar = memo(({ progress }: ProgressBarProps) => (
  <div
    role="progressbar"
    aria-valuenow={Math.round(progress)}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-label="Swiping progress"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      background: 'var(--border-card)',
      zIndex: 100,
    }}
  >
    <div style={{
      height: '100%',
      width: `${progress}%`,
      background: 'var(--accent-green)',
      borderRadius: '0 4px 4px 0',
      transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    }} />
  </div>
));

ProgressBar.displayName = 'ProgressBar';
