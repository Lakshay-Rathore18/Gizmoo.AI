'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { JourneyGraphic } from './JourneyGraphic';
import { JourneyCopy } from './JourneyCopy';

export function CinematicJourney({ onContactOpen }: { onContactOpen?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Pre-measure network lines for stroke-draw effect
      const lines = gsap.utils.toArray<SVGLineElement>('.network-line');
      lines.forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      });

      // Initial scene states — everything off except scene 1 beam + copy
      gsap.set('#beam-glow, #beam-core, #beam-cap-top, #beam-cap-bot', { transformOrigin: '50% 50%' });
      gsap.set('#beam', { scale: 1, x: 0, y: 0, rotate: 0 });
      gsap.set('.copy-s2, .copy-s3, .copy-s4, .copy-s5, .copy-s6, .copy-s7', { opacity: 0 });
      gsap.set('.stat-counter', { innerText: 0 });

      if (prefersReduced) {
        // Reduced motion: show scene 1 final state only; skip pinned timeline entirely
        gsap.set('.copy-s1 .line', { yPercent: 0, opacity: 1 });
        return;
      }

      const mm = gsap.matchMedia();

      // ============================================================
      // DESKTOP: full pinned cinematic journey
      // ============================================================
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=6400',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: 'power2.inOut' },
        });

        // ───── SCENE 1 — The Signal (0→1) ─────
        tl.addLabel('s1', 0);
        tl.fromTo(
          '#beam',
          { scaleY: 0.15, scaleX: 0.4, opacity: 0 },
          { scaleY: 1, scaleX: 1, opacity: 1, duration: 0.9, ease: 'power3.out' },
          's1'
        );
        tl.fromTo(
          '.copy-s1 .line',
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
          's1+=0.15'
        );
        tl.to('#beam', { scale: 1.06, duration: 0.4, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 's1+=0.6');

        // ───── SCENE 2 — The Call Arrives (1→2) ─────
        tl.addLabel('s2', 1);
        tl.to('.copy-s1 .line', { yPercent: -115, opacity: 0, duration: 0.5, stagger: 0.05 }, 's2');
        tl.to('.copy-s1', { opacity: 0, duration: 0.3 }, 's2+=0.3');
        tl.to('.copy-s2', { opacity: 1, duration: 0.3 }, 's2+=0.35');

        tl.fromTo(
          '#call-orb',
          { x: 520, y: -360, scale: 0.3, opacity: 0 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'power3.inOut' },
          's2'
        );
        tl.to('#beam', { rotate: 6, x: -24, duration: 0.55, ease: 'power2.inOut' }, 's2+=0.35');
        tl.fromTo('#beam-split', { opacity: 0, x: 0 }, { opacity: 0.8, x: 18, duration: 0.5 }, 's2+=0.4');

        tl.fromTo(
          '.copy-s2 .stat-counter',
          { innerText: 0 },
          {
            innerText: 50000,
            duration: 0.85,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate() {
              const t = this.targets()[0] as HTMLElement;
              const v = Number(t.innerText) || 0;
              t.innerText = v.toLocaleString('en-US');
            },
          },
          's2+=0.35'
        );
        tl.fromTo(
          '.copy-s2 .line',
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out' },
          's2+=0.3'
        );

        // ───── SCENE 3 — Connection (2→3) ─────
        tl.addLabel('s3', 2);
        tl.to('.copy-s2', { opacity: 0, duration: 0.35 }, 's3');
        tl.to('#call-orb', { scale: 0.1, opacity: 0, duration: 0.3 }, 's3');
        tl.to('#beam-split', { opacity: 0, duration: 0.3 }, 's3');
        tl.to('#beam', { rotate: 0, x: 0, duration: 0.4 }, 's3');

        tl.fromTo('#halo', { opacity: 0, scale: 0.4 }, { opacity: 0.9, scale: 1.4, duration: 0.35 }, 's3+=0.1');
        tl.to('#halo', { opacity: 0, scale: 2.2, duration: 0.55, ease: 'power2.out' }, 's3+=0.45');

        tl.to('.copy-s3', { opacity: 1, duration: 0.3 }, 's3+=0.15');

        tl.fromTo(
          '.particle',
          { x: 0, y: 0, scale: 0, opacity: 0 },
          {
            x: () => gsap.utils.random(-700, 700),
            y: () => gsap.utils.random(-420, 420),
            scale: () => gsap.utils.random(0.6, 1.6),
            opacity: 1,
            duration: 0.55,
            stagger: 0.005,
            ease: 'power3.out',
          },
          's3+=0.15'
        );
        tl.to(
          '.particle',
          { opacity: 0, scale: 0.4, duration: 0.45, stagger: 0.003, ease: 'power2.in' },
          's3+=0.65'
        );

        tl.fromTo(
          '.copy-s3 .feature-label',
          { opacity: 0, scale: 0.5, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(1.6)' },
          's3+=0.35'
        );

        // ───── SCENE 4 — The Network (3→4.5) ─────
        tl.addLabel('s4', 3);
        tl.to('.copy-s3 .feature-label', { opacity: 0, scale: 0.8, duration: 0.3, stagger: 0.03 }, 's4');
        tl.to('.copy-s3', { opacity: 0, duration: 0.3 }, 's4+=0.25');

        tl.to('#beam', { scale: 0.12, opacity: 0.6, duration: 0.7, ease: 'power2.inOut' }, 's4');
        tl.set('#network', { opacity: 1 }, 's4+=0.35');

        tl.to(
          '.network-line',
          { strokeDashoffset: 0, duration: 0.75, stagger: 0.12, ease: 'power2.inOut' },
          's4+=0.35'
        );
        tl.fromTo(
          '.network-node',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, stagger: 0.1, ease: 'back.out(2)' },
          's4+=0.6'
        );
        tl.fromTo(
          '.network-center',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' },
          's4+=0.35'
        );

        tl.to('.copy-s4', { opacity: 1, duration: 0.3 }, 's4+=0.4');
        tl.fromTo(
          '.copy-s4 .line',
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power3.out' },
          's4+=0.55'
        );
        tl.fromTo(
          '.copy-s4 .network-node-label',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          's4+=0.8'
        );

        // ───── SCENE 5 — Dashboard (4.5→5.5) ─────
        tl.addLabel('s5', 4.5);
        tl.to('.copy-s4', { opacity: 0, duration: 0.35 }, 's5');
        tl.to('.network-node, .network-line, .network-center', { opacity: 0, duration: 0.45 }, 's5');
        tl.to('#beam', { opacity: 0, duration: 0.35 }, 's5');

        tl.to('#network', { opacity: 0, duration: 0.4 }, 's5+=0.1');
        tl.fromTo('#dash-ring', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6 }, 's5+=0.1');
        tl.to('#dash-ring', { rotate: 25, duration: 0.8, ease: 'none' }, 's5+=0.1');

        tl.fromTo(
          '#dashboard-card',
          { scale: 0.6, opacity: 0, rotateX: 24, y: 40 },
          { scale: 1, opacity: 1, rotateX: 0, y: 0, duration: 0.7, ease: 'power3.out' },
          's5+=0.25'
        );
        tl.fromTo(
          '#dashboard-card .chat-bubble',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.18, ease: 'power2.out' },
          's5+=0.45'
        );

        tl.to('.copy-s5', { opacity: 1, duration: 0.3 }, 's5+=0.2');
        tl.fromTo(
          '.copy-s5 .line',
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out' },
          's5+=0.3'
        );

        // ───── SCENE 6 — Testimonial Chorus (5.5→6.5) ─────
        tl.addLabel('s6', 5.5);
        tl.to('.copy-s5', { opacity: 0, duration: 0.35 }, 's6');
        tl.to('#dashboard-card', { y: -120, opacity: 0, duration: 0.5, ease: 'power2.in' }, 's6');
        tl.to('#dash-ring', { scale: 1.6, opacity: 0, duration: 0.6 }, 's6');

        tl.to('.copy-s6', { opacity: 1, duration: 0.3 }, 's6+=0.2');
        tl.fromTo(
          '.copy-s6 .testimonial-card',
          { opacity: 0, y: 60, x: (i) => (i % 2 === 0 ? -220 : 220), scale: 0.85 },
          { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
          's6+=0.25'
        );

        // ───── SCENE 7 — Convergence (6.5→7.5) ─────
        tl.addLabel('s7', 6.5);
        tl.to(
          '.copy-s6 .testimonial-card',
          { scale: 0.6, opacity: 0, y: -60, duration: 0.5, stagger: 0.05, ease: 'power2.in' },
          's7'
        );
        tl.to('.copy-s6', { opacity: 0, duration: 0.35 }, 's7+=0.2');

        tl.fromTo(
          '#core',
          { scale: 0.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out' },
          's7+=0.1'
        );
        tl.to('#core', { scale: 4, duration: 0.8, ease: 'power2.inOut' }, 's7+=0.4');

        tl.to('.copy-s7', { opacity: 1, duration: 0.3 }, 's7+=0.35');
        tl.fromTo(
          '.copy-s7 .final-headline',
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55, ease: 'power3.out' },
          's7+=0.4'
        );
        tl.fromTo(
          '.copy-s7 .final-cta',
          { scale: 0.6, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.45, stagger: 0.12, ease: 'back.out(1.8)' },
          's7+=0.6'
        );
      });

      // ============================================================
      // MOBILE: no pin — sticky graphic + sequential scene reveals
      // ============================================================
      mm.add('(max-width: 767px)', () => {
        // Show scene 1 as the landing, and fade through subsequent scenes tied to scroll position
        // Implementation: single timeline scrubbed over the section's own height (not pinned)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: 'power2.inOut' },
        });

        // Simplified: crossfade between scene copy layers, keep beam/core visible throughout
        tl.fromTo('#beam', { scaleY: 0.3, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.5 }, 0);
        tl.fromTo('.copy-s1 .line', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, 0.1);

        tl.to('.copy-s1', { opacity: 0, duration: 0.3 }, 0.8);
        tl.to('.copy-s2', { opacity: 1, duration: 0.3 }, 0.85);
        tl.fromTo(
          '.copy-s2 .stat-counter',
          { innerText: 0 },
          {
            innerText: 50000,
            duration: 0.4,
            snap: { innerText: 1 },
            onUpdate() {
              const t = this.targets()[0] as HTMLElement;
              t.innerText = (Number(t.innerText) || 0).toLocaleString('en-US');
            },
          },
          0.9
        );

        tl.to('.copy-s2', { opacity: 0, duration: 0.3 }, 1.7);
        tl.to('.copy-s3', { opacity: 1, duration: 0.3 }, 1.75);
        tl.fromTo(
          '.copy-s3 .feature-label',
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.35, stagger: 0.05 },
          1.8
        );

        tl.to('.copy-s3', { opacity: 0, duration: 0.3 }, 2.6);
        tl.to('.copy-s4', { opacity: 1, duration: 0.3 }, 2.65);
        tl.fromTo('.copy-s4 .line', { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, stagger: 0.06 }, 2.7);

        tl.to('.copy-s4', { opacity: 0, duration: 0.3 }, 3.5);
        tl.to('.copy-s5', { opacity: 1, duration: 0.3 }, 3.55);
        tl.fromTo(
          '#dashboard-card',
          { scale: 0.7, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4 },
          3.55
        );
        tl.fromTo('#dashboard-card .chat-bubble', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 }, 3.7);

        tl.to('.copy-s5, #dashboard-card', { opacity: 0, duration: 0.3 }, 4.4);
        tl.to('.copy-s7', { opacity: 1, duration: 0.3 }, 4.5);
        tl.fromTo(
          '#core',
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4 },
          4.5
        );
        tl.fromTo(
          '.copy-s7 .final-headline',
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4 },
          4.55
        );
        tl.fromTo(
          '.copy-s7 .final-cta',
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, stagger: 0.08 },
          4.75
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="journey-section relative w-full overflow-hidden bg-bg-primary"
      style={{
        height: '100vh',
        minHeight: '100dvh',
      }}
    >
      <div className="absolute inset-0">
        <JourneyGraphic />
        <JourneyCopy onPrimaryCTA={onContactOpen} />
      </div>
    </section>
  );
}
