'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** "char" splits per Unicode grapheme; "word" splits per whitespace boundary. */
  split?: 'char' | 'word';
  /** Stagger between elements in seconds. */
  stagger?: number;
  /** Initial delay in seconds before the first element starts. */
  delay?: number;
  /** Element tag for the outer kinetic line. */
  as?: 'span' | 'div';
  /** Optional className passed through to the outer line. */
  className?: string;
};

/**
 * Kinetic text — split-into-elements + reveal-on-intersect, with a single
 * `.in-view` class flipped on the outer line. The actual animation lives in
 * `globals.css` (see `.kinetic-line`, `.kinetic-char`, `.kinetic-word`) so
 * reduced-motion is enforced at the CSS layer regardless of observer timing.
 *
 * Accessibility notes:
 *  - The split text is wrapped in `aria-hidden`-marked spans so screen
 *    readers receive the original string via the `<span class="sr-only">`
 *    that mirrors `children` as a single string.
 *  - When `prefers-reduced-motion` is set, characters are visible from
 *    frame 1 even before the observer fires (CSS handles this).
 */
export function KineticText({
  children,
  split = 'char',
  stagger = 0.022,
  delay = 0,
  as: Tag = 'span',
  className = '',
}: Props) {
  const lineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.classList.add('in-view');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('in-view');
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const text = typeof children === 'string' ? children : '';
  const usesString = text.length > 0;

  const renderSplit = () => {
    if (!usesString) return children;
    if (split === 'word') {
      return text.split(/(\s+)/).map((token, i) => {
        if (/^\s+$/.test(token)) return token;
        return (
          <span
            key={i}
            className="kinetic-word"
            style={{ transitionDelay: `${delay + i * stagger}s` }}
            aria-hidden="true"
          >
            {token}
          </span>
        );
      });
    }
    // char split
    return Array.from(text).map((ch, i) => {
      if (ch === ' ') return <span key={i}>&nbsp;</span>;
      return (
        <span
          key={i}
          className="kinetic-char"
          style={{ transitionDelay: `${delay + i * stagger}s` }}
          aria-hidden="true"
        >
          {ch}
        </span>
      );
    });
  };

  return (
    <Tag
      ref={lineRef as never}
      className={`kinetic-line ${className}`}
    >
      {usesString && <span className="sr-only">{text}</span>}
      <span aria-hidden={usesString ? 'true' : undefined}>
        {renderSplit()}
      </span>
    </Tag>
  );
}
