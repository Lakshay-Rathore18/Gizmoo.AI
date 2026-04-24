'use client';

import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Connect Your Number',
    description:
      'Forward your existing business line or get a new AI-powered number. 5-minute setup — no hardware, no code, no IT department required. Works with any phone system, any carrier, any country.',
    detail: 'Supports local, mobile, and toll-free numbers across Australia.',
  },
  {
    number: '02',
    title: 'Train Your AI',
    description:
      'Tell Gizmoo about your business, services, hours, and booking rules. It learns your tone and brand voice in minutes. Upload your FAQ, service catalog, or just describe your business in plain English.',
    detail: 'AI adapts to your specific terminology and customer expectations.',
  },
  {
    number: '03',
    title: 'Go Live',
    description:
      'Start answering calls and booking appointments immediately. Monitor every conversation with real-time analytics, call transcripts, and sentiment analysis. Your AI receptionist never takes a day off.',
    detail: 'Full dashboard with call recordings, booking stats, and insights.',
  },
];

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();

  return (
    <section className="relative py-section">
      <div className="max-w-content mx-auto px-6">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label block mb-8"
        >
          06 — How It Works
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-display-sm font-display font-bold tracking-tight mb-16 max-w-2xl"
        >
          Enterprise AI. Simple setup.
        </motion.h2>

        {/* Accordion */}
        <div className="max-w-4xl">
          {steps.map((step, i) => {
            const btnId = `${baseId}-btn-${i}`;
            const panelId = `${baseId}-panel-${i}`;
            const expanded = i === activeIndex;
            return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="border-b border-border-subtle"
            >
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setActiveIndex(i === activeIndex ? -1 : i)}
                className="w-full py-6 md:py-8 flex items-center gap-6 text-left group min-h-[44px]"
              >
                {/* Number */}
                <span
                  className={`text-2xl md:text-3xl font-mono font-light transition-colors duration-300 ${
                    i === activeIndex ? 'text-accent' : 'text-text-tertiary'
                  }`}
                >
                  /{step.number}
                </span>

                {/* Separator */}
                <span className="hidden md:block w-12 h-[1px] bg-border-subtle" />

                {/* Title */}
                <span
                  className={`flex-1 text-lg md:text-2xl font-display font-bold transition-colors duration-300 ${
                    i === activeIndex ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                  }`}
                >
                  {step.title}
                </span>

                {/* Toggle icon */}
                <motion.span
                  animate={{ rotate: i === activeIndex ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl text-text-tertiary"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-0 md:pl-[calc(3rem+3.5rem)] pr-4 md:pr-8">
                      <p className="text-text-secondary text-base leading-relaxed mb-3">
                        {step.description}
                      </p>
                      <p className="text-sm text-accent/70">{step.detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            );
          })}
        </div>

        {/* Integration badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 flex flex-wrap items-center gap-4"
        >
          <span className="px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm">
            100+ Integrations
          </span>
          <span className="text-text-tertiary text-sm">
            Google Calendar · Outlook · Calendly · Cal.com · HubSpot · Salesforce · and more
          </span>
        </motion.div>
      </div>
    </section>
  );
}
