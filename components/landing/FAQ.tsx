'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'How natural does Gizmoo AI actually sound?',
    a: 'Extremely natural. Gizmoo uses advanced voice AI with natural pauses, filler words, and emotional understanding. Most callers do not realize they are speaking with AI — you can hear it yourself by calling our demo line in the hero above.',
  },
  {
    q: 'Can Gizmoo handle complex requests?',
    a: 'Yes. Gizmoo understands context, remembers details within a conversation, handles multi-step requests (book, reschedule, take a message, answer a question), and knows exactly when to transfer to a human for complex situations.',
  },
  {
    q: 'What happens if Gizmoo cannot help a caller?',
    a: 'Gizmoo seamlessly transfers to your team when it hits something it cannot handle, or takes a detailed message with full context and caller sentiment. Nothing ever falls through the cracks.',
  },
  {
    q: 'How long does setup take?',
    a: 'Most businesses are live within 15 minutes. Forward your existing number or spin up a new AI-powered line, customize your greeting, booking rules, and business info — and you are ready to answer calls.',
  },
  {
    q: 'Which calendars does Gizmoo integrate with?',
    a: 'Google Calendar, Outlook, Calendly, Acuity Scheduling, Cal.com, and 100+ more through our integration marketplace. Your calendar stays perfectly synced, time-zone aware, and never double-booked.',
  },
  {
    q: 'Can Gizmoo make outbound calls?',
    a: 'Absolutely. Appointment reminders, follow-up calls, confirmation calls, and re-engagement campaigns. Set the rules and the schedule, and Gizmoo dials — politely, consistently, and at scale.',
  },
  {
    q: 'Is my data and caller information secure?',
    a: 'Yes. Gizmoo is SOC 2 Type II compliant, uses end-to-end encryption, and follows strict data handling protocols. Healthcare customers can sign a HIPAA BAA. Your business data and caller PII are always protected.',
  },
  {
    q: 'What industries use Gizmoo?',
    a: 'Medical and dental practices, law firms, real estate, salons and spas, home services (HVAC, plumbing, electrical), restaurants, and any business that receives phone calls. If you have a phone, Gizmoo can help.',
  },
  {
    q: 'Can I customize what Gizmoo says?',
    a: 'Completely. Customize greetings, responses, booking rules, after-hours behavior, business information, and even the personality of the AI to match your brand voice exactly.',
  },
  {
    q: 'What happens if I go over my call limit?',
    a: 'We will never cut a caller off mid-conversation. You will get a notification as you approach your limit with a one-click upgrade option, so service stays uninterrupted.',
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-36 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyber-lime">
              {'// 07 — FAQ'}
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl tracking-tight">
              Everything you were <br />
              <span className="text-gradient-brand">about to ask.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="mt-16 border-t border-surface-border">
          {faqs.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={item.q} className="border-b border-surface-border">
                <button
                  id={`faq-q-${i}`}
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group min-h-[44px]"
                  style={{ touchAction: 'manipulation' }}
                  aria-expanded={open}
                >
                  <span
                    className={cn(
                      'font-display text-lg md:text-xl font-bold tracking-tight transition-colors',
                      open ? 'text-cyber-cyan' : 'text-paper group-hover:text-cyber-cyan',
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 w-8 h-8 border border-surface-border flex items-center justify-center transition-all',
                      open ? 'rotate-45 border-cyber-cyan bg-cyber-cyan/10' : 'group-hover:border-paper/50',
                    )}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <div
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={cn('overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]', open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0')}
                >
                  <p className="pb-6 pr-14 text-paper/70 leading-relaxed">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
