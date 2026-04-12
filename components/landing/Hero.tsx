'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HearOurAIWidget } from '@/components/ui/HearOurAIWidget';
import { AIParticles } from '@/components/animations/AIParticles';
import { HeroVisual } from '@/components/animations/HeroVisual';
import { brand } from '@/lib/brand';

const typewriterWords = ['answers calls.', 'books appointments.', 'syncs calendars.', 'answers calls.'];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink isolate flex items-center"
    >
      <HeroVisual className="absolute inset-0 w-full h-full" />

      <AIParticles density={40} className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-50" />

      <div aria-hidden className="absolute inset-0 bg-grid opacity-40" />
      <div aria-hidden className="absolute inset-0 scan-lines pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink pointer-events-none"
      />

      {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos) => (
        <div
          key={pos}
          aria-hidden
          className={`absolute ${pos} w-6 h-6 border border-cyber-cyan/60`}
        >
          <div className="absolute inset-1 bg-cyber-cyan animate-blink" />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-40 w-full">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-surface-border bg-ink/80 backdrop-blur-sm px-3 py-1.5 mb-8 font-mono text-xs uppercase tracking-widest text-paper/80"
        >
          <PhoneCall className="w-3 h-3 text-cyber-cyan" />
          AI Voice Receptionist
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold tracking-[-0.03em] text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] max-w-5xl"
        >
          Never miss <br className="hidden sm:block" />
          another call.{' '}
          <span className="relative inline-block">
            <span className="text-gradient-brand">{reduce ? 'Ever.' : <TypewriterCycle words={typewriterWords} />}</span>
            <span className="absolute -inset-x-2 -inset-y-1 bg-cyber-cyan/10 blur-2xl -z-10" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-paper/70 leading-relaxed"
        >
          {brand.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            data-action="start-free-trial"
            onClick={() => window.open(brand.calLink, '_blank')}
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            data-action="watch-demo"
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Play className="w-4 h-4" />
            Watch Demo
          </Button>
          <div className="hidden lg:flex items-center gap-2 text-sm text-paper/50 ml-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-cyber-lime opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-cyber-lime" />
            </span>
            No credit card · 15-min setup
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-surface-border border border-surface-border max-w-3xl"
        >
          {[
            { k: '50,000+', v: 'calls answered' },
            { k: '99.7%', v: 'caller satisfaction' },
            { k: '24/7/365', v: 'availability' },
            { k: '30s', v: 'avg response' },
          ].map((m) => (
            <div key={m.v} className="bg-ink/80 backdrop-blur-sm px-5 py-4">
              <div className="font-display text-xl md:text-2xl font-bold text-paper">{m.k}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-paper/50 mt-1">
                {m.v}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Hear Our AI in Action — phone widget placed directly under the hero graphic */}
        <div className="mt-10">
          <HearOurAIWidget phoneNumber={brand.phone} />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-paper/40">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="relative block w-px h-10 bg-paper/20 overflow-hidden">
          <span className="absolute inset-x-0 h-4 bg-cyber-cyan animate-scan" />
        </span>
      </div>

      <Sparkles
        aria-hidden
        className="absolute top-1/4 right-8 w-4 h-4 text-cyber-lime animate-float hidden md:block"
      />
    </section>
  );
}

function TypewriterCycle({ words }: { words: string[] }) {
  return (
    <span className="relative inline-flex">
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden className="inline-block">
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="absolute inset-0 whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [20, 0, 0, -20],
            }}
            transition={{
              duration: 3.2,
              delay: i * 3.2,
              repeat: Infinity,
              repeatDelay: (words.length - 1) * 3.2,
              ease: 'easeInOut',
            }}
          >
            {word}
          </motion.span>
        ))}
        <span className="invisible">{words[0]}</span>
      </span>
      <span className="inline-block w-[0.08em] h-[0.9em] bg-cyber-cyan ml-1 animate-blink" aria-hidden />
    </span>
  );
}
