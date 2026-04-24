'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  {
    value: 240_000,
    prefix: '$',
    suffix: '',
    label: 'lost per tradie, per year',
    detail: 'average Australian trade business missing 3 in 10 calls',
  },
  {
    value: 30,
    prefix: '',
    suffix: '%',
    label: 'of calls go unanswered',
    detail: "during jobs, after hours, on weekends — every missed ring is a competitor's win",
  },
  {
    value: 12,
    prefix: '',
    suffix: 'h',
    label: 'a week on phone triage',
    detail: 'hours you could be quoting, finishing jobs, or actually home',
  },
];

function Counter({ target, delay = 0 }: { target: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target.toLocaleString('en-AU'));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        const startAt = performance.now() + delay;
        const duration = 1400;
        let raf = 0;
        const tick = (now: number) => {
          if (now < startAt) {
            raf = requestAnimationFrame(tick);
            return;
          }
          const p = Math.min(1, (now - startAt) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          const v = Math.round(target * eased);
          setDisplay(v.toLocaleString('en-AU'));
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
  }, [target, delay]);

  return (
    <span
      ref={ref}
      className="text-5xl md:text-7xl lg:text-8xl font-display font-normal text-accent tabular-nums"
    >
      {display}
    </span>
  );
}

export function RevenueLeak() {
  return (
    <section
      id="revenue-leak"
      aria-labelledby="revenue-leak-heading"
      className="relative w-full bg-bg-primary py-section"
    >
      <div className="max-w-content mx-auto px-6">
        <span className="section-label block mb-8">02 — The revenue leak</span>

        <h2
          id="revenue-leak-heading"
          className="fluid-display font-display font-normal tracking-tight max-w-5xl"
        >
          Every unanswered ring is a{' '}
          <span className="italic text-accent">
            door opening for your competitor.
          </span>
        </h2>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="flex items-baseline gap-1">
                {s.prefix && (
                  <span className="text-3xl md:text-5xl font-display font-normal text-accent tabular-nums">
                    {s.prefix}
                  </span>
                )}
                <Counter target={s.value} delay={i * 150} />
                {s.suffix && (
                  <span className="text-3xl md:text-5xl font-display font-normal text-accent tabular-nums">
                    {s.suffix}
                  </span>
                )}
              </div>
              <p className="mt-3 text-base md:text-lg text-text-primary font-display">
                {s.label}
              </p>
              <p className="mt-2 text-sm text-text-secondary max-w-xs">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
