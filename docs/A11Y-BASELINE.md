# Gizmoo Site — Accessibility Baseline (pre-refactor)

**Date:** 2026-04-25
**Scope:** gizmoo.me marketing site (Next.js 16, App Router)
**Purpose:** Freeze the accessibility state of the site before the motion-removal + background-video refactor. Anything listed here as a finding predates the refactor. After the refactor, we'll diff against this document to confirm we improved (or at minimum did not regress) each area.
**Severity legend:**
- **Blocker** — must be fixed at or before the refactor ships. Screen-reader or keyboard users cannot complete core tasks, or motion triggers vestibular symptoms.
- **Fix later** — real a11y issue but not a launch blocker. Log and batch.

---

## 0. Top 3 pages audited

1. `/` — marketing home (app/page.tsx). Dominant page. Composes 13+ landing sections.
2. `/privacy` — legal (app/privacy/page.tsx).
3. `/terms` — legal (app/terms/page.tsx).

Auth pages (`/sign-in`, `/sign-up`) are Clerk-owned and out of scope for this pass.

---

## 1. Landmark + heading structure — current state

### 1.1 Home (`/`)
- `<html lang="en">` set globally in app/layout.tsx. **Pass.** Consider `en-AU` to match OG locale.
- `<body>` contains a working skip link (`#main-content`) — visible on focus, z-100. **Pass.**
- Single `<main id="main-content">` rendered from `app/page.tsx`. **Pass.**
- `<Nav>` renders a `<motion.nav>` (acts as `<nav>` landmark). **Pass.**
- `<Footer>` renders a `<footer>` landmark. **Pass.**
- **No `<header>` landmark** wrapping the logo + nav. Nav alone is acceptable but a named header region is cleaner.

**Heading outline observed (in source order on `/`):**

| Level | Text | Component | Notes |
|---|---|---|---|
| h1 | "Never miss / another call." | `CinematicJourney → JourneyCopy` scene 1 | The visible H1 on load. |
| h1 | "Never miss another call." | `Hero` | **Duplicate H1 — Hero is NOT mounted on current home** (page.tsx uses CinematicJourney instead), but the component still exists and ships in the bundle. |
| h2 | "What is Gizmoo AI?" | About | |
| h2 | "Where the money / quietly leaks out" (SplitText) | RevenueLeak | |
| h2 | "Six things your new receptionist never sleeps on." | Features | |
| h3 × 6 | feature titles | Features | correct nesting under h2 |
| (no h2) | FourAgents section | FourAgents | Section has no visible heading at all. |
| h2 | "One phone line. Zero missed calls." | Demo | |
| h2 | "Enterprise AI. Simple setup." | HowItWorks | |
| h3 × 3 | step titles | HowItWorks (buttons, not headings) | Step titles are inside `<button>` spans, not `<h3>`. |
| h2 | "500+ businesses never miss a call." | Testimonials | |
| h2 | "Start free. Scale when ready." | Pricing | |
| h3 × 2 | "Starter", "Enterprise" | Pricing | |
| h2 | "Everything you were about to ask." | FAQ | |
| h2 | "Ready to never / miss a call again?" | CTASection | |
| h3 | "Gizmoo AI" | Footer | Should be `h2`. |
| h4 × 4 | footer column labels | Footer | Skips from h3 → h4 OK but parent should be h2. |

**Findings:**

- **[Fix later]** Home heading hierarchy skips and mis-levels. Footer logo is `<h3>` with no enclosing `<h2>`. FourAgents carries no heading. HowItWorks uses `<span>` for step titles where `<h3>` is semantically appropriate.
- **[Fix later]** Decorative `<span aria-hidden>` section counters ("03 — Features") — keep as-is.
- **[Blocker]** Duplicate H1 risk from Hero.tsx. Either delete Hero.tsx or demote its heading to h2.
- **[Fix later]** Add page titles to `/sign-in` and `/sign-up` if Clerk does not already.

### 1.2 Privacy + Terms
- One `<h1>`, multiple `<h2>` for sections, clean hierarchy. `<main>` present. `<Nav>` at top gives landmark. No `<footer>` link-set on these pages. **Fix later:** add Footer for consistency.

---

## 2. Motion-related a11y violations (today)

### 2.1 Lenis smooth scroll (SmoothScroll.tsx)
- Lenis is unconditionally initialised; **does not check `prefers-reduced-motion`**.
- **[Blocker]** Lenis must be disabled (or `lerp: 1`, `duration: 0`) when `matchMedia('(prefers-reduced-motion: reduce)')` matches.

### 2.2 Custom cursor (CustomCursor.tsx + globals.css)
- `globals.css` hides the cursor under `prefers-reduced-motion` (line ~417). **Pass.**
- **[Fix later]** MutationObserver scales O(n) with DOM churn; risks duplicate handlers. Refactor should drop this component entirely.
- **[Fix later]** No visible `:focus-visible` style — see §4.

