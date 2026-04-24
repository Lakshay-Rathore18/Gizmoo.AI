'use client';

import { useState } from 'react';
import { testimonials } from '@/lib/brand';

function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <div className="shrink-0 w-[350px] md:w-[400px] nk-card p-8 mx-3 hover:border-accent/30 transition-colors duration-300 group">
      <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div>
        <p className="font-display font-bold text-text-primary">{t.name}</p>
        <p className="text-sm text-text-tertiary">
          {t.role}, {t.company}
        </p>
      </div>
    </div>
  );
}

function TestimonialRow({
  items,
  reverse,
  pauseLabel,
}: {
  items: (typeof testimonials)[number][];
  reverse?: boolean;
  pauseLabel: string;
}) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative mb-6">
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10" />
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10" />
      <div
        className="flex animate-marquee"
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {items.map((t, i) => (
          <TestimonialCard key={`${pauseLabel}-${i}`} t={t} />
        ))}
      </div>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((p) => !p)}
        className="absolute bottom-2 right-2 z-20 min-h-[32px] min-w-[32px] rounded-full border border-border-subtle bg-bg-secondary/80 backdrop-blur-sm px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-text-secondary hover:text-accent hover:border-accent/60 transition-colors"
      >
        {paused ? 'Play' : 'Pause'}
        <span className="sr-only"> {pauseLabel}</span>
      </button>
    </div>
  );
}

export function Testimonials() {
  const row1 = [...testimonials.slice(0, 3), ...testimonials.slice(0, 3)];
  const row2 = [...testimonials.slice(3), ...testimonials.slice(3)];

  return (
    <section className="relative py-section overflow-hidden">
      <div className="max-w-content mx-auto px-6 mb-12">
        <span className="section-label block mb-8">07 — Testimonials</span>
        <h2 className="fluid-h2 font-display font-bold tracking-tight max-w-2xl">
          500+ businesses never miss a call.
        </h2>
      </div>

      <TestimonialRow items={row1} pauseLabel="row 1 testimonials" />
      <TestimonialRow items={row2} reverse pauseLabel="row 2 testimonials" />
    </section>
  );
}
