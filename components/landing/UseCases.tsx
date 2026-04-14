'use client';

import { motion } from 'framer-motion';
import { Counter } from '@/components/animations/Counter';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { cn } from '@/lib/utils';

const cases = [
  {
    label: 'Never miss revenue',
    title: 'Stop losing thousands to missed calls.',
    copy: 'The average missed call costs a business $200. Gizmoo AI answers every inbound call in under 3 seconds — so every opportunity actually converts into a booking.',
    metric: { value: '35', suffix: '%', label: 'more bookings captured' },
    accent: 'cyber-cyan',
  },
  {
    label: '24/7 Availability',
    title: 'Open for business around the clock.',
    copy: 'Emergencies, after-hours leads, and weekend inquiries do not wait for business hours — and neither does your receptionist. Gizmoo works nights, weekends, and holidays without blinking.',
    metric: { value: '24', suffix: '/7', label: 'uninterrupted coverage' },
    accent: 'cyber-gold',
  },
  {
    label: 'Focus on customers',
    title: 'Free your team from the phone.',
    copy: 'Your staff should focus on the customer standing in front of them — not the phone ringing in the back. Let Gizmoo handle every call so your team stays in flow.',
    metric: { value: '8', suffix: 'h', label: 'saved per person / week' },
    accent: 'cyber-lime',
  },
  {
    label: 'Outbound at scale',
    title: 'Reminders that actually get made.',
    copy: 'No-shows quietly kill your margin. Gizmoo AI dials every customer with a friendly reminder, confirms the appointment, and reschedules on the spot if needed.',
    metric: { value: '75', suffix: '%', label: 'fewer no-shows' },
    accent: 'cyber-cyan',
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="relative py-24 md:py-36 bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyber-lime">
              {'// 03 — Transform your business'}
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl tracking-tight">
              Built for every business <br />
              <span className="text-gradient-brand">with a phone number.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-20 space-y-24 md:space-y-32">
          {cases.map((c, i) => {
            const isEven = i % 2 === 0;
            return (
              <ScrollReveal key={c.title} delay={0.05}>
                <div
                  className={cn(
                    'grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center',
                    !isEven && 'lg:[&>*:first-child]:order-2',
                  )}
                >
                  <div className="relative aspect-[4/3] border border-white/[0.08] bg-white/[0.02] rounded-2xl overflow-hidden">
                    <div aria-hidden className="absolute inset-0 bg-grid-dense opacity-30" />
                    <div
                      aria-hidden
                      className={cn(
                        'absolute -inset-20 opacity-40 blur-3xl',
                        c.accent === 'cyber-cyan' && 'bg-cyber-cyan/30',
                        c.accent === 'cyber-gold' && 'bg-cyber-gold/30',
                        c.accent === 'cyber-lime' && 'bg-cyber-lime/20',
                      )}
                    />

                    <div className="relative h-full flex flex-col items-center justify-center p-8">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-paper/50">
                        {c.metric.label}
                      </div>
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-4 font-display font-bold text-7xl md:text-9xl tracking-tighter text-gradient-brand"
                      >
                        <Counter value={c.metric.value} suffix={c.metric.suffix} />
                      </motion.div>
                    </div>

                    {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos) => (
                      <span key={pos} className={`absolute ${pos} w-3 h-3 border border-paper/40`} />
                    ))}
                  </div>

                  <div>
                    <span
                      className={cn(
                        'font-mono text-[10px] uppercase tracking-[0.24em]',
                        c.accent === 'cyber-cyan' && 'text-cyber-cyan',
                        c.accent === 'cyber-gold' && 'text-cyber-gold',
                        c.accent === 'cyber-lime' && 'text-cyber-lime',
                      )}
                    >
                      {`// ${c.label}`}
                    </span>
                    <h3 className="mt-4 font-display font-bold text-3xl md:text-5xl tracking-tight leading-[1.05]">
                      {c.title}
                    </h3>
                    <p className="mt-6 text-paper/70 text-lg leading-relaxed">{c.copy}</p>
                    <span className="mt-8 inline-block font-mono text-sm text-[#666666]">
                      Case study coming soon
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
