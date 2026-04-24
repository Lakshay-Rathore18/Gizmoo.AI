# Gizmoo.me Refactor Report — Smoothness, Mobile Parity, Code Quality

**Date:** 2026-04-25
**Branch:** `main` (working tree)
**Scope:** Strip heavy graphics + animations; add lightweight video ambience;
fix mobile parity; raise code quality. **All user-facing copy preserved
byte-for-byte.**

---

## 1. Deltas at a glance

| Metric | Before | After | Delta |
|---|---|---|---|
| Runtime deps | 21 | **18** | −3 (gsap, @gsap/react, lenis) |
| Motion LOC (rough) | ~3,200 | **~1,150** | **−64 %** |
| Canvas-driven components | 4 | **0** | −4 (ScrollBackground, ParticleField, JourneyGraphic, GlobalFilm) |
| Pinned ScrollTrigger timelines | 3 | **0** | −3 (CinematicJourney, RevenueLeak, FourAgents) |
| Smooth-scroll hijack (Lenis) | yes | **no** | removed |
| Custom cursor | yes | **no** | removed |
| Mobile intro / loading screen | 2.5 s block | **0 ms** | removed (WCAG 2.3.3) |
| `prefers-reduced-motion` enforced | partial | **global CSS guard + per-component** | hardened |
| Accordion ARIA (`aria-expanded`/`aria-controls`) | missing | **present** (HowItWorks, FAQ) | WCAG 4.1.2 |
| Marquee pause controls | none | **4** (VelocityBand, About, Testimonials ×2) | WCAG 2.2.2 |
| Demo autoplay pause control | no | **yes** | WCAG 2.2.2 |
| Modal focus trap + Escape | no | **yes** (ContactOverlay + mobile Nav) | WCAG 2.1.2 |
| Touch targets | mixed | **44 px minimum** (pointer:coarse CSS + per-control) | WCAG 2.5.8 |
| `next build` time | ~3.3 s | **3.2 s** | flat |
| `tsc --noEmit` | clean | **clean** | — |

---

## 2. Removed components

```
components/journey/CinematicJourney.tsx    (1008 LOC, GSAP ScrollTrigger + SplitText)
components/journey/JourneyGraphic.tsx      (429 LOC, <canvas> rAF)
components/journey/JourneyCopy.tsx         (150 LOC)
components/journey/GlobalFilm.tsx          (96 LOC, film-grain canvas)
components/SmoothScroll.tsx                (Lenis wrapper)
components/CustomCursor.tsx                (MutationObserver O(n))
components/ScrollBackground.tsx            (125 LOC, continuous blur layer)
components/ParticleField.tsx               (112 LOC, canvas particles)
components/AuroraPillar.tsx                (51 LOC, decorative)
components/LoadingScreen.tsx               (110 LOC, intro splash)
components/landing/Hero.tsx                (117 LOC, orphan duplicate <h1>)
lib/gsap.ts                                (barrel import of ScrollTrigger / SplitText / MorphSVG / DrawSVG / MotionPath / Physics2D / CustomEase / Flip / Observer / useGSAP)
```

**Deleted deps:** `gsap`, `@gsap/react`, `lenis`.

---

## 3. Rewritten components (motion swapped, content preserved)

| Component | Motion source before | Motion source after |
|---|---|---|
| `VideoHero` (replaces `CinematicJourney`) | 7-scene GSAP pin | Single `<section min-h-dvh>` + ambient `<BackgroundVideo>` |
| `About` | GSAP counter + ScrollTrigger | `IntersectionObserver` + `requestAnimationFrame` eased counter |
| `RevenueLeak` | GSAP pinned timeline (2400 px scroll-jack) | Unpinned; `IntersectionObserver` triggers rAF counters (`toLocaleString('en-AU')`) |
| `FourAgents` | GSAP horizontal pan | Responsive `<grid>` — single col on mobile, 2-col on desktop |
| `VelocityBand`, `Testimonials`, About industries bar | GSAP velocity-boost marquee | Pure-CSS `@keyframes marquee` with `--marquee-duration` var + `aria-pressed` pause button |
| `Demo` | `setTimeout` autoplay, no control | Same cadence + pause control (`aria-pressed`), cleared on unmount |
| `ContactOverlay` | Bare div | `role="dialog"` + `aria-modal` + `useId` label, focus-first + Tab trap + Escape + `body.overflow` lock + previous-focus restore |
| `Nav` mobile menu | No focus management | `role="dialog"` + `aria-modal`, focus-first-link, Escape closes, hamburger gains `aria-expanded`/`aria-controls`, 44 px touch target |
| `HowItWorks` / `FAQ` accordions | No ARIA | `aria-expanded` + `aria-controls` on button; `role="region"` + `aria-labelledby` on panel; 44 px min-h |
| `Pricing` toggle | `aria-label` only | `role="switch"` + `aria-checked` |
| `GlowDivider` | GSAP ScrollTrigger | `IntersectionObserver` + CSS `scaleX` transition |

---

## 4. New components

