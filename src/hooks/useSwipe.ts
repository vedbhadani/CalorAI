import { useEffect, useCallback, useRef } from 'react';
import type { SwipeDirection } from '../types';

export const useSwipe = (onSwipe: (dir: SwipeDirection) => void, enableKeyboard = true, enablePointer = true) => {
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!enableKeyboard) return;
    const map: Record<string, SwipeDirection> = {
      ArrowRight: 'like', d: 'like', D: 'like',
      ArrowLeft:  'dislike', a: 'dislike', A: 'dislike',
      ArrowUp:    'superlike', w: 'superlike', W: 'superlike',
      ArrowDown:  'unsure', s: 'unsure', S: 'unsure',
    };
    if (map[e.key]) { e.preventDefault(); onSwipe(map[e.key]); }
  }, [onSwipe, enableKeyboard]);

  const startPos = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    if (!enablePointer) return;
    startPos.current = { x: e.clientX, y: e.clientY };
  }, [enablePointer]);

  const handlePointerUp = useCallback((e: PointerEvent) => {
    if (!enablePointer || !startPos.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    const THRESHOLD = 60;
    startPos.current = null;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > THRESHOLD)       onSwipe('like');
      else if (dx < -THRESHOLD) onSwipe('dislike');
    } else {
      if (dy < -THRESHOLD)      onSwipe('superlike');
      else if (dy > THRESHOLD)  onSwipe('unsure');
    }
  }, [onSwipe, enablePointer]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handleKey, handlePointerDown, handlePointerUp]);
};
