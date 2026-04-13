import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/landing/Nav';

export const metadata: Metadata = {
  title: 'Privacy Policy — Gizmoo AI',
  description: 'How Gizmoo AI collects, uses, and protects your data. Compliant with the Australian Privacy Act 1988. Learn about call recordings, caller information, and your rights.',
  alternates: { canonical: 'https://gizmoo.me/privacy' },
  openGraph: {
    title: 'Privacy Policy — Gizmoo AI',
    description: 'How Gizmoo AI collects, uses, and protects your data under Australian privacy law.',
    url: 'https://gizmoo.me/privacy',
    siteName: 'Gizmoo AI',
    locale: 'en_AU',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ink text-paper">
      <Nav />
      <div className="max-w-3xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-paper/60 hover:text-cyber-cyan transition-colors mb-12"
        >
          &larr; Back to home
        </Link>

        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-paper/50 font-mono text-sm">
          Last updated: April 2025
        </p>

        <div className="mt-12 space-y-10 text-paper/80 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">Overview</h2>
            <p>
              Gizmoo AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to
              protecting the privacy and personal information of our users, their customers, and
              callers. This Privacy Policy explains how we collect, use, store, and protect
              information when you use our AI voice receptionist service.
            </p>
            <p className="mt-3">
              We comply with the Australian Privacy Principles (APPs) contained in the
              <em> Privacy Act 1988</em> (Cth) and applicable state and territory legislation.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">
              Information We Collect
            </h2>
            <p>We may collect and process the following types of information:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-paper/70">
              <li>
                <strong className="text-paper">Call recordings and transcripts</strong> — audio
                recordings and AI-generated transcriptions of phone calls handled by our service.
              </li>
              <li>
                <strong className="text-paper">Caller information</strong> — caller name, phone
                number, and any details provided during the call.
              </li>
              <li>
                <strong className="text-paper">Booking details</strong> — appointment dates, times,
                service types, and customer preferences captured during scheduling.
              </li>
              <li>
                <strong className="text-paper">Device and browser metadata</strong> — IP address,
                browser type, operating system, and referral URLs when you visit our website.
              </li>
              <li>
                <strong className="text-paper">Account information</strong> — business name, contact
                email, phone number, and payment details provided during registration.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">
              How We Use Your Information
            </h2>
            <ul className="space-y-2 list-disc list-inside text-paper/70">
              <li>To provide and operate our AI voice receptionist service</li>
              <li>To answer calls, book appointments, and send confirmations on your behalf</li>
              <li>To generate call transcripts and performance reports</li>
              <li>To improve call quality, accuracy, and our AI models</li>
              <li>To communicate with you about your account, billing, and service updates</li>
              <li>To comply with legal obligations and resolve disputes</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">
              Third-Party Service Providers
            </h2>
            <p>
              We use trusted third-party providers to deliver our service. These may include:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-paper/70">
              <li>AI processing provider — for voice recognition and natural language understanding</li>
              <li>SMS delivery provider — for sending appointment confirmations and reminders</li>
              <li>Database provider — for securely storing call data and booking information</li>
              <li>Payment processor — for handling subscription billing</li>
              <li>Calendar integration provider — for syncing appointments with your calendar</li>
            </ul>
            <p className="mt-3">
              All third-party providers are contractually required to handle your data in accordance
              with applicable privacy laws and our data protection standards.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">Data Retention</h2>
            <ul className="space-y-2 list-disc list-inside text-paper/70">
              <li>
                <strong className="text-paper">Call recordings and transcripts</strong> — retained
                for 90 days from the date of the call, then permanently deleted.
              </li>
              <li>
                <strong className="text-paper">Booking and appointment data</strong> — retained for
                2 years to support ongoing customer relationship management.
              </li>
              <li>
                <strong className="text-paper">Account information</strong> — retained for the
                duration of your subscription plus 12 months after cancellation.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">
              Your Rights under the Australian Privacy Act 1988
            </h2>
            <p>Under the Privacy Act 1988, you have the right to:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-paper/70">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate or outdated information</li>
              <li>Request deletion of your personal information (subject to legal obligations)</li>
              <li>Opt out of receiving marketing communications</li>
              <li>Lodge a complaint with us or the Office of the Australian Information Commissioner (OAIC)</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:hellogizmooai@gmail.com" className="text-cyber-cyan hover:underline">
                hellogizmooai@gmail.com
              </a>.
            </p>
          </section>

          <section id="cookies">
            <h2 className="font-display font-bold text-xl mb-4 text-paper">Cookies Policy</h2>
            <p>
              Our website uses essential cookies to ensure proper functionality. We do not use
              third-party tracking cookies or advertising cookies. Essential cookies include:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-paper/70">
              <li>Session cookies — to maintain your browsing session</li>
              <li>Preference cookies — to remember your settings (e.g., pricing toggle)</li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Disabling essential cookies
              may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl mb-4 text-paper">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to make a complaint,
              please contact us:
            </p>
            <p className="mt-3">
              <a href="mailto:hellogizmooai@gmail.com" className="text-cyber-cyan hover:underline">
                hellogizmooai@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
