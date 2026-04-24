# Gizmoo.me Pre-Refactor Audit

**Date:** 2026-04-25
**Target:** `C:/Users/roidr/gizmoo-site` (Next.js 16, React 19, Tailwind 3)
**Goal:** Strip heavy graphics/animations, add lightweight background video ambience, fix mobile parity + code quality. Content stays byte-identical.

---

## 1. Motion & Graphics Footprint (Current)

**170 motion-related occurrences across 26 files.** Dependencies present:

| Dep | Purpose | Kill? |
|-----|---------|-------|
| `framer-motion` | 140+ usages (reveals, modals) | Keep, reduce scope |
| `gsap` + `@gsap/react` | Pinned timelines (CinematicJourney, RevenueLeak, FourAgents) | **Strip all ScrollTrigger pins** |
| `lenis` | Smooth scroll wrapper | **Remove** |
| `<canvas>` | ScrollBackground, ParticleField, JourneyGraphic | **Remove** |

---

## 2. Kill List — Components (High Blast Radius)

| File | LOC | Decision | Reason |
|------|-----|----------|--------|
| `components/journey/CinematicJourney.tsx` | 1008 | **REPLACE** with `VideoHero` | 7-scene pinned scroll-jack; keyboard-hostile; bundles GSAP ScrollTrigger |
| `components/journey/JourneyGraphic.tsx` | 429 | **REMOVE** | Canvas rAF; obsoleted by video |
| `components/journey/JourneyCopy.tsx` | 150 | **REMOVE** | Inline in VideoHero instead |
| `components/journey/GlobalFilm.tsx` | 96 | **REMOVE** | Film-grain canvas; replaced by video luma |
| `components/SmoothScroll.tsx` | — | **REMOVE** | Lenis breaks native scroll + reduced-motion |
| `components/CustomCursor.tsx` | 45 | **REMOVE** | MutationObserver O(n); no keyboard value |
| `components/ScrollBackground.tsx` | 125 | **REMOVE** | Continuous rAF blur layer |
| `components/ParticleField.tsx` | 112 | **REMOVE** | Canvas particles |
| `components/AuroraPillar.tsx` | 51 | **REMOVE** | Decorative, replaced by video |
| `components/LoadingScreen.tsx` | 110 | **REMOVE** | 2.5s intro blocks paint; fails WCAG 2.3.3 |
| `components/ScrollProgress.tsx` | — | **Simplify** | Keep tiny bar, add reduced-motion gate |
| `components/landing/Hero.tsx` | 117 | **REMOVE** | Orphaned, duplicate-H1 risk |

---

## 3. Kill List — Sections (Reduce Motion)

| Section | Change |
|---------|--------|
| `RevenueLeak` | Remove GSAP pin (2400px scroll-jack). Keep counter with CSS transition on IntersectionObserver. |
| `FourAgents` | Keep native mobile scroll-snap. Remove GSAP horizontal pan on desktop → replace with scroll-snap horizontal too. |
| `VelocityBand` + other marquees | Add pause button. Gate CSS `animation: marquee` behind `prefers-reduced-motion`. |
| `Demo` | Add pause control for auto-advancing chat. |
| `Testimonials` marquee | Add pause button + reduced-motion gate. |

---

## 4. Asset Weight

```
1.2M   public/logo.png           <-- downsize to 48KB WebP + 16KB AVIF
272K   public/icon-512.png       <-- ok (PWA icon)
36K    public/apple-touch-icon.png
```

**Video assets:** currently zero. Net new budget:
- Hero ambient loop: ≤ 1.5MB (5s 1080p AV1 + 720p WebM fallback + MP4)
- 2 secondary section loops: ≤ 800KB each
- Posters: AVIF <80KB per frame

---

## 5. New Components to Build

| Component | Purpose |
|-----------|---------|
| `BackgroundVideo` | Ambient video with full a11y guards (reduced-motion, Save-Data, slow-net, poster, scrim) |
| `VideoHero` | Replace CinematicJourney — hero copy + CTA + background video |
| `SectionAccent` | Subtle gradient divider replacing GlowDivider where needed |
| `PauseableMarquee` | Marquee with keyboard-reachable pause button |

---

## 6. Accessibility Blockers (from A11Y-BASELINE.md)

1. Lenis missing reduced-motion gate → **fixed by removal**
2. LoadingScreen infinite bounce → **fixed by removal**
3. CinematicJourney scroll-jack → **fixed by replacement**
4. RevenueLeak scroll-jack → **fixed by unpin**
5. Marquees missing pause/reduced-motion → **fixed by PauseableMarquee**
6. Demo auto-advance no pause → **add pause control**
7. ContactOverlay no focus trap / role / Escape → **rework**
8. No `:focus-visible` site-wide → **add global ring in globals.css**
9. Duplicate H1 risk → **kill Hero.tsx**
10. Every new `<video>` must follow §5 rules from A11Y-BASELINE.md

---

## 7. Mobile Parity Fixes

- Replace `100vh` with `100dvh` in hero/full-bleed sections.
- Fluid typography using `clamp()`.
- Drop horizontal scroll-snap overflow in Demo tabs.
- Confirm 44×44 hit areas (global rule exists; audit actual targets).

---

## 8. Code Quality Targets

- Delete `Hero.tsx`, `CinematicJourney.tsx`, `JourneyCopy.tsx`, `JourneyGraphic.tsx`, `GlobalFilm.tsx`, `SmoothScroll.tsx`, `CustomCursor.tsx`, `ScrollBackground.tsx`, `ParticleField.tsx`, `AuroraPillar.tsx`, `LoadingScreen.tsx`.
- Remove deps: `lenis`, `gsap`, `@gsap/react` (after refactor confirms no imports).
- Bundle expected reduction: **~150KB+ gzip** (GSAP ScrollTrigger ~40KB, Lenis ~12KB, Spline (in gizmoo-ai) is already not in this dir).
- Target Lighthouse Mobile Perf ≥ 90 (was likely <50 given 2.5s forced intro + Lenis + canvas rAFs).

---

## 9. Deployment Target

**DigitalOcean App Platform** (Next.js preset):
- Build: `npm run build`
- Run: `npm run start`
- Port: 3000
- Static asset caching: Cache-Control for `/videos/*` and `/*.avif` at 1y, immutable.
- Include `.do/app.yaml` spec file for reproducible deploys.

---

## 10. Commit Bisection Plan

1. `chore(audit): add A11Y-BASELINE + AUDIT docs`
2. `feat(a11y): global :focus-visible + reduced-motion CSS gates`
3. `refactor: remove heavy ambient layers (Lenis, CustomCursor, Canvas bgs, LoadingScreen)`
4. `feat: BackgroundVideo primitive with full a11y guards`
5. `feat: VideoHero replaces CinematicJourney`
6. `refactor(sections): unpin RevenueLeak + FourAgents`
7. `feat(a11y): PauseableMarquee + Demo pause control`
8. `refactor(a11y): ContactOverlay proper dialog semantics`
9. `chore: remove dead deps (gsap, lenis) + prune orphans`
10. `perf(mobile): 100dvh, clamp() type, touch-target audit`
11. `docs: REPORT.md before/after`
12. `chore(deploy): DigitalOcean app spec`
