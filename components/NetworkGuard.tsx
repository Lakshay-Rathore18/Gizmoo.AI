'use client';

import { useEffect } from 'react';

/**
 * Flags the document root with `data-save-data="true"` when the user has
 * requested Save-Data or is on slow-2g/2g, so CSS can swap background
 * videos for their posters. Runs once on mount.
 *
 * Paired with the CSS in globals.css (`[data-save-data="true"] .bg-video-wrap video`).
 */
export function NetworkGuard() {
  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const c = nav.connection;
    const slow = c?.saveData === true || (c?.effectiveType && ['slow-2g', '2g'].includes(c.effectiveType));
    if (slow) document.documentElement.dataset.saveData = 'true';
  }, []);
  return null;
}
