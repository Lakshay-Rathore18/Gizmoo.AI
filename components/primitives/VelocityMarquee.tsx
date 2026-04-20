'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

type Props = {
  children: ReactNode;
  /** Base translate duration (seconds) for one full loop. Larger = slower. */
  baseDuration?: number;
  /** Pixels per viewport-height of scroll that adds to marquee speed. */
  velocityBoost?: number;
  /** -1 for right-to-left, 1 for left-to-right. */
  direction?: -1 | 1;
  className?: string;
};

/**
 * Locomotive / Hello Monday style — infinite marquee whose base speed is
 * continuous, but scroll velocity injects a damped speed delta. Fast
 * scrolling briefly warps the text; velocity decays back to base.
 *
 * Mobile: velocity coupling disabled (cheap continuous CSS animation
 * via GSAP timeline). Respects prefers-reduced-motion (renders static).
 */
export function VelocityMarquee({
  children,
  baseDuration = 40,
  velocityBoost = 1.4,
  direction = -1,
  className = '',
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const root = rootRef.current;
    if (!track || !root) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobile = window.innerWidth < 768;
    const dir = direction;

    // Base infinite loop — translate by the width of one copy.
    const loopTween = gsap.to(track, {
      xPercent: dir * 50, // we render 2 copies; 50% shifts by one copy width
      duration: baseDuration,
      ease: 'none',
      repeat: -1,
    });

    if (isMobile) {
      return () => loopTween.kill();
    }

    // Desktop: velocity coupling. Scroll faster → marquee briefly speeds.
    let target = 1;
    let current = 1;
    const lerp = 0.08;

    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity(); // px/s of scroll
        // Map |velocity|/2000 clamped to [0, velocityBoost] and keep sign of scroll direction
        const boost = gsap.utils.clamp(0, velocityBoost, Math.abs(v) / 2000) * velocityBoost;
        target = 1 + boost;
      },
    });

    let raf = 0;
    const loop = () => {
      current += (target - current) * lerp;
      loopTween.timeScale(current);
      // Decay target back toward base
      target += (1 - target) * 0.03;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      loopTween.kill();
    };
  }, [baseDuration, velocityBoost, direction]);

  return (
    <div ref={rootRef} className={`velocity-marquee relative overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
        aria-hidden="true"
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
