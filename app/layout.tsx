import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { brand } from '@/lib/brand';
import { CookieBanner } from '@/components/CookieBanner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gizmoo.me'),
  title: 'Gizmoo AI — AI Voice Receptionist for Australian Tradies',
  description:
    'Never miss a call. Gizmoo AI answers your phone 24/7, qualifies jobs, and books customers directly into your calendar. Built for Australian plumbers, electricians, HVAC, and builders.',
  keywords: [
    'AI voice receptionist Australia',
    'AI phone answering tradies',
    'automated call answering plumber Sydney',
    'AI receptionist electrician HVAC',
    'missed call solution tradie Australia',
    'AI booking system trade business',
    '24/7 phone answering small business Australia',
  ],
  alternates: { canonical: 'https://gizmoo.me' },
  icons: { icon: '/favicon-32.png', shortcut: '/favicon-32.png', apple: '/apple-touch-icon.png' },
  openGraph: {
    title: 'Gizmoo AI — AI Voice Receptionist for Australian Tradies',
    description:
      'Never miss a call. 24/7 AI phone answering for plumbers, electricians, HVAC and builders.',
    url: 'https://gizmoo.me',
    images: [
      {
        url: 'https://gizmoo.me/api/og',
        width: 1200,
        height: 630,
        alt: 'Gizmoo AI',
      },
    ],
    siteName: 'Gizmoo AI',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gizmoo AI — AI Voice Receptionist for Australian Tradies',
    description:
      'Never miss a call. 24/7 AI phone answering for plumbers, electricians, HVAC and builders.',
    images: ['https://gizmoo.me/api/og'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Gizmoo AI',
              description: 'AI voice receptionist for Australian trade businesses. 24/7 automated call answering, job qualification, and calendar booking.',
              url: 'https://gizmoo.me',
              telephone: '+61489072416',
              email: 'hellogizmooai@gmail.com',
              address: { '@type': 'PostalAddress', addressRegion: 'NSW', addressCountry: 'AU' },
              areaServed: { '@type': 'Country', name: 'Australia' },
              serviceType: 'AI Voice Receptionist',
              priceRange: '$$',
            }),
          }}
        />
      </head>
      <body className="font-sans bg-ink text-paper antialiased overflow-x-hidden">
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          {children}
          <CookieBanner />
        </ClerkProvider>
      </body>
    </html>
  );
}
