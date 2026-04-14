'use client';

import { useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

/*
 * SCROLL-REACTIVE BACKGROUND ORB SYSTEM
 * 3 gradient orbs that continuously morph (position, color, scale, opacity)
 * based on scroll progress. Canvas-rendered at 60fps.
 */

interface OrbKeyframe {
  scrollProgress: number;
  x: number; // percentage of viewport width
  y: number; // percentage of viewport height
  scale: number;
  opacity: number;
  r: number; g: number; b: number;
  blur: number;
}

// ORB 1: PRIMARY ACCENT (largest, most visible)
const orb1: OrbKeyframe[] = [
  { scrollProgress: 0.00, x: 70, y: 20, scale: 1.0, opacity: 0.15, r: 34, g: 211, b: 238, blur: 120 },
  { scrollProgress: 0.12, x: 60, y: 30, scale: 1.3, opacity: 0.20, r: 34, g: 211, b: 238, blur: 100 },
  { scrollProgress: 0.25, x: 30, y: 40, scale: 1.5, opacity: 0.18, r: 74, g: 222, b: 128, blur: 140 },
  { scrollProgress: 0.40, x: 20, y: 50, scale: 1.2, opacity: 0.12, r: 129, g: 140, b: 248, blur: 160 },
  { scrollProgress: 0.55, x: 50, y: 45, scale: 1.8, opacity: 0.15, r: 34, g: 211, b: 238, blur: 130 },
  { scrollProgress: 0.70, x: 75, y: 35, scale: 1.0, opacity: 0.10, r: 244, g: 114, b: 182, blur: 150 },
  { scrollProgress: 0.85, x: 40, y: 50, scale: 1.4, opacity: 0.20, r: 34, g: 211, b: 238, blur: 120 },
  { scrollProgress: 1.00, x: 50, y: 40, scale: 2.0, opacity: 0.25, r: 34, g: 211, b: 238, blur: 100 },
];

// ORB 2: SECONDARY (counter-movement)
const orb2: OrbKeyframe[] = [
  { scrollProgress: 0.00, x: 20, y: 70, scale: 0.8, opacity: 0.08, r: 129, g: 140, b: 248, blur: 150 },
  { scrollProgress: 0.15, x: 40, y: 60, scale: 1.0, opacity: 0.12, r: 74, g: 222, b: 128, blur: 130 },
  { scrollProgress: 0.30, x: 70, y: 30, scale: 1.2, opacity: 0.15, r: 34, g: 211, b: 238, blur: 120 },
  { scrollProgress: 0.50, x: 80, y: 60, scale: 0.9, opacity: 0.08, r: 244, g: 114, b: 182, blur: 160 },
  { scrollProgress: 0.70, x: 15, y: 40, scale: 1.1, opacity: 0.12, r: 129, g: 140, b: 248, blur: 140 },
  { scrollProgress: 0.85, x: 60, y: 25, scale: 1.3, opacity: 0.10, r: 74, g: 222, b: 128, blur: 130 },
  { scrollProgress: 1.00, x: 30, y: 60, scale: 1.0, opacity: 0.15, r: 129, g: 140, b: 248, blur: 120 },
];

// ORB 3: AMBIENT WASH (very large, very blurred, desktop only)
const orb3: OrbKeyframe[] = [
  { scrollProgress: 0.00, x: 50, y: 50, scale: 2.0, opacity: 0.04, r: 34, g: 211, b: 238, blur: 200 },
  { scrollProgress: 0.25, x: 40, y: 40, scale: 2.5, opacity: 0.06, r: 74, g: 222, b: 128, blur: 220 },
  { scrollProgress: 0.50, x: 60, y: 50, scale: 2.0, opacity: 0.05, r: 129, g: 140, b: 248, blur: 200 },
  { scrollProgress: 0.75, x: 45, y: 55, scale: 2.8, opacity: 0.07, r: 244, g: 114, b: 182, blur: 180 },
  { scrollProgress: 1.00, x: 50, y: 45, scale: 3.0, opacity: 0.08, r: 34, g: 211, b: 238, blur: 200 },
];

function interpolateOrb(progress: number, keyframes: OrbKeyframe[], vw: number, vh: number, mobileBlurReduction: number) {
  // Clamp progress
  progress = Math.max(0, Math.min(1, progress));

  // Find surrounding keyframes
  let k1 = keyframes[0];
  let k2 = keyframes[keyframes.length - 1];

  for (let i = 0; i < keyframes.length - 1; i++) {
    if (progress >= keyframes[i].scrollProgress && progress <= keyframes[i + 1].scrollProgress) {
      k1 = keyframes[i];
      k2 = keyframes[i + 1];
      break;
    }
  }

  const range = k2.scrollProgress - k1.scrollProgress;
  const local = range === 0 ? 1 : (progress - k1.scrollProgress) / range;

  // Cubic ease-in-out
  const t = local < 0.5
    ? 4 * local * local * local
    : 1 - Math.pow(-2 * local + 2, 3) / 2;

  const lerp = (a: number, b: number) => a + (b - a) * t;

  return {
    x: lerp(k1.x, k2.x) / 100 * vw,
    y: lerp(k1.y, k2.y) / 100 * vh,
    scale: lerp(k1.scale, k2.scale),
    opacity: lerp(k1.opacity, k2.opacity),
    r: Math.round(lerp(k1.r, k2.r)),
    g: Math.round(lerp(k1.g, k2.g)),
    b: Math.round(lerp(k1.b, k2.b)),
    blur: lerp(k1.blur, k2.blur) * mobileBlurReduction,
  };
}

export function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef(0);
  const scrollRef = useRef(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollRef.current = v;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    const mobileBlurReduction = isMobile ? 0.6 : 1;

    // Static fallback for reduced motion
    if (prefersReduced) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const gradient = ctx.createRadialGradient(vw * 0.5, vh * 0.4, 0, vw * 0.5, vh * 0.4, vw * 0.6);
      gradient.addColorStop(0, 'rgba(34, 211, 238, 0.08)');
      gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, vw, vh);
      return () => window.removeEventListener('resize', resize);
    }

    const orbConfigs = isMobile
      ? [
          { keyframes: orb1, baseSize: 350 },
          { keyframes: orb2, baseSize: 250 },
        ]
      : [
          { keyframes: orb3, baseSize: 600 },
          { keyframes: orb2, baseSize: 400 },
          { keyframes: orb1, baseSize: 500 },
        ];

    let lastTime = 0;

    function render(time: number) {
      if (!ctx || !canvas) return;

      // Throttle to ~60fps
      if (time - lastTime < 16) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }
      lastTime = time;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const progress = scrollRef.current;

      ctx.clearRect(0, 0, vw, vh);

      for (const { keyframes, baseSize } of orbConfigs) {
        const state = interpolateOrb(progress, keyframes, vw, vh, mobileBlurReduction);
        const size = baseSize * state.scale;

        // Save context for blur
        ctx.save();
        ctx.filter = `blur(${Math.round(state.blur)}px)`;

        const gradient = ctx.createRadialGradient(
          state.x, state.y, 0,
          state.x, state.y, size
        );
        gradient.addColorStop(0, `rgba(${state.r}, ${state.g}, ${state.b}, ${state.opacity})`);
        gradient.addColorStop(0.4, `rgba(${state.r}, ${state.g}, ${state.b}, ${state.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(${state.r}, ${state.g}, ${state.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(state.x, state.y, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    }

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  );
}
