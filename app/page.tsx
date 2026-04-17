'use client';

import { useState } from 'react';
import { Nav } from '@/components/landing/Nav';
import { CinematicJourney } from '@/components/journey/CinematicJourney';
import { About } from '@/components/landing/About';
import { Features } from '@/components/landing/Features';
import { Demo } from '@/components/landing/Demo';
import { UseCases } from '@/components/landing/UseCases';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';
import { ContactOverlay } from '@/components/landing/ContactOverlay';
import { GlowDivider } from '@/components/GlowDivider';

export default function Page() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
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
    </>
  );
}
