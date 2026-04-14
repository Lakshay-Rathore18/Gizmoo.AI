'use client';

import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-ink text-paper flex items-center justify-center">
      <div className="text-center px-6 max-w-lg">
        <div className="font-display font-bold text-6xl md:text-8xl text-white/55">
          Oops
        </div>
        <h1 className="mt-4 font-display font-bold text-2xl md:text-3xl tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-4 text-paper/60">
          An unexpected error occurred. Please try again or return to the home page.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="group relative inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight rounded-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink overflow-hidden bg-paper text-ink hover:bg-white/90 hover:-translate-y-0.5 shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_8px_32px_-4px_rgba(255,255,255,0.2)] px-8 py-4 text-base"
          >
            <span className="relative z-10">Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight rounded-none transition-all duration-200 bg-transparent text-paper border border-surface-border hover:border-white/30 hover:bg-white/5 hover:-translate-y-0.5 px-8 py-4 text-base"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
