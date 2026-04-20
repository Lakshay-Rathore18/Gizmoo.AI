'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { brand } from '@/lib/brand';

export function Pricing() {
  const [annual, setAnnual] = useState(true);
  const starterPrice = annual ? '$413' : '$590';
  const period = annual ? '/mo (billed annually)' : '/mo';

  return (
    <section id="pricing" className="relative py-section">
      <div className="max-w-content mx-auto px-6">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label block mb-8"
        >
          08 — Pricing
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-display-sm font-display font-bold tracking-tight mb-6 max-w-2xl"
        >
          Start free. Scale when ready.
        </motion.h2>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <span className={`text-sm ${!annual ? 'text-text-primary' : 'text-text-tertiary'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="relative w-14 h-7 rounded-full bg-bg-tertiary border border-border-subtle transition-colors"
            aria-label="Toggle billing period"
          >
            <motion.div
              animate={{ x: annual ? 26 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-[3px] w-5 h-5 rounded-full bg-accent"
            />
          </button>
          <span className={`text-sm ${annual ? 'text-text-primary' : 'text-text-tertiary'}`}>
            Annual
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
              -30%
            </span>
          </span>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Starter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="nk-card p-8 md:p-10 relative overflow-hidden border-accent/30 md:scale-[1.02]"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />
            <div className="glow-orb glow-orb-accent w-[300px] h-[300px] -top-[150px] -right-[150px] opacity-10" aria-hidden />

            <p className="text-sm text-accent uppercase tracking-wider mb-2">Recommended</p>
            <h3 className="text-2xl font-display font-bold mb-1">Starter</h3>
            <p className="text-text-tertiary text-sm mb-6">Everything you need to never miss a call.</p>

            <div className="mb-2">
              <span className="text-5xl md:text-6xl font-display font-bold">{starterPrice}</span>
              <span className="text-text-tertiary text-sm ml-1">{period}</span>
            </div>
            <p className="text-text-tertiary text-xs mb-8">
              One-time setup: $1,200 AUD
            </p>

            <a href={brand.signUp} className="btn-primary w-full text-center mb-8 block">
              Start 14-Day Free Trial
            </a>

            <ul className="space-y-3">
              {[
                '24/7 AI voice receptionist',
                'Unlimited inbound calls',
                'Appointment booking & calendar sync',
                'SMS confirmations',
                'Call transcripts & recordings',
                'Lead qualification & scoring',
                'Outbound reminder calls',
                'Monthly performance report',
                'Email & chat support',
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="text-accent mt-0.5 shrink-0">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Enterprise */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="nk-card p-8 md:p-10"
          >
            <p className="text-sm text-text-tertiary uppercase tracking-wider mb-2">For teams</p>
            <h3 className="text-2xl font-display font-bold mb-1">Enterprise</h3>
            <p className="text-text-tertiary text-sm mb-6">Custom solutions for complex needs.</p>

            <div className="mb-8">
              <span className="text-5xl md:text-6xl font-display font-bold">Let&apos;s talk</span>
            </div>

            <a href={brand.calLink} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full text-center mb-8 block">
              Book a Call
            </a>

            <ul className="space-y-3">
              {[
                'Everything in Starter',
                'Multi-location support',
                'Custom AI voice & personality',
                'Advanced integrations (API access)',
                'Priority onboarding',
                'Dedicated account manager',
                'Custom reporting & analytics',
                'SLA guarantee',
                'HIPAA BAA available',
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="text-accent mt-0.5 shrink-0">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-text-tertiary text-sm mt-10"
        >
          No credit card required &middot; 15-minute setup &middot; Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
