'use client';

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
 * Full-bleed cinematic video band. Decorative ambient loop with
 * scrim + headline overlay. Used to break up text-heavy sections
 * and add visual punch through the scroll narrative.
 */
export function ShowcaseBand({
  slug,
  eyebrow,
  title,
  body,
  align = 'left',
  height = 'tall',
}: ShowcaseBandProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const heightClass = height === 'tall' ? 'min-h-[80vh] md:min-h-[88vh]' : 'min-h-[60vh] md:min-h-[70vh]';

  return (
    <section
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

      {/* Extra readability gradient over the BackgroundVideo's own scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[5]"
        style={{
          background:
            align === 'center'
              ? 'radial-gradient(ellipse at center, rgba(7,11,10,0.55) 0%, rgba(7,11,10,0.85) 100%)'
              : 'linear-gradient(90deg, rgba(7,11,10,0.85) 0%, rgba(7,11,10,0.55) 50%, rgba(7,11,10,0.35) 100%)',
        }}
      />

      <div className={`relative z-10 w-full max-w-content mx-auto px-6 py-24 md:py-32 flex flex-col justify-center ${alignClass}`}>
        <span className="section-label block mb-6 text-accent">{eyebrow}</span>
        <h2
          className="fluid-h2 font-display font-bold tracking-tight max-w-3xl"
          style={{ textShadow: '0 2px 24px rgba(7,11,10,0.9), 0 1px 2px rgba(7,11,10,0.6)' }}
        >
          {title}
        </h2>
        {body && (
          <p
            className="fluid-body mt-6 text-text-secondary max-w-2xl"
            style={{ textShadow: '0 1px 12px rgba(7,11,10,0.85)' }}
          >
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
