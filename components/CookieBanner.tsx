'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookies-accepted')) {
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookies-accepted', '1');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm z-[55] bg-bg-secondary border border-border-subtle rounded-xl p-5 shadow-2xl"
        >
          <p className="text-sm text-text-secondary mb-4 leading-relaxed">
            We use cookies for analytics and to improve your experience.
          </p>
          <div className="flex gap-3">
            <button onClick={accept} className="btn-primary text-xs py-2 px-4">
              Accept
            </button>
            <button onClick={accept} className="text-xs text-text-tertiary hover:text-text-secondary transition-colors">
              Dismiss
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
