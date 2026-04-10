'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  value: string;
  suffix?: string;
  duration?: number;
}

export function Counter({ value, suffix = '', duration = 1600 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState('0');
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const numeric = parseFloat(value.replace(/[^\d.]/g, ''));
    const hasDecimal = value.includes('.');
    const hasComma = value.includes(',');
    const suffixChar = value.replace(/[\d.,]/g, '');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = numeric * eased;
            const formatted = hasDecimal
              ? current.toFixed(2)
              : hasComma
                ? Math.floor(current).toLocaleString()
                : Math.floor(current).toString();
            setDisplay(formatted + suffixChar);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
