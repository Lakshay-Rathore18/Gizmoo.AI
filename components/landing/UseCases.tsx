'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const useCases = [
  {
    stat: '+40%',
    statLabel: 'more bookings',
    title: 'Never miss revenue',
    description: 'Every unanswered call is a lost customer. Gizmoo picks up instantly, qualifies the lead, and books the job before your competitor even checks their voicemail.',
    gradient: 'from-cyan-600/10 to-blue-700/10',
  },
  {
    stat: '24/7',
    statLabel: 'uninterrupted coverage',
    title: '24/7 Availability',
    description: 'Emergencies don\'t wait for business hours. Whether it\'s a burst pipe at midnight or an urgent legal question on Sunday, Gizmoo is always on.',
    gradient: 'from-emerald-600/10 to-teal-700/10',
  },
  {
    stat: '12h',
    statLabel: 'saved per week',
    title: 'Focus on customers',
    description: 'Stop interrupting client work to answer the phone. Gizmoo handles intake, scheduling, and follow-ups while you focus on the work that pays.',
    gradient: 'from-violet-600/10 to-purple-700/10',
  },
  {
    stat: '-60%',
    statLabel: 'fewer no-shows',
    title: 'Outbound at scale',
    description: 'Automated appointment reminders, follow-up calls, and re-engagement campaigns. Set the rules, and Gizmoo dials consistently and politely.',
    gradient: 'from-amber-600/10 to-orange-700/10',
  },
];

function CounterStat({ value, inView }: { value: string; inView: boolean }) {
  // For stats like "+40%", "24/7", "12h", "-60%"
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-accent"
    >
      {value}
    </motion.span>
  );
}

export function UseCases() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // GSAP horizontal scroll for desktop
  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let gsapInstance: any;

    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const totalScroll = track.scrollWidth - window.innerWidth;

      gsapInstance = gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
        },
      });
    };

    initGSAP();

    return () => {
      if (gsapInstance?.scrollTrigger) {
        gsapInstance.scrollTrigger.kill();
      }
    };
  }, [isMobile]);

  return (
    <section id="use-cases" ref={sectionRef} className="relative py-section overflow-hidden">
      <div className="max-w-content mx-auto px-6 mb-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label block mb-8"
        >
          03 — Use Cases
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-display-sm font-display font-bold tracking-tight max-w-3xl"
        >
          Built for every business with a phone number.
        </motion.h2>
      </div>

      {/* Desktop: Horizontal scroll track */}
      {!isMobile && (
        <div ref={trackRef} className="flex gap-8 pl-6 pr-[20vw]" style={{ width: 'max-content' }}>
          {useCases.map((uc, i) => (
            <div
              key={i}
              className={`w-[80vw] max-w-[900px] shrink-0 nk-card p-10 md:p-14 bg-gradient-to-br ${uc.gradient}`}
            >
              <CounterStat value={uc.stat} inView={inView} />
              <p className="text-sm text-text-tertiary uppercase tracking-wider mt-2 mb-6">
                {uc.statLabel}
              </p>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">{uc.title}</h3>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-lg">
                {uc.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Mobile: Vertical stacked cards */}
      {isMobile && (
        <div className="px-6 flex flex-col gap-6">
          {useCases.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`nk-card p-8 bg-gradient-to-br ${uc.gradient}`}
            >
              <div className="text-5xl font-display font-bold text-accent mb-1">{uc.stat}</div>
              <p className="text-xs text-text-tertiary uppercase tracking-wider mb-4">{uc.statLabel}</p>
              <h3 className="text-xl font-display font-bold mb-3">{uc.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
