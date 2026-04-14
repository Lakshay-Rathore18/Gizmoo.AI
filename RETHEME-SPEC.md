# SARMAT ANALYTIX VISUAL TRANSPLANT — EXECUTION SPEC

## STATUS: Color swap done (commit 764f80a). STRUCTURAL REDESIGN NOT DONE.

The current state is a desaturated grayscale version of the old site. That is NOT the goal.
The goal is a full visual transplant to match https://www.behance.net/gallery/194289681/Sarmat-Analytix-Branding-UXUI

## WHAT IS ACTUALLY NEEDED (not done yet)

### 1. HERO — COMPLETE REBUILD
- Source a dark cinematic rocky landscape from Unsplash (search "dark rocky wasteland cinematic")
- Source an armored soldier / military robot 3D render (Unsplash/Pixabay "armored soldier dark render")
- Position figure CENTER of hero, overlapping the headline
- Split headline LEFT/RIGHT around the figure: "NEVER MISS" on left, "ANOTHER CALL" on right
- Remove the existing Spline 3D visuals and particle system from hero
- Hero should feel like a movie poster, not a SaaS landing page

### 2. TYPOGRAPHY — NOT JUST FONT SWAP
- Hero headline: Bebas Neue, ALL CAPS, letter-spacing: 0.08em+, font-size: clamp(60px, 15vw, 180px)
- The current headlines are too small and don't command the page
- Section headings: ALL CAPS, tracked, Bebas Neue — not Space Grotesk
- Nav links: small caps (font-variant: small-caps), ultra-wide tracking
- Body: Space Grotesk at opacity 0.55, NOT Inter
- Section labels: "01 — ABOUT" style, 11px, uppercase, letter-spacing: 0.15em

### 3. LAYOUT STRUCTURE — COMPLETE REDO
- Section padding: 120px 80px desktop, 80px 24px mobile (currently ~96px/64px)
- Add numbered section labels above EVERY section heading: "01 — FEATURES", "02 — DEMO", etc
- Add 1px horizontal divider lines between ALL sections (not gradient mesh dividers)
- Generous whitespace — double current spacing between sections
- Remove all mesh-divider elements, replace with simple `<hr class="sarmat-hr" />`

### 4. CARDS — FLAT MILITARY PANELS, NOT GLASS
- Kill all glassmorphism (backdrop-filter: blur)
- Cards: background rgba(255,255,255,0.03), border 1px solid rgba(255,255,255,0.1), border-radius: 2px
- NO hover glow, NO shadow escalation — just subtle border brighten on hover
- Feature cards: restructure to "WE RECOGNIZE" layout — bold label LEFT, paragraph RIGHT (two-column within card)

### 5. TOPO TEXTURE — MAKE IT REAL
- Current SVG is too subtle (0.03-0.06 opacity)
- Increase to 0.08-0.12 opacity so contour lines are actually visible
- Must appear behind hero, about section, features, use cases, FAQ — all dark sections
- On mobile reduce to 0.06

### 6. BUTTONS — OUTLINED MILITARY STYLE
- Primary: border 1px solid rgba(255,255,255,0.4), NO fill, white text, uppercase tracked
- Hover: border-color #fff, background rgba(255,255,255,0.08)
- border-radius: 2px (already done)
- Remove ALL rounded-xl, rounded-lg on buttons

### 7. FAQ — ACCORDION BARS
- Full-width dark bar per question (not bordered cards)
- Uppercase label left, + or chevron right
- Expand with smooth max-height 300ms transition
- No rounded corners on accordion items

### 8. NAVIGATION — STRUCTURAL CHANGE
- Logo left, nav center (not left-aligned), CTA right
- Nav links separated by bullet dots (already done but verify)
- On scroll: frosted glass with slight darkening (already done)
- Mobile: hamburger slides in dark overlay panel from right

### 9. BACKGROUND & ATMOSPHERE
- Remove ALL Spline 3D scenes (they don't fit military aesthetic)
- Remove particle effects from non-hero sections
- Keep subtle noise grain overlay (already there)
- Add dark vignette to hero edges

### 10. IMAGES TO SOURCE
- Hero BG: dark cinematic landscape (Unsplash, ~1920px wide, desaturated)
- Hero figure: armored robot/soldier render (transparent/dark BG)
- Download and save to public/ directory, don't hotlink

## FILES THAT NEED STRUCTURAL CHANGES (not just color)
- components/landing/Hero.tsx — COMPLETE REBUILD with split headline + figure
- components/landing/Nav.tsx — Center nav links
- components/landing/Features.tsx — Two-column card layout
- components/landing/FAQ.tsx — Full-width accordion bars
- app/page.tsx — Replace mesh-dividers with sarmat-hr, add section spacing
- app/globals.css — Increase topo opacity, add accordion styles
- tailwind.config.ts — Larger section padding utilities

## EXECUTION ORDER
1. Source + download hero assets (BG image + figure)
2. Rebuild Hero.tsx with split headline layout
3. Restructure page.tsx section dividers and spacing
4. Increase topo texture visibility in globals.css
5. Restructure Features cards to two-column
6. Rebuild FAQ as accordion bars
7. Center nav links
8. Increase all headline sizes + tracking
9. Screenshot every breakpoint
10. Push to deploy

## IMPORTANT
- DO NOT change any text content
- DO NOT alter any functionality
- This is a LAYOUT + ATMOSPHERE redesign, not another color swap