### 2.3 Loading screen (LoadingScreen.tsx)
- Runs 2.5s animated progress bar; gated only by `sessionStorage`.
- **[Blocker]** Must short-circuit under reduced-motion. Infinite `repeat: Infinity` arrow bounce fails WCAG 2.3.3 / 2.2.2.

### 2.4 CinematicJourney (pinned 7-scene GSAP timeline)
- Honours `prefersReduced` for scrub (line ~64). **Pass on core gating.**
- **[Blocker] Scroll-jacking.** Keyboard users without reduced-motion preference still get the full pinned experience. Add a visible "Skip cinematic intro" link.
- **[Fix later]** Inactive scene copy at 0 opacity — add `aria-hidden` toggled with timeline.

### 2.5 RevenueLeak
- Respects reduced-motion (line 48).
- **[Blocker]** Same scroll-jacking for keyboard users. 2400px forced scroll.

### 2.6 FourAgents (horizontal pan)
- Respects reduced-motion (line 67). Mobile native scroll-snap — fine.
- **[Fix later]** Horizontal panning without equivalent tab order.

### 2.7 Marquees (VelocityBand, Testimonials, About trust bar)
- CSS `animation: marquee` infinite. `hover:[animation-play-state:paused]` only — no keyboard equivalent.
- **[Blocker]** WCAG 2.2.2. Infinite auto-moving content must have a pause control.
- **[Blocker]** Plain `animate-marquee` CSS classes have no reduced-motion fallback.

### 2.8 Canvas ambient systems (ScrollBackground, ParticleField, GlobalFilm)
- All three check `prefers-reduced-motion` and early-return. **Pass.**
- **[Fix later]** ScrollBackground uses `mix-blend-mode: screen` with `filter: blur(200px)` on continuous rAF. Once replaced with video, ensure new video does not stack `mix-blend-mode` on text.

### 2.9 CustomCursor, AuroraPillar, ScrollProgress
- AuroraPillar: honours reduced-motion. **Pass.**
- ScrollProgress: **[Fix later]** add `display: none` under reduced-motion.

### 2.10 Demo.tsx auto-playing chat
- Typing indicator pulses infinitely; chat auto-advances.
- **[Blocker]** Auto-advancing text content without pause. Add play/pause toggle or pause-on-focus.

### 2.11 CookieBanner.tsx
- **[Fix later]** "Accept" and "Dismiss" both call `accept()` — misleading.

### 2.12 ContactOverlay.tsx (modal)
- Not a `<dialog>`, no `role="dialog"`, no `aria-modal="true"`, no `aria-labelledby`.
- No focus trap. No focus return on close. No Escape-to-close.
- **[Blocker]** Multiple critical modal a11y failures. Replace with native `<dialog>` or base-ui dialog.
- **[Blocker]** Step-1 fields have unassociated labels (lines 137–148). Add `id` + `htmlFor`.

---

## 3. Mobile touch-targets + focus order

### 3.1 Touch targets
- Global safety net in `globals.css`: under `@media (pointer: coarse)`, `a, button, [role="button"]` get `min-height: 44px; min-width: 44px`. **Pass.**
- **[Fix later]** Verify actual hit area on iOS Safari for FAQ/HowItWorks accordion toggles.
- **[Blocker]** Testimonials cards, FourAgents pinned scenes, Demo tab row scroll horizontally. Demo `overflow-x-auto` but no scroll snap — half-tab clipping risk.

### 3.2 Focus order
- **[Blocker] No visible `:focus-visible` style site-wide.** WCAG 2.4.7 risk.
- Positive tabindex audit: none found. **Pass.**
- Accordions keep focus on triggering button — correct disclosure behaviour.
- **[Blocker]** ContactOverlay: no initial focus target, no focus trap, no focus return.
- **[Blocker]** Mobile menu overlay: no focus trap, no focus return to hamburger.

---

## 4. Color contrast (current treatments)

| Token | Value | Against bg #070b0a | WCAG AA |
|---|---|---|---|
| --text-primary | #fdfdf9 | 19.2 : 1 | Pass |
| --text-secondary | rgba(253,253,249,0.6) | ~11.5 : 1 | Pass |
| --text-tertiary | rgba(253,253,249,0.38) | ~5.8 : 1 | Pass normal, close to AA floor |
| --accent #20e7b7 on #070b0a | | ~9.7 : 1 | Pass |
| --accent on --bg-secondary #041819 | | ~9.2 : 1 | Pass |
| accent button text #070b0a on #20e7b7 | | ~9.7 : 1 | Pass |
| border-subtle rgba(253,253,249,0.08) | | ~1.4 : 1 | **UI component contrast fail** |

**Findings:**
- **[Fix later]** border-subtle (0.08 white) fails WCAG 1.4.11.
- **[Fix later]** text-tertiary at 5.8:1 passes AA but fails AAA.
- **[Fix later]** `text-accent/70` ≈ 6.8:1 effective — AA-safe but borderline against video.

---

## 5. Forward-looking rules for background video (refactor gate)

