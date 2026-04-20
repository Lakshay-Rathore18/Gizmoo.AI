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
      className="relative w-full overflow-hidden py-12 md:py-20 border-y border-border-subtle bg-bg-primary"
    >
      <VelocityMarquee baseDuration={38} velocityBoost={1.4} direction={-1}>
        {phrases.map((p, i) => (
          <div key={i} className="flex items-center gap-10 px-10">
            <span className="text-[clamp(2.5rem,7vw,6rem)] font-display font-normal tracking-tight leading-none text-text-primary">
              {p}
            </span>
            <span
              aria-hidden
              className="inline-block w-3 h-3 rounded-full bg-accent shrink-0"
            />
          </div>
        ))}
      </VelocityMarquee>
    </section>
  );
}
