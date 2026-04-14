'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HearOurAIWidget } from '@/components/ui/HearOurAIWidget';
import { AIParticles } from '@/components/animations/AIParticles';
import { brand } from '@/lib/brand';

const typewriterWords = ['answers calls.', 'books appointments.', 'syncs calendars.', 'answers calls.'];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink isolate flex items-center"
    >
      {/* Dark cinematic background — gradient layers for depth */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format')`,
          filter: 'brightness(0.15) saturate(0)',
        }}
      />

      {/* Topo texture overlay */}
      <div aria-hidden className="absolute inset-0 topo-texture pointer-events-none" />

      {/* Gradient overlays for depth */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/50 pointer-events-none"
      />

      <AIParticles density={25} className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-30" />

      {/* Subtle ambient glow — monochrome */}
      <div
        aria-hidden
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-white/[0.03] blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-white/[0.12] bg-white/[0.03] backdrop-blur-sm px-3 py-1.5 rounded-sarmat mb-8 font-mono text-xs uppercase tracking-widest text-paper/60"
        >
          <PhoneCall className="w-3 h-3 text-white/60" />
          AI Voice Receptionist
        </motion.div>

        {/* Hero headline — ALL CAPS, ultra-wide tracking, Bebas Neue */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display uppercase tracking-wide text-[clamp(3rem,10vw,8rem)] leading-[0.9] max-w-5xl text-white"
        >
          Never miss <br className="hidden sm:block" />
          another call.{' '}
          <span className="relative inline-block">
            <span className="text-white/70">{reduce ? 'Ever.' : <TypewriterCycle words={typewriterWords} />}</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-white/55 leading-relaxed font-body"
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
          <div className="hidden lg:flex items-center gap-2 text-sm text-white/35 ml-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-white/50 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-white/60" />
            </span>
            No credit card · 15-min setup
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
        >
          {[
            { k: '50,000+', v: 'calls answered' },
            { k: '99.7%', v: 'caller satisfaction' },
            { k: '24/7/365', v: 'availability' },
            { k: '30s', v: 'avg response' },
          ].map((m) => (
            <div key={m.v} className="glass-card px-5 py-4 hover:scale-[1.02] transition-transform duration-300">
              <div className="font-display uppercase tracking-wide text-xl md:text-2xl text-paper">{m.k}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-paper/40 mt-1">
                {m.v}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Hear Our AI in Action */}
        <div className="mt-10">
          <HearOurAIWidget phoneNumber={brand.phone} />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="relative block w-px h-10 bg-white/15 overflow-hidden">
          <span className="absolute inset-x-0 h-4 bg-white/60 animate-[scan_2.5s_ease-in-out_infinite]" />
        </span>
      </div>
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
      <span className="inline-block w-[0.08em] h-[0.9em] bg-white/70 ml-1 animate-blink" aria-hidden />
    </span>
  );
}
