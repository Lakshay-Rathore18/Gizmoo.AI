import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://turtclknacgpwnxocubx.supabase.co" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': 'https://gizmoo.me/#organization',
                name: 'Gizmoo AI',
                legalName: 'Gizmoo AI Pty Ltd',
                url: 'https://gizmoo.me',
                logo: 'https://gizmoo.me/icon-512.png',
                image: 'https://gizmoo.me/api/og',
                description: 'Gizmoo AI is an Australian AI voice receptionist platform that answers business phone calls 24/7, qualifies leads, books appointments, and sends confirmations — purpose-built for plumbers, electricians, HVAC technicians, builders, medical practices, law firms, salons, and real estate agencies.',
                telephone: '+61489072416',
                email: 'hellogizmooai@gmail.com',
                foundingDate: '2025',
                address: {
                  '@type': 'PostalAddress',
                  addressRegion: 'NSW',
                  addressCountry: 'AU',
                },
                areaServed: {
                  '@type': 'Country',
                  name: 'Australia',
                },
                sameAs: [],
                contactPoint: [
                  {
                    '@type': 'ContactPoint',
                    telephone: '+61489072416',
                    contactType: 'customer service',
                    availableLanguage: 'English',
                    areaServed: 'AU',
                  },
                  {
                    '@type': 'ContactPoint',
                    telephone: '+61424700797',
                    contactType: 'sales',
                    availableLanguage: 'English',
                    areaServed: 'AU',
                  },
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
                '@type': 'WebPage',
                '@id': 'https://gizmoo.me/#webpage',
                url: 'https://gizmoo.me',
                name: 'Gizmoo AI — AI Voice Receptionist for Australian Tradies',
                description: 'Never miss a call. Gizmoo AI answers your phone 24/7, qualifies jobs, and books customers directly into your calendar. Built for Australian plumbers, electricians, HVAC, and builders.',
                isPartOf: { '@id': 'https://gizmoo.me/#website' },
                about: { '@id': 'https://gizmoo.me/#organization' },
                inLanguage: 'en-AU',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Service',
                '@id': 'https://gizmoo.me/#service',
                name: 'Gizmoo AI Voice Receptionist',
                serviceType: 'AI Voice Receptionist',
                provider: { '@id': 'https://gizmoo.me/#organization' },
                description: 'AI-powered phone answering service that picks up every call within seconds, qualifies leads, books appointments into your calendar, sends SMS confirmations, makes outbound reminder calls, and transfers complex queries to humans — available 24 hours a day, 7 days a week, 365 days a year.',
                areaServed: { '@type': 'Country', name: 'Australia' },
                audience: {
                  '@type': 'Audience',
                  audienceType: 'Small and medium trade businesses, medical practices, law firms, salons, real estate agencies',
                },
                hasOfferCatalog: {
                  '@type': 'OfferCatalog',
                  name: 'Gizmoo AI Plans',
                  itemListElement: [
                    {
                      '@type': 'Offer',
                      name: 'Starter Plan',
                      description: '24/7 AI voice receptionist, job qualification & lead scoring, calendar booking automation, SMS confirmations, monthly performance report.',
                      price: '413',
                      priceCurrency: 'AUD',
                      priceSpecification: {
                        '@type': 'UnitPriceSpecification',
                        price: '413',
                        priceCurrency: 'AUD',
                        unitText: 'month',
                        billingDuration: { '@type': 'QuantitativeValue', value: 1, unitCode: 'ANN' },
                      },
                      availability: 'https://schema.org/InStock',
                    },
                    {
                      '@type': 'Offer',
                      name: 'Enterprise Plan',
                      description: 'Custom pricing for multi-location businesses, high call volumes, or custom integrations.',
                      availability: 'https://schema.org/InStock',
                    },
                  ],
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Gizmoo AI',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                offers: {
                  '@type': 'Offer',
                  price: '413',
                  priceCurrency: 'AUD',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  bestRating: '5',
                  ratingCount: '500',
                  reviewCount: '127',
                },
                featureList: 'AI voice receptionist, 24/7 call answering, appointment booking, calendar sync, outbound calls, smart transfers, SMS confirmations, lead qualification',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'How natural does Gizmoo AI actually sound?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Extremely natural. Gizmoo uses advanced voice AI with natural pauses, filler words, and emotional understanding. Most callers do not realize they are speaking with AI.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can Gizmoo handle complex requests?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes. Gizmoo understands context, remembers details within a conversation, handles multi-step requests (book, reschedule, take a message, answer a question), and knows exactly when to transfer to a human for complex situations.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What happens if Gizmoo cannot help a caller?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Gizmoo seamlessly transfers to your team when it hits something it cannot handle, or takes a detailed message with full context and caller sentiment. Nothing ever falls through the cracks.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How long does setup take?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Most businesses are live within 15 minutes. Forward your existing number or spin up a new AI-powered line, customize your greeting, booking rules, and business info — and you are ready to answer calls.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Which calendars does Gizmoo integrate with?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Google Calendar, Outlook, Calendly, Acuity Scheduling, Cal.com, and 100+ more through our integration marketplace. Your calendar stays perfectly synced, time-zone aware, and never double-booked.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can Gizmoo make outbound calls?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Absolutely. Appointment reminders, follow-up calls, confirmation calls, and re-engagement campaigns. Set the rules and the schedule, and Gizmoo dials — politely, consistently, and at scale.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is my data and caller information secure?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes. Gizmoo is SOC 2 Type II compliant, uses end-to-end encryption, and follows strict data handling protocols. Healthcare customers can sign a HIPAA BAA. Your business data and caller PII are always protected.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What industries use Gizmoo?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Medical and dental practices, law firms, real estate, salons and spas, home services (HVAC, plumbing, electrical), restaurants, and any business that receives phone calls.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Can I customize what Gizmoo says?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Completely. Customize greetings, responses, booking rules, after-hours behavior, business information, and even the personality of the AI to match your brand voice exactly.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'What happens if I go over my call limit?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'We will never cut a caller off mid-conversation. You will get a notification as you approach your limit with a one-click upgrade option, so service stays uninterrupted.',
                    },
                  },
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'HowTo',
                name: 'How to set up Gizmoo AI Voice Receptionist',
                description: 'Get your AI voice receptionist answering calls in under 15 minutes with three simple steps.',
                totalTime: 'PT15M',
                step: [
                  {
                    '@type': 'HowToStep',
                    position: 1,
                    name: 'Connect Your Number',
                    text: 'Forward your existing business line or get a new AI-powered number. 5-minute setup — no hardware, no code.',
                  },
                  {
                    '@type': 'HowToStep',
                    position: 2,
                    name: 'Train Your AI',
                    text: 'Tell Gizmoo about your business, services, hours, and booking rules. It learns your tone and brand voice in minutes.',
                  },
                  {
                    '@type': 'HowToStep',
                    position: 3,
                    name: 'Go Live',
                    text: 'Start answering calls and booking appointments immediately. Monitor every conversation with real-time analytics.',
                  },
                ],
              },
            ]),
          }}
        />
      </head>
      <body className="font-sans bg-ink text-paper antialiased overflow-x-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-cyber-cyan focus:text-ink focus:px-4 focus:py-2 focus:font-semibold">
          Skip to main content
        </a>
        <ClerkProvider
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          signInForceRedirectUrl="/"
          signUpForceRedirectUrl="/"
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: '#3B82F6',
              colorBackground: '#0a0a0a',
              colorInputBackground: '#111111',
              colorInputText: '#ffffff',
              colorText: '#ffffff',
              colorTextSecondary: 'rgba(255,255,255,0.6)',
              borderRadius: '0.75rem',
            },
            elements: {
              card: 'bg-[#0a0a0a] border border-white/[0.08] shadow-[0_0_40px_rgba(59,130,246,0.15)]',
              headerTitle: 'text-white',
              headerSubtitle: 'text-white/60',
              socialButtonsBlockButton: 'bg-white/[0.05] border-white/[0.08] hover:bg-white/[0.08] text-white',
              formFieldInput: 'bg-[#111111] border-white/[0.08] text-white',
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]',
              footerActionLink: 'text-blue-400 hover:text-blue-300',
              modalCloseButton: 'text-white/60 hover:text-white',
            },
          }}
        >
          {children}
          <CookieBanner />
        </ClerkProvider>
      </body>
    </html>
  );
}
