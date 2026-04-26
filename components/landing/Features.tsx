'use client';

import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  PhoneIncoming,
  CalendarPlus,
  RefreshCw,
  PhoneOutgoing,
  Waves,
  UserRoundCheck,
  type LucideIcon,
} from 'lucide-react';

type Feature = {
  title: string;
  description: string;
  stat: string;
  statLabel: string;
  Icon: LucideIcon;
};

const features: Feature[] = [
  {
    title: 'Answers Every Call',
    description:
      '24/7 instant pickup. Zero voicemail. Every call is answered within seconds, day or night, weekday or holiday. Your callers never hear a busy tone again.',
    stat: '99.7%',
    statLabel: 'pickup rate',
    Icon: PhoneIncoming,
  },
  {
    title: 'Books Appointments',
    description:
      'Real-time scheduling with instant confirmations. Gizmoo checks availability, books the slot, sends SMS confirmations, and adds it to your calendar — all in one call.',
    stat: '40%',
    statLabel: 'more bookings',
    Icon: CalendarPlus,
  },
  {
    title: 'Syncs Your Calendar',
    description:
      'Google Calendar, Outlook, Calendly, Acuity, Cal.com, and 100+ more. Always synced, time-zone aware, never double-booked. Your schedule stays pristine.',
    stat: '100+',
    statLabel: 'integrations',
    Icon: RefreshCw,
  },
  {
    title: 'Makes Outbound Calls',
    description:
      'Appointment reminders, follow-ups, and confirmation calls. Set the rules, set the schedule, and Gizmoo dials — politely, consistently, and at scale.',
    stat: '−60%',
    statLabel: 'no-shows',
    Icon: PhoneOutgoing,
  },
  {
    title: 'Natural Conversations',
    description:
      'Advanced voice AI with natural pauses, filler words, and emotional intelligence. Most callers genuinely cannot tell they are speaking with AI.',
    stat: '97%',
    statLabel: 'sound human',
    Icon: Waves,
  },
  {
    title: 'Smart Transfers',
    description:
      'Gizmoo knows exactly when to escalate. Complex requests get seamlessly transferred to your team with full context, transcript, and caller sentiment.',
    stat: '0',
    statLabel: 'dropped calls',
    Icon: UserRoundCheck,
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const { Icon } = feature;

  // Mouse-relative cream hot-spot — sets CSS vars consumed by `.nk-card::after`.
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${mx}%`);
    el.style.setProperty('--my', `${my}%`);
  };

  // Vary entrance direction by row to break staircase fade-up cliché.
  const fromX = index % 3 === 0 ? -28 : index % 3 === 2 ? 28 : 0;
  const fromY = 56;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: fromX, y: fromY }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 0.84, 0.32, 1], delay: (index % 3) * 0.06 }}
      onPointerMove={onPointerMove}
      className="nk-card p-7 md:p-10 group relative"
    >
      <div className="flex items-start justify-between mb-8">
        <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-text-tertiary">
          {String(index + 1).padStart(2, '0')} — Capability
        </span>
        <Icon
          aria-hidden="true"
          strokeWidth={1.4}
          className="w-7 h-7 text-text-tertiary group-hover:text-accent transition-colors duration-500"
        />
      </div>

      <h3 className="text-2xl md:text-[1.75rem] font-display font-normal tracking-tight mb-4 leading-[1.15]">
        {feature.title}
      </h3>
      <p className="text-text-secondary text-base md:text-[1.0625rem] leading-relaxed mb-10">
        {feature.description}
      </p>

      <div className="pt-6 border-t border-border-subtle flex items-baseline justify-between gap-3">
        <span className="text-3xl md:text-4xl font-display font-normal text-text-primary tabular-nums tracking-tight">
          {feature.stat}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-text-tertiary text-right">
          {feature.statLabel}
        </span>
      </div>
    </motion.article>
  );
}

export function Features() {
  return (
    <section id="features" className="relative py-section">
      <div aria-hidden="true" className="grid-bg" />
      <div className="max-w-content mx-auto px-6 relative">
        <div className="flex items-end justify-between mb-14 md:mb-20 gap-8 flex-wrap">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-label block mb-6"
            >
              03 — Capability
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 0.84, 0.32, 1] }}
              className="fluid-h2 font-display font-normal tracking-tight max-w-3xl"
            >
              Six things your new receptionist{' '}
              <span className="italic text-accent">never sleeps on.</span>
            </motion.h2>
          </div>
          <p className="fluid-body text-text-secondary max-w-md">
            Gizmoo AI is not another phone tree or chatbot. It is a full-time voice receptionist that answers, books, syncs, and follows up — on every call, 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
