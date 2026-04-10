import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { brand } from '@/lib/brand';
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
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    'Gizmoo AI',
    'AI agents',
    'autonomous AI',
    'AI automation',
    'AI developer tools',
    'AI platform',
  ],
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    url: brand.url,
    siteName: brand.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="font-sans bg-ink text-paper antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
