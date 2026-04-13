'use client';

import { Star } from 'lucide-react';
import { Marquee } from '@/components/ui/Marquee';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const quotes = [
  {
    text: 'We went from missing 30% of calls to missing zero. Our bookings increased 40% in the first month. Best investment we have ever made.',
    name: 'Dr. Sarah Mitchell',
    role: 'Owner · Mitchell Family Dental',
  },
  {
    text: 'I was skeptical about AI, but Gizmoo sounds so natural. Clients often do not realize they are talking to AI until I tell them afterwards.',
    name: 'Michael Rodriguez',
    role: 'Partner · Rodriguez Law Firm',
  },
  {
    text: 'The outbound reminder calls alone saved us thousands in no-shows. Gizmoo paid for itself in the first week we had it running.',
    name: 'Jennifer Walsh',
    role: 'Founder · Serenity Spa',
  },
  {
    text: 'As a solo real estate agent, I cannot answer every call. Now I do not have to — and I never miss a lead, even at 9pm on a Sunday.',
    name: 'David Kim',
    role: 'Broker · Kim Real Estate',
  },
  {
    text: 'Setup took 10 minutes. That night, Gizmoo booked 3 emergency HVAC calls while I slept. Game changer for my business.',
    name: 'Tom Bradley',
    role: 'Owner · Bradley HVAC',
  },
  {
    text: 'Our patients love how easy booking is now. And my front desk finally has time to actually look patients in the eye instead of the phone.',
    name: 'Dr. Lena Chen',
    role: 'Founder · Northwind Clinic',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-36 bg-ink border-y border-white/[0.06] overflow-hidden">
      <ScrollReveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyber-violet">
            {'// 05 — What our customers say'}
          </span>
          <h2 className="mt-4 font-display font-bold text-4xl md:text-6xl tracking-tight max-w-3xl">
            500+ businesses <br />
            <span className="text-gradient-brand">never miss a call.</span>
          </h2>
        </div>
      </ScrollReveal>

      <Marquee className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" slow>
        {quotes.map((q, i) => (
          <figure
            key={i}
            className="w-[380px] md:w-[460px] shrink-0 bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm rounded-2xl p-7 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-cyber-lime text-cyber-lime" />
              ))}
            </div>
            <blockquote className="text-paper text-base leading-relaxed">
              &ldquo;{q.text}&rdquo;
            </blockquote>
            <figcaption className="mt-6 pt-4 border-t border-white/[0.08]">
              <div className="font-display font-bold text-sm">{q.name}</div>
              <div className="font-mono text-[11px] text-paper/50">{q.role}</div>
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}
