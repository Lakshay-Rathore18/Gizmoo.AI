'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function GlowDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' });

  return (
    <div ref={ref} className="relative w-full h-px my-0">
      {/* Base line */}
      <div className="absolute inset-0 bg-white/[0.06]" />
      {/* Glow line — activates on scroll into view */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.4), transparent)',
          boxShadow: '0 0 20px rgba(34,211,238,0.3), 0 0 60px rgba(34,211,238,0.1)',
          transformOrigin: 'center',
        }}
      />
    </div>
  );
}
