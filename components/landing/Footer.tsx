'use client';

import { Github, Twitter, Linkedin, ArrowUp, Sparkles } from 'lucide-react';
import { brand } from '@/lib/brand';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#' },
      { label: 'Demo', href: '#demo' },
      { label: "What's New", href: '#' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Healthcare', href: '#' },
      { label: 'Legal', href: '#' },
      { label: 'Real Estate', href: '#' },
      { label: 'Salons & Spas', href: '#' },
      { label: 'Home Services', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-surface-border bg-ink">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-2 group w-fit">
              <span className="relative inline-flex items-center justify-center w-8 h-8 border border-paper/30 group-hover:border-cyber-cyan transition-colors">
                <Sparkles className="w-4 h-4 text-cyber-cyan" aria-hidden />
              </span>
              <span className="font-display font-bold tracking-tight text-lg">
                Gizmoo <span className="text-cyber-cyan">AI</span>
              </span>
            </a>
            <p className="mt-4 text-sm text-paper/60 max-w-xs leading-relaxed">
              The AI voice receptionist that answers every call, books every appointment, 24/7.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: wire newsletter
              }}
              className="mt-6"
            >
              <label className="font-mono text-[10px] uppercase tracking-widest text-paper/50 block mb-2">
                Get AI receptionist tips &amp; updates
              </label>
              <div className="flex border border-surface-border focus-within:border-cyber-cyan transition-colors">
                <input
                  type="email"
                  placeholder="email@yourbusiness.com"
                  aria-label="Newsletter email"
                  className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-paper/30"
                />
                <button
                  type="submit"
                  data-action="newsletter-subscribe"
                  className="px-4 bg-paper/5 hover:bg-cyber-cyan hover:text-ink text-xs font-mono uppercase tracking-widest transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[10px] uppercase tracking-widest text-paper/50">
                {col.title}
              </div>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-paper/80 hover:text-cyber-cyan transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-xs text-paper/40 font-mono">
            © {new Date().getFullYear()} {brand.name}. All rights reserved. · Privacy · Terms · Cookies
          </div>
          <div className="flex items-center gap-4">
            <a
              href={brand.social.github}
              aria-label="GitHub"
              className="text-paper/60 hover:text-cyber-cyan transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={brand.social.x}
              aria-label="X / Twitter"
              className="text-paper/60 hover:text-cyber-cyan transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={brand.social.linkedin}
              aria-label="LinkedIn"
              className="text-paper/60 hover:text-cyber-cyan transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="ml-2 inline-flex items-center justify-center w-8 h-8 border border-surface-border hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
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
