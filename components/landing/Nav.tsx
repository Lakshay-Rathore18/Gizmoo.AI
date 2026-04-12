'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { SignInButton, Show, UserButton } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';
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
          ? 'backdrop-blur-xl bg-ink/60 border-b border-surface-border'
          : 'bg-transparent',
      )}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between"
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Gizmoo AI"
            width={140}
            height={36}
            loading="eager"
            priority
            className="h-7 md:h-9 w-auto"
          />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-paper/70 hover:text-paper transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyber-cyan group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/">
              <button className="text-sm font-medium text-white/70 hover:text-white transition-colors px-3 py-2 cursor-pointer" style={{ touchAction: 'manipulation' }}>
                Sign In
              </button>
            </SignInButton>
            <button
              onClick={() => window.open('https://cal.com/lakshay-rathore-eaosso/demo-booking', '_blank')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              style={{ touchAction: 'manipulation' }}
            >
              Get Started
            </button>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
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

      {open && (
        <div className="md:hidden border-t border-surface-border bg-ink/90 backdrop-blur-xl">
          <ul className="px-4 sm:px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-paper/80 hover:text-cyber-cyan py-2 min-h-[44px] flex items-center"
                  style={{ touchAction: 'manipulation' }}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <Show when="signed-out">
                <SignInButton mode="modal" forceRedirectUrl="/">
                  <button className="w-full text-sm font-medium text-white/70 hover:text-white transition-colors px-3 py-3 border border-surface-border mb-3 min-h-[44px] cursor-pointer" style={{ touchAction: 'manipulation' }}>
                    Sign In
                  </button>
                </SignInButton>
                <button
                  onClick={() => window.open('https://cal.com/lakshay-rathore-eaosso/demo-booking', '_blank')}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors min-h-[44px]"
                  style={{ touchAction: 'manipulation' }}
                >
                  Get Started
                </button>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
