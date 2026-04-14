'use client';

import { PhoneIncoming, CalendarPlus, RefreshCw, PhoneOutgoing, Waves, UserRoundCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { staggerContainer, fadeInUp } from '@/lib/animation';

const features: { icon: typeof PhoneIncoming; title: string; copy: string }[] = [
  {
    icon: PhoneIncoming,
    title: 'Answers Every Call',
    copy: '24/7 instant pickup. No hold music. No voicemail. Every caller gets a friendly, intelligent response within seconds — day or night.',
  },
  {
    icon: CalendarPlus,
    title: 'Books Appointments',
    copy: 'Real-time scheduling that checks your availability, books slots, sends confirmations, and handles reschedules — all without a human lifting a finger.',
  },
  {
    icon: RefreshCw,
    title: 'Syncs Your Calendar',
    copy: 'Seamless integration with Google Calendar, Outlook, Calendly, Acuity, and more. Always accurate, never double-booked, time-zone intelligent.',
  },
  {
    icon: PhoneOutgoing,
    title: 'Makes Outbound Calls',
    copy: 'Appointment reminders, follow-ups, confirmations, and re-engagement campaigns. Your AI makes the calls so your team can focus on customers.',
  },
  {
    icon: Waves,
    title: 'Natural Conversations',
    copy: 'Advanced voice AI with natural pauses, context awareness, and emotional intelligence. Sounds so human your callers forget it is AI.',
  },
  {
    icon: UserRoundCheck,
    title: 'Smart Transfers',
    copy: 'Knows exactly when to escalate to a human. Takes detailed messages with full context. Nothing ever falls through the cracks.',
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-[120px] md:py-[150px] bg-ink">
      <div aria-hidden className="absolute inset-0 topo-texture" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="section-label">
              01 — Features
            </span>
            <h2 className="mt-4 font-display uppercase tracking-wide text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-white">
              Six things your new<br />
              receptionist never sleeps on.
            </h2>
            <p className="mt-6 text-white/55 text-lg max-w-2xl font-body">
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
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06]"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeInUp}>
              <div className="bg-ink p-8 md:p-10 hover:bg-white/[0.02] transition-colors duration-200 h-full">
                {/* Two-column within card: icon+label LEFT, paragraph RIGHT */}
                <div className="flex flex-col md:flex-row md:gap-8">
                  <div className="flex items-start gap-3 md:w-[200px] shrink-0 mb-4 md:mb-0">
                    <div className="w-10 h-10 border border-white/[0.12] rounded-[2px] flex items-center justify-center bg-white/[0.03]">
                      <f.icon className="w-4 h-4 text-white/55" aria-hidden />
                    </div>
                    <h3 className="font-display uppercase tracking-wide text-xl text-white mt-1.5">{f.title}</h3>
                  </div>
                  <p className="text-white/55 text-[15px] leading-relaxed font-body flex-1">{f.copy}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
