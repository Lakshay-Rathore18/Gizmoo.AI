'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  'data-action'?: string;
}

const base =
  'group relative inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight rounded-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sarmat-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-50 disabled:pointer-events-none overflow-hidden';

const variants: Record<Variant, string> = {
  primary:
    'bg-sarmat-lime text-ink hover:bg-sarmat-limeLight hover:-translate-y-0.5 shadow-[0_0_20px_rgba(159,200,44,0.15)] hover:shadow-[0_0_30px_rgba(159,200,44,0.4)] rounded-xl',
  secondary:
    'bg-transparent text-paper border border-white/20 hover:border-white/40 hover:bg-white/5 hover:-translate-y-0.5 rounded-xl',
  ghost: 'bg-transparent text-paper/80 hover:text-sarmat-lime hover:bg-paper/5',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base md:text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-sarmat-lime via-sarmat-limeLight to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
        />
      )}
    </button>
  );
});
