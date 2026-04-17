'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface OrbState {
  x: number; y: number; scale: number; opacity: number;
  r: number; g: number; b: number; blur: number;
}

const SECTIONS = [
  { id: '#top',           orb1: { x:0.65, y:0.25, scale:1.2, opacity:0.18, r:32,  g:231, b:183, blur:120 }, orb2: { x:0.25, y:0.65, scale:0.9, opacity:0.10, r:32,  g:231, b:183, blur:150 }, orb3: { x:0.50, y:0.45, scale:2.2, opacity:0.05, r:32,  g:231, b:183, blur:200 } },
  { id: '[aria-label="About Gizmoo AI"]', orb1: { x:0.55, y:0.35, scale:1.4, opacity:0.20, r:32,  g:231, b:183, blur:100 }, orb2: { x:0.40, y:0.55, scale:1.0, opacity:0.12, r:32,  g:231, b:183, blur:130 }, orb3: { x:0.45, y:0.40, scale:2.5, opacity:0.06, r:32,  g:231, b:183, blur:220 } },
  { id: '#features',      orb1: { x:0.30, y:0.40, scale:1.6, opacity:0.18, r:32,  g:231, b:183, blur:140 }, orb2: { x:0.70, y:0.30, scale:1.2, opacity:0.14, r:32,  g:231, b:183, blur:120 }, orb3: { x:0.40, y:0.50, scale:2.2, opacity:0.06, r:32,  g:231, b:183, blur:200 } },
  { id: '#demo',          orb1: { x:0.20, y:0.50, scale:1.3, opacity:0.12, r:32,  g:231, b:183, blur:160 }, orb2: { x:0.80, y:0.60, scale:0.9, opacity:0.08, r:32,  g:231, b:183, blur:160 }, orb3: { x:0.55, y:0.50, scale:2.0, opacity:0.05, r:32,  g:231, b:183, blur:200 } },
  { id: '#use-cases',     orb1: { x:0.50, y:0.45, scale:1.8, opacity:0.16, r:32,  g:231, b:183, blur:130 }, orb2: { x:0.15, y:0.40, scale:1.1, opacity:0.12, r:32,  g:231, b:183, blur:140 }, orb3: { x:0.60, y:0.50, scale:2.5, opacity:0.07, r:32,  g:231, b:183, blur:200 } },
  { id: '#how-it-works',  orb1: { x:0.75, y:0.35, scale:1.0, opacity:0.10, r:32,  g:231, b:183, blur:150 }, orb2: { x:0.20, y:0.45, scale:1.1, opacity:0.10, r:32,  g:231, b:183, blur:140 }, orb3: { x:0.50, y:0.55, scale:2.8, opacity:0.06, r:32,  g:231, b:183, blur:180 } },
  { id: '#testimonials',  orb1: { x:0.40, y:0.50, scale:1.4, opacity:0.18, r:32,  g:231, b:183, blur:120 }, orb2: { x:0.60, y:0.25, scale:1.3, opacity:0.10, r:32,  g:231, b:183, blur:130 }, orb3: { x:0.45, y:0.50, scale:2.3, opacity:0.07, r:32,  g:231, b:183, blur:200 } },
  { id: '#pricing',       orb1: { x:0.55, y:0.40, scale:1.5, opacity:0.20, r:32,  g:231, b:183, blur:120 }, orb2: { x:0.35, y:0.60, scale:1.0, opacity:0.12, r:32,  g:231, b:183, blur:120 }, orb3: { x:0.50, y:0.45, scale:2.5, opacity:0.07, r:32,  g:231, b:183, blur:200 } },
  { id: '#faq',           orb1: { x:0.60, y:0.45, scale:1.2, opacity:0.14, r:32,  g:231, b:183, blur:140 }, orb2: { x:0.30, y:0.55, scale:1.1, opacity:0.10, r:32,  g:231, b:183, blur:130 }, orb3: { x:0.55, y:0.50, scale:2.0, opacity:0.05, r:32,  g:231, b:183, blur:200 } },
  { id: '#cta-footer',    orb1: { x:0.50, y:0.40, scale:2.0, opacity:0.25, r:32,  g:231, b:183, blur:100 }, orb2: { x:0.35, y:0.55, scale:1.2, opacity:0.15, r:32,  g:231, b:183, blur:120 }, orb3: { x:0.50, y:0.45, scale:3.0, opacity:0.08, r:32,  g:231, b:183, blur:200 } },
];

export function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth < 768;
    const blurMul = isMobile ? 0.6 : 1;

    // Mutable orb state — GSAP tweens these directly
    const orb1: OrbState = { x:0.70, y:0.20, scale:1.0, opacity:0.15, r:32, g:231, b:183, blur:120 };
    const orb2: OrbState = { x:0.20, y:0.70, scale:0.8, opacity:0.08, r:32, g:231, b:183, blur:150 };
    const orb3: OrbState = { x:0.50, y:0.50, scale:2.0, opacity:0.04, r:32, g:231, b:183, blur:200 };

    // Create per-section ScrollTrigger timelines
    const triggers: ScrollTrigger[] = [];
    SECTIONS.forEach(({ id, orb1: o1, orb2: o2, orb3: o3 }) => {
      const el = document.querySelector(id);
      if (!el) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
      tl.to(orb1, { ...o1, duration: 1, ease: 'none' }, 0);
      tl.to(orb2, { ...o2, duration: 1, ease: 'none' }, 0);
      if (!isMobile) tl.to(orb3, { ...o3, duration: 1, ease: 'none' }, 0);

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    });

    // Render loop
    function drawOrb(c: CanvasRenderingContext2D, o: OrbState, baseSize: number, w: number, h: number) {
      const x = o.x * w, y = o.y * h, size = baseSize * o.scale;
      c.save();
      c.filter = `blur(${Math.round(o.blur * blurMul)}px)`;
      const g = c.createRadialGradient(x, y, 0, x, y, size);
      g.addColorStop(0, `rgba(${Math.round(o.r)},${Math.round(o.g)},${Math.round(o.b)},${o.opacity})`);
      g.addColorStop(0.4, `rgba(${Math.round(o.r)},${Math.round(o.g)},${Math.round(o.b)},${o.opacity * 0.6})`);
      g.addColorStop(1, `rgba(${Math.round(o.r)},${Math.round(o.g)},${Math.round(o.b)},0)`);
      c.fillStyle = g;
      c.beginPath();
      c.arc(x, y, size, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }

    let rafId: number;
    function render() {
      if (!ctx || !canvas) return;
      const w = window.innerWidth, h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      if (!isMobile) drawOrb(ctx, orb3, 600, w, h);
      drawOrb(ctx, orb2, isMobile ? 250 : 400, w, h);
      drawOrb(ctx, orb1, isMobile ? 350 : 500, w, h);
      rafId = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, width: '100vw', height: '100vh', mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
}
