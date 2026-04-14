'use client';

import { PhoneForwarded, Brain, Rocket } from 'lucide-react';
import { LiveCallDashboard } from '@/components/animations/LiveCallDashboard';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const steps = [
  {
    icon: PhoneForwarded,
    step: 'Step 01',
    label: 'Connect Your Number',
    copy: 'Forward your existing business line or get a new AI-powered number. 5-minute setup — no hardware, no code.',
  },
  {
    icon: Brain,
    step: 'Step 02',
    label: 'Train Your AI',
    copy: 'Tell Gizmoo about your business, services, hours, and booking rules. It learns your tone and brand voice in minutes.',
  },
  {
    icon: Rocket,
    step: 'Step 03',
    label: 'Go Live',
    copy: 'Start answering calls and booking appointments immediately. Monitor every conversation with real-time analytics.',
  },
];

export function Tech() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-36 bg-surface overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-sarmat-lime">
              {'// 04 — How Gizmoo AI works'}
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl tracking-tight leading-[0.95]">
              Enterprise AI. <br />
              <span className="text-gradient-brand">Simple setup.</span>
            </h2>
            <p className="mt-6 text-paper/70 text-lg max-w-xl">
              Most businesses are live in under 15 minutes. No IT team required. No new hardware.
              Just a phone line and a few preferences.
            </p>

            <div className="mt-10 space-y-6">
              {steps.map((s) => (
                <div key={s.label} className="group flex gap-4 pb-6 border-b border-white/[0.06] last:border-0">
                  <div className="relative shrink-0 w-10 h-10 border border-white/[0.1] rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:border-sarmat-lime/50 transition-colors">
                    <s.icon className="w-4 h-4 text-sarmat-lime" aria-hidden />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-paper/50">
                      {s.step}
                    </div>
                    <div className="font-display font-bold text-lg mt-0.5">{s.label}</div>
                    <div className="mt-1 text-paper/60 text-sm leading-relaxed">{s.copy}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="font-mono text-[10px] uppercase tracking-widest text-paper/50 mb-3">
                100+ integrations
              </div>
              <div className="flex flex-wrap gap-2">
                {['Google Calendar', 'Outlook', 'Calendly', 'Acuity', 'Cal.com', 'HubSpot', 'Salesforce', 'Twilio'].map((i) => (
                  <span key={i} className="px-3 py-1.5 border border-white/[0.08] rounded-full text-xs text-paper/70 hover:border-sarmat-lime/40 hover:text-sarmat-lime transition-colors">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative glass-card rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <div className="font-mono text-[10px] uppercase tracking-widest text-paper/60">
                  gizmoo-voice.v2.4
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-sarmat-limeLight">
                  <span className="w-1.5 h-1.5 rounded-full bg-sarmat-limeLight animate-pulse" />
                  On Call
                </div>
              </div>
              <LiveCallDashboard />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
