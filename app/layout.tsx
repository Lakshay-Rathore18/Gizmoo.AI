import type { Metadata, Viewport } from 'next';
import { DM_Sans, Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { SmoothScroll } from '@/components/SmoothScroll';
import { CustomCursor } from '@/components/CustomCursor';
import { ScrollProgress } from '@/components/ScrollProgress';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ScrollBackground } from '@/components/ScrollBackground';
import { AuroraPillar } from '@/components/AuroraPillar';
import { GlobalFilm } from '@/components/journey/GlobalFilm';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '700'],
});

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
  title: 'Gizmoo AI — AI Voice Receptionist for Australian Businesses | 24/7 Call Answering',
  description:
    'Gizmoo AI is an Australian AI voice receptionist that answers business calls 24/7, qualifies leads, books appointments into your calendar, and sends SMS confirmations. Built for tradies, clinics, salons, legal, and real estate. Live in 15 minutes.',
  keywords: [
    // core AEO/GEO — answer-format phrasing
    'what is an AI voice receptionist',
    'best AI receptionist Australia 2026',
    'how much does an AI receptionist cost Australia',
    'AI phone answering service for small business',
    'AI voice receptionist Australia',
    'AI phone answering tradies',
    'AI receptionist plumber Sydney',
    'AI receptionist electrician Melbourne',
    'AI receptionist HVAC Brisbane',
    'automated call answering plumber',
    'missed call solution Australian tradie',
    'AI booking system trade business',
    '24/7 phone answering small business Australia',
    'AI receptionist medical practice Australia',
    'AI receptionist dental clinic',
    'AI receptionist real estate',
    'AI receptionist law firm',
    'AI appointment booking phone',
    'Calendly AI phone integration',
    'Google Calendar phone AI',
    'AI voice agent Australian business',
    'virtual receptionist alternative',
    'after hours phone answering tradie',
  ],
  alternates: { canonical: 'https://gizmoo.me' },
  icons: { icon: '/favicon-32.png', shortcut: '/favicon-32.png', apple: '/apple-touch-icon.png' },
  openGraph: {
    title: 'Gizmoo AI — 24/7 AI Voice Receptionist for Australian Businesses',
    description:
      'AI phone answering + live appointment booking for Australian tradies, clinics, salons and agencies. Never miss a call, never miss a booking. Live in 15 minutes.',
    url: 'https://gizmoo.me',
    images: [{ url: 'https://gizmoo.me/api/og', width: 1200, height: 630, alt: 'Gizmoo AI — AI voice receptionist for Australian businesses' }],
    siteName: 'Gizmoo AI',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gizmoo AI — 24/7 AI Voice Receptionist for Australian Businesses',
    description: 'AI phone answering + live calendar booking. Built for tradies, clinics, salons, legal, real estate. Live in 15 minutes.',
    images: ['https://gizmoo.me/api/og'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  category: 'Business Software',
  other: {
    'ai:description': 'Gizmoo AI answers business phone calls 24/7 for Australian small businesses. It qualifies callers, books appointments directly into Google Calendar / Outlook / Calendly, and sends SMS confirmations. Starts from AUD 413/month. Setup in 15 minutes. Built for tradies, medical, legal, real estate, and salons.',
    'geo.region': 'AU',
    'geo.placename': 'Australia',
  },
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
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://gizmoo.me/#service',
    serviceType: 'AI Voice Receptionist',
    provider: { '@id': 'https://gizmoo.me/#organization' },
    areaServed: { '@type': 'Country', name: 'Australia' },
    description: 'AI voice receptionist service for Australian small businesses. Answers calls 24/7, qualifies leads, books appointments into your calendar, and sends SMS confirmations. Built for tradies, clinics, salons, legal, and real estate.',
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Small businesses in Australia — plumbers, electricians, HVAC technicians, builders, medical practices, dentists, legal firms, real estate agencies, salons, spas, restaurants',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Gizmoo AI Plans',
      itemListElement: [
        { '@type': 'Offer', name: 'Starter', price: '413', priceCurrency: 'AUD', priceSpecification: { '@type': 'UnitPriceSpecification', price: '413', priceCurrency: 'AUD', billingDuration: 'P1M' } },
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://gizmoo.me/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Gizmoo AI?',
        acceptedAnswer: { '@type': 'Answer', text: 'Gizmoo AI is an Australian AI voice receptionist service that answers business phone calls 24/7, qualifies leads, books appointments directly into your calendar, and sends SMS confirmations to customers. It is built for Australian tradies, medical practices, legal firms, salons, and other small businesses that receive phone calls.' },
      },
      {
        '@type': 'Question',
        name: 'How does an AI voice receptionist work?',
        acceptedAnswer: { '@type': 'Answer', text: 'Calls forward to the AI, which answers instantly with a natural voice, understands the caller\'s intent, asks qualifying questions, checks real-time calendar availability, books the appointment, and sends confirmations by SMS. Complex calls are transferred to your team with full context.' },
      },
      {
        '@type': 'Question',
        name: 'How natural does Gizmoo AI sound on the phone?',
        acceptedAnswer: { '@type': 'Answer', text: 'Extremely natural. Gizmoo uses advanced voice AI with natural pauses, filler words, and emotional understanding. Most callers do not realize they are speaking with AI.' },
      },
      {
        '@type': 'Question',
        name: 'Which calendars does Gizmoo integrate with?',
        acceptedAnswer: { '@type': 'Answer', text: 'Google Calendar, Outlook, Calendly, Acuity Scheduling, Cal.com, and 100+ more through the integration marketplace. Your calendar stays perfectly synced, time-zone aware, and never double-booked.' },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to set up Gizmoo AI?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most Australian businesses are live within 15 minutes. Forward your existing number or spin up a new AI-powered line, customise your greeting, booking rules, and business info — and you are ready to answer calls.' },
      },
      {
        '@type': 'Question',
        name: 'Is Gizmoo AI secure and compliant?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Gizmoo is SOC 2 Type II compliant, uses end-to-end encryption, and follows strict data handling protocols. Healthcare customers can sign a HIPAA BAA. Your business data and caller PII are always protected.' },
      },
      {
        '@type': 'Question',
        name: 'Which industries use Gizmoo AI?',
        acceptedAnswer: { '@type': 'Answer', text: 'Medical and dental practices, law firms, real estate, salons and spas, home services (HVAC, plumbing, electrical), restaurants, and any business that receives phone calls.' },
      },
      {
        '@type': 'Question',
        name: 'Does Gizmoo AI work for Australian tradies?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Gizmoo is built specifically for Australian tradies including plumbers, electricians, HVAC technicians, and builders. It handles after-hours emergency calls, qualifies job requests, and books site visits straight into your calendar.' },
      },
      {
        '@type': 'Question',
        name: 'What happens if Gizmoo AI cannot help a caller?',
        acceptedAnswer: { '@type': 'Answer', text: 'Gizmoo seamlessly transfers to your team when it hits something it cannot handle, or takes a detailed message with full context and caller sentiment. Nothing ever falls through the cracks.' },
      },
      {
        '@type': 'Question',
        name: 'Can Gizmoo AI make outbound calls too?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Gizmoo makes appointment reminder calls, follow-up calls, and re-engagement campaigns. Set the rules and schedule, and Gizmoo dials politely, consistently, and at scale.' },
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': 'https://gizmoo.me/#howto-setup',
    name: 'How to set up Gizmoo AI for your business',
    description: 'Set up an AI voice receptionist for your Australian business in under 15 minutes.',
    totalTime: 'PT15M',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'AUD', value: '413' },
    step: [
      { '@type': 'HowToStep', name: 'Claim your number', text: 'Forward your existing business phone number to Gizmoo or spin up a new AI-powered line during signup.', url: 'https://gizmoo.me/#how-it-works' },
      { '@type': 'HowToStep', name: 'Customise the AI', text: 'Customise your greeting, booking rules, after-hours behaviour, business info, and the AI\'s personality to match your brand voice.', url: 'https://gizmoo.me/#how-it-works' },
      { '@type': 'HowToStep', name: 'Connect your calendar', text: 'Connect Google Calendar, Outlook, Calendly, Acuity, Cal.com, or 100+ other calendars so Gizmoo can book appointments live during the call.', url: 'https://gizmoo.me/#how-it-works' },
      { '@type': 'HowToStep', name: 'Go live', text: 'Activate the line. Gizmoo answers every incoming call 24/7, qualifies the caller, and books appointments straight into your calendar.', url: 'https://gizmoo.me/#how-it-works' },
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#070b0a" />
        <meta name="geo.region" content="AU-NSW" />
        <meta name="geo.placename" content="New South Wales, Australia" />
        {/* Preconnect to critical third parties — start TCP+TLS handshake early */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://clerk.gizmoo.me" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://accounts.gizmoo.me" crossOrigin="anonymous" />
        {/* DNS prefetch as fallback for older clients / additional Clerk hosts */}
        <link rel="dns-prefetch" href="https://clerk.gizmoo.me" />
        <link rel="dns-prefetch" href="https://accounts.gizmoo.me" />
        <link rel="dns-prefetch" href="https://turtclknacgpwnxocubx.supabase.co" />
        <link rel="dns-prefetch" href="https://clerk-telemetry.com" />
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
              colorPrimary: '#20e7b7',
              colorBackground: '#070b0a',
              colorInputBackground: '#041819',
              colorInputText: '#fdfdf9',
              colorText: '#fdfdf9',
              colorTextSecondary: 'rgba(253,253,249,0.6)',
              borderRadius: '8px',
            },
          }}
        >
          <SmoothScroll>
            <LoadingScreen />
            <ScrollProgress />
            <CustomCursor />
            <AuroraPillar />
            <ScrollBackground />
            <GlobalFilm />
            <div className="noise-overlay" />
            <div className="relative z-10">
              {children}
            </div>
          </SmoothScroll>
        </ClerkProvider>
      </body>
    </html>
  );
}
