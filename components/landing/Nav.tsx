'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SIGN_IN_URL = 'https://accounts.gizmoo.me/sign-in';
const SIGN_UP_URL = 'https://accounts.gizmoo.me/sign-up';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GizmooLogo from '@/components/ui/GizmooLogo';
import { cn } from '@/lib/utils';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#demo', label: 'Demo' },
  { href: '#use-cases', label: 'Use Cases' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      {/* Ultra-subtle separator — no visible border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />

      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between"
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center">
          <GizmooLogo className="h-7 md:h-9 w-auto" />
        </a>

        {/* Desktop nav — bullet-separated, small caps, wide tracking */}
        <ul className="hidden md:flex items-center gap-0">
          {links.map((l, i) => (
            <li key={l.href} className="flex items-center">
              <a
                href={l.href}
                className="text-[13px] uppercase tracking-ultrawide text-white/50 hover:text-white transition-colors duration-200 px-4 py-2"
              >
                {l.label}
              </a>
              {i < links.length - 1 && (
                <span className="text-white/20 text-[8px]" aria-hidden>&#8226;</span>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href={SIGN_IN_URL}
            className="text-[13px] uppercase tracking-wide font-medium text-white/50 hover:text-white transition-colors duration-200 px-3 py-2"
            style={{ touchAction: 'manipulation' }}
          >
            Sign In
          </Link>
          <Link
            href={SIGN_UP_URL}
            className="px-5 py-2 border border-white/30 text-white text-[13px] uppercase tracking-wide font-medium rounded-sarmat transition-all duration-200 hover:border-white hover:bg-white/[0.06]"
            style={{ touchAction: 'manipulation' }}
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-paper min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          style={{ touchAction: 'manipulation' }}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer — slides from right, dark overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#0a0a0a] border-l border-white/[0.1] z-50 md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
                <GizmooLogo className="h-6 w-auto" />
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  style={{ touchAction: 'manipulation' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ul className="px-4 py-6 flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block text-white/70 hover:text-white py-3 min-h-[44px] flex items-center text-[13px] uppercase tracking-wide transition-colors"
                      style={{ touchAction: 'manipulation' }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="px-4 pt-4 border-t border-white/[0.08] flex flex-col gap-3">
                <Link
                  href={SIGN_IN_URL}
                  onClick={() => setOpen(false)}
                  className="w-full text-center text-[13px] uppercase tracking-wide font-medium text-white/70 hover:text-white transition-colors px-3 py-3 border border-white/20 rounded-sarmat min-h-[44px] flex items-center justify-center"
                  style={{ touchAction: 'manipulation' }}
                >
                  Sign In
                </Link>
                <Link
                  href={SIGN_UP_URL}
                  onClick={() => setOpen(false)}
                  className="w-full text-center px-4 py-3 border border-white/40 text-white hover:bg-white/[0.06] hover:border-white text-[13px] uppercase tracking-wide font-medium rounded-sarmat transition-all min-h-[44px] flex items-center justify-center"
                  style={{ touchAction: 'manipulation' }}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
