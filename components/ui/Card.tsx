'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: boolean;
}

export function Card({ className, children, glow = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'group relative bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm rounded-2xl p-6 md:p-8 transition-all duration-300',
        'hover:border-blue-500/30 hover:-translate-y-1',
        glow && 'holo-border',
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(0,229,255,0.08), transparent 40%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
