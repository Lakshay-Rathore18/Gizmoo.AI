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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-black/50 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent',
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between"
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center">
          <GizmooLogo className="h-7 md:h-9 w-auto" />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-white/60 hover:text-sarmat-lime transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-sarmat-lime group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href={SIGN_IN_URL}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 px-3 py-2"
            style={{ touchAction: 'manipulation' }}
          >
            Sign In
          </Link>
          <Link
            href={SIGN_UP_URL}
            className="px-4 py-2 bg-sarmat-lime text-ink text-sm font-medium rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(159,200,44,0.1)] hover:shadow-[0_0_30px_rgba(159,200,44,0.3)] hover:bg-sarmat-limeLight"
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

      {/* Glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sarmat-lime/30 to-transparent" />

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#0a0a0a] border-l border-white/10 z-50 md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
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
                      className="block text-white/80 hover:text-sarmat-lime py-3 min-h-[44px] flex items-center text-base transition-colors"
                      style={{ touchAction: 'manipulation' }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="px-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                <Link
                  href={SIGN_IN_URL}
                  onClick={() => setOpen(false)}
                  className="w-full text-center text-sm font-medium text-white/70 hover:text-white transition-colors px-3 py-3 border border-white/20 rounded-lg min-h-[44px] flex items-center justify-center"
                  style={{ touchAction: 'manipulation' }}
                >
                  Sign In
                </Link>
                <Link
                  href={SIGN_UP_URL}
                  onClick={() => setOpen(false)}
                  className="w-full text-center px-4 py-3 bg-sarmat-lime text-ink hover:bg-sarmat-limeLight text-sm font-medium rounded-lg transition-colors min-h-[44px] flex items-center justify-center"
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
