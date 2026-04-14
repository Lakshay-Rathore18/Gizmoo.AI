'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    // Skip on subsequent visits in same session
    if (sessionStorage.getItem('gizmoo-loaded')) {
      setShouldShow(false);
      return;
    }

    const duration = 2500;
    const interval = 16;
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Ease-out curve for natural feel
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (step >= steps) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          setIsComplete(true);
          sessionStorage.setItem('gizmoo-loaded', '1');
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0a]"
          exit={{
            y: '-100%',
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-12"
          >
            <span className="text-4xl md:text-5xl font-display font-bold tracking-tight">
              Gizmoo{' '}
              <span className="text-accent">AI</span>
            </span>
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-6xl md:text-8xl font-mono font-light text-white/80 tabular-nums"
          >
            {progress}%
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="absolute bottom-12 flex flex-col items-center gap-3 text-text-secondary text-sm tracking-widest uppercase"
          >
            <span>Scroll to discover</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-accent text-xl"
            >
              ↓
            </motion.span>
          </motion.div>

          {/* Progress line at bottom */}
          <div className="absolute bottom-0 left-0 h-[2px] bg-accent/20 w-full">
            <motion.div
              className="h-full bg-accent"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
