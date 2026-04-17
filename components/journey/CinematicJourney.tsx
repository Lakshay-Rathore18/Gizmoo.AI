'use client';

import { useLayoutEffect, useRef } from 'react';
import {
  gsap,
  ScrollTrigger,
  SplitText,
  MotionPathPlugin,
} from '@/lib/gsap';
import { JourneyGraphic } from './JourneyGraphic';
import { JourneyCopy } from './JourneyCopy';

export function CinematicJourney({ onContactOpen }: { onContactOpen?: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;

    // Void-check MotionPathPlugin — ensures tree-shaker doesn't drop it
    void MotionPathPlugin;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // ─── SplitText — split every major headline into chars ───
      const splits: SplitText[] = [];
      const doSplit = (selector: string, type = 'chars,words') => {
        const nodes = gsap.utils.toArray<HTMLElement>(selector);
        nodes.forEach((n) => {
          const s = new SplitText(n, { type, wordsClass: 'split-word', charsClass: 'split-char' });
          splits.push(s);
        });
      };
      doSplit('.copy-s1 .split-target');
      doSplit('.copy-s2 .split-target');
      doSplit('.copy-s4 .split-target');
      doSplit('.copy-s5 .split-target');
      doSplit('.copy-s7 .split-target');

      // Ensure chars can be translated/rotated
      gsap.set('.split-word', { overflow: 'hidden', display: 'inline-block' });
      gsap.set('.split-char', { display: 'inline-block', willChange: 'transform, opacity' });

      // Initial states
      gsap.set('#beam', { scale: 1, x: 0, y: 0, rotate: 0, transformOrigin: '50% 50%' });
      gsap.set('.copy-s2, .copy-s3, .copy-s4, .copy-s5, .copy-s6, .copy-s7', { opacity: 0 });
      gsap.set('.stat-counter', { innerText: 0 });
      gsap.set('#halo-root', { opacity: 0, scale: 0.6 });
      gsap.set('#core', { opacity: 0, scale: 0.2, transformOrigin: '50% 50%' });
      gsap.set('#dash-ring', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' });
      gsap.set('#dashboard-card', { opacity: 0 });
      gsap.set('.orb-trail', { opacity: 0 });
      gsap.set('#beam-split', { opacity: 0 });
      gsap.set('#network-echo', { opacity: 0 });

      // ─── Always-on ambient drift on far dots (establishes depth) ───
      const farDots = gsap.utils.toArray<SVGCircleElement>('.far-dot');
      farDots.forEach((dot, i) => {
        gsap.to(dot, {
          y: `+=${gsap.utils.random(-18, 18)}`,
          x: `+=${gsap.utils.random(-12, 12)}`,
          duration: gsap.utils.random(4, 9),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.15,
        });
        gsap.to(dot, {
          opacity: `+=${gsap.utils.random(-0.15, 0.15)}`,
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      if (prefersReduced) {
        gsap.set('.copy-s1 .split-char', { yPercent: 0, opacity: 1, rotateX: 0 });
        gsap.set('.copy-s1 .line', { yPercent: 0, opacity: 1 });
        return;
      }

      // ─── Global: scroll velocity drives chromatic aberration + grain intensity ───
      const absRed = root.querySelector('#ab-red');
      const absBlue = root.querySelector('#ab-blue');
      const grainLayer = document.querySelector('.global-film canvas') as HTMLElement | null;
      const bloomBlur = root.querySelector('#bloom-blur');
      const bloomMegaBlur = root.querySelector('#bloomMega-blur');

      const velocityTrigger = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = Math.abs(self.getVelocity());
          const intensity = gsap.utils.clamp(0, 1, v / 2400);
          if (absRed) gsap.set(absRed, { attr: { dx: intensity * 8 } });
          if (absBlue) gsap.set(absBlue, { attr: { dx: -intensity * 8 } });
          if (grainLayer) gsap.set(grainLayer, { opacity: 0.28 + intensity * 0.2 });
        },
      });

      const mm = gsap.matchMedia();

      // ====================================================================
      // DESKTOP: pinned cinematic journey — one master timeline
      // ====================================================================
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=7000',
            pin: true,
            pinSpacing: true,
            scrub: 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: 'expoOut' },
        });

        // ═══ SCENE 1 — The Signal (0.00 → 0.95) ═══
        tl.addLabel('s1', 0);

        // Beam ignites — DrawSVG-style scale reveal
        tl.fromTo(
          '#beam',
          { scaleY: 0, scaleX: 0.3, opacity: 0 },
          { scaleY: 1, scaleX: 1, opacity: 1, duration: 0.75, ease: 'expoOut' },
          's1'
        );

        // Bloom breath — ignites with beam
        if (bloomBlur) {
          tl.fromTo(
            bloomBlur,
            { attr: { stdDeviation: 0 } },
            { attr: { stdDeviation: 22 }, duration: 0.3, ease: 'expoOut' },
            's1+=0.25'
          );
          tl.to(
            bloomBlur,
            { attr: { stdDeviation: 14 }, duration: 0.45, ease: 'expoInOut' },
            's1+=0.55'
          );
        }

        // Variable-font weight morph on the headline container (axis #12)
        tl.fromTo(
          '.copy-s1 .split-target',
          { fontVariationSettings: '"wght" 200, "opsz" 14' },
          { fontVariationSettings: '"wght" 500, "opsz" 36', duration: 0.9, ease: 'expoOut' },
          's1+=0.18'
        );

        // Headline chars — SplitText with 3D rotateX + random stagger
        tl.from(
          '.copy-s1 .split-target .split-char',
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -80,
            transformOrigin: '50% 100% -30',
            duration: 0.85,
            stagger: { amount: 0.5, from: 'random' },
            ease: 'expoOut',
          },
          's1+=0.18'
        );
        tl.from(
          '.copy-s1 .line-sub',
          { y: 24, opacity: 0, duration: 0.55, ease: 'expoOut' },
          's1+=0.52'
        );

        // Secondary motion — subtle continuous beam breathing
        tl.to(
          '#beam',
          { scale: 1.04, duration: 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut' },
          's1+=0.6'
        );

        // ═══ SCENE 2 — Call Arrives (0.95 → 2.05) ═══
        tl.addLabel('s2', 0.95);

        // Scene 1 exit — chars fly OUT via rotateX+yPercent
        tl.to(
          '.copy-s1 .split-target .split-char',
          {
            yPercent: -120,
            opacity: 0,
            rotateX: 80,
            duration: 0.55,
            stagger: { amount: 0.25, from: 'end' },
            ease: 'expoIn',
          },
          's2'
        );
        tl.to('.copy-s1', { opacity: 0, duration: 0.3 }, 's2+=0.25');

        // Anticipation camera tremor — tiny pre-impact shudder
        tl.to(
          inner,
          {
            keyframes: [
              { x: -2, y: 1, duration: 0.06 },
              { x: 2, y: -1, duration: 0.06 },
              { x: 0, y: 0, duration: 0.06 },
            ],
            ease: 'none',
          },
          's2+=0.12'
        );

        // Call orb — rides motion path (not straight line)
        tl.fromTo(
          '#call-orb',
          { opacity: 0, scale: 0.2 },
          { opacity: 1, scale: 1, duration: 0.3, ease: 'snappy' },
          's2+=0.18'
        );
        tl.to(
          '#call-orb',
          {
            motionPath: {
              path: '#orb-path',
              align: '#orb-path',
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
            duration: 0.95,
            ease: 'primary',
          },
          's2+=0.22'
        );

        // Orb trails — follow with lag
        tl.fromTo(
          '.orb-trail',
          { opacity: 0 },
          {
            opacity: (i) => 0.7 - i * 0.2,
            motionPath: { path: '#orb-path', align: '#orb-path', alignOrigin: [0.5, 0.5] },
            duration: 0.85,
            stagger: 0.08,
            ease: 'primary',
          },
          's2+=0.3'
        );

        // Beam tilts to "catch" orb (secondary motion)
        tl.to(
          '#beam',
          { rotate: 7, x: -22, duration: 0.55, ease: 'anticipate' },
          's2+=0.45'
        );
        tl.fromTo(
          '#beam-split',
          { opacity: 0, x: 0 },
          { opacity: 0.75, x: 16, duration: 0.5, ease: 'expoOut' },
          's2+=0.55'
        );

        // IMPACT — orb meets beam
        // Chromatic aberration spike
        if (absRed && absBlue) {
          tl.to([absRed, absBlue], {
            attr: { dx: 14 },
            duration: 0.15,
            ease: 'expoOut',
          }, 's2+=1.1');
          tl.to([absRed, absBlue], {
            attr: { dx: 0 },
            duration: 0.3,
            ease: 'expoInOut',
          }, 's2+=1.25');
          // Flip blue back to negative via a separate set
          tl.set(absBlue, { attr: { dx: 0 } }, 's2+=1.55');
        }

        // Beam scale punch (secondary to impact)
        tl.to(
          '#beam',
          { scale: 1.1, duration: 0.14, ease: 'snappy' },
          's2+=1.12'
        );
        tl.to(
          '#beam',
          { scale: 1, duration: 0.28, ease: 'expoOut' },
          's2+=1.26'
        );

        // Bloom flash
        if (bloomBlur) {
          tl.to(bloomBlur, { attr: { stdDeviation: 42 }, duration: 0.15, ease: 'expoOut' }, 's2+=1.1');
          tl.to(bloomBlur, { attr: { stdDeviation: 14 }, duration: 0.35, ease: 'expoInOut' }, 's2+=1.26');
        }

        // Camera shake on impact
        tl.to(
          inner,
          {
            keyframes: [
              { x: -5, y: 3, duration: 0.05 },
              { x: 4, y: -4, duration: 0.05 },
              { x: -3, y: 4, duration: 0.05 },
              { x: 2, y: -2, duration: 0.05 },
              { x: 0, y: 0, duration: 0.05 },
            ],
            ease: 'none',
          },
          's2+=1.12'
        );

        // Orb absorbs into beam
        tl.to(
          '#call-orb',
          { scale: 0, opacity: 0, duration: 0.25, ease: 'expoIn' },
          's2+=1.22'
        );
        tl.to(
          '.orb-trail',
          { opacity: 0, duration: 0.25, ease: 'expoIn' },
          's2+=1.22'
        );

        // Scene 2 copy — counter + headline
        tl.to('.copy-s2', { opacity: 1, duration: 0.3 }, 's2+=0.4');
        tl.from(
          '.copy-s2 .split-target .split-char',
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -60,
            duration: 0.65,
            stagger: { amount: 0.3, from: 'start' },
            ease: 'expoOut',
          },
          's2+=0.55'
        );

        tl.fromTo(
          '.copy-s2 .stat-counter',
          { innerText: 0 },
          {
            innerText: 50000,
            duration: 0.95,
            ease: 'expoOut',
            snap: { innerText: 1 },
            onUpdate() {
              const t = this.targets()[0] as HTMLElement;
              const v = Number(t.innerText.replace(/,/g, '')) || 0;
              t.innerText = v.toLocaleString('en-US');
            },
          },
          's2+=0.4'
        );

        // ═══ SCENE 3 — Connection (2.05 → 3.20) ═══
        tl.addLabel('s3', 2.05);

        tl.to('.copy-s2', { opacity: 0, duration: 0.35 }, 's3');
        tl.to('#beam-split', { opacity: 0, duration: 0.3 }, 's3');
        tl.to('#beam', { rotate: 0, x: 0, duration: 0.4, ease: 'expoInOut' }, 's3');

        // Halo flare
        tl.fromTo(
          '#halo-root',
          { opacity: 0, scale: 0.4 },
          { opacity: 0.95, scale: 1.35, duration: 0.35, ease: 'expoOut' },
          's3+=0.08'
        );
        tl.to(
          '#halo-root',
          { opacity: 0, scale: 2.2, duration: 0.7, ease: 'expoInOut' },
          's3+=0.42'
        );

        // Particle burst — Physics2D velocity + gravity + friction
        tl.to(
          '.particle',
          {
            opacity: 1,
            scale: () => gsap.utils.random(0.6, 1.8),
            physics2D: {
              velocity: 'random(320, 920)',
              angle: 'random(0, 360)',
              gravity: 80,
              friction: 0.08,
            },
            duration: 1.3,
            stagger: 0.004,
            ease: 'none',
          },
          's3+=0.1'
        );
        tl.to(
          '.particle',
          { opacity: 0, duration: 0.5, stagger: 0.003, ease: 'expoIn' },
          's3+=0.85'
        );

        // Beam brief whiteout
        if (bloomBlur) {
          tl.to(bloomBlur, { attr: { stdDeviation: 38 }, duration: 0.18, ease: 'expoOut' }, 's3+=0.12');
          tl.to(bloomBlur, { attr: { stdDeviation: 12 }, duration: 0.5, ease: 'expoInOut' }, 's3+=0.3');
        }

        tl.to('.copy-s3', { opacity: 1, duration: 0.3 }, 's3+=0.22');
        tl.fromTo(
          '.copy-s3 .feature-label',
          { opacity: 0, scale: 0.4, y: 30, rotate: (i) => (i % 2 ? -4 : 4) },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'snappy',
          },
          's3+=0.4'
        );

        // ═══ SCENE 4 — Network (3.20 → 4.60) ═══
        tl.addLabel('s4', 3.2);

        tl.to(
          '.copy-s3 .feature-label',
          { opacity: 0, scale: 0.8, duration: 0.3, stagger: 0.03, ease: 'expoIn' },
          's4'
        );
        tl.to('.copy-s3', { opacity: 0, duration: 0.3 }, 's4+=0.2');

        // Camera pullback — beam MORPHS from a tall rectangle into a circular node
        tl.to(
          '#beam-core',
          { morphSVG: '#beam-state-2', duration: 0.75, ease: 'expoInOut' },
          's4'
        );
        tl.to(
          '#beam-glow',
          { scaleY: 0.3, scaleX: 1.2, duration: 0.75, ease: 'expoInOut' },
          's4'
        );
        tl.to(
          '#beam',
          { scale: 0.25, opacity: 0.85, duration: 0.75, ease: 'expoInOut' },
          's4'
        );
        tl.to(
          ['#beam-cap-top', '#beam-cap-bot'],
          { opacity: 0, duration: 0.4, ease: 'expoIn' },
          's4'
        );

        tl.set('#network', { opacity: 1 }, 's4+=0.3');

        // DrawSVG stroke reveal on network paths
        tl.fromTo(
          '.network-line',
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            duration: 0.85,
            stagger: 0.14,
            ease: 'expoInOut',
          },
          's4+=0.32'
        );

        // Node anticipation — tiny pre-tremor before they pop
        tl.fromTo(
          '.network-node',
          { scale: 0, opacity: 0 },
          {
            scale: 0.85,
            opacity: 0.4,
            duration: 0.1,
            stagger: 0.1,
            ease: 'expoOut',
          },
          's4+=0.62'
        );
        tl.to(
          '.network-node',
          { scale: 1, opacity: 1, duration: 0.35, stagger: 0.1, ease: 'snappy' },
          's4+=0.72'
        );

        tl.fromTo(
          '.network-center',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'snappy' },
          's4+=0.42'
        );

        // Depth echo — mid-plane echo dots fade in behind primary network
        tl.fromTo(
          '#network-echo',
          { opacity: 0, scale: 0.85 },
          { opacity: 0.6, scale: 1, duration: 0.9, ease: 'expoOut' },
          's4+=0.5'
        );
        // And drift slightly while visible
        tl.to(
          '#network-echo',
          { y: 8, duration: 1.5, yoyo: true, repeat: 1, ease: 'sine.inOut' },
          's4+=0.6'
        );

        tl.to('.copy-s4', { opacity: 1, duration: 0.3 }, 's4+=0.35');
        tl.fromTo(
          '.copy-s4 .split-target',
          { fontVariationSettings: '"wght" 250, "opsz" 16' },
          { fontVariationSettings: '"wght" 500, "opsz" 36', duration: 0.9, ease: 'expoOut' },
          's4+=0.52'
        );
        tl.from(
          '.copy-s4 .split-target .split-char',
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -70,
            duration: 0.75,
            stagger: { amount: 0.4, from: 'random' },
            ease: 'expoOut',
          },
          's4+=0.52'
        );
        tl.fromTo(
          '.copy-s4 .network-node-label',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09, ease: 'expoOut' },
          's4+=0.85'
        );

        // ═══ SCENE 5 — Dashboard (4.60 → 5.70) ═══
        tl.addLabel('s5', 4.6);

        tl.to('.copy-s4', { opacity: 0, duration: 0.35 }, 's5');
        tl.to(
          '.network-node, .network-line, .network-center',
          { opacity: 0, duration: 0.5, ease: 'expoIn' },
          's5'
        );
        tl.to('#beam', { opacity: 0, duration: 0.35, ease: 'expoIn' }, 's5');
        tl.to('#network', { opacity: 0, duration: 0.4 }, 's5+=0.1');

        // Rings fade in and rotate continuously
        tl.fromTo(
          '#dash-ring',
          { opacity: 0, scale: 0.6, rotate: -12 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: 'expoOut' },
          's5+=0.12'
        );
        tl.to('#dash-ring', { rotate: 35, duration: 1.1, ease: 'none' }, 's5+=0.12');

        // Card rises through rings with depth blur
        tl.fromTo(
          '#dashboard-card',
          {
            scale: 0.55,
            opacity: 0,
            rotateX: 28,
            y: 60,
            filter: 'blur(10px)',
          },
          {
            scale: 1,
            opacity: 1,
            rotateX: 0,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'expoOut',
          },
          's5+=0.22'
        );
        tl.fromTo(
          '#dashboard-card .chat-bubble',
          { opacity: 0, y: 18, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.18, ease: 'expoOut' },
          's5+=0.45'
        );

        tl.to('.copy-s5', { opacity: 1, duration: 0.3 }, 's5+=0.2');
        tl.from(
          '.copy-s5 .split-target .split-char',
          {
            yPercent: 110,
            opacity: 0,
            rotateX: -60,
            duration: 0.65,
            stagger: { amount: 0.3, from: 'start' },
            ease: 'expoOut',
          },
          's5+=0.3'
        );

        // ═══ SCENE 6 — Testimonial Chorus (5.70 → 6.75) ═══
        tl.addLabel('s6', 5.7);

        tl.to('.copy-s5', { opacity: 0, duration: 0.35 }, 's6');
        tl.to(
          '#dashboard-card',
          { y: -120, opacity: 0, scale: 0.85, filter: 'blur(8px)', duration: 0.55, ease: 'expoIn' },
          's6'
        );
        tl.to('#dash-ring', { scale: 2, opacity: 0, duration: 0.7, ease: 'expoOut' }, 's6');

        tl.to('.copy-s6', { opacity: 1, duration: 0.3 }, 's6+=0.18');
        tl.fromTo(
          '.copy-s6 .testimonial-card',
          {
            opacity: 0,
            y: 40,
            x: (i) => (i % 2 === 0 ? -260 : 260),
            scale: 0.85,
            rotate: (i) => (i % 2 === 0 ? -2.5 : 2.5),
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotate: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.14,
            ease: 'expoOut',
          },
          's6+=0.2'
        );

        // Testimonial micro-drift while on screen — staggered sine bobs
        tl.to(
          '.copy-s6 .testimonial-card',
          {
            y: (i) => (i === 1 ? -6 : i === 0 ? 4 : -4),
            duration: 0.6,
            stagger: 0.08,
            yoyo: true,
            repeat: 1,
            ease: 'sine.inOut',
          },
          's6+=0.9'
        );

        // ═══ SCENE 7 — Convergence (6.75 → 8.00) ═══
        tl.addLabel('s7', 6.75);

        tl.to(
          '.copy-s6 .testimonial-card',
          {
            scale: 0.5,
            opacity: 0,
            y: -80,
            filter: 'blur(10px)',
            duration: 0.55,
            stagger: 0.06,
            ease: 'expoIn',
          },
          's7'
        );
        tl.to('.copy-s6', { opacity: 0, duration: 0.35 }, 's7+=0.2');

        // Core ignites
        tl.fromTo(
          '#core',
          { scale: 0.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'expoOut' },
          's7+=0.12'
        );

        // Aberration + bloom spike on ignition
        if (absRed && absBlue) {
          tl.to([absRed], { attr: { dx: 10 }, duration: 0.2, ease: 'expoOut' }, 's7+=0.18');
          tl.to([absBlue], { attr: { dx: -10 }, duration: 0.2, ease: 'expoOut' }, 's7+=0.18');
          tl.to([absRed, absBlue], { attr: { dx: 0 }, duration: 0.4, ease: 'expoInOut' }, 's7+=0.4');
        }
        if (bloomMegaBlur) {
          tl.to(bloomMegaBlur, { attr: { stdDeviation: 80 }, duration: 0.3, ease: 'expoOut' }, 's7+=0.18');
          tl.to(bloomMegaBlur, { attr: { stdDeviation: 40 }, duration: 0.5, ease: 'expoInOut' }, 's7+=0.5');
        }

        // Camera shake on ignition
        tl.to(
          inner,
          {
            keyframes: [
              { x: 6, y: -4, duration: 0.06 },
              { x: -5, y: 5, duration: 0.06 },
              { x: 4, y: -3, duration: 0.06 },
              { x: -2, y: 2, duration: 0.06 },
              { x: 0, y: 0, duration: 0.06 },
            ],
            ease: 'none',
          },
          's7+=0.18'
        );

        tl.to('#core', { scale: 3.8, duration: 0.95, ease: 'expoInOut' }, 's7+=0.35');

        // Secondary particle flare on core ignition — radial burst outward
        tl.set('.particle', { x: 0, y: 0, opacity: 0, scale: 0 }, 's7+=0.2');
        tl.to(
          '.particle',
          {
            opacity: 1,
            scale: () => gsap.utils.random(0.8, 2),
            physics2D: {
              velocity: 'random(600, 1400)',
              angle: 'random(0, 360)',
              gravity: 0,
              friction: 0.12,
            },
            duration: 1.4,
            stagger: 0.003,
            ease: 'none',
          },
          's7+=0.22'
        );
        tl.to(
          '.particle',
          { opacity: 0, duration: 0.6, stagger: 0.003, ease: 'expoIn' },
          's7+=1.0'
        );

        tl.to('.copy-s7', { opacity: 1, duration: 0.3 }, 's7+=0.38');
        tl.fromTo(
          '.copy-s7 .split-target',
          { fontVariationSettings: '"wght" 200, "opsz" 14' },
          { fontVariationSettings: '"wght" 600, "opsz" 48', duration: 1.0, ease: 'expoOut' },
          's7+=0.42'
        );
        tl.from(
          '.copy-s7 .split-target .split-char',
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -70,
            scale: 0.7,
            duration: 0.85,
            stagger: { amount: 0.45, from: 'random' },
            ease: 'expoOut',
          },
          's7+=0.42'
        );
        tl.fromTo(
          '.copy-s7 .final-cta',
          { scale: 0.5, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.55, stagger: 0.14, ease: 'snappy' },
          's7+=0.62'
        );
      });

      // ====================================================================
      // MOBILE: no pin, scrub a simpler timeline
      // ====================================================================
      mm.add('(max-width: 767px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: 'expoInOut' },
        });

        tl.fromTo('#beam', { scaleY: 0.3, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.5 }, 0);
        tl.from(
          '.copy-s1 .split-target .split-char',
          { yPercent: 120, opacity: 0, rotateX: -60, duration: 0.35, stagger: { amount: 0.2, from: 'random' } },
          0.05
        );
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
              t.innerText = (Number(t.innerText.replace(/,/g, '')) || 0).toLocaleString('en-US');
            },
          },
          0.9
        );

        tl.to('.copy-s2', { opacity: 0, duration: 0.3 }, 1.7);
        tl.to('.copy-s3', { opacity: 1, duration: 0.3 }, 1.75);
        tl.fromTo(
          '.copy-s3 .feature-label',
          { opacity: 0, scale: 0.6, y: 12 },
          { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'snappy' },
          1.8
        );

        tl.to('.copy-s3, .copy-s3 .feature-label', { opacity: 0, duration: 0.3 }, 2.6);
        tl.to('.copy-s4', { opacity: 1, duration: 0.3 }, 2.65);

        tl.to('.copy-s4', { opacity: 0, duration: 0.3 }, 3.5);
        tl.to('.copy-s5', { opacity: 1, duration: 0.3 }, 3.55);
        tl.fromTo(
          '#dashboard-card',
          { scale: 0.75, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4 },
          3.55
        );
        tl.fromTo(
          '#dashboard-card .chat-bubble',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 },
          3.7
        );

        tl.to('.copy-s5, #dashboard-card', { opacity: 0, duration: 0.3 }, 4.4);
        tl.to('.copy-s7', { opacity: 1, duration: 0.3 }, 4.5);
        tl.fromTo(
          '#core',
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4 },
          4.5
        );
        tl.fromTo(
          '.copy-s7 .final-cta',
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, stagger: 0.08 },
          4.75
        );
      });

      return () => {
        velocityTrigger.kill();
        splits.forEach((s) => s.revert());
      };
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
      <div ref={innerRef} className="absolute inset-0" id="journey-inner">
        <JourneyGraphic />
        <JourneyCopy onPrimaryCTA={onContactOpen} />
      </div>
    </section>
  );
}
