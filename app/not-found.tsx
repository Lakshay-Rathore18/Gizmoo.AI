import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink text-paper flex items-center justify-center">
      <div className="text-center px-6">
        <div className="font-display font-bold text-[8rem] md:text-[12rem] leading-none text-[#3B82F6]">
          404
        </div>
        <h1 className="mt-4 font-display font-bold text-2xl md:text-4xl tracking-tight">
          Page not found
        </h1>
        <p className="mt-4 text-paper/60 text-lg max-w-md mx-auto">
          This page doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight rounded-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink overflow-hidden bg-paper text-ink hover:bg-cyber-cyan hover:-translate-y-0.5 shadow-[0_0_0_0_rgba(0,229,255,0)] hover:shadow-[0_8px_32px_-4px_rgba(0,229,255,0.6)] px-8 py-4 text-base md:text-lg"
          >
            <span className="relative z-10">Return Home</span>
          </Link>
        </div>
        <p className="mt-8 text-sm text-paper/50">
          Want to book a demo?{' '}
          <a
            href="https://cal.com/lakshay-rathore-eaosso/demo-booking"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyber-cyan hover:underline"
          >
            Schedule a call &rarr;
          </a>
        </p>
      </div>
    </main>
  );
}
