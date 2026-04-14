'use client';

import { useState } from 'react';
import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
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
        <Hero onContactOpen={() => setContactOpen(true)} />
        <GlowDivider />
        <About />
        <GlowDivider />
        <Features />
        <GlowDivider />
        <Demo />
        <GlowDivider />
        <UseCases />
        <GlowDivider />
        <HowItWorks />
        <GlowDivider />
        <Testimonials />
        <GlowDivider />
        <Pricing />
        <GlowDivider />
        <FAQ />
        <GlowDivider />
        <CTASection onContactOpen={() => setContactOpen(true)} />
        <Footer />
      </main>
      <ContactOverlay isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
