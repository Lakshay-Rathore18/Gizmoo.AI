'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const needOptions = ['AI Receptionist', 'Custom Integration', 'Enterprise', 'Other'];
const timelineOptions = ['This week', 'This month', 'Next quarter', 'Just exploring'];

export function ContactOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    need: '',
    name: '',
    email: '',
    company: '',
    message: '',
    timeline: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setStep(0);
      setSubmitted(false);
      setFormData({ need: '', name: '', email: '', company: '', message: '', timeline: '' });
    }, 2000);
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-bg-primary/95 backdrop-blur-xl flex items-center justify-center p-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-text-tertiary hover:text-text-primary transition-colors text-2xl"
            aria-label="Close"
          >
            &#x2715;
          </button>

          <div className="w-full max-w-lg">
            {/* Step indicators */}
            <div className="flex gap-2 mb-10 justify-center">
              {[0, 1, 2].map((s) => (
                <div
                  key={s}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    s <= step ? 'w-8 bg-accent' : 'w-4 bg-border-subtle'
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait" custom={step}>
              {/* Step 0: What do you need? */}
              {step === 0 && !submitted && (
                <motion.div
                  key="step-0"
                  variants={slideVariants}
                  custom={1}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
                    What do you need?
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {needOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setFormData({ ...formData, need: option });
                          setStep(1);
                        }}
                        className={`p-4 rounded-xl border text-sm font-medium transition-all duration-200 ${
                          formData.need === option
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border-subtle bg-bg-secondary text-text-secondary hover:border-accent/50 hover:text-text-primary'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 1: Your info */}
              {step === 1 && !submitted && (
                <motion.div
                  key="step-1"
                  variants={slideVariants}
                  custom={1}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
                    Tell us about you
                  </h3>
                  <div className="space-y-5">
                    {[
                      { key: 'name', label: 'Name', type: 'text' },
                      { key: 'email', label: 'Email', type: 'email' },
                      { key: 'company', label: 'Company', type: 'text' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="text-xs text-text-tertiary uppercase tracking-wider block mb-2">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          className="w-full bg-transparent border-b border-border-subtle text-text-primary py-3 outline-none focus:border-accent transition-colors text-base"
                          required
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs text-text-tertiary uppercase tracking-wider block mb-2">
                        Message (optional)
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full bg-transparent border-b border-border-subtle text-text-primary py-3 outline-none focus:border-accent transition-colors text-base resize-none"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button onClick={() => setStep(0)} className="btn-ghost flex-1">
                        Back
                      </button>
                      <button
                        onClick={() => setStep(2)}
                        disabled={!formData.name || !formData.email}
                        className="btn-primary flex-1 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Timeline */}
              {step === 2 && !submitted && (
                <motion.div
                  key="step-2"
                  variants={slideVariants}
                  custom={1}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
                    How soon?
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {timelineOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setFormData({ ...formData, timeline: option })}
                        className={`p-4 rounded-xl border text-sm font-medium transition-all duration-200 ${
                          formData.timeline === option
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border-subtle bg-bg-secondary text-text-secondary hover:border-accent/50 hover:text-text-primary'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="btn-ghost flex-1">
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.timeline || submitting}
                      className="btn-primary flex-1 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending...' : 'Submit'}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Success */}
              {submitted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-5xl mb-4 text-accent">&#10003;</div>
                  <h3 className="text-2xl font-display font-bold mb-2">Thank you!</h3>
                  <p className="text-text-secondary">We&apos;ll be in touch within 24 hours.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
