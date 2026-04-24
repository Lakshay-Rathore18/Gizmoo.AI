'use client';

import { motion } from 'framer-motion';

const useCases = [
  {
    stat: '+40%',
    statLabel: 'more bookings',
    title: 'Never miss revenue',
    description: 'Every unanswered call is a lost customer. Gizmoo picks up instantly, qualifies the lead, and books the job before your competitor even checks their voicemail.',
    gradient: 'from-emerald-600/10 to-teal-700/10',
  },
  {
    stat: '24/7',
    statLabel: 'uninterrupted coverage',
    title: '24/7 Availability',
    description: "Emergencies don't wait for business hours. Whether it's a burst pipe at midnight or an urgent legal question on Sunday, Gizmoo is always on.",
    gradient: 'from-emerald-600/10 to-teal-700/10',
  },
  {
    stat: '12h',
    statLabel: 'saved per week',
    title: 'Focus on customers',
    description: 'Stop interrupting client work to answer the phone. Gizmoo handles intake, scheduling, and follow-ups while you focus on the work that pays.',
    gradient: 'from-violet-600/10 to-purple-700/10',
  },
  {
    stat: '-60%',
    statLabel: 'fewer no-shows',
    title: 'Outbound at scale',
    description: 'Automated appointment reminders, follow-up calls, and re-engagement campaigns. Set the rules, and Gizmoo dials consistently and politely.',
    gradient: 'from-amber-600/10 to-orange-700/10',
  },
];

export function UseCases() {
  return (
    <section id="use-cases" aria-labelledby="use-cases-heading" className="relative py-section">
      <div className="max-w-content mx-auto px-6 mb-12">
        <span className="section-label block mb-8">03 — Use Cases</span>
        <h2
          id="use-cases-heading"
          className="fluid-h2 font-display font-bold tracking-tight max-w-3xl"
        >
          Built for every business with a phone number.
        </h2>
      </div>

      <div className="max-w-content mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {useCases.map((uc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={`nk-card p-8 md:p-10 bg-gradient-to-br ${uc.gradient}`}
          >
            <div className="text-5xl md:text-6xl font-display font-bold text-accent">
              {uc.stat}
            </div>
            <p className="text-xs md:text-sm text-text-tertiary uppercase tracking-wider mt-1 mb-4">
              {uc.statLabel}
            </p>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-3">{uc.title}</h3>
            <p className="fluid-body text-text-secondary">
              {uc.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
