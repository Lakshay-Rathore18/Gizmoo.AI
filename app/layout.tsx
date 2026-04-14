import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { SmoothScroll } from '@/components/SmoothScroll';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { LoadingScreen } from '@/components/LoadingScreen';
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
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
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
    images: [{ url: 'https://gizmoo.me/api/og', width: 1200, height: 630, alt: 'Gizmoo AI' }],
    siteName: 'Gizmoo AI',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gizmoo AI — AI Voice Receptionist for Australian Tradies',
    description: 'Never miss a call. 24/7 AI phone answering for plumbers, electricians, HVAC and builders.',
    images: ['https://gizmoo.me/api/og'],
  },
  robots: { index: true, follow: true },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://gizmoo.me/#organization',
    name: 'Gizmoo AI',
    legalName: 'Gizmoo AI Pty Ltd',
    url: 'https://gizmoo.me',
    logo: 'https://gizmoo.me/icon-512.png',
    image: 'https://gizmoo.me/api/og',
    description: 'Gizmoo AI is an Australian AI voice receptionist platform that answers business phone calls 24/7, qualifies leads, books appointments, and sends confirmations.',
    telephone: '+61489072416',
    email: 'hi@gizmoo.me',
    foundingDate: '2025',
    address: { '@type': 'PostalAddress', addressRegion: 'NSW', addressCountry: 'AU' },
    areaServed: { '@type': 'Country', name: 'Australia' },
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+61489072416', contactType: 'customer service', availableLanguage: 'English', areaServed: 'AU' },
      { '@type': 'ContactPoint', telephone: '+61424700797', contactType: 'sales', availableLanguage: 'English', areaServed: 'AU' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://gizmoo.me/#website',
    url: 'https://gizmoo.me',
    name: 'Gizmoo AI',
    publisher: { '@id': 'https://gizmoo.me/#organization' },
    inLanguage: 'en-AU',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Gizmoo AI',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '413', priceCurrency: 'AUD' },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', bestRating: '5', ratingCount: '500', reviewCount: '127' },
    featureList: 'AI voice receptionist, 24/7 call answering, appointment booking, calendar sync, outbound calls, smart transfers',
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="geo.region" content="AU-NSW" />
        <meta name="geo.placename" content="New South Wales, Australia" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans bg-bg-primary text-text-primary antialiased overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:font-semibold"
        >
          Skip to main content
        </a>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          signInForceRedirectUrl="/"
          signUpForceRedirectUrl="/"
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: '#22d3ee',
              colorBackground: '#0a0a0a',
              colorInputBackground: '#111111',
              colorInputText: '#ffffff',
              colorText: '#ffffff',
              colorTextSecondary: 'rgba(255,255,255,0.55)',
              borderRadius: '8px',
            },
          }}
        >
          <SmoothScroll>
            <LoadingScreen />
            <ScrollProgress />
            <CustomCursor />
            <div className="noise-overlay" />
            {children}
          </SmoothScroll>
        </ClerkProvider>
      </body>
    </html>
  );
}
