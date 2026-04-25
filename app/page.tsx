'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MotionProvider } from '@/components/MotionProvider';
import { Nav } from '@/components/landing/Nav';
import { VideoHero } from '@/components/landing/VideoHero';
import { About } from '@/components/landing/About';
import { GlowDivider } from '@/components/GlowDivider';

// Heavy below-the-fold sections — load after hydration, not in the
// initial JS payload. Each shows a minimal loading shell sized to
// match final height so no CLS occurs.
const sectionShell = (minH: string) => () => (
  <div aria-hidden="true" className="w-full" style={{ minHeight: minH }} />
);

const RevenueLeak = dynamic(
  () => import('@/components/landing/RevenueLeak').then((m) => m.RevenueLeak),
  { ssr: false, loading: sectionShell('100vh') },
);
const Features = dynamic(
  () => import('@/components/landing/Features').then((m) => m.Features),
  { ssr: false, loading: sectionShell('700px') },
);
const FourAgents = dynamic(
  () => import('@/components/landing/FourAgents').then((m) => m.FourAgents),
  { ssr: false, loading: sectionShell('100vh') },
);
const VelocityBand = dynamic(
  () => import('@/components/landing/VelocityBand').then((m) => m.VelocityBand),
  { ssr: false, loading: sectionShell('220px') },
);
const Demo = dynamic(() => import('@/components/landing/Demo').then((m) => m.Demo), {
  ssr: false,
  loading: sectionShell('600px'),
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

/**
 * Scroll narrative — intended arc, top to bottom:
 *
 *   01. HOOK        — VideoHero (ambient background video, static copy)
 *   02. CONTEXT     — About (what Gizmoo is, compact)
 *   03. PROBLEM     — RevenueLeak (pinned counters, cobalt accent, only chromatic break)
 *   04. CAPABILITY  — Features (the 6 tile breakdown)
 *   05. CREW        — FourAgents (horizontal pan, one agent per slide)
 *   06. PROOF       — Demo + HowItWorks + Testimonials
 *   07. PROMISE     — VelocityBand (marquee, velocity-reactive)
 *   08. OFFER       — Pricing
 *   09. OBJECTIONS  — FAQ
 *   10. CLOSE       — CTASection (with magnetic primary CTA)
 */
export default function Page() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <MotionProvider>
      <main id="main-content" className="relative">
        <Nav onContactOpen={() => setContactOpen(true)} />

        <VideoHero onContactOpen={() => setContactOpen(true)} />
        <GlowDivider />

        <About />
        <GlowDivider />

        <RevenueLeak />
        <GlowDivider />

        <Features />
        <GlowDivider />

        <FourAgents />
        <GlowDivider />

        <Demo />
        <GlowDivider />

        <div id="how-it-works"><HowItWorks /></div>
        <GlowDivider />

        <div id="testimonials"><Testimonials /></div>

        <VelocityBand />

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
