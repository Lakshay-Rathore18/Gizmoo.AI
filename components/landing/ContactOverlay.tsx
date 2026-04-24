'use client';

import { useEffect, useId, useRef, useState } from 'react';

const needOptions = ['AI Receptionist', 'Custom Integration', 'Enterprise', 'Other'];
const timelineOptions = ['This week', 'This month', 'Next quarter', 'Just exploring'];

/**
 * Modal dialog with full WCAG 2.2 semantics:
 *  - role="dialog" + aria-modal + labelled heading
 *  - Escape closes
 *  - Focus moves to first focusable on open, returns to opener on close
 *  - Focus trap within dialog while open
 *  - Background scroll locked while open
 */
export function ContactOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const headingId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

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

  // Escape + focus trap
  useEffect(() => {
    if (!isOpen) return;
    previousFocus.current = document.activeElement as HTMLElement | null;

    const focusableSel =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusFirst = () => {
      const root = dialogRef.current;
      if (!root) return;
      const nodes = root.querySelectorAll<HTMLElement>(focusableSel);
      (nodes[0] ?? root).focus();
    };

    // Defer so the dialog is painted before we move focus
    const raf = requestAnimationFrame(focusFirst);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const nodes = Array.from(root.querySelectorAll<HTMLElement>(focusableSel));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      previousFocus.current?.focus?.();
    };
  }, [isOpen, onClose]);

  const reset = () => {
    setStep(0);
    setSubmitted(false);
    setFormData({ need: '', name: '', email: '', company: '', message: '', timeline: '' });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      reset();
    }, 2000);
  };

  if (!isOpen) return null;

  const headingForStep =
    submitted ? 'Thank you' :
    step === 0 ? 'What do you need?' :
    step === 1 ? 'Tell us about you' :
    'How soon?';

  return (
    <div
      className="fixed inset-0 z-[60] bg-bg-primary/95 backdrop-blur-xl flex items-center justify-center p-6"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="w-full max-w-lg relative outline-none"
        tabIndex={-1}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 right-0 text-text-tertiary hover:text-text-primary transition-colors text-2xl min-h-[44px] min-w-[44px]"
          aria-label="Close contact dialog"
        >
          <span aria-hidden="true">&#x2715;</span>
        </button>

        {/* Step indicators */}
        {!submitted && (
          <div className="flex gap-2 mb-10 justify-center" aria-hidden="true">
            {[0, 1, 2].map((s) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-all duration-300 ${
                  s <= step ? 'w-8 bg-accent' : 'w-4 bg-border-subtle'
                }`}
              />
            ))}
          </div>
        )}

        <h3 id={headingId} className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
          {headingForStep}
        </h3>

        {/* Step 0: What do you need? */}
        {step === 0 && !submitted && (
          <div className="grid grid-cols-2 gap-3">
            {needOptions.map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => {
                  setFormData({ ...formData, need: option });
                  setStep(1);
                }}
                className={`p-4 min-h-[44px] rounded-xl border text-sm font-medium transition-all duration-200 ${
                  formData.need === option
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border-subtle bg-bg-secondary text-text-secondary hover:border-accent/50 hover:text-text-primary'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Step 1: Info */}
        {step === 1 && !submitted && (
          <div className="space-y-5">
            {[
              { key: 'name', label: 'Name', type: 'text', autoComplete: 'name', required: true },
              { key: 'email', label: 'Email', type: 'email', autoComplete: 'email', required: true },
              { key: 'company', label: 'Company', type: 'text', autoComplete: 'organization', required: false },
            ].map((field) => {
              const id = `${headingId}-${field.key}`;
              return (
                <div key={field.key}>
                  <label htmlFor={id} className="text-xs text-text-tertiary uppercase tracking-wider block mb-2">
                    {field.label}
                    {field.required && <span aria-hidden="true"> *</span>}
                  </label>
                  <input
                    id={id}
                    name={field.key}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className="w-full bg-transparent border-b border-border-subtle text-text-primary py-3 outline-none focus:border-accent transition-colors text-base min-h-[44px]"
                    required={field.required}
                    aria-required={field.required || undefined}
                  />
                </div>
              );
            })}
            <div>
              <label htmlFor={`${headingId}-message`} className="text-xs text-text-tertiary uppercase tracking-wider block mb-2">
                Message (optional)
              </label>
              <textarea
                id={`${headingId}-message`}
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full bg-transparent border-b border-border-subtle text-text-primary py-3 outline-none focus:border-accent transition-colors text-base resize-none"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setStep(0)} className="btn-ghost flex-1 min-h-[44px]">
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.name || !formData.email}
                className="btn-primary flex-1 min-h-[44px] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Timeline */}
        {step === 2 && !submitted && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-8" role="radiogroup" aria-label="Preferred timeline">
              {timelineOptions.map((option) => {
                const selected = formData.timeline === option;
                return (
                  <button
                    type="button"
                    key={option}
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setFormData({ ...formData, timeline: option })}
                    className={`p-4 min-h-[44px] rounded-xl border text-sm font-medium transition-all duration-200 ${
                      selected
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border-subtle bg-bg-secondary text-text-secondary hover:border-accent/50 hover:text-text-primary'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="btn-ghost flex-1 min-h-[44px]">
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!formData.timeline || submitting}
                className="btn-primary flex-1 min-h-[44px] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </>
        )}

        {/* Success */}
        {submitted && (
          <div role="status" aria-live="polite" className="text-center py-12">
            <div aria-hidden="true" className="text-5xl mb-4 text-accent">&#10003;</div>
            <p className="text-text-secondary">We&apos;ll be in touch within 24 hours.</p>
          </div>
        )}
      </div>
    </div>
  );
}
