'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Premium animated AI agent visual — replaces broken Spline 3D scene.
 * Pulsing orb core + audio waveform rings + orbiting particles.
 * Lightweight (zero external assets), works on desktop AND mobile.
 */
export function AIAgentVisual({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', minHeight: 300 }}
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* Ambient background glow */}
        <defs>
          <radialGradient id="ag-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ag-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
          </radialGradient>
          <radialGradient id="ag-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id="ag-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <filter id="ag-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </filter>
        </defs>

        {/* Background glow */}
        <circle cx="200" cy="200" r="180" fill="url(#ag-bg)" />

        {/* Outer pulse ring 3 */}
        <motion.circle
          cx="200" cy="200" r="120"
          stroke="#ffffff" strokeWidth="0.5" fill="none" strokeOpacity="0.15"
          animate={reduce ? {} : { r: [120, 150, 120], strokeOpacity: [0.15, 0.05, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Outer pulse ring 2 */}
        <motion.circle
          cx="200" cy="200" r="100"
          stroke="#ffffff" strokeWidth="0.8" fill="none" strokeOpacity="0.2"
          animate={reduce ? {} : { r: [100, 125, 100], strokeOpacity: [0.2, 0.08, 0.2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        {/* Outer pulse ring 1 */}
        <motion.circle
          cx="200" cy="200" r="80"
          stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" strokeOpacity="0.25"
          animate={reduce ? {} : { r: [80, 100, 80], strokeOpacity: [0.25, 0.1, 0.25] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Audio waveform ring — 48 bars arranged radially */}
        <g>
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i / 48) * Math.PI * 2;
            const innerR = 58;
            const maxBarH = 18;
            const baseH = 3 + Math.sin(i * 0.8) * 2;
            const x1 = 200 + Math.cos(angle) * innerR;
            const y1 = 200 + Math.sin(angle) * innerR;
            const x2 = 200 + Math.cos(angle) * (innerR + baseH);
            const y2 = 200 + Math.sin(angle) * (innerR + baseH);

            return (
              <motion.line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.5"
                animate={
                  reduce
                    ? {}
                    : {
                        x2: [
                          200 + Math.cos(angle) * (innerR + baseH),
                          200 + Math.cos(angle) * (innerR + baseH + maxBarH * Math.random()),
                          200 + Math.cos(angle) * (innerR + baseH + maxBarH * 0.3),
                          200 + Math.cos(angle) * (innerR + baseH + maxBarH * Math.random()),
                          200 + Math.cos(angle) * (innerR + baseH),
                        ],
                        y2: [
                          200 + Math.sin(angle) * (innerR + baseH),
                          200 + Math.sin(angle) * (innerR + baseH + maxBarH * Math.random()),
                          200 + Math.sin(angle) * (innerR + baseH + maxBarH * 0.3),
                          200 + Math.sin(angle) * (innerR + baseH + maxBarH * Math.random()),
                          200 + Math.sin(angle) * (innerR + baseH),
                        ],
                        strokeOpacity: [0.5, 0.8, 0.4, 0.7, 0.5],
                      }
                }
                transition={{
                  duration: 1.8 + (i % 5) * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: (i % 8) * 0.1,
                }}
              />
            );
          })}
        </g>

        {/* Inner glow halo */}
        <motion.circle
          cx="200" cy="200" r="50"
          fill="url(#ag-glow)" filter="url(#ag-blur-lg)"
          animate={reduce ? {} : { r: [50, 58, 50], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Core orb */}
        <motion.circle
          cx="200" cy="200" r="32"
          fill="url(#ag-core)"
          animate={reduce ? {} : { r: [32, 35, 32] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Core highlight */}
        <circle cx="190" cy="190" r="12" fill="white" fillOpacity="0.15" filter="url(#ag-blur)" />

        {/* Orbiting particles */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const orbitR = 90 + i * 12;
          const duration = 8 + i * 2;
          const size = 2.5 - i * 0.2;
          return (
            <motion.circle
              key={`p-${i}`}
              cx="200" cy={200 - orbitR} r={size}
              fill="rgba(255,255,255,0.3)" fillOpacity={0.6 - i * 0.06}
              animate={
                reduce
                  ? {}
                  : {
                      rotate: [0, 360],
                    }
              }
              transition={{
                duration,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 1.2,
              }}
              style={{ originX: '200px', originY: '200px', transformOrigin: '200px 200px' }}
            />
          );
        })}

        {/* Floating accent dots */}
        {[
          { cx: 120, cy: 130, d: 5 },
          { cx: 280, cy: 140, d: 6.5 },
          { cx: 140, cy: 280, d: 4 },
          { cx: 300, cy: 260, d: 7 },
          { cx: 100, cy: 200, d: 5.5 },
          { cx: 320, cy: 180, d: 4.5 },
        ].map((dot, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={dot.cx}
            cy={dot.cy}
            r="1.5"
            fill="#ffffff"
            fillOpacity="0.4"
            animate={
              reduce
                ? {}
                : {
                    cy: [dot.cy, dot.cy - dot.d, dot.cy],
                    fillOpacity: [0.4, 0.7, 0.4],
                  }
            }
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
