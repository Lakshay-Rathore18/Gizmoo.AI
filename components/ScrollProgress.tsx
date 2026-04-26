'use client';

import { useEffect, useRef } from 'react';

/**
 * Cream hairline scroll progress indicator. rAF-throttled — at most one
 * style mutation per animation frame regardless of scroll event rate, which
 * keeps the main thread free during fast wheel/trackpad scrolls.
 *
 * Honours `prefers-reduced-motion` indirectly: the bar still tracks scroll
 * position (it is informative, not decorative), but the underlying CSS uses
 * `transform: scaleX()` only — no animation, just a discrete style update.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let raf = 0;

    const compute = () => {
      raf = 0;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    // Initial sync
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" style={{ transform: 'scaleX(0)' }} />;
}
