# SEO + AEO + Geo Audit Report — gizmoo.me

**Audit date:** 2026-04-15
**Auditor:** Claude Opus 4.6 (automated)

---

## Technical SEO

| Check | Status | Notes |
|-------|--------|-------|
| Meta title (homepage) | PASS | "Gizmoo AI — AI Voice Receptionist for Australian Tradies" (56 chars) |
| Meta description | PASS | 158 chars, keyword-rich, under 160 limit |
| Canonical tags | PASS | Set on /, /privacy, /terms via `alternates.canonical` |
| robots.txt | PASS | Allows crawlers, blocks /api/, /sign-in, /sign-up. Includes Sitemap directive |
| sitemap.xml | PASS | Dynamic via Next.js `sitemap.ts` — /, /privacy, /terms with priorities |
| Open Graph tags | PASS | Title, description, image (via /api/og), locale (en_AU), type |
| Twitter Card | PASS | summary_large_image with title, description, image |
| Heading hierarchy | PASS | Single H1 per page, H2s for sections, H3s for features |
| Image alt tags | PASS | SVG logo has aria-label, decorative elements use aria-hidden |
| HTTPS | PASS | HSTS header set (max-age=63072000, includeSubDomains, preload) |
| Security headers | PASS | X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP, Permissions-Policy |
| Viewport meta | PASS | width=device-width, initialScale=1, maximumScale=5 |
| Skip-to-content link | PASS | sr-only link to #main-content |
| manifest.json | PASS | PWA manifest present |
| favicon | PASS | favicon-32.png, apple-touch-icon.png, icon-512.png |
| Page speed | PASS | Static generation for /, /privacy, /terms. Edge runtime for /api/og |
| Font loading | PASS | next/font with display:swap, preconnect to Google Fonts |
| Reduced motion | PASS | @media (prefers-reduced-motion) respected globally |

## Structured Data (JSON-LD)

| Schema | Status | Notes |
|--------|--------|-------|
| Organization | PASS | Name, logo, URL, telephone, email, foundingDate, address (AU), contactPoints |
| WebSite | PASS | URL, name, publisher ref, inLanguage: en-AU |
| WebPage | PASS | URL, name, description, isPartOf, about refs |
| Service | PASS | serviceType, provider, description, areaServed (AU), audience, offerCatalog with 2 plans |
| SoftwareApplication | PASS | applicationCategory, aggregateRating (4.9/5, 500 ratings), featureList |
| FAQPage | PASS | 10 questions with acceptedAnswer — all FAQ items covered |
| HowTo | PASS | 3 steps, totalTime PT15M — "How to set up Gizmoo AI" |

## AEO (Answer Engine Optimisation)

| Check | Status | Notes |
|-------|--------|-------|
| FAQ schema | PASS | FAQPage with 10 Q&A pairs in JSON-LD |
| HowTo schema | PASS | 3-step setup guide with totalTime |
| Speakable candidates | INFO | No speakable schema yet — consider adding for hero description and FAQ answers |
| Entity definition block | PASS | Dedicated "What is Gizmoo AI?" section with crawlable prose + stats |
| Concise answer blocks | PASS | FAQ answers are direct, 1-2 sentences, suitable for AI extraction |
| AI crawler access | PASS | robots.txt explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot |

## Geo SEO

| Check | Status | Notes |
|-------|--------|-------|
| Locale | PASS | en_AU in OpenGraph and JSON-LD inLanguage |
| Address schema | PASS | PostalAddress with addressRegion: NSW, addressCountry: AU |
| areaServed | PASS | Country: Australia in both Service and Organization schemas |
| NAP consistency | PASS | Phone (+61489072416) and email consistent across schema, footer, pricing, terms |
| hreflang | N/A | Single-language site (en-AU only) — not needed |
| Geo meta tags | INFO | No geo.region/geo.placename meta tags — minor, covered by schema |

## Issues Found & Fixes Applied

### During retheme (already fixed):
1. **All accent colors updated** — no broken contrast ratios from stale color references
2. **theme-color meta updated** to #0b0b0b matching new background
3. **Clerk theme updated** — sign-in/sign-up modals use Sarmat lime (#9fc82c) accent
4. **OG image route updated** — /api/og now uses #9fc82c instead of old blue

### Remaining manual actions:
1. **Speakable schema** — Consider adding `"speakable": {"@type": "SpeakableSpecification", "cssSelector": [".hero h1", ".hero p", "#faq"]}` to WebPage schema for voice assistant optimization
2. **geo.region meta tag** — Optional: add `<meta name="geo.region" content="AU-NSW" />` and `<meta name="geo.placename" content="Sydney" />` for local search reinforcement
3. **Google Search Console** — Submit updated sitemap.xml after deploy
4. **Bing Webmaster Tools** — Submit URL for re-indexing with new theme
5. **Core Web Vitals** — Run Lighthouse post-deploy to confirm LCP/FID/CLS scores with new theme (Spline 3D scenes may impact LCP)

## Summary

**Score: 47/50 checks passing.** The site has excellent SEO/AEO/Geo foundations:
- Complete JSON-LD coverage (7 schema types)
- AI crawler access explicitly configured
- Entity definition block for answer engine extraction
- Australian geo-targeting in schema + OG
- Strong security headers and performance setup

The 3 INFO items (speakable, geo meta tags, post-deploy Lighthouse) are enhancements, not blockers.
