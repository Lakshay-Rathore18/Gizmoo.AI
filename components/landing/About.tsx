'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

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

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Section label fade
      gsap.from('.about-label', {
        opacity: 0, duration: 0.5,
        scrollTrigger: { trigger: '.about-label', start: 'top 85%', toggleActions: 'play none none none' },
      });

      // Heading clipPath mask reveal
      gsap.from('.about-heading-line', {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.6,
        ease: 'power4.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.about-heading', start: 'top 80%', toggleActions: 'play none none none' },
      });

      // Description paragraphs
      gsap.from('.about-desc', {
        opacity: 0, y: 30, duration: 0.5,
        stagger: 0.15,
        scrollTrigger: { trigger: '.about-desc-wrap', start: 'top 80%', toggleActions: 'play none none none' },
      });

      // Stat cards entry
      gsap.from('.about-stat', {
        opacity: 0, y: 40, duration: 0.5,
        stagger: 0.1,
        scrollTrigger: { trigger: '.about-stats', start: 'top 85%', toggleActions: 'play none none none' },
      });

      // GSAP-powered counter animations
      statsData.forEach((stat, i) => {
        const counterEl = el.querySelector(`.counter-${i}`);
        if (!counterEl) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: counterEl, start: 'top 85%', toggleActions: 'play none none none' },
          onUpdate: () => {
            const v = stat.decimals > 0 ? obj.val.toFixed(stat.decimals) : Math.round(obj.val);
            const display = stat.format ? Number(v).toLocaleString() : String(v);
            counterEl.textContent = display + stat.suffix;
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-label="About Gizmoo AI" className="relative py-section">
      <div className="max-w-content mx-auto px-6">
        <span className="about-label section-label block mb-8">00 — About</span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div className="about-heading">
            <h2 className="text-display-sm font-display font-bold tracking-tight leading-[1.1]">
              <span className="about-heading-line block">What is</span>
              <span className="about-heading-line block">Gizmoo AI?</span>
            </h2>
          </div>

          <div className="about-desc-wrap">
            <p className="about-desc text-text-secondary text-base md:text-lg leading-relaxed mb-4">
              <strong className="text-text-primary">Gizmoo AI</strong> is an Australian AI voice receptionist
              that answers business phone calls 24/7. It picks up every inbound call within seconds, qualifies
              the caller, books appointments directly into your calendar, and sends SMS confirmations — all
              without human intervention.
            </p>
            <p className="about-desc text-text-secondary text-base md:text-lg leading-relaxed">
              Unlike traditional answering services, Gizmoo uses advanced conversational AI with
              natural-sounding speech and emotional intelligence. Most callers don&apos;t realize
              they&apos;re speaking with AI. When Gizmoo encounters something it can&apos;t handle,
              it seamlessly transfers with full context.
            </p>
          </div>
        </div>

        <div className="about-stats grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border-subtle rounded-2xl overflow-hidden mb-20">
          {statsData.map((stat, i) => (
            <div key={i} className="about-stat bg-bg-primary p-6 md:p-8 text-center">
              <div className={`counter-${i} text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-2 tabular-nums`}>
                0{stat.suffix}
              </div>
              <div className="text-xs md:text-sm text-text-tertiary uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="mx-8 text-lg md:text-xl text-text-tertiary font-display tracking-wide">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
