'use client';

import { PhoneIncoming, CalendarPlus, RefreshCw, PhoneOutgoing, Waves, UserRoundCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { staggerContainer, fadeInUp } from '@/lib/animation';

type Accent = 'cyan' | 'gold' | 'lime';

const accentClasses: Record<Accent, { border: string; text: string; glow: string }> = {
  cyan: { border: 'border-cyber-cyan/40', text: 'text-cyber-cyan', glow: 'bg-cyber-cyan/20' },
  gold: { border: 'border-cyber-gold/40', text: 'text-cyber-gold', glow: 'bg-cyber-gold/20' },
  lime: { border: 'border-cyber-lime/40', text: 'text-cyber-lime', glow: 'bg-cyber-lime/20' },
};

const features: { icon: typeof PhoneIncoming; title: string; copy: string; accent: Accent }[] = [
  {
    icon: PhoneIncoming,
    title: 'Answers Every Call',
    copy: '24/7 instant pickup. No hold music. No voicemail. Every caller gets a friendly, intelligent response within seconds — day or night.',
    accent: 'cyan',
  },
  {
    icon: CalendarPlus,
    title: 'Books Appointments',
    copy: 'Real-time scheduling that checks your availability, books slots, sends confirmations, and handles reschedules — all without a human lifting a finger.',
    accent: 'gold',
  },
  {
    icon: RefreshCw,
    title: 'Syncs Your Calendar',
    copy: 'Seamless integration with Google Calendar, Outlook, Calendly, Acuity, and more. Always accurate, never double-booked, time-zone intelligent.',
    accent: 'lime',
  },
  {
    icon: PhoneOutgoing,
    title: 'Makes Outbound Calls',
    copy: 'Appointment reminders, follow-ups, confirmations, and re-engagement campaigns. Your AI makes the calls so your team can focus on customers.',
    accent: 'cyan',
  },
  {
    icon: Waves,
    title: 'Natural Conversations',
    copy: 'Advanced voice AI with natural pauses, context awareness, and emotional intelligence. Sounds so human your callers forget it is AI.',
    accent: 'gold',
  },
  {
    icon: UserRoundCheck,
    title: 'Smart Transfers',
    copy: 'Knows exactly when to escalate to a human. Takes detailed messages with full context. Nothing ever falls through the cracks.',
    accent: 'lime',
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-36 bg-ink">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyber-cyan">
              {'// 01 — What Gizmoo AI Does'}
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl tracking-tight">
              Six things your new <br />
              <span className="text-gradient-brand">receptionist never sleeps on.</span>
            </h2>
            <p className="mt-6 text-paper/70 text-lg max-w-2xl">
              Gizmoo AI is not another phone tree or chatbot. It is a full-time voice receptionist
              that answers, books, syncs, and follows up — on every call, 24/7.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => {
            const a = accentClasses[f.accent];
            return (
              <motion.div key={f.title} variants={fadeInUp}>
                <Card className="h-full hover:bg-white/[0.05]">
                  <div className="flex items-start gap-4">
                    <div className={`relative shrink-0 w-12 h-12 border ${a.border} flex items-center justify-center`}>
                      <f.icon className={`w-5 h-5 ${a.text}`} aria-hidden />
                      <span className={`absolute inset-0 ${a.glow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl tracking-tight">{f.title}</h3>
                      <p className="mt-2 text-paper/60 text-[15px] leading-relaxed">{f.copy}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
