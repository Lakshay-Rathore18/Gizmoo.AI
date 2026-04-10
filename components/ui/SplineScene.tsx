'use client';

import { Component, Suspense, lazy, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const Spline = lazy(() => import('@splinetool/react-spline'));

function SplineFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full h-full flex items-center justify-center',
        'bg-gradient-to-br from-cyber-cyan/10 via-cyber-violet/10 to-cyber-lime/5',
        'animate-glow-pulse',
        className,
      )}
      aria-hidden="true"
    >
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-cyber-cyan/40 blur-3xl animate-glow-pulse" />
        <span className="relative block w-16 h-16 border-2 border-cyber-cyan/60 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const fallback = <SplineFallback className={className} />;

  return (
    <SplineErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <Spline scene={scene} className={className} />
      </Suspense>
    </SplineErrorBoundary>
  );
}
