'use client';

import { useRef, useEffect, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from 'react';

type MagneticProps<T extends ElementType> = {
  as?: T;
  radius?: number;
  strength?: number;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'ref' | 'as' | 'children' | 'className'>;

/**
 * Cuberto-style magnetic wrapper. Pointer within `radius` nudges the
 * element toward the cursor by `strength` * distance, damped via lerp.
 *
 * Disabled on touch pointers (`(hover: none)`) and when prefers-reduced-motion.
 * Use at most ONCE per page — scarcity is the point.
 */
export function MagneticCTA<T extends ElementType = 'div'>({
  as,
  radius = 80,
  strength = 0.35,
  children,
  className = '',
  ...rest
}: MagneticProps<T>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === 'undefined') return;

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduced) return;

    let targetX = 0, targetY = 0;
    let x = 0, y = 0;
    let raf = 0;

    const lerp = 0.18;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        targetX = 0;
        targetY = 0;
      } else {
        const falloff = 1 - dist / radius;
        targetX = dx * strength * falloff;
        targetY = dy * strength * falloff;
      }
    };

    const loop = () => {
      x += (targetX - x) * lerp;
      y += (targetY - y) * lerp;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', onMove, { passive: true });
    const onLeave = () => { targetX = 0; targetY = 0; };
    window.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [radius, strength]);

  const Tag = (as ?? 'div') as ElementType;
  return (
    <Tag
      ref={ref as never}
      className={`magnetic-cta inline-block will-change-transform ${className}`}
      {...(rest as object)}
    >
      {children}
    </Tag>
  );
}
