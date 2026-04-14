'use client';

import { useRef, useState, type HTMLAttributes, type ReactNode, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: boolean;
  spotlightColor?: string;
}

export function Card({
  className,
  children,
  glow = false,
  spotlightColor = 'rgba(255,255,255,0.06)',
  ...props
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        'group relative rounded-[2px] p-6 md:p-8 transition-all duration-200',
        'bg-white/[0.03] border border-white/[0.1]',
        'hover:border-white/[0.18]',
        glow && 'holo-border',
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[2px] transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
