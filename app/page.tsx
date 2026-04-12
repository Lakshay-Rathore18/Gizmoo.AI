'use client';

import dynamic from 'next/dynamic';
import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';

const SocialProof = dynamic(() => import('@/components/landing/SocialProof').then(m => ({ default: m.SocialProof })), { ssr: false });
const Features = dynamic(() => import('@/components/landing/Features').then(m => ({ default: m.Features })), { ssr: false });
const Demo = dynamic(() => import('@/components/landing/Demo').then(m => ({ default: m.Demo })), { ssr: false });
const UseCases = dynamic(() => import('@/components/landing/UseCases').then(m => ({ default: m.UseCases })), { ssr: false });
const Tech = dynamic(() => import('@/components/landing/Tech').then(m => ({ default: m.Tech })), { ssr: false });
const Testimonials = dynamic(() => import('@/components/landing/Testimonials').then(m => ({ default: m.Testimonials })), { ssr: false });
const Pricing = dynamic(() => import('@/components/landing/Pricing').then(m => ({ default: m.Pricing })), { ssr: false });
const FAQ = dynamic(() => import('@/components/landing/FAQ').then(m => ({ default: m.FAQ })), { ssr: false });
const CTASection = dynamic(() => import('@/components/landing/CTASection').then(m => ({ default: m.CTASection })), { ssr: false });
const Footer = dynamic(() => import('@/components/landing/Footer').then(m => ({ default: m.Footer })), { ssr: false });

export default function Page() {
  return (
    <main className="relative bg-ink text-paper">
      <Nav />
      <Hero />
      <SocialProof />
      <Features />
      <Demo />
      <UseCases />
      <Tech />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
