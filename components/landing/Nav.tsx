'use client';

import { useState, useEffect, useId, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { brand } from '@/lib/brand';
import { MagneticCTA } from '@/components/primitives/MagneticCTA';

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
  const menuId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 40);
        const delta = y - lastY;
        if (Math.abs(delta) > 4) {
          if (y > 220 && delta > 0) setHidden(true);
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

  useEffect(() => {
    if (!mobileOpen) return;
    const raf = requestAnimationFrame(() => firstLinkRef.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    requestAnimationFrame(() => hamburgerRef.current?.focus());
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{
          opacity: mobileOpen ? 1 : hidden ? 0 : 1,
          y: mobileOpen ? 0 : hidden ? -84 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.22, 0.84, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? 'bg-[rgba(7,7,7,0.62)] backdrop-blur-2xl border-b border-border-subtle'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-content mx-auto px-6 h-16 md:h-[88px] flex items-center justify-between gap-6">
          {/* Logo — editorial wordmark with serif italic AI */}
          <a
            href="#"
            aria-label="Gizmoo AI — home"
            className="group relative shrink-0 inline-flex items-baseline gap-1 text-[1.45rem] md:text-[1.625rem] font-display font-normal tracking-tight"
          >
            <span className="text-text-primary">Gizmoo</span>
            <span className="italic text-accent translate-y-[1px] tracking-[-0.02em]">AI</span>
            <span
              aria-hidden="true"
              className="absolute -bottom-[3px] left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-9 text-[0.825rem] font-mono uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-text-secondary hover:text-text-primary transition-colors duration-200 link-hover"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href={brand.signIn}
              className="text-[0.825rem] font-mono uppercase tracking-[0.2em] text-text-secondary hover:text-text-primary transition-colors link-hover"
            >
              Sign In
            </a>
            <MagneticCTA radius={90} strength={0.32}>
              <button
                onClick={onContactOpen}
                className="btn-primary text-[0.8rem] py-3 px-6"
              >
                Get Started
              </button>
            </MagneticCTA>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 z-50 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border-subtle hover:border-accent/60 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls={menuId}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-text-primary"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1.5px] bg-text-primary"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1.5px] bg-text-primary"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer — full-bleed editorial */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-bg-primary min-h-dvh flex flex-col items-start justify-center gap-2 px-8 pt-20"
          >
            <span className="section-label mb-8">Menu</span>
            <ul className="flex flex-col gap-1 w-full">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <motion.a
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={closeMobile}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.45, ease: [0.22, 0.84, 0.32, 1] }}
                    className="block text-[2.5rem] sm:text-[3rem] leading-none font-display font-normal text-text-primary hover:text-accent transition-colors min-h-[64px] flex items-center"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + navLinks.length * 0.06, duration: 0.45 }}
              className="flex flex-col gap-3 mt-12 w-full max-w-xs"
            >
              <a
                href={brand.signIn}
                onClick={closeMobile}
                className="btn-ghost min-h-[52px] w-full text-center"
              >
                Sign In
              </a>
              <button
                type="button"
                onClick={() => { closeMobile(); onContactOpen?.(); }}
                className="btn-primary min-h-[52px] w-full"
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
