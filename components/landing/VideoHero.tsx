'use client';

import Link from 'next/link';
import { BackgroundVideo } from '@/components/BackgroundVideo';

export function VideoHero({ onContactOpen }: { onContactOpen?: () => void }) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden"
    >
      <BackgroundVideo
        poster="/videos/hero-poster.svg"
        sources={[
          { src: '/videos/hero.av1.mp4', type: 'video/mp4; codecs=av01.0.05M.08' },
          { src: '/videos/hero.webm', type: 'video/webm' },
          { src: '/videos/hero.mp4', type: 'video/mp4' },
        ]}
        className="absolute inset-0"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <span className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/40 bg-bg-secondary/60 backdrop-blur-sm text-[11px] font-mono uppercase tracking-widest text-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-accent motion-safe:animate-pulse" aria-hidden="true" />
          Live in Australia
        </span>

        <h1
          id="hero-heading"
          className="fluid-display font-display font-normal tracking-tight"
          style={{ textShadow: '0 2px 24px rgba(7,11,10,0.9), 0 1px 2px rgba(7,11,10,0.6)' }}
        >
          <span className="block">Never miss</span>
          <span className="block italic text-accent">another call.</span>
        </h1>

        <p className="fluid-body mt-8 text-text-secondary max-w-xl" style={{ textShadow: '0 1px 12px rgba(7,11,10,0.85)' }}>
          The AI voice receptionist that picks up 24/7 — so you never lose revenue to voicemail.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="https://accounts.gizmoo.me/sign-up"
            className="btn-primary text-base px-8 py-4 min-h-[44px] min-w-[44px]"
          >
            Start Free Trial
          </Link>
          <button
            type="button"
            onClick={onContactOpen}
            className="btn-ghost text-base px-8 py-4 min-h-[44px] min-w-[44px]"
          >
            Talk to Sales
          </button>
        </div>

        <p className="mt-8 text-xs font-mono uppercase tracking-[0.3em] text-text-tertiary">
          Setup in 15 minutes · 99.7% satisfaction · 24/7
        </p>
      </div>
    </section>
  );
}
