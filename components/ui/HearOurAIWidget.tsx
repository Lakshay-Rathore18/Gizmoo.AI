'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Phone, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HearOurAIWidgetProps {
  phoneNumber: string;
  className?: string;
}

export function HearOurAIWidget({ phoneNumber, className }: HearOurAIWidgetProps) {
  const reduce = useReducedMotion();
  const telHref = `tel:${phoneNumber.replace(/\s+/g, '')}`;

  return (
    <motion.a
      href={telHref}
      data-action="call-ai-demo"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative block w-full max-w-lg',
        'bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]',
        'p-6 md:p-7 rounded-2xl',
        'hover:-translate-y-1 transition-transform duration-300',
        className,
      )}
      aria-label={`Call Gizmoo AI demo line at ${phoneNumber}`}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 bg-cyber-cyan/20 blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-500"
      />

      <div className="relative flex items-center gap-5">
        {/* Pulsing phone icon */}
        <div className="relative shrink-0">
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-cyber-cyan/30 blur-xl animate-glow-pulse"
          />
          <span
            aria-hidden
            className="absolute -inset-2 rounded-full border border-cyber-cyan/40 animate-ping"
          />
          <span
            aria-hidden
            className="absolute -inset-4 rounded-full border border-cyber-cyan/20 animate-ping [animation-delay:0.6s]"
          />
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-violet flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.5)]">
            <PhoneCall className="w-6 h-6 text-ink" aria-hidden />
          </div>
        </div>

        {/* Copy */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyber-lime flex items-center gap-1.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-cyber-lime opacity-75 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-cyber-lime" />
              </span>
              Available 24/7
            </span>
          </div>
          <div className="font-display font-bold text-xl md:text-2xl tracking-tight text-paper leading-tight">
            Hear Our AI in Action
          </div>
          <div className="mt-1 font-mono text-lg md:text-xl font-bold text-gradient-brand tracking-wide">
            {phoneNumber}
          </div>
          <div className="mt-2 text-xs text-paper/60">
            Call now — experience Gizmoo AI yourself. No signup required.
          </div>
        </div>

        {/* Animated sound waves */}
        <div
          aria-hidden
          className="hidden sm:flex items-end gap-1 shrink-0 h-10"
        >
          {[0.3, 0.6, 0.9, 0.5, 0.7].map((h, i) => (
            <motion.span
              key={i}
              className="w-[3px] bg-gradient-to-t from-cyber-cyan to-cyber-violet rounded-full origin-bottom"
              initial={{ scaleY: h }}
              animate={reduce ? undefined : { scaleY: [h, h * 0.3, h * 1.1, h * 0.5, h] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.12,
                ease: 'easeInOut',
              }}
              style={{ height: '100%' }}
            />
          ))}
        </div>
      </div>

      {/* Hover CTA strip */}
      <div className="relative mt-5 pt-5 border-t border-white/[0.08] flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-paper/50">
          Free · No signup · Live AI
        </span>
        <span className="inline-flex items-center gap-2 font-display font-bold text-sm text-cyber-cyan group-hover:text-paper transition-colors">
          <Phone className="w-3.5 h-3.5" />
          Call Now — It&apos;s Free
        </span>
      </div>
    </motion.a>
  );
}
