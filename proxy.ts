import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Public routes — including crawler / discovery files. Without explicit
// listing of robots.txt + sitemap.xml + manifest.json, Clerk redirects
// these to /sign-in, which (a) tanks the SEO Lighthouse score and (b)
// breaks search crawlers and PWA installability.
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/privacy(.*)',
  '/terms(.*)',
  '/api/(.*)',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json',
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

// Matcher: skip static assets and crawler/discovery files at the routing
// layer so middleware never even runs for them. The public-route list
// above is a defense-in-depth backstop in case the matcher misses anything.
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon|videos/|robots\\.txt$|sitemap\\.xml$|manifest\\.json$|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|mp4|webm|mov|av1|woff|woff2|txt|xml|json)$).*)',
  ],
}
