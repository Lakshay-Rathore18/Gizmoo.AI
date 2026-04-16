'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { brand } from '@/lib/brand';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Demo', href: '#demo' },
    { label: 'How It Works', href: '#how-it-works' },
  ],
  'Use Cases': [
    { label: 'Healthcare', href: '#use-cases' },
    { label: 'Legal', href: '#use-cases' },
    { label: 'Real Estate', href: '#use-cases' },
    { label: 'Salons & Spas', href: '#use-cases' },
    { label: 'Home Services', href: '#use-cases' },
  ],
  Resources: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Book a Demo', href: brand.calLink },
  ],
  Company: [
    { label: 'Contact', href: `mailto:${brand.email}` },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="relative bg-[#080808] border-t border-border-subtle">
      <div className="max-w-content mx-auto px-6 pt-20 pb-10">
        {/* Top: Logo + tagline */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="max-w-sm">
            <h3 className="text-2xl font-display font-bold mb-3">
              Gizmoo <span className="text-accent">AI</span>
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {brand.tagline}
            </p>
          </div>

          {/* Newsletter */}
          <div className="max-w-sm">
            <p className="text-sm text-text-secondary mb-4">Stay updated</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail('');
              }}
              className="flex"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent border-b border-border-subtle text-text-primary text-sm py-2 px-0 outline-none focus:border-accent transition-colors placeholder:text-text-tertiary"
                required
              />
              <button
                type="submit"
                className="text-sm text-accent hover:text-accent-hover transition-colors ml-4 font-medium"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-text-primary mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-text-tertiary hover:text-text-secondary transition-colors link-hover"
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} Gizmoo AI Pty Ltd. ABN {brand.abn}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-xs text-text-tertiary hover:text-text-secondary transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-xs text-text-tertiary hover:text-text-secondary transition-colors">
              Terms
            </a>
            <a href={`mailto:${brand.email}`} className="text-xs text-text-tertiary hover:text-text-secondary transition-colors">
              {brand.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
