'use client';

import { useEffect, useRef, useState } from 'react';

export type BackgroundVideoProps = {
  /** Absolute or public-relative path to poster image (AVIF preferred, <80KB). */
  poster: string;
  /** Ordered list of video sources. Browser picks first decodable. */
  sources: Array<{ src: string; type: string }>;
  /** Optional className for outer wrapper (sizing). */
  className?: string;
  /** Render the scrim above the video for text legibility. Defaults true. */
  scrim?: boolean;
  /** Use IntersectionObserver to pause when offscreen. Defaults true. */
  pauseOffscreen?: boolean;
};

/**
 * Ambient background video with full a11y guards.
 *
 * - aria-hidden + tabIndex={-1} — never focusable
 * - no controls, muted, playsinline, loop
 * - poster shown under reduced-motion, Save-Data, or slow-2g/2g (via CSS)
 * - preload="metadata" only
 * - pauses when offscreen (via IntersectionObserver)
 * - scrim gradient for text contrast
 *
 * Decorative only — never use for informational content.
 */
export function BackgroundVideo({
  poster,
  sources,
  className = '',
  scrim = true,
  pauseOffscreen = true,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!pauseOffscreen) return;
    const v = videoRef.current;
    const wrap = wrapRef.current;
    if (!v || !wrap || reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.01 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [pauseOffscreen, reduced]);

  return (
    <div ref={wrapRef} className={`bg-video-wrap ${className}`} aria-hidden="true">
      {/* Poster is always in the DOM for reduced-motion / Save-Data fallback. */}
      <img src={poster} alt="" aria-hidden="true" loading="eager" decoding="async" />
      {!reduced && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          poster={poster}
          tabIndex={-1}
          aria-hidden="true"
          disablePictureInPicture
          disableRemotePlayback
        >
          {sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
      {scrim && <div className="bg-video-scrim" />}
    </div>
  );
}
