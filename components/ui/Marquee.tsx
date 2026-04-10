'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  slow?: boolean;
}

export function Marquee({ children, className, reverse = false, slow = false }: MarqueeProps) {
  return (
    <div className={cn('group relative flex overflow-hidden', className)}>
      <div
        className={cn(
          'flex shrink-0 items-center gap-12 pr-12',
          slow ? 'animate-marquee-slow' : 'animate-marquee',
          reverse && '[animation-direction:reverse]',
          'group-hover:[animation-play-state:paused]',
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          'flex shrink-0 items-center gap-12 pr-12',
          slow ? 'animate-marquee-slow' : 'animate-marquee',
          reverse && '[animation-direction:reverse]',
          'group-hover:[animation-play-state:paused]',
        )}
      >
        {children}
      </div>
    </div>
  );
}
