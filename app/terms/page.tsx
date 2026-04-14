import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/landing/Nav';

export const metadata: Metadata = {
  title: 'Terms of Service — Gizmoo AI',
  description: 'Gizmoo AI Terms of Service. Covers free trial, pricing, cancellation policy, acceptable use, and liability for our AI voice receptionist service in Australia.',
  alternates: { canonical: 'https://gizmoo.me/terms' },
  openGraph: {
    title: 'Terms of Service — Gizmoo AI',
    description: 'Terms of Service for Gizmoo AI voice receptionist. No lock-in contracts, cancel anytime.',
    url: 'https://gizmoo.me/terms',
    siteName: 'Gizmoo AI',
    locale: 'en_AU',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ink text-paper">
      <Nav />
      <div className="max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-paper/60 hover:text-sarmat-lime transition-colors mb-12"
        >
          &larr; Back to home
        </Link>

        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight">
          Terms of Service
        </h1>
        <p className="mt-4 text-paper/50 font-mono text-sm">
          Last updated: April 2025
        </p>

        <div className="mt-12 space-y-10 text-paper/80 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">
              Acceptance of Terms
            </h2>
            <p>
              By accessing or using the Gizmoo AI service (&ldquo;Service&rdquo;), you agree to be
              bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these
              Terms, do not use the Service. These Terms constitute a legally binding agreement
              between you and Gizmoo AI.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">
              Description of Service
            </h2>
            <p>
              Gizmoo AI provides an AI-powered voice receptionist service designed for Australian
              trade businesses including plumbers, electricians, HVAC technicians, builders, and
              other service-based businesses. The Service includes:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-paper/70">
              <li>24/7 automated phone answering with natural-sounding AI voice</li>
              <li>Job qualification and lead scoring</li>
              <li>Real-time appointment booking and calendar synchronisation</li>
              <li>SMS confirmations and appointment reminders</li>
              <li>Call transcription and performance reporting</li>
              <li>Outbound reminder and follow-up calls</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">Free Trial</h2>
            <p>
              New customers are eligible for a 14-day free trial of the Service. No credit card
              is required to start a free trial. During the trial period, you will have access to
              the full Starter plan features. At the end of the trial period, you may choose to
              subscribe to a paid plan or your access will be suspended.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">Payment Terms</h2>
            <p>The Starter plan includes the following fees:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-paper/70">
              <li>
                <strong className="text-paper">One-time setup fee:</strong> $1,200 AUD — covers
                initial configuration, voice training, and calendar integration.
              </li>
              <li>
                <strong className="text-paper">Monthly retainer:</strong> $589 AUD per month,
                billed monthly.
              </li>
              <li>
                <strong className="text-paper">Annual plan:</strong> $413 AUD per month, billed
                annually (30% discount).
              </li>
            </ul>
            <p className="mt-3">
              Enterprise pricing is available for multi-location businesses, high call volumes, or
              custom integrations. Contact us for a tailored quote.
            </p>
            <p className="mt-3">
              All prices are in Australian Dollars (AUD) and are exclusive of GST where applicable.
              Payment is due at the start of each billing period.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">
              Cancellation Policy
            </h2>
            <p>
              You may cancel your subscription at any time by providing 30 days written notice to{' '}
              <a href="mailto:hellogizmooai@gmail.com" className="text-sarmat-lime hover:underline">
                hellogizmooai@gmail.com
              </a>.
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-paper/70">
              <li>There is no lock-in contract.</li>
              <li>There is no cancellation fee.</li>
              <li>
                The Service will continue until the end of the current billing period after notice
                is given.
              </li>
              <li>
                The one-time setup fee is non-refundable after the 14-day trial period has ended.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-paper/70">
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Transmit harmful, threatening, abusive, or harassing content</li>
              <li>Interfere with or disrupt the Service or its infrastructure</li>
              <li>Attempt to gain unauthorised access to any part of the Service</li>
              <li>Use the Service for unsolicited bulk communications or spam</li>
              <li>Misrepresent the AI as a human caller without disclosing its nature when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">
              Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Gizmoo AI shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages, including but not
              limited to loss of profits, data, business opportunities, or goodwill, arising out of
              or in connection with your use of the Service.
            </p>
            <p className="mt-3">
              Our total liability for any claim arising from or relating to the Service shall not
              exceed the total fees paid by you in the 12 months preceding the claim.
            </p>
            <p className="mt-3">
              While we strive for high accuracy, AI-powered services may occasionally
              misunderstand callers or make booking errors. We recommend monitoring call transcripts
              regularly and maintaining a backup contact method for urgent matters.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of New South
              Wales, Australia. Any disputes arising from these Terms or the Service shall be
              subject to the exclusive jurisdiction of the courts of New South Wales, Australia.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <div className="mt-3 space-y-1">
              <p>
                Email:{' '}
                <a href="mailto:hellogizmooai@gmail.com" className="text-sarmat-lime hover:underline">
                  hellogizmooai@gmail.com
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href="tel:+61424700797" className="text-sarmat-lime hover:underline">
                  +61 0424 700 797
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
