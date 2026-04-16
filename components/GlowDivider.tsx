'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function GlowDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const glowLine = el.querySelector('.glow-line');
    if (!glowLine) return;

    gsap.from(glowLine, {
      scaleX: 0,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full h-px my-0">
      <div className="absolute inset-0 bg-white/[0.06]" />
      <div
        className="glow-line absolute inset-0 origin-left"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.4), transparent)',
          boxShadow: '0 0 20px rgba(34,211,238,0.3), 0 0 60px rgba(34,211,238,0.1)',
        }}
      />
    </div>
  );
}
