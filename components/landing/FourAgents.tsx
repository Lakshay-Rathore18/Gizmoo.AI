'use client';

import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

type Agent = {
  number: string;
  role: string;
  tagline: string;
  detail: string;
  capabilities: string[];
};

const agents: Agent[] = [
  {
    number: '01',
    role: 'The Receptionist',
    tagline: 'Picks up on ring one.',
    detail:
      'Answers every call day, night, Saturday morning, Boxing Day. Knows your business, your pricing, your service area. Sounds like a real person — because the AI is trained on how real receptionists actually talk.',
    capabilities: ['24/7 answer', 'Real Australian voice', 'Knows your service area', 'Warm, friendly, patient'],
  },
  {
    number: '02',
    role: 'The Qualifier',
    tagline: 'Separates real jobs from tyre-kickers.',
    detail:
      'Asks the right questions in the right order. Urgent leak? Routes to on-call. Quote shopper? Captures details and books a callback. Every call ends with a decision, not a "we\'ll get back to you".',
    capabilities: ['Intent triage', 'Budget + timeline check', 'Suburb + access check', 'Zero awkward silences'],
  },
  {
    number: '03',
    role: 'The Booker',
    tagline: 'Slots jobs into your calendar, live.',
    detail:
      'Reads your Google Calendar / Outlook / Cal.com in real time. Books directly into the slot. Sends SMS confirmations with the suburb, address, time, and your crew. No double bookings. No back-and-forth.',
    capabilities: ['Live calendar sync', 'SMS confirmation', 'Automatic reminders', 'Reschedules in-call'],
  },
  {
    number: '04',
    role: 'The Follow-up',
    tagline: 'Chases the leads you would\'ve lost.',
    detail:
      'Quote sent, no reply? A callback 48 hours later. Appointment tomorrow? A reminder tonight. No-show? A same-day message + rebook offer. The AI runs your sales motion while you\'re on site.',
    capabilities: ['Quote chasing', 'Appointment reminders', 'Same-day rebook', 'Post-job review request'],
  },
];

export function FourAgents() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (isMobile) return; // mobile uses native scroll-snap
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Horizontal pan — vertical scroll drives x translate of the track
      const totalScroll = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -totalScroll(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScroll()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Each panel — stroke-reveal its number on enter
      gsap.utils.toArray<HTMLElement>('.agent-panel').forEach((panel, i) => {
        gsap.fromTo(
          panel.querySelector('.agent-number'),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'expoOut',
            scrollTrigger: {
              containerAnimation: tween,
              trigger: panel,
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
          },
        );
        gsap.fromTo(
          panel.querySelector('.agent-role'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'expoOut',
            delay: 0.1,
            scrollTrigger: {
              containerAnimation: tween,
              trigger: panel,
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
          },
        );
        gsap.fromTo(
          panel.querySelectorAll('.agent-cap'),
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: 'expoOut',
            stagger: 0.06,
            delay: 0.3 + i * 0.05,
            scrollTrigger: {
              containerAnimation: tween,
              trigger: panel,
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      id="agents"
      ref={sectionRef}
      aria-label="Four AI agents"
      className="relative w-full overflow-hidden bg-bg-primary"
    >
      {/* Section label sits above the horizontal track */}
      <div className="max-w-content mx-auto px-6 pt-section pb-12">
        <span className="section-label block mb-6">03 — The crew</span>
        <h2 className="text-display-sm font-display font-normal tracking-tight max-w-3xl leading-[0.95]">
          Four agents.{' '}
          <span className="italic text-accent">One phone line.</span>
        </h2>
        <p className="mt-4 text-text-secondary max-w-xl">
          Gizmoo isn&apos;t a single bot — it&apos;s a crew of specialised agents, each doing the job a real receptionist + scheduler + sales assistant would do, together.
        </p>
      </div>

      {/* DESKTOP — GSAP pinned horizontal track */}
      {!isMobile && (
        <div
          ref={trackRef}
          className="agents-track flex will-change-transform"
          style={{ width: 'max-content' }}
        >
          {agents.map((a, i) => (
            <article
              key={i}
              className="agent-panel shrink-0 w-screen h-[80vh] flex items-center"
            >
              <div className="max-w-content w-full mx-auto px-12 grid grid-cols-12 gap-8 items-center">
                <div className="col-span-5">
                  <span className="agent-number font-mono text-sm uppercase tracking-[0.3em] text-accent opacity-0">
                    Agent {a.number}
                  </span>
                  <h3 className="agent-role mt-3 text-[clamp(2.5rem,6vw,5.5rem)] font-display font-normal leading-[0.95] tracking-tight opacity-0">
                    {a.role.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="italic text-accent">{a.role.split(' ').slice(-1)}</span>
                  </h3>
                </div>
                <div className="col-span-7 max-w-lg">
                  <p className="text-2xl md:text-3xl font-display leading-tight">{a.tagline}</p>
                  <p className="mt-6 text-text-secondary leading-relaxed">{a.detail}</p>
                  <ul className="mt-8 grid grid-cols-2 gap-3">
                    {a.capabilities.map((c, ci) => (
                      <li key={ci} className="agent-cap flex items-start gap-2 opacity-0">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span className="text-sm text-text-primary">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* MOBILE — native horizontal scroll-snap */}
      {isMobile && (
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-section"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', overscrollBehaviorX: 'contain' }}
        >
          {agents.map((a, i) => (
            <article
              key={i}
              className="snap-start shrink-0 w-[85vw] nk-card p-6"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                Agent {a.number}
              </span>
              <h3 className="mt-2 text-3xl font-display font-normal leading-tight">
                {a.role.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="italic text-accent">{a.role.split(' ').slice(-1)}</span>
              </h3>
              <p className="mt-3 text-lg font-display">{a.tagline}</p>
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">{a.detail}</p>
              <ul className="mt-5 space-y-2">
                {a.capabilities.map((c, ci) => (
                  <li key={ci} className="flex items-start gap-2">
                    <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                    <span className="text-sm text-text-primary">{c}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
