'use client';

import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import Link from 'next/link';
import GizmooLogo from '@/components/ui/GizmooLogo';
import { brand } from '@/lib/brand';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Demo', href: '#demo' },
      { label: 'How It Works', href: '#how-it-works' },
    ],
  },
  {
    title: 'Use Cases',
    links: [
      { label: 'Healthcare', href: '#use-cases' },
      { label: 'Legal', href: '#use-cases' },
      { label: 'Real Estate', href: '#use-cases' },
      { label: 'Salons & Spas', href: '#use-cases' },
      { label: 'Home Services', href: '#use-cases' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Book a Demo', href: brand.calLink, external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', href: `mailto:${brand.email}` },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <a href="#top" className="inline-block w-fit">
              <GizmooLogo className="h-7 w-auto opacity-80" />
            </a>
            <p className="mt-4 text-sm text-paper/60 max-w-xs leading-relaxed">
              The AI voice receptionist that answers every call, books every appointment, 24/7.
            </p>

            <div className="mt-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-paper/50 block mb-2">
                Join the waitlist
              </div>
              {status === 'success' ? (
                <div className="text-white/50 text-sm font-display font-bold">
                  ✓ You&apos;re on the list!
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setStatus('loading');
                    try {
                      const res = await fetch('/api/waitlist', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email }),
                      });
                      setStatus(res.ok ? 'success' : 'error');
                    } catch { setStatus('error'); }
                  }}
                  className="flex items-center border border-white/[0.08] rounded-[2px] focus-within:border-white/30 transition-colors max-w-xs overflow-hidden"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@business.com"
                    aria-label="Work email"
                    required
                    className="flex-1 bg-transparent px-3 py-2.5 text-paper placeholder:text-paper/40 outline-none font-mono text-xs"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-paper text-ink hover:bg-white px-3 py-2.5 text-xs font-display font-semibold transition-colors shrink-0"
                  >
                    {status === 'loading' ? '...' : 'Join'}
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="mt-1 text-xs text-red-500">Something went wrong.</p>
              )}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[10px] uppercase tracking-widest text-paper/50">
                {col.title}
              </div>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {'external' in l && l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-paper/80 hover:text-white/55 transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : l.href.startsWith('/') ? (
                      <Link
                        href={l.href}
                        className="text-sm text-paper/80 hover:text-white/55 transition-colors"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="text-sm text-paper/80 hover:text-white/55 transition-colors"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-xs text-paper/40 font-mono flex items-center gap-1 flex-wrap">
            <span>&copy; {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
            <span className="mx-1">·</span>
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy</Link>
            <span className="mx-1">·</span>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">Terms</Link>
            <span className="mx-1">·</span>
            <Link href="/privacy#cookies" className="hover:text-white transition-colors duration-200">Cookies</Link>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#top"
              aria-label="Back to top"
              className="inline-flex items-center justify-center w-8 h-8 border border-white/[0.1] rounded-[2px] hover:border-white/30 hover:text-white transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none select-none font-display font-bold text-[22vw] leading-none text-paper/[0.025] whitespace-nowrap text-center"
      >
        GIZMOO AI
      </div>
    </footer>
  );
}
