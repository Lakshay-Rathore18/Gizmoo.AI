'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * MotionConfig honours the user's `prefers-reduced-motion` OS setting for all
 * framer-motion animations (WCAG 2.3.3). LazyMotion keeps the bundle ~25 KB
 * smaller than `domMax` while still supporting every `<motion.*>` usage on
 * this site.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict={false}>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
