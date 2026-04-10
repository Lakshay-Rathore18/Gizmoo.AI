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
  'group relative inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight rounded-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-50 disabled:pointer-events-none overflow-hidden';

const variants: Record<Variant, string> = {
  primary:
    'bg-paper text-ink hover:bg-cyber-cyan hover:-translate-y-0.5 shadow-[0_0_0_0_rgba(0,229,255,0)] hover:shadow-[0_8px_32px_-4px_rgba(0,229,255,0.6)]',
  secondary:
    'bg-transparent text-paper border border-surface-border hover:border-cyber-cyan hover:bg-cyber-cyan/5 hover:-translate-y-0.5',
  ghost: 'bg-transparent text-paper/80 hover:text-cyber-cyan hover:bg-paper/5',
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
      // TODO: wire real handler
      onClick={props.onClick ?? (() => {})}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
        />
      )}
    </button>
  );
});
