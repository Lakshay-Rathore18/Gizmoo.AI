'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Thin glowing divider. Scale-x reveals once in-view via IntersectionObserver.
 * Honours prefers-reduced-motion.
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
      <div className="absolute inset-0 bg-white/[0.06]" />
      <div
        className="absolute inset-0 origin-left transition-transform duration-[900ms] ease-out"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(32,231,183,0.4), transparent)',
          boxShadow: '0 0 20px rgba(32,231,183,0.3), 0 0 60px rgba(32,231,183,0.1)',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
