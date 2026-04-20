'use client';

import { useEffect, useRef } from 'react';

export function GlobalFilm() {
  const grainRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const isMobile = window.innerWidth < 768;
    // Mobile: paint grain ONCE, don't animate it. Saves the continuous
    // rAF + ImageData allocation (~8ms/frame on mid-tier Android).
    // Desktop: animate every 3rd frame as before.
    const mobileGrainOnce = isMobile;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const paintOnce = () => {
      const w = canvas.width, h = canvas.height;
      const img = ctx.createImageData(w, h);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = 200 + Math.floor(Math.random() * 55);
        d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 28;
      }
      ctx.putImageData(img, 0, 0);
    };

    let frame = 0;
    let raf = 0;

    if (mobileGrainOnce) {
      paintOnce();
      return () => {
        window.removeEventListener('resize', resize);
      };
    }

    const draw = () => {
      frame++;
      if (frame % 3 === 0) paintOnce();
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="global-film fixed inset-0 pointer-events-none" style={{ zIndex: 60 }}>
      <canvas
        ref={grainRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'overlay', opacity: 0.35 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(4,24,25,0.12) 0%, transparent 30%, transparent 70%, rgba(4,24,25,0.18) 100%)',
          mixBlendMode: 'color',
          opacity: 0.7,
        }}
      />
      <div
        className="absolute inset-0 scan-lines"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(253,253,249,0.02) 0px, rgba(253,253,249,0.02) 1px, transparent 1px, transparent 3px)',
          mixBlendMode: 'overlay',
          opacity: 0.4,
        }}
      />
    </div>
  );
}
