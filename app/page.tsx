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
    <main id="main-content" className="relative bg-ink text-paper">
      <Nav />
      <Hero />

      {/* GEO: Entity definition block — crawlable by AI answer engines, visually minimal */}
      <section aria-label="About Gizmoo AI" className="relative bg-ink border-b border-white/[0.08]">
        <div aria-hidden className="absolute inset-0 topo-texture pointer-events-none" />
        <article className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-paper mb-6">
            What is Gizmoo AI?
          </h2>
          <p className="text-paper/70 text-base md:text-lg leading-relaxed mb-4">
            <strong className="text-paper">Gizmoo AI</strong> is an Australian AI voice receptionist platform
            that answers business phone calls 24 hours a day, 7 days a week. It picks up every inbound call
            within seconds, qualifies the caller, books appointments directly into your calendar, sends SMS
            confirmations, and makes outbound reminder calls — all without human intervention. Gizmoo is
            purpose-built for Australian trade businesses including plumbers, electricians, HVAC technicians,
            and builders, as well as medical practices, law firms, salons, and real estate agencies.
          </p>
          <p className="text-paper/70 text-base md:text-lg leading-relaxed mb-4">
            Unlike traditional answering services or basic IVR phone trees, Gizmoo uses advanced conversational
            AI with natural-sounding speech, contextual understanding, and emotional intelligence. Most callers
            do not realise they are speaking with AI. When Gizmoo encounters a request it cannot handle, it
            seamlessly transfers the call to a human with full context and a transcript of the conversation.
          </p>
          <p className="text-paper/70 text-base md:text-lg leading-relaxed mb-6">
            Gizmoo integrates with Google Calendar, Outlook, Calendly, Acuity Scheduling, Cal.com, HubSpot,
            Salesforce, and 100+ other business tools. Setup takes under 15 minutes with no hardware or
            coding required. Pricing starts at $413 AUD per month on an annual plan, with a 14-day free
            trial and no lock-in contracts.
          </p>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="glass-card p-4">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-paper/50">Calls Answered</dt>
              <dd className="font-display font-bold text-2xl text-paper mt-1">50,000+</dd>
            </div>
            <div className="glass-card p-4">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-paper/50">Satisfaction</dt>
              <dd className="font-display font-bold text-2xl text-paper mt-1">99.7%</dd>
            </div>
            <div className="glass-card p-4">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-paper/50">Availability</dt>
              <dd className="font-display font-bold text-2xl text-paper mt-1">24/7/365</dd>
            </div>
            <div className="glass-card p-4">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-paper/50">Avg Response</dt>
              <dd className="font-display font-bold text-2xl text-paper mt-1">30 seconds</dd>
            </div>
          </dl>
        </article>
      </section>

      <SocialProof />
      <div aria-hidden className="h-px mesh-divider" />
      <Features />
      <div aria-hidden className="h-[2px] mesh-divider" />
      <Demo />
      <div aria-hidden className="h-px mesh-divider" />
      <UseCases />
      <div aria-hidden className="h-[2px] mesh-divider" />
      <Tech />
      <Testimonials />
      <div aria-hidden className="h-px mesh-divider" />
      <Pricing />
      <div aria-hidden className="h-[2px] mesh-divider" />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