| File | Role |
|---|---|
| `components/BackgroundVideo.tsx` | Codec-cascade `<video>` (AV1 / WebM / MP4), poster-first, `aria-hidden`, `tabIndex={-1}`, `muted` `playsInline` `loop`, `preload="metadata"`, `disablePictureInPicture`, `disableRemotePlayback` |
| `components/NetworkGuard.tsx` | Gates video on `prefers-reduced-motion`, `navigator.connection.saveData`, and slow `effectiveType` |
| `components/landing/VideoHero.tsx` | Minimal hero section; video ambience + static copy |
| `components/primitives/VelocityMarquee.tsx` | Pure-CSS infinite marquee with keyboard-reachable pause |

---

## 5. Global CSS hardening (`app/globals.css`)

- `.min-h-dvh` / `.h-dvh` utilities for mobile viewport safety.
- `.fluid-display` / `.fluid-h2` / `.fluid-body` — `clamp()` fluid type.
- **Marquee keyframes + `.animate-marquee` base class** with
  `var(--marquee-duration)`; pauses on hover.
- **Hardened `prefers-reduced-motion` block:** collapses all animations +
  transitions to 0.01 ms, pauses marquees, hides `.bg-video-wrap video` and
  shows poster.
- **`[data-save-data="true"]` guard** hides background videos on metered
  connections.
- **`@media (pointer: coarse)`** — 44 × 44 px minimum on all `a`, `button`,
  `[role="button"]`.
- **`@media (max-width: 767px)`** — `content-visibility: auto` on below-fold
  long sections (`#how-it-works`, `#testimonials`, `#pricing`, `#faq`) so
  they skip paint until near viewport.
- **`:focus-visible`** — site-wide ring with 2 px accent outline + 4 px soft
  shadow (WCAG 2.4.7).

---

## 6. Smoothness check (desktop + mobile)

**Desktop (Chrome, 1440 × 900):**
- No GSAP ScrollTrigger registration; no Lenis RAF.
- Scroll is native + passive. `requestAnimationFrame` is used for one nav
  hide/show and for per-section counters (only while visible).
- Marquees animate via CSS transform only → GPU-composited, no layout.

**Mobile (iPhone SE simulation, 375 × 667, 4× CPU throttle):**
- Hero renders poster instantly; video fades in after first frame or is
  suppressed on save-data / reduce-motion.
- Below-fold sections skip paint via `content-visibility: auto`.
- Marquees gated behind reduced-motion media query.
- Modal background scroll locked via `body.overflow = 'hidden'` while open.

**`next build` output:** `Compiled successfully in 3.2s` + TypeScript 2.8 s +
7 static pages in 521 ms. No type errors. No runtime warnings beyond the
pre-existing Cache-Control notice.

---

## 7. Mobile parity checklist

- [x] Every interactive target ≥ 44 × 44 px (global coarse-pointer rule + per-control `min-h-[44px]`).
- [x] `min-h-dvh` on hero + mobile menu (no iOS URL-bar collapse jump).
- [x] Fluid typography (`clamp()`) on hero, section headings, body.
- [x] Single-column stacks on all grids below `md`.
- [x] Hamburger button has `aria-expanded` + `aria-controls`; menu has `role="dialog"` + Escape + focus return.
- [x] Pause control reachable via `Tab` on all marquees, Demo autoplay, and any moving element running > 5 s (WCAG 2.2.2).
- [x] Accordion buttons expose `aria-expanded` / `aria-controls` (HowItWorks + FAQ).
- [x] Pricing toggle is a proper `role="switch"` with `aria-checked`.
- [x] Background videos never focusable; posters shown when video is suppressed.
- [x] `content-visibility` skip-paint enabled on heavy sections below viewport.

---

## 8. Code-quality posture

- **TypeScript:** `strict` — passes `tsc --noEmit` clean.
- **Dynamic imports:** All below-the-fold sections are code-split via
  `next/dynamic` with `ssr: false` and a matched-height loading shell
  (prevents CLS).
- **No orphans:** `UseCases.tsx` was rebuilt even though it is not currently
  mounted in `page.tsx`; a future reintroduction will not reintroduce GSAP.
- **No `any` types** introduced in the rewritten files.
- **No new warnings** in `next build`.

### Known residuals (intentionally left)

- `framer-motion` remains — used for scoped reveals, accordion height
  transitions, and mobile menu stagger. Bundle weight is acceptable because
  its heavy helpers (`useScroll` with full-timeline, LayoutGroup) are no
  longer invoked site-wide.
- `MagneticCTA` primitive is kept and still used once on `CTASection`.
  Runtime-gated to hover-capable pointers + no-reduced-motion, and bails
  early on touch devices.
- `journey-section` CSS rules in `globals.css` are now unreachable selectors
  (the class no longer exists in any JSX). They can be pruned in a follow-up
  without impact.

---

## 9. Next steps

1. Drop real AV1 / WebM / MP4 encodings into `public/videos/` following
   `docs/VIDEO-SOURCING.md`. Until then, `BackgroundVideo` silently falls back
   to posters on 404.
2. Deploy to DigitalOcean App Platform — see `.do/app.yaml`.
3. Post-deploy: run Lighthouse on mobile 4G throttle; target CLS < 0.02,
   LCP < 2.5 s, TBT < 150 ms.
