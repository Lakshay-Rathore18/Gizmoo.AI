'use client';

import { motion } from 'framer-motion';
import { brand } from '@/lib/brand';

const headlineWords = [
  { text: 'Never', weight: 'font-light' },
  { text: 'miss', weight: 'font-light' },
  { text: 'another', weight: 'font-bold' },
  { text: 'call.', weight: 'font-bold text-accent' },
];

const statBadges = [
  { label: '50,000+ calls', x: '8%', y: '25%', delay: 0 },
  { label: '99.7% satisfaction', x: '78%', y: '18%', delay: 0.3 },
  { label: '24/7', x: '85%', y: '72%', delay: 0.6 },
];

export function Hero({ onContactOpen }: { onContactOpen?: () => void }) {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Glow orb */}
      <div
        className="glow-orb glow-orb-accent w-[600px] h-[600px] top-[-10%] right-[-10%] animate-glow-drift opacity-10"
        aria-hidden
      />
      <div
        className="glow-orb glow-orb-strong w-[300px] h-[300px] bottom-[10%] left-[-5%] animate-glow-drift opacity-5"
        style={{ animationDelay: '5s' }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 max-w-content mx-auto px-6 text-center pt-20">
        {/* Headline */}
        <h1 className="text-display-lg leading-[0.95] tracking-tight mb-8">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.08,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`inline-block mr-[0.25em] font-display ${word.weight}`}
            >
              {word.text}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {brand.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href={brand.signUp} className="btn-primary text-base px-8 py-4">
            Start Free Trial
          </a>
          <a href={brand.calLink} className="btn-ghost text-base px-8 py-4" target="_blank" rel="noopener noreferrer">
            Watch Demo
          </a>
        </motion.div>
      </div>

      {/* Floating stat badges — desktop only */}
      <div className="hidden lg:block" aria-hidden>
        {statBadges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + badge.delay, duration: 0.5 }}
            className="absolute animate-float"
            style={{
              left: badge.x,
              top: badge.y,
              animationDelay: `${i * 2}s`,
            }}
          >
            <div className="px-4 py-2 rounded-full bg-bg-secondary/80 border border-border-subtle text-sm text-text-secondary backdrop-blur-sm">
              {badge.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-tertiary uppercase tracking-[0.2em]">
          Scroll to discover
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
