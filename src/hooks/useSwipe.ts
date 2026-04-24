import { useEffect, useCallback } from 'react';
import type { SwipeDirection } from '../types';

export const useSwipe = (onSwipe: (dir: SwipeDirection) => void, enabled = true) => {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;
    const map: Record<string, SwipeDirection> = {
      ArrowRight: 'like', d: 'like', D: 'like',
      ArrowLeft:  'dislike', a: 'dislike', A: 'dislike',
      ArrowUp:    'superlike', w: 'superlike', W: 'superlike',
      ArrowDown:  'unsure', s: 'unsure', S: 'unsure',
    };
    if (map[e.key]) { e.preventDefault(); onSwipe(map[e.key]); }
  }, [onSwipe, enabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);
};
