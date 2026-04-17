'use client';

const PARTICLE_COUNT = 120;

export function JourneyGraphic() {
  return (
    <div className="journey-graphic absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        id="journey-svg"
        viewBox="-960 -540 1920 1080"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          {/* Rich multi-stop gradients */}
          <radialGradient id="beamGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#20e7b7" stopOpacity="1" />
            <stop offset="25%" stopColor="#2affd1" stopOpacity="0.8" />
            <stop offset="55%" stopColor="#20e7b7" stopOpacity="0.35" />
            <stop offset="80%" stopColor="#0b8e72" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#20e7b7" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="beamCoreGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#20e7b7" stopOpacity="0" />
            <stop offset="35%" stopColor="#fdfdf9" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#fdfdf9" stopOpacity="1" />
            <stop offset="65%" stopColor="#fdfdf9" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#20e7b7" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fdfdf9" stopOpacity="1" />
            <stop offset="40%" stopColor="#2affd1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#20e7b7" stopOpacity="0" />
          </radialGradient>

          {/* Breathing bloom — stdDeviation tweened by GSAP */}
          <filter id="bloom" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur id="bloom-blur" stdDeviation="14" />
          </filter>
          <filter id="bloomSmall" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur id="bloomSmall-blur" stdDeviation="6" />
          </filter>
          <filter id="bloomMega" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur id="bloomMega-blur" stdDeviation="40" />
          </filter>

          {/* Chromatic aberration — dx tweened by GSAP on scroll velocity */}
          <filter id="aberration" x="-20%" y="-20%" width="140%" height="140%">
            <feColorMatrix in="SourceGraphic" type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
            <feOffset id="ab-red" in="red" dx="0" dy="0" result="redShift" />
            <feColorMatrix in="SourceGraphic" type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
            <feColorMatrix in="SourceGraphic" type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
            <feOffset id="ab-blue" in="blue" dx="0" dy="0" result="blueShift" />
            <feBlend in="redShift" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blueShift" mode="screen" />
          </filter>

          {/* Hidden motion paths — consumed by GSAP MotionPathPlugin */}
          <path id="orb-path" d="M 720,-420 C 520,-380 260,-260 80,-120 C 30,-60 10,-20 0,0" fill="none" />
          <path id="orb-path-alt" d="M -720,420 C -520,380 -260,260 -80,120 C -30,60 -10,20 0,0" fill="none" />

          {/* Hidden morph target paths for beam → portal → node progression */}
          <path id="beam-state-1" d="M -6,-400 L 6,-400 L 6,400 L -6,400 Z" />
          <path id="beam-state-2" d="M -260,-200 C -160,-280 160,-280 260,-200 C 320,-120 320,120 260,200 C 160,280 -160,280 -260,200 C -320,120 -320,-120 -260,-200 Z" />
          <path id="beam-state-3" d="M -14,-14 L 14,-14 L 14,14 L -14,14 Z" />

          {/* Organic halo blob for scene 3 */}
          <path id="halo-blob" d="M 0,-320 C 220,-320 320,-220 320,0 C 320,220 220,320 0,320 C -220,320 -320,220 -320,0 C -320,-220 -220,-320 0,-320 Z" />
        </defs>

        {/* Deep ambient wash — always on */}
        <ellipse cx="0" cy="0" rx="900" ry="540" fill="url(#beamGlowGrad)" opacity="0.04" />

        {/* Background halo — breathes during scenes 3 & 7 */}
        <g id="halo-root" opacity="0">
          <use href="#halo-blob" fill="url(#beamGlowGrad)" filter="url(#bloomMega)" />
        </g>

        {/* ─── THE BEAM / PORTAL (morphs across scenes) ─── */}
        <g id="beam-filter-wrap" filter="url(#aberration)">
          <g id="beam" style={{ transformOrigin: '0px 0px' }}>
            <rect id="beam-glow" x="-72" y="-430" width="144" height="860" fill="url(#beamGlowGrad)" filter="url(#bloom)" opacity="0.95" rx="72" />
            <path id="beam-core" d="M -6,-400 L 6,-400 L 6,400 L -6,400 Z" fill="url(#beamCoreGrad)" />
            <circle id="beam-cap-top" cx="0" cy="-400" r="14" fill="#fdfdf9" filter="url(#bloomSmall)" />
            <circle id="beam-cap-bot" cx="0" cy="400" r="14" fill="#fdfdf9" filter="url(#bloomSmall)" />
            <rect id="beam-highlight" x="-2" y="-360" width="4" height="720" fill="#fdfdf9" opacity="0.6" />
          </g>
        </g>

        {/* Secondary split beam */}
        <g id="beam-split" opacity="0" style={{ transformOrigin: '0px 0px' }}>
          <rect x="-3" y="-360" width="6" height="720" fill="#2affd1" opacity="0.55" filter="url(#bloomSmall)" rx="3" />
        </g>

        {/* ─── CALL ORB ─── */}
        <g id="call-orb" opacity="0">
          <circle cx="0" cy="0" r="52" fill="url(#orbGrad)" filter="url(#bloom)" />
          <circle cx="0" cy="0" r="18" fill="#fdfdf9" filter="url(#bloomSmall)" />
          <circle cx="0" cy="0" r="6" fill="#fdfdf9" />
          {/* Trail dots (positioned along motion path via GSAP) */}
          <circle className="orb-trail" cx="0" cy="0" r="4" fill="#20e7b7" opacity="0" />
          <circle className="orb-trail" cx="0" cy="0" r="3" fill="#20e7b7" opacity="0" />
          <circle className="orb-trail" cx="0" cy="0" r="2" fill="#20e7b7" opacity="0" />
        </g>

        {/* ─── PARTICLES (Physics2D) ─── */}
        <g id="particles">
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            const r = 1.5 + ((i * 13) % 6);
            return (
              <circle
                key={i}
                className="particle"
                cx="0"
                cy="0"
                r={r}
                fill={i % 3 === 0 ? '#fdfdf9' : '#20e7b7'}
                opacity="0"
                filter={i % 5 === 0 ? 'url(#bloom)' : 'url(#bloomSmall)'}
              />
            );
          })}
        </g>

        {/* ─── NETWORK ─── */}
        <g id="network" opacity="0">
          {/* Curved connecting paths (not straight lines) — drawable by DrawSVGPlugin */}
          <path className="network-line" d="M 0,0 Q -260,-180 -520,-260" stroke="#20e7b7" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path className="network-line" d="M 0,0 Q 260,-180 520,-260" stroke="#20e7b7" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path className="network-line" d="M 0,0 Q -260,180 -520,260" stroke="#20e7b7" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path className="network-line" d="M 0,0 Q 260,180 520,260" stroke="#20e7b7" strokeWidth="2" fill="none" strokeLinecap="round" />

          <g className="network-node" transform="translate(-520 -260)">
            <circle r="42" fill="#20e7b7" opacity="0.12" filter="url(#bloomMega)" />
            <circle r="28" fill="#20e7b7" opacity="0.22" filter="url(#bloom)" />
            <circle r="10" fill="#fdfdf9" filter="url(#bloomSmall)" />
            <circle r="4" fill="#20e7b7" />
          </g>
          <g className="network-node" transform="translate(520 -260)">
            <circle r="42" fill="#20e7b7" opacity="0.12" filter="url(#bloomMega)" />
            <circle r="28" fill="#20e7b7" opacity="0.22" filter="url(#bloom)" />
            <circle r="10" fill="#fdfdf9" filter="url(#bloomSmall)" />
            <circle r="4" fill="#20e7b7" />
          </g>
          <g className="network-node" transform="translate(-520 260)">
            <circle r="42" fill="#20e7b7" opacity="0.12" filter="url(#bloomMega)" />
            <circle r="28" fill="#20e7b7" opacity="0.22" filter="url(#bloom)" />
            <circle r="10" fill="#fdfdf9" filter="url(#bloomSmall)" />
            <circle r="4" fill="#20e7b7" />
          </g>
          <g className="network-node" transform="translate(520 260)">
            <circle r="42" fill="#20e7b7" opacity="0.12" filter="url(#bloomMega)" />
            <circle r="28" fill="#20e7b7" opacity="0.22" filter="url(#bloom)" />
            <circle r="10" fill="#fdfdf9" filter="url(#bloomSmall)" />
            <circle r="4" fill="#20e7b7" />
          </g>

          <circle className="network-center" cx="0" cy="0" r="18" fill="#fdfdf9" filter="url(#bloomSmall)" />
          <circle className="network-center" cx="0" cy="0" r="6" fill="#20e7b7" />
        </g>

        {/* Concentric rings — breathe during scene 5 */}
        <g id="dash-ring" opacity="0">
          <circle cx="0" cy="0" r="260" fill="none" stroke="#20e7b7" strokeWidth="1" strokeDasharray="4 8" opacity="0.6" />
          <circle cx="0" cy="0" r="340" fill="none" stroke="#20e7b7" strokeWidth="1" strokeDasharray="2 10" opacity="0.4" />
          <circle cx="0" cy="0" r="420" fill="none" stroke="#20e7b7" strokeWidth="1" strokeDasharray="1 14" opacity="0.25" />
        </g>

        {/* Convergence core */}
        <g id="core" opacity="0">
          <circle cx="0" cy="0" r="130" fill="url(#beamGlowGrad)" filter="url(#bloomMega)" />
          <circle cx="0" cy="0" r="60" fill="url(#orbGrad)" filter="url(#bloom)" />
          <circle cx="0" cy="0" r="22" fill="#fdfdf9" filter="url(#bloomSmall)" />
          <circle cx="0" cy="0" r="8" fill="#fdfdf9" />
        </g>
      </svg>

      {/* HTML Dashboard card — stays accessible */}
      <div
        id="dashboard-card"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 w-[min(90vw,540px)] rounded-2xl border border-border-subtle bg-bg-secondary/85 backdrop-blur-xl shadow-[0_30px_100px_rgba(32,231,183,0.25),inset_0_1px_0_rgba(253,253,249,0.08)] p-6"
        style={{ perspective: '1200px' }}
      >
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-mono text-text-tertiary uppercase tracking-widest">Live Call</span>
          </div>
          <span className="text-xs font-mono text-text-tertiary tabular-nums">00:32</span>
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
