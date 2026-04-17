'use client';

import { useEffect, useRef } from 'react';

export function AuroraPillar() {
  const pillarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = pillarRef.current;
    if (!el) return;

    let raf = 0;
    let lastScroll = 0;
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / Math.max(1, max)));
      lastScroll = p;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          const hue = 162 + lastScroll * 14;
          const opacity = 0.32 + Math.sin(lastScroll * Math.PI) * 0.18;
          const xShift = Math.sin(lastScroll * Math.PI * 2) * 12;
          el.style.setProperty('--aurora-hue', `${hue}`);
          el.style.setProperty('--aurora-opacity', `${opacity}`);
          el.style.setProperty('--aurora-x', `${xShift}%`);
        });
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={pillarRef}
      aria-hidden="true"
      className="aurora-pillar-root fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div className="aurora-pillar" />
      <div className="aurora-pillar aurora-pillar--secondary" />
      <div className="aurora-pillar-base" />
    </div>
  );
}
