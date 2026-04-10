'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIncoming, CalendarCheck, PhoneOutgoing, Plug, CheckCircle2 } from 'lucide-react';
import { SplineScene } from '@/components/ui/SplineScene';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { brand } from '@/lib/brand';
import { cn } from '@/lib/utils';

const tabs = [
  {
    id: 'inbound',
    label: 'Inbound Calls',
    icon: PhoneIncoming,
    lines: [
      { role: 'caller', text: '*ring ring*' },
      { role: 'agent', text: 'Hi, thanks for calling Mitchell Family Dental — this is Gizmoo. How can I help?' },
      { role: 'caller', text: 'I need to book a cleaning for next week.' },
      { role: 'agent', text: 'Absolutely. I see Tuesday at 2pm or Thursday at 10am. Which works better?' },
      { role: 'caller', text: 'Thursday at 10 works great.' },
      { role: 'agent', text: "Booked. I'll text you a confirmation right now." },
    ],
  },
  {
    id: 'booking',
    label: 'Appointment Booking',
    icon: CalendarCheck,
    lines: [
      { role: 'sys', text: '→ Checking Google Calendar for availability' },
      { role: 'sys', text: '✓ 3 slots found · Thu 10am · Thu 2pm · Fri 9am' },
      { role: 'sys', text: '→ Slot held · Thu 10:00 · 45 min · Dr. Mitchell' },
      { role: 'sys', text: '✓ Calendar event created' },
      { role: 'sys', text: '✓ SMS confirmation sent to caller' },
      { role: 'sys', text: '✓ Intake form emailed' },
    ],
  },
  {
    id: 'outbound',
    label: 'Outbound Calls',
    icon: PhoneOutgoing,
    lines: [
      { role: 'out', text: '→ Dialing +61 412 555 019 · reminder campaign' },
      { role: 'agent', text: "Hi Sarah, this is Gizmoo from Mitchell Dental with a reminder about your cleaning tomorrow at 10am." },
      { role: 'caller', text: 'Oh, thanks — actually can we push it to Friday?' },
      { role: 'agent', text: 'No problem. Friday at 10am is open — shall I move you to that?' },
      { role: 'caller', text: 'Yes please.' },
      { role: 'agent', text: 'Rescheduled. Have a great day!' },
    ],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: Plug,
    lines: [
      { role: 'sys', text: '✓ Google Calendar · connected' },
      { role: 'sys', text: '✓ Outlook · connected' },
      { role: 'sys', text: '✓ Calendly · connected' },
      { role: 'sys', text: '✓ HubSpot CRM · synced (2,148 contacts)' },
      { role: 'sys', text: '✓ Twilio SMS · active' },
      { role: 'sys', text: '→ 100+ more available in marketplace' },
    ],
  },
];

export function Demo() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section id="demo" className="relative py-24 md:py-36 bg-surface overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid-dense opacity-20" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-cyber-violet/20 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyber-violet">
              {'// 02 — See Gizmoo in action'}
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl tracking-tight">
              One phone line. <span className="text-gradient-brand">Zero missed calls.</span>
            </h2>
            <p className="mt-6 text-paper/70 text-lg max-w-2xl">
              Every inbound call answered instantly. Every appointment booked in real time. Every
              reminder dialed automatically. Here is what it looks like — live.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          <ScrollReveal className="lg:col-span-3" delay={0.1}>
            <div className="holo-border bg-ink">
              <div className="flex items-center gap-1 border-b border-surface-border px-3 pt-3 overflow-x-auto">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 text-sm font-mono transition-colors whitespace-nowrap',
                      active === t.id
                        ? 'text-cyber-cyan border-b-2 border-cyber-cyan -mb-px bg-cyber-cyan/5'
                        : 'text-paper/50 hover:text-paper',
                    )}
                  >
                    <t.icon className="w-3.5 h-3.5" />
                    {t.label}
                  </button>
                ))}
                <div className="ml-auto hidden md:flex gap-1.5 pr-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-rose/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-lime/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-cyan/60" />
                </div>
              </div>

              <div className="min-h-[360px] p-5 md:p-6 font-mono text-sm leading-relaxed">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2"
                  >
                    {current.lines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className={cn(
                          'flex gap-3',
                          line.role === 'caller' && 'text-paper',
                          line.role === 'agent' && 'text-cyber-cyan',
                          line.role === 'sys' && 'text-cyber-lime',
                          line.role === 'out' && 'text-cyber-violet',
                        )}
                      >
                        <span className="select-none text-paper/30 w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                        <span>{line.text}</span>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: current.lines.length * 0.2 + 0.1 }}
                      className="flex items-center gap-2 pt-2 text-cyber-lime"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Handled in 32s — caller satisfied.</span>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-2" delay={0.2}>
            <div className="relative h-full min-h-[360px] bg-ink border border-surface-border overflow-hidden">
              <SplineScene scene={brand.spline.demo} className="w-full h-full" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-cyber-cyan mb-1">
                  Live Agent View
                </div>
                <div className="font-display font-bold text-xl tracking-tight">
                  Every call, transcribed.
                </div>
                <div className="mt-1 text-sm text-paper/60">
                  See every conversation, every booking, every outbound dial — with full transcripts
                  and caller sentiment.
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
