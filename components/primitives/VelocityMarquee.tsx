'use client';

import { useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Seconds for one full loop. Larger = slower. */
  baseDuration?: number;
  /** -1 for right-to-left, 1 for left-to-right. */
  direction?: -1 | 1;
  /** Label for the pause toggle (SR-only). */
  pauseLabel?: string;
  className?: string;
};

/**
 * Pure-CSS infinite marquee with a keyboard-reachable pause toggle (WCAG 2.2.2).
 *
 * - GPU-friendly `translate3d` via the `.animate-marquee` keyframe.
 * - Hover pauses (via CSS); keyboard users press the toggle.
 * - Under `prefers-reduced-motion: reduce`, globals.css kills the animation.
 * - The previous GSAP velocity coupling is intentionally removed — the site
 *   no longer ships GSAP.
 */
export function VelocityMarquee({
  children,
  baseDuration = 40,
  direction = -1,
  pauseLabel = 'Pause marquee',
  className = '',
}: Props) {
  const [paused, setPaused] = useState(false);

  const animationDirection = direction === 1 ? 'reverse' : 'normal';

  return (
    <div className={`velocity-marquee relative overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex whitespace-nowrap"
        style={{
          ['--marquee-duration' as string]: `${baseDuration}s`,
          animationDirection,
          animationPlayState: paused ? 'paused' : 'running',
        }}
        aria-hidden="true"
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>{children}</div>
      </div>

      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
        className="absolute bottom-3 right-3 z-20 min-h-[32px] min-w-[32px] rounded-full border border-border-subtle bg-bg-secondary/80 backdrop-blur-sm px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-text-secondary hover:text-accent hover:border-accent/60 transition-colors"
      >
        {paused ? 'Play' : 'Pause'}
        <span className="sr-only"> {pauseLabel}</span>
      </button>
    </div>
  );
}
