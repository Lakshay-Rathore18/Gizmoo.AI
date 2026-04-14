'use client';

import { motion, useReducedMotion } from 'framer-motion';

const orbs = [
  { cx: '20%', cy: '30%', r: 220, color: 'rgba(159,200,44,0.15)', dur: 18 },
  { cx: '70%', cy: '60%', r: 280, color: 'rgba(159,200,44,0.12)', dur: 22 },
  { cx: '50%', cy: '20%', r: 180, color: 'rgba(181,224,48,0.08)', dur: 26 },
  { cx: '80%', cy: '25%', r: 150, color: 'rgba(159,200,44,0.10)', dur: 20 },
];

const rings = [
  { cx: '35%', cy: '45%', r: 140, delay: 0 },
  { cx: '65%', cy: '35%', r: 100, delay: 2 },
  { cx: '50%', cy: '65%', r: 120, delay: 4 },
];

export function HeroVisual({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={className} aria-hidden="true">
      {/* Ambient gradient orbs */}
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            left: o.cx,
            top: o.cy,
            width: o.r,
            height: o.r,
            background: o.color,
            transform: 'translate(-50%,-50%)',
            willChange: 'transform, opacity',
          }}
          animate={reduce ? undefined : {
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 20, -40, 0],
            scale: [1, 1.15, 0.9, 1.1, 1],
          }}
          transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Expanding concentric rings */}
      {rings.map((r, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border border-sarmat-lime/20 pointer-events-none"
          style={{
            left: r.cx,
            top: r.cy,
            width: r.r * 2,
            height: r.r * 2,
            transform: 'translate(-50%,-50%)',
          }}
          animate={reduce ? undefined : { scale: [0.6, 1.8], opacity: [0.4, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: r.delay,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Central glow beacon */}
      <div
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(159,200,44,0.12) 0%, rgba(159,200,44,0.06) 40%, transparent 70%)',
        }}
      />

      {/* Floating connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(159,200,44,0)" />
            <stop offset="50%" stopColor="rgba(159,200,44,0.3)" />
            <stop offset="100%" stopColor="rgba(159,200,44,0)" />
          </linearGradient>
        </defs>
        {[
          { d: 'M100,300 Q350,200 600,350 T900,280', delay: 0 },
          { d: 'M50,500 Q300,400 550,500 T950,450', delay: 1.5 },
          { d: 'M200,150 Q450,250 700,180 T1000,220', delay: 3 },
        ].map((l, i) => (
          <motion.path
            key={i}
            d={l.d}
            fill="none"
            stroke="url(#line-grad)"
            strokeWidth={0.8}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={reduce ? undefined : {
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.6, 0.6, 0],
            }}
            transition={{
              duration: 6,
              delay: l.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>
    </div>
  );
}
