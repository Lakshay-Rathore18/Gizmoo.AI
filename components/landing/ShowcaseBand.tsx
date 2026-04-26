'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BackgroundVideo } from '@/components/BackgroundVideo';

export type ShowcaseBandProps = {
  /** Slug used to pick video sources (showcase-<slug>.mp4 etc). */
  slug: 'capability' | 'trades' | 'cta';
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  /** Text alignment over the video. */
  align?: 'left' | 'center';
  /** Visual height. */
  height?: 'tall' | 'short';
};

/**
 * Full-bleed cinematic video band with scroll-linked title parallax.
 * Title climbs slightly as the band scrolls past the viewport top, body
 * trails it. Vignette + scrim ensure cream copy remains readable over
 * any video luminance.
 */
export function ShowcaseBand({
  slug,
  eyebrow,
  title,
  body,
  align = 'left',
  height = 'tall',
}: ShowcaseBandProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const bodyY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const veil = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.55, 0.7]);

  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const heightClass = height === 'tall' ? 'min-h-[80vh] md:min-h-[88vh]' : 'min-h-[60vh] md:min-h-[70vh]';

  return (
    <section
      ref={ref}
      aria-label={typeof title === 'string' ? title : eyebrow}
      className={`relative w-full ${heightClass} flex overflow-hidden`}
    >
      <BackgroundVideo
        poster={`/videos/showcase-${slug}-poster.jpg`}
        preload="metadata"
        sources={[
          { src: `/videos/showcase-${slug}-mobile.mp4`, type: 'video/mp4', media: '(max-width: 767px)' },
          { src: `/videos/showcase-${slug}.mp4`, type: 'video/mp4' },
        ]}
        className="absolute inset-0"
      />

      {/* Layer 1: scroll-reactive readability scrim */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: veil }}
        className="absolute inset-0 z-[5] bg-[rgba(7,7,7,0.5)]"
      />

      {/* Layer 2: directional readability gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[6]"
        style={{
          background:
            align === 'center'
              ? 'radial-gradient(ellipse at center, rgba(7,7,7,0.30) 0%, rgba(7,7,7,0.85) 100%)'
              : 'linear-gradient(90deg, rgba(7,7,7,0.85) 0%, rgba(7,7,7,0.55) 50%, rgba(7,7,7,0.18) 100%)',
        }}
      />

      <div className={`relative z-10 w-full max-w-content mx-auto px-6 py-24 md:py-32 flex flex-col justify-center ${alignClass}`}>
        <motion.span
          style={{ y: bodyY }}
          className="section-label block mb-7 text-text-secondary"
        >
          {eyebrow}
        </motion.span>
        <motion.h2
          style={{ y: titleY }}
          className="fluid-h2 font-display font-normal tracking-tight max-w-3xl"
        >
          <span style={{ textShadow: '0 2px 26px rgba(7,7,7,0.85), 0 1px 2px rgba(7,7,7,0.6)' }}>
            {title}
          </span>
        </motion.h2>
        {body && (
          <motion.p
            style={{ y: bodyY }}
            className="fluid-body mt-7 text-text-secondary max-w-2xl"
          >
            <span style={{ textShadow: '0 1px 12px rgba(7,7,7,0.85)' }}>{body}</span>
          </motion.p>
        )}
      </div>
    </section>
  );
}
