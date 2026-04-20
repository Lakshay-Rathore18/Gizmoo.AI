'use client';

import { useRef, useEffect, type ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

type Props = {
  children: ReactNode;
  direction?: Direction;
  duration?: number;
  delay?: number;
  className?: string;
  as?: 'div' | 'span' | 'section' | 'article' | 'li';
};

const initial: Record<Direction, string> = {
  up: 'inset(100% 0 0 0)',
  down: 'inset(0 0 100% 0)',
  left: 'inset(0 100% 0 0)',
  right: 'inset(0 0 0 100%)',
};

/**
 * Resn / Cuberto feel — element reveals via clip-path inset, not fade-up.
 * IntersectionObserver gated so it fires once at 30% visibility.
 * Respects prefers-reduced-motion (instant reveal, no clip animation).
 */
export function ClipReveal({
  children,
  direction = 'up',
  duration = 0.9,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.style.clipPath = 'inset(0 0 0 0)';
      el.style.opacity = '1';
      return;
    }

    el.style.clipPath = initial[direction];
    el.style.opacity = '1';
    el.style.transition = `clip-path ${duration}s cubic-bezier(0.77, 0, 0.175, 1) ${delay}s`;
    el.style.willChange = 'clip-path';

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.clipPath = 'inset(0 0 0 0)';
            io.disconnect();
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);

    return () => io.disconnect();
  }, [direction, duration, delay]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
