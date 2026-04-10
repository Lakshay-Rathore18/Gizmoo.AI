'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { cn } from '@/lib/utils';

// TODO: Update pricing — currently $0 placeholder across all plans.
const plans = [
  {
    name: 'Starter',
    priceMonthly: 0,
    priceAnnual: 0,
    tagline: 'For small businesses trying out an AI receptionist.',
    features: [
      'Up to 100 calls / month',
      'Real-time appointment booking',
      'Google Calendar + Outlook sync',
      'Business hours coverage',
      'Email support',
    ],
    cta: 'Get Started Free',
    action: 'pricing-starter',
    featured: false,
  },
  {
    name: 'Professional',
    priceMonthly: 0,
    priceAnnual: 0,
    tagline: 'Everything a growing team needs to never miss a call.',
    features: [
      'Unlimited inbound calls',
      'True 24/7 coverage',
      'Outbound reminder campaigns',
      'CRM integration (HubSpot, Salesforce)',
      'Custom voice training',
      'SMS follow-ups',
      'Priority phone + Slack support',
    ],
    cta: 'Start Free Trial',
    action: 'pricing-professional',
    featured: true,
  },
  {
    name: 'Enterprise',
    priceMonthly: null,
    priceAnnual: null,
    tagline: 'For multi-location teams with auditors on speed dial.',
    features: [
      'Everything in Professional',
      'Multiple locations / phone lines',
      'Advanced analytics + call scoring',
      'HIPAA BAA + SOC 2 Type II',
      'Custom integrations',
      'Dedicated success manager',
      '99.99% uptime SLA',
    ],
    cta: 'Talk to Sales',
    action: 'pricing-enterprise',
    featured: false,
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-24 md:py-36 bg-ink">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyber-cyan">
              {'// 06 — Pricing'}
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl tracking-tight">
              Start free. <br />
              <span className="text-gradient-brand">Scale when ready.</span>
            </h2>
            <p className="mt-6 text-paper/70 text-lg">
              No credit card required. No contracts. No surprises. Cancel anytime.
            </p>

            <div className="mt-10 inline-flex items-center gap-1 border border-surface-border p-1 bg-surface">
              <button
                onClick={() => setAnnual(false)}
                className={cn(
                  'px-5 py-2 text-sm font-mono uppercase tracking-wider transition-colors',
                  !annual ? 'bg-paper text-ink' : 'text-paper/60',
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={cn(
                  'px-5 py-2 text-sm font-mono uppercase tracking-wider transition-colors flex items-center gap-2',
                  annual ? 'bg-paper text-ink' : 'text-paper/60',
                )}
              >
                Annual
                <span className="text-[10px] bg-cyber-lime text-ink px-1.5 py-0.5">−20%</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.08}>
              <div
                className={cn(
                  'relative h-full flex flex-col p-8 border transition-all duration-300',
                  p.featured
                    ? 'border-cyber-cyan bg-surface holo-border -translate-y-2 shadow-[0_24px_64px_-16px_rgba(0,229,255,0.3)]'
                    : 'border-surface-border bg-surface hover:border-paper/30',
                )}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyber-cyan text-ink font-mono text-[10px] uppercase tracking-widest px-3 py-1">
                    Most Popular
                  </div>
                )}
                <div className="font-display font-bold text-2xl">{p.name}</div>
                <div className="mt-1 text-sm text-paper/60 min-h-[2.5rem]">{p.tagline}</div>

                <div className="mt-6 flex items-baseline gap-1">
                  {p.priceMonthly === null ? (
                    <span className="font-display font-bold text-5xl">Custom</span>
                  ) : (
                    <>
                      <span className="font-display font-bold text-5xl">
                        ${annual ? p.priceAnnual : p.priceMonthly}
                      </span>
                      <span className="text-paper/50 text-sm">/ month</span>
                    </>
                  )}
                </div>

                <ul className="mt-8 space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-paper/80">
                      <Check className="w-4 h-4 shrink-0 mt-0.5 text-cyber-lime" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={p.featured ? 'primary' : 'secondary'}
                  size="lg"
                  className="mt-8 w-full"
                  data-action={p.action}
                >
                  {p.cta}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-paper/40 font-mono">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
