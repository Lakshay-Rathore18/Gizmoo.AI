'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Editorial cream hairline divider. Scale-x reveals once in-view.
 * Honours `prefers-reduced-motion` (instant reveal, no transform animation).
 */
export function GlowDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="relative w-full h-px my-0">
      <div className="absolute inset-0 bg-[rgba(225,224,204,0.04)]" />
      <div
        className="absolute inset-0 origin-left transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,0.84,0.32,1)]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(225,224,204,0.08) 12%, rgba(225,224,204,0.30) 50%, rgba(225,224,204,0.08) 88%, transparent 100%)',
          boxShadow:
            '0 0 14px rgba(225,224,204,0.10), 0 0 32px rgba(225,224,204,0.04)',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
