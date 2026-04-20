'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/lib/brand';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(-1);

  return (
    <section id="faq" className="relative py-section">
      <div className="max-w-content mx-auto px-6">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label block mb-8"
        >
          09 — FAQ
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-display-sm font-display font-bold tracking-tight mb-16 max-w-2xl"
        >
          Everything you were about to ask.
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="border-b border-border-subtle"
            >
              <button
                onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <span
                  className={`text-base md:text-lg font-medium transition-colors duration-200 pr-8 ${
                    i === openIndex ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'
                  }`}
                >
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: i === openIndex ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl text-text-tertiary shrink-0"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {i === openIndex && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-text-secondary text-sm md:text-base leading-relaxed pr-12">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
