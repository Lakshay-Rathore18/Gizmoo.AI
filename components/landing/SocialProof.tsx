'use client';

import { Marquee } from '@/components/ui/Marquee';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const brands = [
  'MITCHELL DENTAL',
  'RODRIGUEZ LAW',
  'BRADLEY HVAC',
  'KIM REAL ESTATE',
  'SERENITY SPA',
  'NORTHWIND CLINIC',
  'HALCYON MEDICAL',
  'BEACON HEALTH',
  'ORBITAL PLUMBING',
  'VERVE SALON',
  'FIGROOT BUILDERS',
  'HARBOR VETERINARY',
];

export function SocialProof() {
  return (
    <section className="relative py-16 md:py-24 border-y border-white/[0.06] bg-ink" aria-label="Trusted by">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/50">
            {'// Trusted by 500+ businesses to answer their calls'}
          </span>
          <span className="flex-1 h-px bg-white/[0.08]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/50">
            50,000+ calls / month
          </span>
        </div>
      </ScrollReveal>

      <Marquee className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        {brands.map((b) => (
          <div
            key={b}
            className="font-display font-bold text-xl md:text-2xl tracking-tight text-paper/40 hover:text-paper transition-colors duration-300 whitespace-nowrap"
          >
            {b}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
