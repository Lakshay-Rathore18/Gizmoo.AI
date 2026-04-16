'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins ONCE at module level
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Set project-wide defaults
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
});

export { gsap, ScrollTrigger, useGSAP };
