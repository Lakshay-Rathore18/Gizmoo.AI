'use client';

const PARTICLE_COUNT = 60;

export function JourneyGraphic() {
  return (
    <div className="journey-graphic absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        viewBox="-960 -540 1920 1080"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="beamGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#20e7b7" stopOpacity="1" />
            <stop offset="60%" stopColor="#20e7b7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#20e7b7" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="beamCoreGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#20e7b7" stopOpacity="0" />
            <stop offset="50%" stopColor="#fdfdf9" stopOpacity="1" />
            <stop offset="100%" stopColor="#20e7b7" stopOpacity="0" />
          </linearGradient>
          <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="bloomSmall" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Background halo — scene 3 flash */}
        <circle id="halo" cx="0" cy="0" r="260" fill="url(#beamGlowGrad)" filter="url(#bloom)" opacity="0" />

        {/* THE BEAM / PILLAR — scenes 1-4 */}
        <g id="beam" style={{ transformOrigin: '0px 0px', transformBox: 'fill-box' }}>
          <rect id="beam-glow" x="-70" y="-420" width="140" height="840" fill="url(#beamGlowGrad)" filter="url(#bloom)" opacity="0.9" />
          <rect id="beam-core" x="-6" y="-400" width="12" height="800" fill="url(#beamCoreGrad)" />
          <circle id="beam-cap-top" cx="0" cy="-400" r="12" fill="#fdfdf9" filter="url(#bloomSmall)" />
          <circle id="beam-cap-bot" cx="0" cy="400" r="12" fill="#fdfdf9" filter="url(#bloomSmall)" />
        </g>

        {/* Secondary split beam — emerges in scene 2 */}
        <g id="beam-split" opacity="0" style={{ transformOrigin: '0px 0px' }}>
          <rect x="-3" y="-400" width="6" height="800" fill="#20e7b7" opacity="0.6" filter="url(#bloomSmall)" />
        </g>

        {/* THE CALL ORB — travels in scene 2 */}
        <g id="call-orb" opacity="0">
          <circle cx="0" cy="0" r="40" fill="#20e7b7" filter="url(#bloom)" opacity="0.5" />
          <circle cx="0" cy="0" r="16" fill="#fdfdf9" filter="url(#bloomSmall)" />
        </g>

        {/* PARTICLES — scene 3 burst */}
        <g id="particles">
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            const seed = (i * 97) % 360;
            const r = 2 + ((i * 13) % 5);
            return (
              <circle
                key={i}
                className="particle"
                data-angle={seed}
                cx="0"
                cy="0"
                r={r}
                fill="#20e7b7"
                opacity="0"
                filter="url(#bloomSmall)"
              />
            );
          })}
        </g>

        {/* NETWORK — scene 4 */}
        <g id="network" opacity="0">
          <line className="network-line" x1="0" y1="0" x2="-520" y2="-260" stroke="#20e7b7" strokeWidth="2" />
          <line className="network-line" x1="0" y1="0" x2="520" y2="-260" stroke="#20e7b7" strokeWidth="2" />
          <line className="network-line" x1="0" y1="0" x2="-520" y2="260" stroke="#20e7b7" strokeWidth="2" />
          <line className="network-line" x1="0" y1="0" x2="520" y2="260" stroke="#20e7b7" strokeWidth="2" />

          <g className="network-node" transform="translate(-520 -260)">
            <circle r="28" fill="#20e7b7" opacity="0.18" filter="url(#bloom)" />
            <circle r="10" fill="#20e7b7" />
          </g>
          <g className="network-node" transform="translate(520 -260)">
            <circle r="28" fill="#20e7b7" opacity="0.18" filter="url(#bloom)" />
            <circle r="10" fill="#20e7b7" />
          </g>
          <g className="network-node" transform="translate(-520 260)">
            <circle r="28" fill="#20e7b7" opacity="0.18" filter="url(#bloom)" />
            <circle r="10" fill="#20e7b7" />
          </g>
          <g className="network-node" transform="translate(520 260)">
            <circle r="28" fill="#20e7b7" opacity="0.18" filter="url(#bloom)" />
            <circle r="10" fill="#20e7b7" />
          </g>

          <circle className="network-center" cx="0" cy="0" r="14" fill="#fdfdf9" filter="url(#bloomSmall)" />
        </g>

        {/* DASHBOARD RING — scene 5 (decorative, card is HTML) */}
        <g id="dash-ring" opacity="0">
          <circle cx="0" cy="0" r="300" fill="none" stroke="#20e7b7" strokeWidth="1" strokeDasharray="4 8" opacity="0.5" />
          <circle cx="0" cy="0" r="380" fill="none" stroke="#20e7b7" strokeWidth="1" strokeDasharray="2 10" opacity="0.3" />
        </g>

        {/* CONVERGENCE CORE — scene 7 */}
        <g id="core" opacity="0">
          <circle cx="0" cy="0" r="80" fill="url(#beamGlowGrad)" filter="url(#bloom)" />
          <circle cx="0" cy="0" r="24" fill="#fdfdf9" filter="url(#bloomSmall)" />
        </g>
      </svg>

      {/* Dashboard card — HTML so contents stay accessible */}
      <div
        id="dashboard-card"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 w-[min(90vw,520px)] rounded-2xl border border-border-subtle bg-bg-secondary/80 backdrop-blur-md shadow-[0_20px_80px_rgba(32,231,183,0.15)] p-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-text-tertiary uppercase tracking-widest">Live Call</span>
          </div>
          <span className="text-xs font-mono text-text-tertiary">00:32</span>
        </div>
        <div className="space-y-3">
          <div className="chat-bubble flex items-start gap-3 opacity-0">
            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-[10px] font-bold text-accent shrink-0">G</div>
            <div className="flex-1 text-sm text-text-primary bg-bg-tertiary/60 rounded-xl px-3 py-2">
              Hi, you&apos;ve reached Baker Electrical. How can I help?
            </div>
          </div>
          <div className="chat-bubble flex items-start gap-3 flex-row-reverse opacity-0">
            <div className="w-7 h-7 rounded-full bg-bg-tertiary border border-border-subtle flex items-center justify-center text-[10px] font-bold text-text-secondary shrink-0">C</div>
            <div className="flex-1 text-sm text-text-primary bg-accent/10 border border-accent/30 rounded-xl px-3 py-2">
              I need someone to look at my switchboard tomorrow.
            </div>
          </div>
          <div className="chat-bubble flex items-start gap-3 opacity-0">
            <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-[10px] font-bold text-accent shrink-0">G</div>
            <div className="flex-1 text-sm text-text-primary bg-bg-tertiary/60 rounded-xl px-3 py-2">
              I have 9:30 or 2pm tomorrow. Which works best?
            </div>
          </div>
          <div className="chat-bubble flex items-center gap-2 text-xs text-accent font-mono opacity-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Booking confirmed → calendar synced → SMS sent
          </div>
        </div>
      </div>
    </div>
  );
}
