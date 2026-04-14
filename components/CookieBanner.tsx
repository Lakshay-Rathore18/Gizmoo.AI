'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const respond = (value: string) => {
    localStorage.setItem('cookie_consent', value);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-surface-border bg-ink/95 backdrop-blur-sm px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-paper/80">
          We use cookies to improve your experience. By continuing, you agree to our{' '}
          <Link href="/privacy" className="text-white/55 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => respond('declined')}
            className="px-4 py-2 text-sm text-paper/60 border border-surface-border hover:border-paper/40 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => respond('accepted')}
            className="px-4 py-2 text-sm bg-white text-ink font-semibold hover:bg-white/80 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
