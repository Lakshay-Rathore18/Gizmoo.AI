'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const features = [
  {
    title: 'Answers Every Call',
    description: '24/7 instant pickup. Zero voicemail. Every call is answered within seconds, day or night, weekday or holiday. Your callers never hear a busy tone again.',
    stat: '99.7%',
    statLabel: 'pickup rate',
    gradient: 'from-emerald-500/20 to-teal-600/20',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M16 20c0-2 1-4 4-4h8c3 0 4 2 4 4v4c0 2-1 4-4 4h-2l-4 4v-4h-2c-3 0-4-2-4-4v-4z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      </svg>
    ),
  },
  {
    title: 'Books Appointments',
    description: 'Real-time scheduling with instant confirmations. Gizmoo checks availability, books the slot, sends SMS confirmations, and adds it to your calendar — all in one call.',
    stat: '40%',
    statLabel: 'more bookings',
    gradient: 'from-emerald-500/20 to-teal-600/20',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="8" y="10" width="32" height="30" rx="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <line x1="8" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="27" r="2" fill="currentColor" />
        <circle cx="24" cy="27" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="30" cy="27" r="2" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: 'Syncs Your Calendar',
    description: 'Google Calendar, Outlook, Calendly, Acuity, Cal.com, and 100+ more. Always synced, time-zone aware, never double-booked. Your schedule stays pristine.',
    stat: '100+',
    statLabel: 'integrations',
    gradient: 'from-violet-500/20 to-purple-600/20',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M24 14v10l7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Makes Outbound Calls',
    description: 'Appointment reminders, follow-ups, and confirmation calls. Set the rules, set the schedule, and Gizmoo dials — politely, consistently, and at scale.',
    stat: '-60%',
    statLabel: 'no-shows',
    gradient: 'from-amber-500/20 to-orange-600/20',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M14 34l6-6m0 0l8-8m-8 8l-4-4m12 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="32" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M32 13v6l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Natural Conversations',
    description: 'Advanced voice AI with natural pauses, filler words, and emotional intelligence. Most callers genuinely cannot tell they are speaking with AI.',
    stat: '97%',
    statLabel: 'sound human',
    gradient: 'from-rose-500/20 to-pink-600/20',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M12 24h4l4-8 4 16 4-12 4 4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      </svg>
    ),
  },
  {
    title: 'Smart Transfers',
    description: 'Gizmoo knows exactly when to escalate. Complex requests get seamlessly transferred to your team with full context, transcript, and caller sentiment.',
    stat: '0',
    statLabel: 'dropped calls',
    gradient: 'from-sky-500/20 to-indigo-600/20',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <circle cx="16" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <circle cx="32" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M22 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 32v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
        <circle cx="24" cy="36" r="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      </svg>
    ),
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="nk-card p-6 md:p-10 group"
    >
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
        {/* Visual */}
        <motion.div
          style={{ y: parallaxY }}
          className={`w-full md:w-1/2 aspect-[4/3] rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center relative overflow-hidden`}
        >
          <div className="text-accent/60 group-hover:text-accent transition-colors duration-300 scale-[3] md:scale-[4]">
            {feature.icon}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/50 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-accent transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-text-secondary text-base leading-relaxed mb-6">
            {feature.description}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-display font-bold text-accent">
              {feature.stat}
            </span>
            <span className="text-sm text-text-tertiary uppercase tracking-wider">
              {feature.statLabel}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative py-section">
      <div className="max-w-content mx-auto px-6">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label block mb-8"
        >
          03 — Features
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-display-sm font-display font-bold tracking-tight mb-16 max-w-3xl"
        >
          Six things your new receptionist never sleeps on.
        </motion.h2>

        <div className="flex flex-col gap-8 md:gap-12">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
