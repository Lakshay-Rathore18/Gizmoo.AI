# Cinematic Redesign — Design Notes
_branch: `cinematic-redesign-2026-04-20`_

## Direction
Dark theme stays. The existing mint `#20e7b7` + cream `#fdfdf9` + deep green-black `#070b0a` palette already lands closer to the Lusion / Active Theory / Studio Mesmer end of the spectrum than to the AI-template look. We evolve it; we don't repaint it.

## Palette (locked)
| Token | Hex | Role |
|---|---|---|
| `bg-primary` | `#070b0a` | Page |
| `bg-secondary` | `#041819` | Surfaces |
| `bg-tertiary` | `#0c1c1b` | Elevated surfaces |
| `text-primary` | `#fdfdf9` | Body + headings |
| `text-secondary` | `rgba(253,253,249,0.6)` | Captions + meta |
| `text-tertiary` | `rgba(253,253,249,0.38)` | Section labels + mono |
| `accent` (mint) | `#20e7b7` | Primary accent — kept earning its place through motion |
| `accent-hover` | `#00ffc2` | Hover intensify |
| `accent-secondary` (cobalt) | `#3d7aff` | One-off electric-blue for the FourAgents horizontal pan (pairs with mint only in the hero scene-7 convergence) |
| `cream` | `#F5F1EA` | Reserved — not used in this pass; flagged as available if a light section is ever justified |

## Typography (locked)
- **Display:** DM Sans (variable) — weight morph 200 → 600, opsz 14 → 48 tween on major headlines (see `CinematicJourney`). Free, Latin subset, already installed via `next/font/google`.
- **Text:** Inter (variable) — body + UI.
- **Mono:** JetBrains Mono — metrics, section labels, code-like tokens.
- **No new fonts added this pass.** The hero uses italic-accent on the final word of key headlines (signature feature).
- Tracking: `-0.02em` on display ≥3rem; `-0.04em` reserved for the final-scene headline only.

## Five Techniques Borrowed (not copied)
1. **Scroll-scrubbed narrative journey with SplitText + Physics2D** — Active Theory, Lusion. Already landed last pass in `CinematicJourney`. This pass adds the **pinned sticky counter** beat inside Revenue Leak (see §section 2 below).
2. **Horizontal-pan pinned section with snap panels + stroke reveals** — Studio Mesmer / Immersive Garden. Applied to the new `FourAgents` section (Receptionist → Qualifier → Booker → Follow-up). Desktop: pin + scrub horizontal timeline. Mobile: native CSS `scroll-snap-type: x mandatory`.
3. **Velocity-reactive infinite marquee** — Locomotive / Hello Monday. Implemented as `VelocityMarquee` — the base translate speed is 40s infinite; scroll velocity adds a damped delta (lerp 0.08) so aggressive scrolls warp the text band briefly.
4. **Clip-path reveal on section entry** — Resn, Cuberto. `ClipReveal` wraps any child and animates `clip-path: inset(100% 0 0 0) → inset(0 0 0 0)` on `whileInView` (Framer Motion). Replaces generic fade-up everywhere we can.
5. **Magnetic primary CTA** — Cuberto microinteraction. `MagneticCTA` wraps the final CTA button only (one per page — intentional scarcity). Pointer within 80px radius applies a damped `translate(lerp(pointer, 0.35))` offset. Disabled on touch via `@media (hover: none)`.

## Signature Moment
The already-shipped `CinematicJourney` (tilted neon portal + starfield + terrain + 7-scene scrubbed timeline + SplitText + MorphSVG + MotionPath + Physics2D + chromatic aberration + shockwaves + variable-font morph) remains the signature. **It's not replaced — it's contextualised.**

The new Revenue Leak + Four Agents sections form the act 2 + act 3 of the scroll arc, so the journey doesn't end when the pin releases; the rest of the page picks up the rhythm.

## New Sections Added
1. **RevenueLeak** — between `About` and `Features`. Pinned 400vh with sticky giant headline "$240,000 leaks out of your phone every year." Three scrubbed counters tick up as the user scrolls ($240k / 30% / 12h). Big typography. Clip-reveal on entry. One cobalt accent on "leaks" — the only non-mint chromatic moment in the site.
2. **FourAgents** — replaces current `UseCases` position. Four pinned slides pan horizontally on desktop (vertical scroll → horizontal translate). Each agent is a full-viewport panel with a stroke-drawn role badge + a short role spec. Mobile: CSS scroll-snap.
3. **VelocityBand** — thin band between `Testimonials` and `Pricing`. Marquee: "Never miss another call · Never lose another job · Never refund another deposit · Never chase another lead".

## Mobile Parity
All primitives inherit the last pass's `data-m` gating, `content-visibility: auto`, and `@media (hover: none)` disable-magnetic-cursor rules. FourAgents desktop horizontal pan → native CSS `scroll-snap-type: x mandatory; overscroll-behavior-x: contain` on mobile. VelocityMarquee clamps velocity contribution to 0 on mobile (plain 40s infinite marquee, no velocity coupling). Revenue Leak counters scrub over 60vh on mobile (vs 400vh desktop).

## Copy Doctrine
All new copy is written — not hallucinated. Sources:
- Revenue Leak numbers: derived from gizmoo's own stats in `lib/brand.ts` (50,000+ calls, 99.7%, etc.) + standard Australian tradie economics from the existing FAQ copy.
- FourAgents roles: from the existing Features + HowItWorks sections, re-composed into 4 personas.
- VelocityBand phrases: derived from existing Hero tagline "Never miss a call" + existing "missed call = lost revenue" framing.

No lorem. No ChatGPT-voice. Every line is a tightening of what the site already says.

## What We're Not Doing (anti-slop discipline)
- No 3-column feature-card grid. (Features stays as the existing vertical-stack alternating layout.)
- No pastel gradient blobs.
- No lucide icons decorating sections — keep them only in Nav + form controls.
- No fake partner logos.
- No centered-H1-subtitle-two-buttons-image-right hero (the journey is the hero).
- No `hover:scale-105` anywhere added this pass. Motion through GSAP/Framer primitives only.
