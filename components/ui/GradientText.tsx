import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3';
}

export function GradientText({ children, className, as: Tag = 'span' }: GradientTextProps) {
  return <Tag className={cn('text-gradient-brand', className)}>{children}</Tag>;
}
