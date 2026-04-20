'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brand } from '@/lib/brand';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function Nav({ onContactOpen }: { onContactOpen?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Reveal-on-scroll-up: nav hides when scrolling down past 120px,
  // re-appears when scrolling up — removes the fixed-header "wall"
  // during cinematic scrolling without losing access.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 50);
        const delta = y - lastY;
        if (Math.abs(delta) > 4) {
          if (y > 160 && delta > 0) setHidden(true);
          else setHidden(false);
          lastY = y;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: mobileOpen ? 1 : hidden ? 0 : 1,
          y: mobileOpen ? 0 : hidden ? -80 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color] duration-300 ${
          scrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-content mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl md:text-2xl font-display font-bold tracking-tight shrink-0">
            Gizmoo <span className="text-accent">AI</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 link-hover"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={brand.signIn}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Sign In
            </a>
            <button
              onClick={onContactOpen}
              className="px-5 py-2.5 text-sm font-medium rounded-lg bg-accent text-bg-primary hover:bg-accent-hover transition-all duration-200 hover:scale-[1.02] relative group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 rounded-lg bg-accent blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-white"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[2px] bg-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[2px] bg-white"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-3xl font-display font-bold text-text-primary hover:text-accent transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05, duration: 0.4 }}
              className="flex flex-col gap-4 mt-8"
            >
              <a href={brand.signIn} className="text-text-secondary text-center hover:text-white transition-colors">
                Sign In
              </a>
              <button
                onClick={() => { setMobileOpen(false); onContactOpen?.(); }}
                className="btn-primary"
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
