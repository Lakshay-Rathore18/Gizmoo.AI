'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BackgroundVideo } from '@/components/BackgroundVideo';
import { KineticText } from '@/components/primitives/KineticText';
import { MagneticCTA } from '@/components/primitives/MagneticCTA';
import { brand } from '@/lib/brand';

const microMetrics: Array<[string, string]> = [
  ['50,000+', 'calls answered'],
  ['99.7%', 'satisfaction'],
  ['24/7/365', 'availability'],
  ['30s', 'response'],
];

export function VideoHero({ onContactOpen }: { onContactOpen?: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const lift = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Mouse parallax for the hero block — runs only while pointer is moving.
  // The rAF loop self-suspends when the position has settled within 0.05px,
  // and resumes on the next pointermove. Keeps idle CPU at zero on the hero.
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrap = wrapRef.current;
    const el = ref.current;
    if (!wrap || !el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    let running = false;

    const SETTLE = 0.05;

    const tick = () => {
      const dx = tx - x;
      const dy = ty - y;
      x += dx * 0.08;
      y += dy * 0.08;
      wrap.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (Math.abs(dx) > SETTLE || Math.abs(dy) > SETTLE) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        raf = 0;
      }
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / r.width;
      const dy = (e.clientY - r.top - r.height / 2) / r.height;
      tx = dx * 12;
      ty = dy * 12;
      start();
    };
    const onLeave = () => { tx = 0; ty = 0; start(); };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden"
    >
      <BackgroundVideo
        poster="/videos/hero-poster.svg"
        preload="auto"
        sources={[
          { src: '/videos/hero-mobile.mp4', type: 'video/mp4', media: '(max-width: 767px)' },
          { src: '/videos/hero.av1.mp4', type: 'video/mp4; codecs=av01.0.05M.08', media: '(min-width: 768px)' },
          { src: '/videos/hero.webm', type: 'video/webm', media: '(min-width: 768px)' },
          { src: '/videos/hero.mp4', type: 'video/mp4' },
        ]}
        className="absolute inset-0"
      />

      {/* Cinematic vignette + soft cream wash from the top — pushes the eye to the headline */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 35%, rgba(7,7,7,0.0) 0%, rgba(7,7,7,0.55) 100%), linear-gradient(180deg, rgba(7,7,7,0.42) 0%, rgba(7,7,7,0) 25%, rgba(7,7,7,0) 60%, rgba(7,7,7,0.85) 100%)',
        }}
      />

      <motion.div
        ref={wrapRef as never}
        style={{ y: lift, opacity: fade }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl will-change-transform"
      >
        {/* Editorial eyebrow */}
        <div className="mb-10 inline-flex items-center gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.32em] text-text-secondary">
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent motion-safe:animate-cream-pulse" />
          <span>Live in Australia</span>
          <span aria-hidden="true" className="hidden sm:inline-block w-8 h-px bg-border-subtle" />
          <span className="hidden sm:inline">An AI voice receptionist</span>
        </div>

        {/* Kinetic headline — character split, serif italic accent on second line */}
        <h1
          id="hero-heading"
          className="fluid-display font-display font-normal tracking-kinetic"
          style={{ textShadow: '0 2px 26px rgba(7,7,7,0.85), 0 1px 2px rgba(7,7,7,0.6)' }}
        >
          <KineticText as="span" split="char" className="block">
            Never miss
          </KineticText>
          <span className="block italic text-accent mt-1 sm:mt-2">
            <KineticText as="span" split="word" stagger={0.06} delay={0.18}>
              another call.
            </KineticText>
          </span>
        </h1>

        <p
          className="fluid-lede mt-8 sm:mt-10 text-text-secondary max-w-2xl leading-snug"
          style={{ textShadow: '0 1px 12px rgba(7,7,7,0.85)' }}
        >
          The AI voice receptionist that picks up{' '}
          <span className="text-text-primary">24/7</span>
          {' '}— so you never lose revenue to voicemail.
        </p>

        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <MagneticCTA radius={130} strength={0.4}>
            <Link
              href={brand.calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-9 py-4"
            >
              Start Free Trial
              <span aria-hidden="true" className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              <span className="sr-only"> (opens cal.com booking page in new tab)</span>
            </Link>
          </MagneticCTA>
          <button
            type="button"
            onClick={onContactOpen}
            className="btn-ghost text-base px-9 py-4"
          >
            Talk to Sales
          </button>
        </div>

        <p className="mt-8 sm:mt-10 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] sm:tracking-[0.32em] text-text-tertiary">
          Setup in 15 minutes  ·  99.7% satisfaction  ·  24 / 7
        </p>

        {/* Editorial micro-metric strip — visible on every viewport */}
        <ul className="mt-10 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-px w-full max-w-3xl bg-border-subtle/60 rounded-2xl overflow-hidden border border-border-subtle backdrop-blur-md">
          {microMetrics.map(([n, label], i) => (
            <li
              key={i}
              className="bg-[rgba(7,7,7,0.55)] px-4 py-4 sm:px-5 text-center"
            >
              <div className="text-lg sm:text-xl lg:text-2xl font-display font-normal text-text-primary tabular-nums tracking-tight">{n}</div>
              <div className="mt-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.24em] sm:tracking-[0.28em] text-text-tertiary">{label}</div>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Scroll affordance */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-text-tertiary"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.32em]">Scroll</span>
        <span className="block w-px h-10 bg-gradient-to-b from-text-tertiary to-transparent motion-safe:animate-bounce-subtle" />
      </div>
    </section>
  );
}
