'use client';

import { useEffect, useRef, useState } from 'react';

const statsData = [
  { value: 50000, suffix: '+', label: 'Calls Answered', format: true, decimals: 0 },
  { value: 99.7, suffix: '%', label: 'Satisfaction', format: false, decimals: 1 },
  { value: 24, suffix: '/7/365', label: 'Availability', format: false, decimals: 0 },
  { value: 30, suffix: 's', label: 'Avg Response', format: false, decimals: 0 },
  { value: 500, suffix: '+', label: 'Businesses', format: false, decimals: 0 },
  { value: 15, suffix: ' min', label: 'Setup Time', format: false, decimals: 0 },
];

const marqueeItems = [
  'Healthcare', 'Legal', 'Real Estate', 'Salons & Spas', 'Home Services',
  'HVAC', 'Plumbing', 'Electrical', 'Dental', 'Restaurants',
  'Auto Repair', 'Insurance', 'Property Management', 'Veterinary',
];

function AnimatedCounter({ stat }: { stat: (typeof statsData)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(`0${stat.suffix}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const v = stat.format ? stat.value.toLocaleString() : String(stat.value);
      setDisplay(v + stat.suffix);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        const start = performance.now();
        const duration = 1600;
        let raf = 0;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const n = stat.value * eased;
          const v = stat.decimals > 0 ? n.toFixed(stat.decimals) : String(Math.round(n));
          const display = stat.format ? Number(v).toLocaleString() : v;
          setDisplay(display + stat.suffix);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stat]);

  return (
    <div
      ref={ref}
      className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-2 tabular-nums"
    >
      {display}
    </div>
  );
}

export function About() {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-label="About Gizmoo AI" className="relative py-section">
      <div className="max-w-content mx-auto px-6">
        <span className="section-label block mb-8">01 — About</span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div>
            <h2 className="fluid-h2 font-display font-bold tracking-tight">
              <span className="block">What is</span>
              <span className="block">Gizmoo AI?</span>
            </h2>
          </div>

          <div>
            <p className="fluid-body text-text-secondary mb-4">
              <strong className="text-text-primary">Gizmoo AI</strong> is an Australian AI voice receptionist
              that answers business phone calls 24/7. It picks up every inbound call within seconds, qualifies
              the caller, books appointments directly into your calendar, and sends SMS confirmations — all
              without human intervention.
            </p>
            <p className="fluid-body text-text-secondary">
              Unlike traditional answering services, Gizmoo uses advanced conversational AI with
              natural-sounding speech and emotional intelligence. Most callers don&apos;t realize
              they&apos;re speaking with AI. When Gizmoo encounters something it can&apos;t handle,
              it seamlessly transfers with full context.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border-subtle rounded-2xl overflow-hidden mb-20">
          {statsData.map((stat, i) => (
            <div key={i} className="bg-bg-primary p-6 md:p-8 text-center">
              <AnimatedCounter stat={stat} />
              <div className="text-xs md:text-sm text-text-tertiary uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10" />
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10" />
          <div
            className="flex animate-marquee whitespace-nowrap"
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="mx-8 text-lg md:text-xl text-text-tertiary font-display tracking-wide">
                {item}
              </span>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
            className="absolute bottom-2 right-2 z-20 min-h-[32px] min-w-[32px] rounded-full border border-border-subtle bg-bg-secondary/80 backdrop-blur-sm px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-text-secondary hover:text-accent hover:border-accent/60 transition-colors"
          >
            {paused ? 'Play' : 'Pause'}
            <span className="sr-only"> industries marquee</span>
          </button>
        </div>
      </div>
    </section>
  );
}
