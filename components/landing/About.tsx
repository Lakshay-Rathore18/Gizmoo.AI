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
        const duration = 1700;
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
      className="text-3xl md:text-4xl lg:text-5xl font-display font-normal text-text-primary tabular-nums tracking-tight"
    >
      {display}
    </div>
  );
}

export function About() {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-label="About Gizmoo AI" className="relative py-section">
      <div aria-hidden="true" className="grid-bg" />
      <div className="max-w-content mx-auto px-6 relative">
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <span className="section-label">01 — About</span>
          <span className="hidden md:inline text-[10px] font-mono uppercase tracking-[0.32em] text-text-tertiary">
            Receptionist · Booker · Follow-up
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24 md:mb-32 items-start">
          <div className="lg:col-span-5">
            <h2 className="fluid-h2 font-display font-normal tracking-tight">
              <span className="block">What is</span>
              <span className="block italic text-accent">Gizmoo AI?</span>
            </h2>
            <div className="mt-10 relative overflow-hidden rounded-2xl border border-border-subtle aspect-[4/3] hidden lg:block">
              <img
                src="/images/sections/about-call.jpg"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(7,7,7,0.62) 0%, rgba(7,7,7,0.18) 50%, rgba(222,219,200,0.06) 100%)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 ring-1 ring-inset ring-[rgba(225,224,204,0.08)]"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-border-subtle">
            <p className="fluid-body text-text-secondary mb-6">
              <strong className="text-text-primary font-normal">Gizmoo AI</strong> is an Australian AI voice receptionist
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

        {/* Editorial stats grid — gap-px reveals border-subtle as hairlines.
            One pattern, three breakpoints, zero per-cell border math. */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border-subtle border border-border-subtle rounded-none overflow-hidden">
          {statsData.map((stat, i) => (
            <div key={i} className="relative bg-bg-primary px-5 py-9 md:px-6 md:py-12">
              <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-text-tertiary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="mt-3">
                <AnimatedCounter stat={stat} />
              </div>
              <div className="mt-2 text-sm text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Industries marquee — editorial serif italic, cream */}
        <div className="relative overflow-hidden mt-20 md:mt-24 border-y border-border-subtle py-7">
          <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10" />
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10" />
          <div
            className="flex animate-marquee whitespace-nowrap"
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="mx-10 text-2xl md:text-3xl text-text-primary font-display font-normal tracking-tight"
              >
                <span className="italic text-accent mr-3">·</span>
                {item}
              </span>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
            className="absolute bottom-2 right-2 z-20 min-h-[32px] min-w-[32px] rounded-full border border-border-subtle bg-[rgba(14,13,11,0.8)] backdrop-blur-sm px-3 py-1 text-[10px] font-mono uppercase tracking-[0.28em] text-text-secondary hover:text-accent hover:border-accent/60 transition-colors"
          >
            {paused ? 'Play' : 'Pause'}
            <span className="sr-only"> industries marquee</span>
          </button>
        </div>
      </div>
    </section>
  );
}
