'use client';

/**
 * Global grain layer.
 *
 * Fixed-position SVG noise rendered above content with `mix-blend-mode: overlay`.
 * Cream-tinted noise reads as film grain over true black, never washes out cream
 * text. Decorative only — `aria-hidden`, never receives focus, never tab-stops.
 *
 * The noise SVG is inlined as a data URI so there's no extra request and no FOUC.
 * Honours `prefers-reduced-motion` indirectly: the layer is static, never animates.
 */
export function Grain() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
