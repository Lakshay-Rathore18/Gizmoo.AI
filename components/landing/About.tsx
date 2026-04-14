'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const statsData = [
  { value: 50000, suffix: '+', label: 'Calls Answered', format: true },
  { value: 99.7, suffix: '%', label: 'Satisfaction', format: false },
  { value: 24, suffix: '/7/365', label: 'Availability', format: false },
  { value: 30, suffix: 's', label: 'Avg Response', format: false },
  { value: 500, suffix: '+', label: 'Businesses', format: false },
  { value: 15, suffix: ' min', label: 'Setup Time', format: false },
];

function AnimatedCounter({ value, suffix, format, inView }: {
  value: number; suffix: string; format: boolean; inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value * 10) / 10);
      if (step >= steps) {
        setCount(value);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  const displayValue = format
    ? Math.round(count).toLocaleString()
    : Number.isInteger(value)
      ? Math.round(count).toString()
      : count.toFixed(1);

  return (
    <span className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

const marqueeItems = [
  'Healthcare', 'Legal', 'Real Estate', 'Salons & Spas', 'Home Services',
  'HVAC', 'Plumbing', 'Electrical', 'Dental', 'Restaurants',
  'Auto Repair', 'Insurance', 'Property Management', 'Veterinary',
];

export function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-20%' });
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-10%' });

  return (
    <section aria-label="About Gizmoo AI" className="relative py-section">
      <div className="max-w-content mx-auto px-6">
        {/* Section label */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-label block mb-8"
        >
          00 — About
        </motion.span>

        {/* Two-column layout */}
        <div ref={headingRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Left: Large heading */}
          <div>
            <h2 className="text-display-sm font-display font-bold tracking-tight leading-[1.1]">
              {['What is', 'Gizmoo AI?'].map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ clipPath: 'inset(0 0 100% 0)' }}
                  animate={headingInView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
            </h2>
          </div>

          {/* Right: Description */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-text-secondary text-base md:text-lg leading-relaxed mb-4"
            >
              <strong className="text-text-primary">Gizmoo AI</strong> is an Australian AI voice receptionist
              that answers business phone calls 24/7. It picks up every inbound call within seconds, qualifies
              the caller, books appointments directly into your calendar, and sends SMS confirmations — all
              without human intervention.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-text-secondary text-base md:text-lg leading-relaxed"
            >
              Unlike traditional answering services, Gizmoo uses advanced conversational AI with
              natural-sounding speech and emotional intelligence. Most callers don&apos;t realize
              they&apos;re speaking with AI. When Gizmoo encounters something it can&apos;t handle,
              it seamlessly transfers with full context.
            </motion.p>
          </div>
        </div>

        {/* Animated Stats Row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border-subtle rounded-2xl overflow-hidden mb-20"
        >
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-bg-primary p-6 md:p-8 text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  format={stat.format}
                  inView={statsInView}
                />
              </div>
              <div className="text-xs md:text-sm text-text-tertiary uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industries Marquee */}
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="mx-8 text-lg md:text-xl text-text-tertiary font-display tracking-wide"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
