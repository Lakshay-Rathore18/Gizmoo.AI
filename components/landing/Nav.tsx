'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
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
        className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between"
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative inline-flex items-center justify-center w-8 h-8 border border-paper/30 group-hover:border-cyber-cyan transition-colors">
            <Sparkles className="w-4 h-4 text-cyber-cyan" aria-hidden />
            <span className="absolute inset-0 bg-cyber-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
          <span className="font-display font-bold tracking-tight text-lg">
            Gizmoo <span className="text-cyber-cyan">AI</span>
          </span>
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
          <Button variant="ghost" size="sm" data-action="sign-in">
            Sign in
          </Button>
          <Button variant="primary" size="sm" data-action="get-started">
            Get Started
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-paper"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-surface-border bg-ink/90 backdrop-blur-xl">
          <ul className="px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-paper/80 hover:text-cyber-cyan py-2"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <Button variant="primary" size="md" className="w-full" data-action="get-started">
                Get Started
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
