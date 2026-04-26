'use client';

import { VelocityMarquee } from '@/components/primitives/VelocityMarquee';

const phrases = [
  'Never miss another call',
  'Never lose another job',
  'Never refund another deposit',
  'Never chase another lead',
  'Never come back to 14 voicemails',
  'Never apologise for being on site',
];

export function VelocityBand() {
  return (
    <section
      aria-label="promise band"
      className="relative w-full overflow-hidden py-14 md:py-24 border-y border-border-subtle bg-bg-primary"
    >
      <VelocityMarquee baseDuration={42} direction={-1} pauseLabel="Pause promise band marquee">
        {phrases.map((p, i) => (
          <div key={i} className="flex items-center gap-12 px-12">
            <span className="text-[clamp(2.75rem,8vw,7rem)] font-display font-normal tracking-kinetic leading-none text-text-primary">
              {p.split(/(another|14 voicemails|on site)/i).map((token, ti) => {
                const isAccent = /^(another|14 voicemails|on site)$/i.test(token);
                return isAccent ? (
                  <span key={ti} className="italic text-accent">{token}</span>
                ) : (
                  <span key={ti}>{token}</span>
                );
              })}
            </span>
            <span
              aria-hidden="true"
              className="inline-block w-3 h-3 rounded-full bg-accent shrink-0 motion-safe:animate-cream-pulse"
            />
          </div>
        ))}
      </VelocityMarquee>
    </section>
  );
}
