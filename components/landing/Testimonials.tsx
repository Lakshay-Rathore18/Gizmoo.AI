'use client';

import { motion } from 'framer-motion';
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

export function Testimonials() {
  // Double the items for infinite scroll
  const row1 = [...testimonials.slice(0, 3), ...testimonials.slice(0, 3)];
  const row2 = [...testimonials.slice(3), ...testimonials.slice(3)];

  return (
    <section className="relative py-section overflow-hidden">
      <div className="max-w-content mx-auto px-6 mb-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label block mb-8"
        >
          07 — Testimonials
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-display-sm font-display font-bold tracking-tight max-w-2xl"
        >
          500+ businesses never miss a call.
        </motion.h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10" />
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10" />
        <div className="flex animate-marquee-reverse hover:[animation-play-state:paused]">
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
