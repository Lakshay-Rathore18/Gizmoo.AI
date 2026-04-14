'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { cn } from '@/lib/utils';
import { brand } from '@/lib/brand';

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-24 md:py-36 bg-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="section-label">
              {'// 06 — Pricing'}
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl tracking-tight">
              Start free. <br />
              <span className="text-white">Scale when ready.</span>
            </h2>
            <p className="mt-6 text-paper/70 text-lg">
              No credit card required. No contracts. No surprises. Cancel anytime.
            </p>

            <div className="mt-10 inline-flex items-center gap-1 border border-white/[0.08] p-1 bg-white/[0.03] rounded-full">
              <button
                onClick={() => setAnnual(false)}
                style={{ touchAction: 'manipulation' }}
                className={cn(
                  'px-5 py-2 text-sm font-mono uppercase tracking-wider transition-colors min-h-[44px] rounded-full',
                  !annual ? 'bg-white text-ink' : 'text-paper/60',
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                style={{ touchAction: 'manipulation' }}
                className={cn(
                  'px-5 py-2 text-sm font-mono uppercase tracking-wider transition-colors flex items-center gap-2 min-h-[44px] rounded-full',
                  annual ? 'bg-white text-ink' : 'text-paper/60',
                )}
              >
                Annual
                <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5">-30%</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <ScrollReveal delay={0}>
            <div className="relative h-full flex flex-col p-8 glass-card border-white/20 rounded-[2px] -translate-y-2 shadow-[0_0_40px_rgba(255,255,255,0.06)] hover:shadow-[0_0_60px_rgba(255,255,255,0.10)] transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 border border-white/40 bg-transparent text-white font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                14-Day Free Trial
              </div>
              <div className="font-display font-bold text-2xl">Starter</div>
              <div className="mt-1 text-sm text-paper/60 min-h-[2.5rem]">
                For small businesses trying out an AI receptionist.
              </div>

              <div className="mt-6">
                <div className="text-sm text-paper/50 mb-2">
                  One-time setup: $1,200 AUD
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-5xl">
                    ${annual ? '413' : '589'}
                  </span>
                  <span className="text-paper/50 text-sm">/ month AUD</span>
                  {annual && (
                    <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 font-mono uppercase tracking-wider">
                      Save 30%
                    </span>
                  )}
                </div>
              </div>

              <ul className="mt-8 space-y-3 flex-1">
                {[
                  '24/7 AI voice receptionist',
                  'Job qualification & lead scoring',
                  'Calendar booking automation',
                  'SMS confirmations',
                  'Monthly performance report',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-paper/80">
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-white/50" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                size="lg"
                className="mt-8 w-full"
                data-action="pricing-starter"
                onClick={() => window.open(brand.calLink, '_blank')}
              >
                Start Free Trial
              </Button>
            </div>
          </ScrollReveal>

          {/* Enterprise Plan */}
          <ScrollReveal delay={0.08}>
            <div className="relative h-full flex flex-col p-8 glass-card rounded-[2px] transition-all duration-300">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/[0.06] border border-white/[0.08] text-paper/70 font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                Custom
              </div>
              <div className="font-display font-bold text-2xl">Enterprise</div>
              <div className="mt-1 text-sm text-paper/60 min-h-[2.5rem]">
                Multi-location businesses, high call volumes, or custom integrations.
              </div>

              <div className="mt-6">
                <span className="font-display font-bold text-5xl">Let&apos;s talk</span>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href="tel:+61424700797"
                  className="flex items-center gap-2 text-sm text-paper/80 hover:text-white/55 transition-colors"
                >
                  <span>📞</span>
                  <span>+61 0424 700 797</span>
                </a>
                <a
                  href="mailto:hellogizmooai@gmail.com"
                  className="flex items-center gap-2 text-sm text-paper/80 hover:text-white/55 transition-colors"
                >
                  <span>✉️</span>
                  <span>hellogizmooai@gmail.com</span>
                </a>
              </div>

              <div className="flex-1" />

              <Button
                variant="secondary"
                size="lg"
                className="mt-8 w-full"
                data-action="pricing-enterprise"
                onClick={() => window.open('tel:+61424700797')}
              >
                Talk to Enterprise
              </Button>
            </div>
          </ScrollReveal>
        </div>

        <p className="mt-10 text-center text-xs text-paper/40 font-mono">
          All plans include a 14-day free trial. Cancel anytime. No lock-in contracts.
        </p>
      </div>
    </section>
  );
}
