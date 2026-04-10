# Gizmoo AI — Landing Page

A production-grade Next.js 14 marketing site for **Gizmoo AI**. Dark-primary brutalism meets a futuristic AI aesthetic — Spline 3D, particle fields, brutalist typography, holographic borders, and a ton of framer-motion.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # strict TS
npm run lint         # next lint
```

## Stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript** (strict)
- **Tailwind CSS** with custom cyberpunk palette + keyframes
- **Framer Motion** for orchestrated animations
- **@splinetool/react-spline** for 3D scenes (lazy-loaded with fallback)
- **Lucide React** for icons
- Google Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (code)

## Sections (top → bottom)

1. **Nav** — fixed, blur-on-scroll, responsive burger menu
2. **Hero** — Spline neural net backdrop + canvas particle field + typewriter cycle headline + HUD stats grid
3. **Social Proof** — infinite marquee of wordmarks
4. **Features** — 6 bento cards with hover glow
5. **Demo** — tabbed terminal/chat/PR view + second Spline scene
6. **Use Cases** — 4 zigzag rows with animated `Counter` metrics
7. **Tech** — architecture spec list + third Spline scene
8. **Testimonials** — physics-pauseable marquee of quote cards
9. **Pricing** — 3-tier with annual/monthly toggle, featured card has holo-border glow
10. **FAQ** — accordion with spring animations
11. **CTA** — fourth Spline scene + email capture + trust badges
12. **Footer** — 4-column + newsletter + massive brand watermark + back-to-top

## Design system

Defined in `tailwind.config.ts` and `app/globals.css`:

| Token | Value |
|---|---|
| `ink` | `#000000` — base |
| `paper` | `#ffffff` — text |
| `cyber.cyan` | `#00E5FF` |
| `cyber.violet` | `#8B5CF6` |
| `cyber.lime` | `#A3FF12` |
| `cyber.rose` | `#FF2E93` |
| `surface` / `.raised` / `.border` | dark surface ramp |

Reusable utilities: `.text-gradient-brand`, `.holo-border`, `.scan-lines`, `.bg-grid`, `.shimmer-text`.

## File layout

```
app/
  layout.tsx            fonts, metadata, viewport
  page.tsx              composes all sections
  globals.css           tokens, utilities, reduced-motion
components/
  landing/              Nav, Hero, SocialProof, Features, Demo, UseCases,
                        Tech, Testimonials, Pricing, FAQ, CTASection, Footer
  ui/                   SplineScene, Button, Card, GradientText, Marquee
  animations/           ScrollReveal, Counter, AIParticles
lib/
  brand.ts              brand constants + spline scene URLs
  utils.ts              cn() helper
```

## Spline scenes

Scene URLs live in `lib/brand.ts` → `brand.spline`. The current values point at public scenes; swap in your own exported `.splinecode` URLs from [spline.design](https://spline.design) when you have them. The `<SplineScene>` component is `React.lazy`-wrapped with a graceful neon-pulse fallback, so nothing breaks if a scene 404s or the user is on slow 3G.

## Widgets & CTAs

All interactive elements (buttons, email inputs, newsletter, link CTAs) are wired as UI-only with:

- `data-action="[name]"` attributes so you can wire analytics/forms later
- `// TODO:` markers in onSubmit/onClick handlers

Grep for `TODO:` and `data-action=` to find every integration point.

## Accessibility

- Semantic landmarks (`<header>`, `<nav>`, `<section>`, `<footer>`)
- All icons are `aria-hidden`; all interactive elements have labels
- Focus-visible rings on every button
- `prefers-reduced-motion` respected globally (CSS + `useReducedMotion` in JS)
- Color contrast targets WCAG AA on body text, AAA on primary CTAs

## Performance notes

- All Spline scenes are `React.lazy` + `Suspense`-gated
- `Counter` uses `IntersectionObserver` — no animation until in view
- `AIParticles` canvas pauses on `visibilitychange`
- `next/font/google` with `display: 'swap'` for all three font families
- `optimizePackageImports: ['lucide-react', 'framer-motion']` in `next.config.mjs`
- Static build: one route, fully prerendered, ~149 kB First Load JS

## Verification

This project is verified clean on:

```
✔ npm run typecheck   → 0 errors
✔ npm run lint        → 0 warnings, 0 errors
✔ npm run build       → production build succeeds, static export
```

Browser UX has **not** been tested — no dev server run yet. Start with `npm run dev` and smoke-test each section.

## What&apos;s next

- Wire real Spline scenes (replace the placeholder scene URLs)
- Hook up a waitlist provider (Loops, Resend, etc.) to the CTA and newsletter forms
- Add an OG image (currently metadata references the base URL but no `/opengraph-image.tsx`)
- Add `sitemap.xml` + `robots.txt`
- Drop real customer logos in place of the wordmark marquee
