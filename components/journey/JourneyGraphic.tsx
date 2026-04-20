'use client';

const PARTICLE_COUNT = 180;     // desktop — scatter particles for scenes 3/7 bursts
const INNER_DOT_COUNT = 90;     // desktop — dots inside portal
const STAR_COUNT = 70;          // desktop — background starfield

// Mobile caps — anything at an index >= cap gets data-m="0" and CSS hides it
const MOBILE_PARTICLE_CAP = 60;
const MOBILE_INNER_DOT_CAP = 36;
const MOBILE_STAR_CAP = 28;

// Deterministic pseudo-random so SSR and client render identically
function seededRand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function JourneyGraphic() {
  // Pre-compute starfield positions deterministically
  const stars = Array.from({ length: STAR_COUNT }, (_, i) => {
    const x = -960 + seededRand(i * 7.3) * 1920;
    const y = -540 + seededRand(i * 11.7 + 3) * 1080;
    const r = 0.6 + seededRand(i * 2.1 + 5) * 1.8;
    const o = 0.15 + seededRand(i * 4.7 + 9) * 0.7;
    const warm = seededRand(i * 13.1 + 21) > 0.7;
    return { x, y, r, o, warm };
  });

  // Pre-compute portal interior dots (inside the tilted rect shape)
  const innerDots = Array.from({ length: INNER_DOT_COUNT }, (_, i) => {
    // keep within -120..120 x, -360..360 y (pre-rotation local space)
    const x = -115 + seededRand(i * 6.7 + 1.3) * 230;
    const y = -355 + seededRand(i * 9.3 + 4.1) * 710;
    const r = 1 + seededRand(i * 3.1 + 2.7) * 2;
    const o = 0.35 + seededRand(i * 5.1 + 6.9) * 0.55;
    return { x, y, r, o };
  });

  return (
    <div className="journey-graphic absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        id="journey-svg"
        viewBox="-960 -540 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-hidden="true"
      >
        <defs>
          {/* ─── Gradients ─── */}
          <radialGradient id="beamGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2affd1" stopOpacity="1" />
            <stop offset="25%" stopColor="#20e7b7" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#20e7b7" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#0b8e72" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#20e7b7" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="portalFillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#021814" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#06281f" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#021814" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="portalStrokeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2affd1" stopOpacity="1" />
            <stop offset="50%" stopColor="#20e7b7" stopOpacity="1" />
            <stop offset="100%" stopColor="#0b8e72" stopOpacity="1" />
          </linearGradient>

          <radialGradient id="orbGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fdfdf9" stopOpacity="1" />
            <stop offset="40%" stopColor="#2affd1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#20e7b7" stopOpacity="0" />
          </radialGradient>

          {/* Atmospheric sky — deep teal→black top, green haze bottom */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#010807" stopOpacity="1" />
            <stop offset="55%" stopColor="#031412" stopOpacity="1" />
            <stop offset="85%" stopColor="#052822" stopOpacity="1" />
            <stop offset="100%" stopColor="#084235" stopOpacity="1" />
          </linearGradient>

          {/* Horizon ground glow */}
          <radialGradient id="horizonGlow" cx="50%" cy="100%" r="80%">
            <stop offset="0%" stopColor="#20e7b7" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#0b8e72" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#020a08" stopOpacity="0" />
          </radialGradient>

          {/* ─── Filters ─── */}
          <filter id="bloom" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur id="bloom-blur" stdDeviation="10" />
          </filter>
          <filter id="bloomSmall" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur id="bloomSmall-blur" stdDeviation="4" />
          </filter>
          <filter id="bloomMega" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur id="bloomMega-blur" stdDeviation="36" />
          </filter>
          <filter id="bloomPortal" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur id="bloom-portal-blur" stdDeviation="6" />
          </filter>

          {/* Chromatic aberration */}
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

          {/* Motion paths */}
          <path id="orb-path" d="M 720,-420 C 520,-380 260,-260 80,-120 C 30,-60 10,-20 0,0" fill="none" />

          {/* Morph target — portal collapses to a node */}
          <path id="portal-state-node" d="M -14,-14 L 14,-14 L 14,14 L -14,14 Z" />

          {/* Portal corner detail template (ID for reuse) */}
          <symbol id="portal-corner" viewBox="0 0 40 40">
            <path d="M 2,14 L 2,2 L 14,2" fill="none" stroke="#fdfdf9" strokeWidth="2" strokeLinecap="round" />
            <path d="M 26,2 L 38,2 L 38,14" fill="none" stroke="#fdfdf9" strokeWidth="2" strokeLinecap="round" />
          </symbol>
        </defs>

        {/* ─── SKY / AMBIENT BACKGROUND ─── */}
        <rect x="-960" y="-540" width="1920" height="1080" fill="url(#skyGrad)" />

        {/* Horizon atmospheric glow band */}
        <ellipse id="horizon-glow" cx="0" cy="540" rx="1600" ry="520" fill="url(#horizonGlow)" opacity="0.7" />

        {/* ─── STARFIELD — deterministic stars with parallax ─── */}
        <g id="starfield">
          {stars.map((s, i) => (
            <circle
              key={i}
              className="star"
              data-depth={i % 3}
              data-m={i < MOBILE_STAR_CAP ? '1' : '0'}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill={s.warm ? '#ffffff' : '#2affd1'}
              opacity={s.o}
              filter={s.r > 1.8 ? 'url(#bloomSmall)' : undefined}
            />
          ))}
        </g>

        {/* Legacy far-dots kept for backward GSAP selectors — tiny decorative twinklers */}
        <g id="far-dots">
          <circle className="far-dot" cx="-760" cy="-380" r="1.5" fill="#fdfdf9" opacity="0.35" />
          <circle className="far-dot" cx="-320" cy="-460" r="2" fill="#fdfdf9" opacity="0.25" />
          <circle className="far-dot" cx="540" cy="-380" r="1" fill="#fdfdf9" opacity="0.3" />
          <circle className="far-dot" cx="820" cy="180" r="1.5" fill="#fdfdf9" opacity="0.35" />
          <circle className="far-dot" cx="-440" cy="420" r="2" fill="#fdfdf9" opacity="0.3" />
          <circle className="far-dot" cx="240" cy="460" r="1.5" fill="#20e7b7" opacity="0.4" />
        </g>

        {/* ─── WAVY TERRAIN / HORIZON LINES ─── */}
        <g id="terrain" opacity="0.85">
          {/* Far mountain silhouette */}
          <path
            className="terrain-far"
            d="M -960,380 L -820,340 L -680,360 L -540,320 L -400,355 L -260,310 L -120,345 L 20,305 L 160,340 L 300,300 L 440,335 L 580,295 L 720,330 L 860,290 L 960,320 L 960,540 L -960,540 Z"
            fill="#031c17"
            opacity="0.8"
          />
          {/* Mid horizon wave */}
          <path
            className="terrain-mid"
            d="M -960,430 Q -840,400 -720,420 T -480,415 T -240,425 T 0,410 T 240,430 T 480,415 T 720,425 T 960,420 L 960,540 L -960,540 Z"
            fill="#052822"
            opacity="0.9"
          />
          {/* Horizontal grass motion streaks */}
          <g id="grass-streaks">
            <line className="grass-line" x1="-880" y1="450" x2="-600" y2="450" stroke="#20e7b7" strokeWidth="0.8" opacity="0.25" />
            <line className="grass-line" x1="-520" y1="465" x2="-280" y2="465" stroke="#2affd1" strokeWidth="0.6" opacity="0.3" />
            <line className="grass-line" x1="-200" y1="455" x2="100" y2="455" stroke="#20e7b7" strokeWidth="0.7" opacity="0.22" />
            <line className="grass-line" x1="160" y1="470" x2="440" y2="470" stroke="#2affd1" strokeWidth="0.5" opacity="0.3" />
            <line className="grass-line" x1="500" y1="460" x2="820" y2="460" stroke="#20e7b7" strokeWidth="0.8" opacity="0.25" />
            <line className="grass-line" x1="-700" y1="485" x2="-420" y2="485" stroke="#fdfdf9" strokeWidth="0.4" opacity="0.2" />
            <line className="grass-line" x1="-80" y1="490" x2="260" y2="490" stroke="#2affd1" strokeWidth="0.5" opacity="0.28" />
            <line className="grass-line" x1="320" y1="500" x2="620" y2="500" stroke="#20e7b7" strokeWidth="0.6" opacity="0.24" />
            <line className="grass-line" x1="-560" y1="510" x2="-260" y2="510" stroke="#fdfdf9" strokeWidth="0.3" opacity="0.18" />
            <line className="grass-line" x1="60" y1="515" x2="380" y2="515" stroke="#2affd1" strokeWidth="0.5" opacity="0.26" />
          </g>
        </g>

        {/* Background halo — scene 3 flash + scene 7 base */}
        <g id="halo-root" opacity="0">
          <circle cx="0" cy="0" r="320" fill="url(#beamGlowGrad)" filter="url(#bloomMega)" />
        </g>

        {/* ═══════════════════════════════════════
            THE PORTAL — tilted neon frame + dense particle interior
            All legacy selectors (#beam, #beam-core, #beam-glow, #beam-cap-*,
            #beam-filter-wrap, #beam-highlight) retained for timeline compat.
           ═══════════════════════════════════════ */}
        <g id="beam-filter-wrap" filter="url(#aberration)">
          <g id="beam" style={{ transformOrigin: '0px 0px' }}>
            {/* Portal outer glow aura */}
            <g id="beam-glow" style={{ transformOrigin: '0px 0px' }}>
              <rect
                x="-160"
                y="-430"
                width="320"
                height="860"
                rx="14"
                fill="url(#beamGlowGrad)"
                opacity="0.55"
                filter="url(#bloomMega)"
                transform="rotate(-12)"
              />
            </g>

            {/* Portal container — rotate -12° for the leaning look */}
            <g id="portal" transform="rotate(-12)">
              {/* Dark inner fill (sky visible through portal) */}
              <rect
                id="portal-fill"
                x="-125"
                y="-380"
                width="250"
                height="760"
                rx="10"
                fill="url(#portalFillGrad)"
              />

              {/* Inner particle cloud — dense packed dots inside portal */}
              <g id="portal-interior" clipPath="inset(0)">
                {innerDots.map((d, i) => (
                  <circle
                    key={i}
                    className="portal-dot"
                    data-m={i < MOBILE_INNER_DOT_CAP ? '1' : '0'}
                    cx={d.x}
                    cy={d.y}
                    r={d.r}
                    fill={i % 4 === 0 ? '#fdfdf9' : '#2affd1'}
                    opacity={d.o}
                    filter={d.r > 2 ? 'url(#bloomSmall)' : undefined}
                  />
                ))}
              </g>

              {/* Outer neon frame — thick stroke */}
              <rect
                id="portal-frame-outer"
                x="-125"
                y="-380"
                width="250"
                height="760"
                rx="10"
                fill="none"
                stroke="url(#portalStrokeGrad)"
                strokeWidth="4"
                filter="url(#bloomPortal)"
              />
              {/* Inner neon frame — thin stroke inset */}
              <rect
                id="portal-frame-inner"
                x="-112"
                y="-366"
                width="224"
                height="732"
                rx="6"
                fill="none"
                stroke="#fdfdf9"
                strokeOpacity="0.85"
                strokeWidth="1.2"
              />

              {/* Corner brackets for sci-fi detail */}
              <g id="portal-corners" opacity="0.9">
                <use href="#portal-corner" x="-125" y="-380" width="40" height="40" />
                <use href="#portal-corner" x="85" y="-380" width="40" height="40" transform="scale(-1 1) translate(-210 0)" />
                <use href="#portal-corner" x="-125" y="340" width="40" height="40" transform="scale(1 -1) translate(0 -720)" />
                <use href="#portal-corner" x="85" y="340" width="40" height="40" transform="scale(-1 -1) translate(-210 -720)" />
              </g>

              {/* Hidden rect kept for MorphSVG compatibility */}
              <path
                id="beam-core"
                d="M -125,-380 L 125,-380 L 125,380 L -125,380 Z"
                fill="none"
                opacity="0"
              />
              <circle id="beam-cap-top" cx="0" cy="-380" r="6" fill="#fdfdf9" opacity="0" />
              <circle id="beam-cap-bot" cx="0" cy="380" r="6" fill="#fdfdf9" opacity="0" />
              <rect id="beam-highlight" x="-1" y="-360" width="2" height="720" fill="#fdfdf9" opacity="0" />
            </g>
          </g>
        </g>

        {/* Scene 2: secondary split beam (narrow, emerges beside portal) */}
        <g id="beam-split" opacity="0">
          <rect x="-3" y="-360" width="6" height="720" fill="#2affd1" opacity="0.7" filter="url(#bloomSmall)" rx="3" />
        </g>

        {/* Shockwave rings */}
        <circle id="shockwave-1" cx="0" cy="0" r="20" fill="none" stroke="#fdfdf9" strokeWidth="2" opacity="0" />
        <circle id="shockwave-2" cx="0" cy="0" r="20" fill="none" stroke="#20e7b7" strokeWidth="1.5" opacity="0" />

        {/* Call orb */}
        <g id="call-orb" opacity="0">
          <circle cx="0" cy="0" r="52" fill="url(#orbGrad)" filter="url(#bloom)" />
          <circle cx="0" cy="0" r="18" fill="#fdfdf9" filter="url(#bloomSmall)" />
          <circle cx="0" cy="0" r="6" fill="#fdfdf9" />
          <circle className="orb-trail" cx="0" cy="0" r="4" fill="#20e7b7" opacity="0" />
          <circle className="orb-trail" cx="0" cy="0" r="3" fill="#20e7b7" opacity="0" />
          <circle className="orb-trail" cx="0" cy="0" r="2" fill="#20e7b7" opacity="0" />
        </g>

        {/* Scatter particles — burst in scene 3 and 7 */}
        <g id="particles">
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            const r = 1.5 + ((i * 13) % 6);
            return (
              <circle
                key={i}
                className="particle"
                data-m={i < MOBILE_PARTICLE_CAP ? '1' : '0'}
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

        {/* NETWORK */}
        <g id="network" opacity="0">
          <path className="network-line" d="M 0,0 Q -260,-180 -520,-260" stroke="#20e7b7" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path className="network-line" d="M 0,0 Q 260,-180 520,-260" stroke="#20e7b7" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path className="network-line" d="M 0,0 Q -260,180 -520,260" stroke="#20e7b7" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path className="network-line" d="M 0,0 Q 260,180 520,260" stroke="#20e7b7" strokeWidth="2" fill="none" strokeLinecap="round" />

          {[[-520, -260], [520, -260], [-520, 260], [520, 260]].map(([x, y], i) => (
            <g key={i} className="network-node" transform={`translate(${x} ${y})`}>
              <circle r="42" fill="#20e7b7" opacity="0.12" filter="url(#bloomMega)" />
              <circle r="28" fill="#20e7b7" opacity="0.22" filter="url(#bloom)" />
              <circle r="10" fill="#fdfdf9" filter="url(#bloomSmall)" />
              <circle r="4" fill="#20e7b7" />
            </g>
          ))}

          <circle className="network-center" cx="0" cy="0" r="18" fill="#fdfdf9" filter="url(#bloomSmall)" />
          <circle className="network-center" cx="0" cy="0" r="6" fill="#20e7b7" />
        </g>

        <g id="network-echo" opacity="0" filter="url(#bloomSmall)">
          <circle cx="-380" cy="-190" r="4" fill="#20e7b7" opacity="0.4" />
          <circle cx="380" cy="-190" r="4" fill="#20e7b7" opacity="0.4" />
          <circle cx="-380" cy="190" r="4" fill="#20e7b7" opacity="0.4" />
          <circle cx="380" cy="190" r="4" fill="#20e7b7" opacity="0.4" />
          <circle cx="-200" cy="-100" r="3" fill="#20e7b7" opacity="0.3" />
          <circle cx="200" cy="-100" r="3" fill="#20e7b7" opacity="0.3" />
          <circle cx="-200" cy="100" r="3" fill="#20e7b7" opacity="0.3" />
          <circle cx="200" cy="100" r="3" fill="#20e7b7" opacity="0.3" />
        </g>

        <g id="dash-ring" opacity="0">
          <circle cx="0" cy="0" r="260" fill="none" stroke="#20e7b7" strokeWidth="1" strokeDasharray="4 8" opacity="0.6" />
          <circle cx="0" cy="0" r="340" fill="none" stroke="#20e7b7" strokeWidth="1" strokeDasharray="2 10" opacity="0.4" />
          <circle cx="0" cy="0" r="420" fill="none" stroke="#20e7b7" strokeWidth="1" strokeDasharray="1 14" opacity="0.25" />
        </g>

        <g id="core-filter-wrap" filter="url(#aberration)">
          <g id="core" opacity="0">
            <circle cx="0" cy="0" r="130" fill="url(#beamGlowGrad)" filter="url(#bloomMega)" />
            <circle cx="0" cy="0" r="60" fill="url(#orbGrad)" filter="url(#bloom)" />
            <circle cx="0" cy="0" r="22" fill="#fdfdf9" filter="url(#bloomSmall)" />
            <circle cx="0" cy="0" r="8" fill="#fdfdf9" />
          </g>
        </g>
      </svg>

      {/* HTML Dashboard card */}
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
