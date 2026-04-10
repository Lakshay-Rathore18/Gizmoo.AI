import { Nav } from '@/components/landing/Nav';
import { Hero } from '@/components/landing/Hero';
import { SocialProof } from '@/components/landing/SocialProof';
import { Features } from '@/components/landing/Features';
import { Demo } from '@/components/landing/Demo';
import { UseCases } from '@/components/landing/UseCases';
import { Tech } from '@/components/landing/Tech';
import { Testimonials } from '@/components/landing/Testimonials';
import { Pricing } from '@/components/landing/Pricing';
import { FAQ } from '@/components/landing/FAQ';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

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
