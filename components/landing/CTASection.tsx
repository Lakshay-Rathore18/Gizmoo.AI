'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { brand } from '@/lib/brand';
import { MagneticCTA } from '@/components/primitives/MagneticCTA';

export function CTASection({ onContactOpen }: { onContactOpen?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section ref={ref} className="relative py-section overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb glow-orb-strong w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" aria-hidden />

      <div className="max-w-content mx-auto px-6 text-center relative z-10">
        <h2 className="text-display-lg font-display font-bold tracking-tight leading-[0.95] mb-8">
          {['Ready to never', 'miss a call again?'].map((line, i) => (
            <motion.span
              key={i}
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-text-secondary text-lg md:text-xl mb-10 max-w-xl mx-auto"
        >
          Join 500+ businesses using Gizmoo AI to answer every call, book every appointment, 24/7.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticCTA radius={120} strength={0.4}>
            <a
              href={brand.calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4 inline-block"
            >
              Start Free Trial
              <span className="sr-only"> (opens cal.com booking page in new tab)</span>
            </a>
          </MagneticCTA>
          <a
            href={`tel:${brand.salesPhone.replace(/\s/g, '')}`}
            className="btn-ghost text-base px-8 py-4"
          >
            Talk to Sales
          </a>
        </motion.div>
      </div>
    </section>
  );
}
