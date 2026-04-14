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
    <section id="how-it-works" className="relative py-[120px] md:py-[150px] bg-surface overflow-hidden">
      <div aria-hidden className="absolute inset-0 topo-texture" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal>
            <span className="section-label">
              04 — How It Works
            </span>
            <h2 className="mt-4 font-display uppercase tracking-wide text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-white">
              Enterprise AI.<br />
              Simple setup.
            </h2>
            <p className="mt-6 text-white/55 text-lg max-w-xl font-body">
              Most businesses are live in under 15 minutes. No IT team required. No new hardware.
              Just a phone line and a few preferences.
            </p>

            <div className="mt-10 space-y-6">
              {steps.map((s) => (
                <div key={s.label} className="group flex gap-4 pb-6 border-b border-white/[0.06] last:border-0">
                  <div className="relative shrink-0 w-10 h-10 border border-white/[0.1] rounded-[2px] bg-white/[0.03] flex items-center justify-center group-hover:border-white/30 transition-colors">
                    <s.icon className="w-4 h-4 text-white/55" aria-hidden />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                      {s.step}
                    </div>
                    <div className="font-display uppercase tracking-wide text-lg mt-0.5 text-white">{s.label}</div>
                    <div className="mt-1 text-white/55 text-sm leading-relaxed font-body">{s.copy}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 mb-3">
                100+ integrations
              </div>
              <div className="flex flex-wrap gap-2">
                {['Google Calendar', 'Outlook', 'Calendly', 'Acuity', 'Cal.com', 'HubSpot', 'Salesforce', 'Twilio'].map((i) => (
                  <span key={i} className="px-3 py-1.5 border border-white/[0.08] rounded-[2px] text-xs text-white/55 hover:border-white/20 hover:text-white/70 transition-colors font-mono">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative sarmat-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/55">
                  gizmoo-voice.v2.4
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
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
