'use client';

import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { motion, useInView } from 'framer-motion';

type Agent = {
  number: string;
  role: string;
  tagline: string;
  detail: string;
  capabilities: string[];
};

const agents: Agent[] = [
  {
    number: '01',
    role: 'The Receptionist',
    tagline: 'Picks up on ring one.',
    detail:
      'Answers every call day, night, Saturday morning, Boxing Day. Knows your business, your pricing, your service area. Sounds like a real person — because the AI is trained on how real receptionists actually talk.',
    capabilities: ['24/7 answer', 'Real Australian voice', 'Knows your service area', 'Warm, friendly, patient'],
  },
  {
    number: '02',
    role: 'The Qualifier',
    tagline: 'Separates real jobs from tyre-kickers.',
    detail:
      'Asks the right questions in the right order. Urgent leak? Routes to on-call. Quote shopper? Captures details and books a callback. Every call ends with a decision, not a "we\'ll get back to you".',
    capabilities: ['Intent triage', 'Budget + timeline check', 'Suburb + access check', 'Zero awkward silences'],
  },
  {
    number: '03',
    role: 'The Booker',
    tagline: 'Slots jobs into your calendar, live.',
    detail:
      'Reads your Google Calendar / Outlook / Cal.com in real time. Books directly into the slot. Sends SMS confirmations with the suburb, address, time, and your crew. No double bookings. No back-and-forth.',
    capabilities: ['Live calendar sync', 'SMS confirmation', 'Automatic reminders', 'Reschedules in-call'],
  },
  {
    number: '04',
    role: 'The Follow-up',
    tagline: "Chases the leads you would've lost.",
    detail:
      "Quote sent, no reply? A callback 48 hours later. Appointment tomorrow? A reminder tonight. No-show? A same-day message + rebook offer. The AI runs your sales motion while you're on site.",
    capabilities: ['Quote chasing', 'Appointment reminders', 'Same-day rebook', 'Post-job review request'],
  },
];

function AgentCard({ a, index }: { a: Agent; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const head = a.role.split(' ').slice(0, -1).join(' ');
  const tail = a.role.split(' ').slice(-1).join(' ');

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <motion.article
      ref={ref as never}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 0.84, 0.32, 1], delay: (index % 2) * 0.08 }}
      onPointerMove={onPointerMove}
      className="nk-card p-7 md:p-10 h-full group relative"
    >
      <div className="flex items-start justify-between mb-8">
        <motion.span
          initial={{ rotate: -6, opacity: 0 }}
          animate={inView ? { rotate: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 0.84, 0.32, 1], delay: 0.1 + (index % 2) * 0.08 }}
          className="font-display font-normal text-[3.25rem] md:text-[4rem] leading-none text-accent tabular-nums tracking-kinetic"
          aria-hidden="true"
        >
          {a.number}
        </motion.span>
        <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-text-tertiary mt-3">
          Agent
        </span>
      </div>

      <h3 className="mt-2 text-2xl md:text-[1.875rem] font-display font-normal leading-[1.15] tracking-tight">
        {head} <span className="italic text-accent">{tail}</span>
      </h3>
      <p className="mt-3 text-lg md:text-xl font-display text-text-primary">{a.tagline}</p>
      <p className="mt-4 text-base text-text-secondary leading-relaxed">{a.detail}</p>

      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-6 border-t border-border-subtle">
        {a.capabilities.map((c, ci) => (
          <li key={ci} className="flex items-start gap-3 py-1">
            <span aria-hidden="true" className="mt-2 w-3 h-px bg-accent/60 shrink-0" />
            <span className="text-sm text-text-secondary leading-relaxed">{c}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function FourAgents() {
  return (
    <section
      id="agents"
      aria-labelledby="agents-heading"
      className="relative w-full bg-bg-primary"
    >
      <div className="max-w-content mx-auto px-6 pt-section pb-12">
        <span className="section-label block mb-7">04 — The crew</span>
        <h2
          id="agents-heading"
          className="fluid-h2 font-display font-normal tracking-tight max-w-4xl"
        >
          Four agents.{' '}
          <span className="italic text-accent">One phone line.</span>
        </h2>
        <p className="mt-6 fluid-body text-text-secondary max-w-2xl">
          Gizmoo isn&apos;t a single bot — it&apos;s a crew of specialised agents, each doing the job a real receptionist + scheduler + sales assistant would do, together.
        </p>
      </div>

      <div className="max-w-content mx-auto px-6 pb-section grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {agents.map((a, i) => (
          <AgentCard key={i} a={a} index={i} />
        ))}
      </div>
    </section>
  );
}
