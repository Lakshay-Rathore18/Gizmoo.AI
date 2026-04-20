'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MotionProvider } from '@/components/MotionProvider';
import { Nav } from '@/components/landing/Nav';
import { CinematicJourney } from '@/components/journey/CinematicJourney';
import { About } from '@/components/landing/About';
import { Features } from '@/components/landing/Features';
import { GlowDivider } from '@/components/GlowDivider';

// Heavy below-the-fold sections — load after hydration, not in the
// initial JS payload. Each shows a minimal loading shell sized to
// match final height so no CLS occurs.
const sectionShell = (minH: string) => () => (
  <div aria-hidden="true" className="w-full" style={{ minHeight: minH }} />
);

const Demo = dynamic(() => import('@/components/landing/Demo').then((m) => m.Demo), {
  ssr: false,
  loading: sectionShell('600px'),
});
const UseCases = dynamic(() => import('@/components/landing/UseCases').then((m) => m.UseCases), {
  ssr: false,
  loading: sectionShell('500px'),
});
const HowItWorks = dynamic(() => import('@/components/landing/HowItWorks').then((m) => m.HowItWorks), {
  ssr: false,
  loading: sectionShell('600px'),
});
const Testimonials = dynamic(() => import('@/components/landing/Testimonials').then((m) => m.Testimonials), {
  ssr: false,
  loading: sectionShell('500px'),
});
const Pricing = dynamic(() => import('@/components/landing/Pricing').then((m) => m.Pricing), {
  ssr: false,
  loading: sectionShell('700px'),
});
const FAQ = dynamic(() => import('@/components/landing/FAQ').then((m) => m.FAQ), {
  ssr: false,
  loading: sectionShell('600px'),
});
const CTASection = dynamic(() => import('@/components/landing/CTASection').then((m) => m.CTASection), {
  ssr: false,
  loading: sectionShell('400px'),
});
const Footer = dynamic(() => import('@/components/landing/Footer').then((m) => m.Footer), {
  ssr: false,
  loading: sectionShell('200px'),
});
const ContactOverlay = dynamic(
  () => import('@/components/landing/ContactOverlay').then((m) => m.ContactOverlay),
  { ssr: false },
);

export default function Page() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <MotionProvider>
      <main id="main-content" className="relative">
        <Nav onContactOpen={() => setContactOpen(true)} />
        <CinematicJourney onContactOpen={() => setContactOpen(true)} />
        <GlowDivider />
        <About />
        <GlowDivider />
        <Features />
        <GlowDivider />
        <Demo />
        <GlowDivider />
        <UseCases />
        <GlowDivider />
        <div id="how-it-works"><HowItWorks /></div>
        <GlowDivider />
        <div id="testimonials"><Testimonials /></div>
        <GlowDivider />
        <Pricing />
        <GlowDivider />
        <FAQ />
        <GlowDivider />
        <div id="cta-footer"><CTASection onContactOpen={() => setContactOpen(true)} /></div>
        <Footer />
      </main>
      <ContactOverlay isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </MotionProvider>
  );
}