### 5.1 Semantics + focusability
- **[Blocker]** Decorative ambient video must be `aria-hidden="true"` and `tabIndex={-1}`.
- **[Blocker]** No `controls` attribute.
- **[Blocker]** Wrapper `pointer-events: none`.
- **[Blocker]** Verify tab never lands on video.

### 5.2 `prefers-reduced-motion`
- **[Blocker]** No autoplay under reduced-motion. Render poster only.
- **[Blocker]** No infinite loops, parallax, or scroll-coupled rate.

### 5.3 Save-Data / slow-network
- **[Blocker]** `navigator.connection.saveData === true` → poster only.
- **[Blocker]** `effectiveType` in `['slow-2g', '2g']` → poster only.
- **[Fix later]** Serve low-bitrate variant for `'3g'`.
- **[Fix later]** `preload="metadata"` or `"none"` only.
- **[Fix later]** Poster always set (AVIF, <80 KB).

### 5.4 Contrast scrim
- **[Blocker]** Text must hold 4.5:1 / 3:1 against BOTH darkest and lightest video frame.
- **[Blocker]** Gradient scrim between video and text.
- **[Blocker]** No `mix-blend-mode` or `blur` for legibility.
- **[Fix later]** Clamp video highlights below 70% luma.

### 5.5 Captions
- **[Fix later only]** Ambient silent decorative video exempt.
- **[Blocker]** Informational video → `<track kind="captions">`.
- **[Blocker]** Any audio → `muted` by default + toggle + pause control.

### 5.6 Autoplay / mute / playsinline / loop
- **[Blocker]** Ambient: `autoplay muted playsinline loop` all four.
- **[Blocker]** Never unmuted autoplay (WCAG 1.4.2).
- **[Fix later]** `disablePictureInPicture` + `disableRemotePlayback`.

### 5.7 Format + delivery
- **[Fix later]** AV1 > H.265 > WebM (VP9) > MP4 (H.264) cascade.
- **[Fix later]** <1.5 MB per 5s hero loop at 1080p.
- **[Fix later]** `content-visibility: auto` below fold.

### 5.8 PR checklist (paste into every video PR)

```
[ ] aria-hidden="true" tabIndex={-1} on decorative video
[ ] no `controls` attribute
[ ] pointer-events: none on video wrapper
[ ] autoplay muted playsinline loop present (ambient) OR controls + captions (info)
[ ] poster image set and under 80 KB
[ ] reduced-motion: render poster only
[ ] Save-Data: render poster only
[ ] slow-2g / 2g: render poster only
[ ] preload="metadata" or "none"
[ ] scrim present; text passes 4.5:1 against brightest + darkest frame
[ ] no audio track, OR captions + pause + keyboard-reachable mute
[ ] keyboard tab pass: focus never lands on video
[ ] screen-reader pass: video not announced
```

---

## 6. Priority queue for the refactor

### Blockers
1. Lenis smooth-scroll missing reduced-motion gate.
2. LoadingScreen missing reduced-motion gate + infinite bounce.
3. CinematicJourney + RevenueLeak pinned scroll-jacking for keyboard users.
4. Marquees missing pause control + reduced-motion on CSS animation.
5. Demo auto-advancing chat — missing pause control.
6. ContactOverlay + mobile nav overlay — no focus trap, no focus return, no Escape, no role/aria-modal.
7. No site-wide `:focus-visible` style.
8. Duplicate H1 risk from orphaned Hero.tsx.
9. ContactOverlay + Footer newsletter unassociated labels.
10. Every §5 blocker for any new `<video>`.

### Fix-later
1. Heading hierarchy normalisation.
2. border-subtle 0.08 fails 1.4.11.
3. ScrollProgress missing reduced-motion.
4. CookieBanner Dismiss misleading.
5. CustomCursor full removal.
6. `<html lang>` consider `en-AU`.
7. Privacy + Terms missing Footer.
8. Demo mobile tab scroll-snap.

---

## 7. Files reviewed

- app/layout.tsx, app/page.tsx, app/globals.css, app/privacy/page.tsx, app/terms/page.tsx
- components/SmoothScroll.tsx, LoadingScreen.tsx, CustomCursor.tsx, ScrollProgress.tsx, ScrollBackground.tsx, AuroraPillar.tsx, ParticleField.tsx, MotionProvider.tsx, CookieBanner.tsx
- components/journey/CinematicJourney.tsx, JourneyCopy.tsx, GlobalFilm.tsx
- components/primitives/MagneticCTA.tsx, VelocityMarquee.tsx
- components/landing/Nav.tsx, Hero.tsx (orphan), About.tsx, RevenueLeak.tsx, Features.tsx, FourAgents.tsx, Demo.tsx, HowItWorks.tsx, Testimonials.tsx, VelocityBand.tsx, Pricing.tsx, FAQ.tsx, CTASection.tsx, Footer.tsx, ContactOverlay.tsx, UseCases.tsx
