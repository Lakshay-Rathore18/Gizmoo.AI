'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';
import { ClipReveal } from '@/components/primitives/ClipReveal';

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
    detail: 'during jobs, after hours, on weekends — every missed ring is a competitor\'s win',
  },
  {
    value: 12,
    prefix: '',
    suffix: 'h',
    label: 'a week on phone triage',
    detail: 'hours you could be quoting, finishing jobs, or actually home',
  },
];

export function RevenueLeak() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // SplitText on the giant headline so we can char-stagger on reveal
      const split = new SplitText('.leak-headline', {
        type: 'words,chars',
        wordsClass: 'leak-word',
        charsClass: 'leak-char',
      });

      if (prefersReduced) {
        gsap.set('.leak-char', { yPercent: 0, opacity: 1 });
        gsap.set('.leak-counter', { innerText: (i: number) => stats[i].value });
        gsap.set('.leak-row-0, .leak-row-1, .leak-row-2', { opacity: 1, y: 0 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=2400',
            pin: true,
            pinSpacing: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Intro — headline chars cascade in
        tl.from(
          '.leak-char',
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -60,
            duration: 0.9,
            stagger: { amount: 0.6, from: 'random' },
            ease: 'expoOut',
          },
          0,
        );
        tl.fromTo(
          '.leak-accent',
          { fontVariationSettings: '"wght" 200, "opsz" 14' },
          { fontVariationSettings: '"wght" 700, "opsz" 48', duration: 0.8, ease: 'expoOut' },
          0.3,
        );

        // Counter 1
        tl.addLabel('c1', 1.2);
        tl.to('.leak-row-0', { opacity: 1, y: 0, duration: 0.5, ease: 'expoOut' }, 'c1');
        tl.fromTo(
          '.leak-counter[data-i="0"]',
          { innerText: 0 },
          {
            innerText: stats[0].value,
            duration: 0.9,
            ease: 'expoOut',
            snap: { innerText: 1 },
            onUpdate() {
              const t = this.targets()[0] as HTMLElement;
              const v = Number(t.innerText.replace(/[^\d]/g, '')) || 0;
              t.innerText = v.toLocaleString('en-AU');
            },
          },
          'c1',
        );

        // Counter 2
        tl.addLabel('c2', 2.1);
        tl.to('.leak-row-1', { opacity: 1, y: 0, duration: 0.5, ease: 'expoOut' }, 'c2');
        tl.fromTo(
          '.leak-counter[data-i="1"]',
          { innerText: 0 },
          {
            innerText: stats[1].value,
            duration: 0.8,
            ease: 'expoOut',
            snap: { innerText: 1 },
          },
          'c2',
        );

        // Counter 3
        tl.addLabel('c3', 3.0);
        tl.to('.leak-row-2', { opacity: 1, y: 0, duration: 0.5, ease: 'expoOut' }, 'c3');
        tl.fromTo(
          '.leak-counter[data-i="2"]',
          { innerText: 0 },
          {
            innerText: stats[2].value,
            duration: 0.7,
            ease: 'expoOut',
            snap: { innerText: 1 },
          },
          'c3',
        );
      });

      // Mobile — no pin, quick IntersectionObserver triggers
      mm.add('(max-width: 767px)', () => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.from('.leak-char', {
              yPercent: 120,
              opacity: 0,
              duration: 0.6,
              stagger: { amount: 0.3, from: 'random' },
              ease: 'expoOut',
            });
            stats.forEach((s, i) => {
              gsap.to(`.leak-counter[data-i="${i}"]`, {
                innerText: s.value,
                duration: 1,
                ease: 'expoOut',
                snap: { innerText: 1 },
                delay: 0.2 + i * 0.2,
                onUpdate() {
                  const t = this.targets()[0] as HTMLElement;
                  const v = Number(t.innerText.replace(/[^\d]/g, '')) || 0;
                  t.innerText = v.toLocaleString('en-AU');
                },
              });
              gsap.to(`.leak-row-${i}`, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'expoOut',
                delay: 0.2 + i * 0.2,
              });
            });
          },
        });
      });

      return () => split.revert();
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="revenue-leak"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-bg-primary py-section md:py-0 md:h-screen md:flex md:flex-col md:justify-center"
    >
      <div className="max-w-content mx-auto px-6 w-full">
        <ClipReveal direction="up" duration={0.9}>
          <span className="section-label block mb-8">02 — The revenue leak</span>
        </ClipReveal>

        <h2
          className="leak-headline text-[clamp(2.5rem,9vw,8rem)] font-display font-normal leading-[0.9] tracking-tight max-w-5xl"
          style={{ perspective: '900px' }}
        >
          Every unanswered ring is a{' '}
          <span className="leak-accent italic" style={{ color: '#3d7aff' }}>
            door opening for your competitor.
          </span>
        </h2>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`leak-row-${i} opacity-0 translate-y-6`}
            >
              <div className="flex items-baseline gap-1">
                {s.prefix && (
                  <span className="text-3xl md:text-5xl font-display font-normal text-accent tabular-nums">
                    {s.prefix}
                  </span>
                )}
                <span
                  className="leak-counter text-5xl md:text-7xl lg:text-8xl font-display font-normal text-accent tabular-nums"
                  data-i={i}
                >
                  0
                </span>
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
