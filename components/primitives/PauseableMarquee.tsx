'use client';

import { ReactNode, useState } from 'react';

/**
 * Marquee with a keyboard-reachable pause toggle (WCAG 2.2.2).
 *
 * - Plays by default.
 * - Hover pauses (existing behaviour).
 * - Keyboard users can press the toggle (`Pause / Play`).
 * - Under `prefers-reduced-motion: reduce`, CSS in globals.css kills
 *   the animation regardless of the toggle.
 */
export function PauseableMarquee({
  children,
  className = '',
  label = 'Pause marquee',
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`relative ${className}`}>
      <div
        className="animate-marquee"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {children}
      </div>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
        className="absolute bottom-2 right-2 z-20 min-h-[32px] min-w-[32px] rounded-full border border-border-subtle bg-bg-secondary/80 backdrop-blur-sm px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-text-secondary hover:text-accent hover:border-accent/60 transition-colors"
      >
        {paused ? 'Play' : 'Pause'}
        <span className="sr-only"> {label}</span>
      </button>
    </div>
  );
}
