'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { brand } from '@/lib/brand';

export function CTASection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  return (
    <section className="relative py-[120px] md:py-[160px] bg-ink overflow-hidden isolate">
      {/* Topo texture instead of Spline/particles */}
      <div aria-hidden className="absolute inset-0 topo-texture pointer-events-none" />

      {/* Subtle ambient glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-white/[0.04] blur-[120px] pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
        >
          08 — Get Started
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display uppercase tracking-wide text-[clamp(3rem,8vw,7rem)] leading-[0.85] text-white"
        >
          Ready to never<br />
          miss a call again?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 text-lg md:text-xl text-white/55 max-w-xl mx-auto font-body"
        >
          Join 500+ businesses using {brand.name} to answer calls, book appointments, and grow
          revenue — without hiring another receptionist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button
            variant="primary"
            size="lg"
            data-action="cta-start-trial"
            onClick={() => window.open(brand.calLink, '_blank')}
          >
            Start Your Free Trial
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            data-action="cta-talk-sales"
            onClick={() => window.open('tel:+61424700797')}
          >
            <Headphones className="w-4 h-4" />
            Talk to Sales
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 max-w-md mx-auto text-center"
        >
          {status === 'success' ? (
            <div className="text-white/50 font-display uppercase tracking-wide text-lg">
              You&apos;re on the list. We&apos;ll be in touch.
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setStatus('loading');
                try {
                  const res = await fetch('/api/waitlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                  });
                  setStatus(res.ok ? 'success' : 'error');
                } catch { setStatus('error'); }
              }}
              className="flex items-center border border-white/[0.08] bg-white/[0.03] rounded-[2px] focus-within:border-white/30 transition-colors max-w-md mx-auto overflow-hidden"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbusiness.com"
                aria-label="Work email"
                required
                className="flex-1 bg-transparent px-4 py-4 text-paper placeholder:text-white/40 outline-none font-mono text-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group relative inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide transition-all duration-200 overflow-hidden bg-paper text-ink hover:bg-white px-6 py-4 text-sm shrink-0"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="mt-2 text-sm text-red-500">
              Something went wrong — email us at hellogizmooai@gmail.com
            </p>
          )}
          <div className="mt-6 text-xs text-white/50 font-mono flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-white/50" /> 99.99% Uptime
            </span>
            <span className="flex items-center gap-1.5">
              <Headphones className="w-3 h-3 text-white/50" /> 24/7 Support
            </span>
          </div>
          <div className="mt-3 text-[11px] text-white/40 font-mono">
            No credit card required · Setup in 15 minutes · Cancel anytime
          </div>
        </motion.div>
      </div>
    </section>
  );
}
