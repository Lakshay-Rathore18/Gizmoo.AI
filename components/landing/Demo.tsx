'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { brand } from '@/lib/brand';

const tabs = ['Inbound Calls', 'Appointment Booking', 'Outbound Calls', 'Integrations'];

const conversations: Record<string, Array<{ role: 'caller' | 'ai'; text: string }>> = {
  'Inbound Calls': [
    { role: 'caller', text: "Hi, I've got a burst pipe in my kitchen. Can someone come out today?" },
    { role: 'ai', text: "I'm sorry to hear that! Let me help you right away. Can I get your name and address?" },
    { role: 'caller', text: "Sure, it's Tom Baker, 42 Marine Parade, Bondi." },
    { role: 'ai', text: "Thanks Tom. I've booked a plumber for you today between 2-4pm. You'll get an SMS confirmation shortly. Is there anything else?" },
  ],
  'Appointment Booking': [
    { role: 'caller', text: "I need to book a dental checkup for next Tuesday." },
    { role: 'ai', text: "Of course! I can see availability on Tuesday. Would you prefer morning or afternoon?" },
    { role: 'caller', text: "Morning would be great, around 10am." },
    { role: 'ai', text: "Perfect. I've booked you in for Tuesday at 10am with Dr. Patel. A confirmation SMS is on its way!" },
  ],
  'Outbound Calls': [
    { role: 'ai', text: "Hi Sarah, this is a friendly reminder from Northside Medical about your appointment tomorrow at 3pm." },
    { role: 'caller', text: "Oh thanks for reminding me! Can I actually reschedule to Thursday?" },
    { role: 'ai', text: "No problem at all. Thursday at 3pm is available. I'll update your booking and send a new confirmation." },
    { role: 'caller', text: "Perfect, thank you!" },
  ],
  'Integrations': [
    { role: 'caller', text: "Can you check if there's availability this Friday?" },
    { role: 'ai', text: "Let me check your calendar... I can see Friday 10am, 1pm, and 3:30pm are open. Which works best?" },
    { role: 'caller', text: "1pm please." },
    { role: 'ai', text: "Done! Booked for Friday 1pm. I've synced it to your Google Calendar and sent a Calendly confirmation link." },
  ],
};

function TypingIndicator() {
  return (
    <div className="flex gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-accent/40"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export function Demo() {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: '-30%' });

  const currentConvo = conversations[tabs[activeTab]];

  // Auto-play chat animation
  useEffect(() => {
    if (!inView) {
      setVisibleMessages(0);
      setIsTyping(false);
      return;
    }

    setVisibleMessages(0);
    setIsTyping(false);

    let msgIndex = 0;
    const showNext = () => {
      if (msgIndex >= currentConvo.length) return;
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        msgIndex++;
        setVisibleMessages(msgIndex);
        if (msgIndex < currentConvo.length) {
          setTimeout(showNext, 600);
        }
      }, 800);
    };

    const startTimer = setTimeout(showNext, 500);
    return () => clearTimeout(startTimer);
  }, [inView, activeTab, currentConvo.length]);

  return (
    <section id="demo" ref={sectionRef} className="relative py-section">
      {/* Background glow */}
      <div className="glow-orb glow-orb-accent w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" aria-hidden />

      <div className="max-w-content mx-auto px-6">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label block mb-8"
        >
          02 — Demo
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-display-sm font-display font-bold tracking-tight mb-16 max-w-2xl"
        >
          One phone line. Zero missed calls.
        </motion.h2>

        {/* Demo card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto nk-card overflow-hidden"
        >
          {/* Tab bar */}
          <div className="flex overflow-x-auto border-b border-border-subtle">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`relative px-5 py-4 text-sm whitespace-nowrap transition-colors ${
                  i === activeTab ? 'text-accent' : 'text-text-tertiary hover:text-text-secondary'
                }`}
              >
                {tab}
                {i === activeTab && (
                  <motion.div
                    layoutId="demo-tab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Chat area */}
          <div className="p-6 min-h-[320px] flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {currentConvo.slice(0, visibleMessages).map((msg, i) => (
                <motion.div
                  key={`${activeTab}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'ai' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'ai'
                        ? 'bg-accent/10 text-accent border border-accent/20 rounded-br-md'
                        : 'bg-bg-tertiary text-text-primary border border-border-subtle rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className={`flex ${
                currentConvo[visibleMessages]?.role === 'ai' ? 'justify-end' : 'justify-start'
              }`}>
                <div className={`rounded-2xl ${
                  currentConvo[visibleMessages]?.role === 'ai'
                    ? 'bg-accent/10 border border-accent/20'
                    : 'bg-bg-tertiary border border-border-subtle'
                }`}>
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>

          {/* Status line */}
          <div className="px-6 py-3 border-t border-border-subtle flex items-center gap-2 text-sm text-text-tertiary">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Handled in 32s — caller satisfied
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary mb-4">Try it yourself — call now</p>
          <a
            href={`tel:${brand.phone.replace(/\s/g, '')}`}
            className="text-2xl md:text-3xl font-display font-bold text-accent hover:text-accent-hover transition-colors"
          >
            {brand.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
