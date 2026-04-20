'use client';

import { testimonials } from '@/lib/brand';

export function JourneyCopy({ onPrimaryCTA }: { onPrimaryCTA?: () => void }) {
  return (
    <div className="journey-copy absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* ======== SCENE 1 — The Signal ======== */}
      <div className="copy-s1 absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1
          className="split-target text-[clamp(3rem,10vw,8rem)] font-display font-normal leading-[0.92] tracking-tight"
          style={{ perspective: '800px', fontVariationSettings: '"wght" 400, "opsz" 32' }}
        >
          <span className="block overflow-hidden pb-[0.12em]">Never miss</span>
          <span className="block overflow-hidden italic text-accent pb-[0.12em]">another call.</span>
        </h1>
        <p className="line line-sub mt-8 text-lg md:text-xl text-text-secondary max-w-xl">
          The AI voice receptionist that picks up 24/7 — so you never lose revenue to voicemail.
        </p>
      </div>

      {/* ======== SCENE 2 — The Call Arrives ======== */}
      <div className="copy-s2 absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0">
        <div className="flex items-baseline gap-3">
          <span className="stat-counter text-[clamp(3rem,10vw,8rem)] font-display font-normal leading-none tracking-tight text-accent tabular-nums">
            0
          </span>
          <span className="text-4xl md:text-6xl font-display font-normal text-accent">+</span>
        </div>
        <h2
          className="split-target mt-4 text-xl md:text-3xl font-display font-normal"
          style={{ perspective: '800px' }}
        >
          calls answered. <span className="italic text-accent">Zero voicemails.</span>
        </h2>
        <p className="line mt-2 text-sm md:text-base text-text-secondary font-mono uppercase tracking-widest">
          99.7% satisfaction · every call, every time
        </p>
      </div>

      {/* ======== SCENE 3 — Connection (feature labels fan out) ======== */}
      <div className="copy-s3 absolute inset-0 opacity-0">
        <div className="absolute top-[18%] left-[10%] md:left-[14%]">
          <span className="feature-label inline-block px-4 py-2 rounded-full border border-accent/40 bg-bg-secondary/70 backdrop-blur-sm text-sm md:text-base font-mono uppercase tracking-widest text-accent">
            24/7 Pickup
          </span>
        </div>
        <div className="absolute top-[20%] right-[10%] md:right-[14%]">
          <span className="feature-label inline-block px-4 py-2 rounded-full border border-accent/40 bg-bg-secondary/70 backdrop-blur-sm text-sm md:text-base font-mono uppercase tracking-widest text-accent">
            Smart Booking
          </span>
        </div>
        <div className="absolute bottom-[22%] left-[12%] md:left-[16%]">
          <span className="feature-label inline-block px-4 py-2 rounded-full border border-accent/40 bg-bg-secondary/70 backdrop-blur-sm text-sm md:text-base font-mono uppercase tracking-widest text-accent">
            Natural Voice
          </span>
        </div>
        <div className="absolute bottom-[20%] right-[12%] md:right-[16%]">
          <span className="feature-label inline-block px-4 py-2 rounded-full border border-accent/40 bg-bg-secondary/70 backdrop-blur-sm text-sm md:text-base font-mono uppercase tracking-widest text-accent">
            Auto SMS
          </span>
        </div>
        <div className="feature-label absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[180px] md:translate-y-[240px] text-center">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-text-tertiary">one line. one AI. every feature you need.</p>
        </div>
      </div>

      {/* ======== SCENE 4 — The Network ======== */}
      <div className="copy-s4 absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0">
        <h2
          className="split-target text-display-sm font-display font-normal tracking-tight max-w-3xl leading-[0.95]"
          style={{ perspective: '800px' }}
        >
          <span className="block overflow-hidden pb-[0.12em]">Built for every business</span>
          <span className="block overflow-hidden italic text-accent pb-[0.12em]">with a phone number.</span>
        </h2>
        <span className="network-node-label absolute top-[22%] left-[14%] text-xs md:text-sm font-mono uppercase tracking-widest text-text-secondary">
          Healthcare
        </span>
        <span className="network-node-label absolute top-[22%] right-[14%] text-xs md:text-sm font-mono uppercase tracking-widest text-text-secondary">
          Legal
        </span>
        <span className="network-node-label absolute bottom-[24%] left-[14%] text-xs md:text-sm font-mono uppercase tracking-widest text-text-secondary">
          Real Estate
        </span>
        <span className="network-node-label absolute bottom-[24%] right-[14%] text-xs md:text-sm font-mono uppercase tracking-widest text-text-secondary">
          Trades
        </span>
      </div>

      {/* ======== SCENE 5 — Dashboard ======== */}
      <div className="copy-s5 absolute inset-x-0 top-[10%] flex flex-col items-center justify-center px-6 text-center opacity-0">
        <span className="line section-label block mb-4">05 — In action</span>
        <h2
          className="split-target text-display-sm font-display font-normal tracking-tight max-w-3xl"
          style={{ perspective: '800px' }}
        >
          <span className="block overflow-hidden pb-[0.12em]">One phone line.</span>
          <span className="block overflow-hidden italic text-accent pb-[0.12em]">Zero missed calls.</span>
        </h2>
      </div>

      {/* ======== SCENE 6 — Testimonials ======== */}
      <div className="copy-s6 absolute inset-0 flex items-center justify-center px-6 opacity-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-6xl">
          {testimonials.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className="testimonial-card nk-card p-6 md:p-7 bg-bg-secondary/90 backdrop-blur-md"
            >
              <p className="text-sm md:text-base text-text-primary leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-border-subtle">
                <div className="text-sm font-display font-semibold text-accent">{t.name}</div>
                <div className="text-xs text-text-tertiary">{t.role} · {t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======== SCENE 7 — Convergence ======== */}
      <div className="copy-s7 absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0">
        <h2
          className="split-target final-headline text-[clamp(2.5rem,9vw,7rem)] font-display font-normal tracking-tight leading-[0.95]"
          style={{ perspective: '800px' }}
        >
          <span className="block overflow-hidden pb-[0.12em]">Ready to never miss</span>
          <span className="block overflow-hidden italic text-accent pb-[0.12em]">a call again?</span>
        </h2>
        <div className="final-ctas mt-10 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto">
          <a
            href="https://accounts.gizmoo.me/sign-up"
            className="final-cta btn-primary text-base px-8 py-4"
          >
            Start Free Trial
          </a>
          <button
            type="button"
            onClick={onPrimaryCTA}
            className="final-cta btn-ghost text-base px-8 py-4"
          >
            Talk to Sales
          </button>
        </div>
      </div>
    </div>
  );
}
