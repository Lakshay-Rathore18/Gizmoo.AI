'use client';

import { BackgroundVideo } from '@/components/BackgroundVideo';

/**
 * Full-bleed cinematic video section sitting between Problem and Capability.
 * The video carries its own type (rendered via Remotion) — the surrounding
 * page chrome adds breathing room and a subtle accent rail.
 */
export function VideoShowcase() {
  return (
    <section
      aria-label="Built for the way Australian tradies work"
      className="relative w-full overflow-hidden"
    >
      <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
        <BackgroundVideo
          poster="/videos/section-poster.svg"
          sources={[
            { src: '/videos/secondary.webm', type: 'video/webm' },
            { src: '/videos/secondary.mp4', type: 'video/mp4' },
          ]}
          scrim={false}
          className="absolute inset-0"
        />
        {/* Edge fades blend the section into the dark page surrounds. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,11,10,0.85) 0%, rgba(7,11,10,0) 8%, rgba(7,11,10,0) 92%, rgba(7,11,10,1) 100%)',
          }}
        />
      </div>
    </section>
  );
}
