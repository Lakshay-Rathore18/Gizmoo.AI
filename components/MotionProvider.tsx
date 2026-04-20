'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Wrap the tree in LazyMotion with only the `domAnimation` feature set.
 * This keeps Framer Motion's bundle ~25 KB smaller than `domMax` while still
 * supporting all `<motion.*>` layout, drag, animate, whileInView usages on
 * this site. All existing <motion.*> tags continue to work unchanged.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation} strict={false}>{children}</LazyMotion>;
}
