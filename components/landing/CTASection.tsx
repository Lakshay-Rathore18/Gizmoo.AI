'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Lock, Clock, Headphones } from 'lucide-react';
import { HeroVisual } from '@/components/animations/HeroVisual';
import { AIParticles } from '@/components/animations/AIParticles';
import { Button } from '@/components/ui/Button';
import { brand } from '@/lib/brand';

export function CTASection() {
  const [email, setEmail] = useState('');

  return (
    <section className="relative py-24 md:py-40 bg-ink overflow-hidden isolate">
      <HeroVisual className="absolute inset-0 w-full h-full opacity-60" />
      <AIParticles density={30} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen" />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-cyber-violet/20 blur-[120px] pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyber-cyan"
        >
          {'// Your phone is ringing. Answer it.'}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em] leading-[0.9]"
        >
          Ready to never <br />
          <span className="text-gradient-brand">miss a call again?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 text-lg md:text-xl text-paper/70 max-w-xl mx-auto"
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
          <Button variant="primary" size="lg" data-action="cta-start-trial">
            Start Your Free Trial
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="lg" data-action="cta-talk-sales">
            <Headphones className="w-4 h-4" />
            Talk to Sales
          </Button>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: wire real signup
          }}
          className="mt-10 max-w-md mx-auto"
        >
          <div className="group relative flex items-center border border-surface-border bg-ink/80 backdrop-blur-sm focus-within:border-cyber-cyan transition-colors">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourbusiness.com"
              aria-label="Work email"
              required
              className="flex-1 bg-transparent px-4 py-4 text-paper placeholder:text-paper/40 outline-none font-mono text-sm"
            />
            <Button variant="primary" size="md" type="submit" data-action="cta-signup">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-6 text-xs text-paper/50 font-mono flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-cyber-lime" /> SOC 2 Type II
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-cyber-lime" /> HIPAA Ready
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-cyber-lime" /> 99.99% Uptime
            </span>
            <span className="flex items-center gap-1.5">
              <Headphones className="w-3 h-3 text-cyber-lime" /> 24/7 Support
            </span>
          </div>
          <div className="mt-3 text-[11px] text-paper/40 font-mono">
            No credit card required · Setup in 15 minutes · Cancel anytime
          </div>
        </motion.form>
      </div>
    </section>
  );
}
