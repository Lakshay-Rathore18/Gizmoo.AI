'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { brand } from '@/lib/brand';
import { ParticleField } from '@/components/ParticleField';

const headlineWords = [
  { text: 'Never', weight: 'font-light' },
  { text: 'miss', weight: 'font-light' },
  { text: 'another', weight: 'font-bold' },
  { text: 'call.', weight: 'font-bold text-accent' },
];

const statBadges = [
  { label: '50,000+ calls', x: '8%', y: '25%' },
  { label: '99.7% satisfaction', x: '78%', y: '18%' },
  { label: '24/7', x: '85%', y: '72%' },
];

export function Hero({ onContactOpen }: { onContactOpen?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Word-by-word mask reveal
      gsap.from('.hero-word', {
        y: '110%',
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.3,
      });

      // Subtitle
      gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.5, delay: 0.8 });

      // CTAs
      gsap.from('.hero-ctas', { opacity: 0, y: 20, duration: 0.5, delay: 1.0 });

      // Stat badges
      gsap.from('.hero-badge', {
        opacity: 0, scale: 0.8, duration: 0.5,
        stagger: 0.2, delay: 1.2,
      });

      // Scroll indicator
      gsap.from('.hero-scroll', { opacity: 0, duration: 0.5, delay: 1.5 });

      // Scroll indicator bounce
      gsap.to('.hero-scroll-line', {
        y: 8, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut',
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      <ParticleField />

      <div className="relative z-10 max-w-content mx-auto px-6 text-center pt-20">
        <h1 className="text-display-lg leading-[0.95] tracking-tight mb-8">
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <span className={`hero-word inline-block font-display ${word.weight}`}>
                {word.text}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-subtitle text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          {brand.tagline}
        </p>

        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={brand.signUp} className="btn-primary text-base px-8 py-4">
            Start Free Trial
          </a>
          <a href={brand.calLink} className="btn-ghost text-base px-8 py-4" target="_blank" rel="noopener noreferrer">
            Watch Demo
          </a>
        </div>
      </div>

      <div className="hidden lg:block" aria-hidden>
        {statBadges.map((badge, i) => (
          <div
            key={i}
            className="hero-badge absolute animate-float"
            style={{ left: badge.x, top: badge.y, animationDelay: `${i * 2}s` }}
          >
            <div className="px-4 py-2 rounded-full bg-bg-secondary/80 border border-border-subtle text-sm text-text-secondary backdrop-blur-sm">
              {badge.label}
            </div>
          </div>
        ))}
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-text-tertiary uppercase tracking-[0.2em]">
          Scroll to discover
        </span>
        <div className="hero-scroll-line w-[1px] h-8 bg-gradient-to-b from-accent/60 to-transparent" />
      </div>
    </section>
  );
}
