/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: { exclude: ['error', 'warn'] },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img.clerk.com' },
    ],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      // Clerk CDN + subdomain + dev CDN serve the JS bundle and UI scripts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.gizmoo.me https://accounts.gizmoo.me https://*.clerk.accounts.dev https://*.clerk.com https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://clerk.gizmoo.me https://accounts.gizmoo.me",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      // Clerk API + Supabase + Clerk telemetry
      "connect-src 'self' https://turtclknacgpwnxocubx.supabase.co https://clerk.gizmoo.me https://accounts.gizmoo.me https://*.clerk.accounts.dev https://*.clerk.com https://clerk-telemetry.com https://*.clerk-telemetry.com https://fonts.gstatic.com",
      // Clerk embeds sign-in inside iframes (incl. Cloudflare Turnstile)
      "frame-src 'self' https://clerk.gizmoo.me https://accounts.gizmoo.me https://*.clerk.accounts.dev https://*.clerk.com https://challenges.cloudflare.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://clerk.gizmoo.me https://accounts.gizmoo.me",
      "manifest-src 'self'",
    ].join('; ');

    return [
      // Global security + CSP
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
      // Long-lived immutable cache for hashed Next.js static chunks
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Images: 30-day browser cache + stale-while-revalidate
      // (one entry per extension — path-to-regexp in Next 16 rejects
      // non-capturing groups inside `source` patterns)
      ...['png', 'jpg', 'jpeg', 'webp', 'avif', 'svg', 'ico'].map((ext) => ({
        source: `/:path*.${ext}`,
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      })),
      // Fonts: 1 year immutable
      ...['woff', 'woff2', 'ttf', 'otf'].map((ext) => ({
        source: `/:path*.${ext}`,
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      })),
    ];
  },
};

export default nextConfig;
