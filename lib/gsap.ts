'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Physics2DPlugin } from 'gsap/Physics2DPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  MorphSVGPlugin,
  DrawSVGPlugin,
  MotionPathPlugin,
  Physics2DPlugin,
  CustomEase,
  Flip,
  Observer,
  useGSAP
);

CustomEase.create('primary', 'M0,0 C0.25,0.1 0.25,1 1,1');
CustomEase.create('expoOut', 'M0,0 C0.19,1 0.22,1 1,1');
CustomEase.create('expoInOut', 'M0,0 C0.87,0 0.13,1 1,1');
CustomEase.create('snappy', 'M0,0 C0.34,1.56 0.64,1 1,1');
CustomEase.create('anticipate', 'M0,0 C0.7,-0.4 0.4,1.4 1,1');
CustomEase.create('cinema', 'M0,0 C0.18,0.02 0.18,1 1,1');

gsap.defaults({
  ease: 'expoOut',
  duration: 0.8,
});

export {
  gsap,
  ScrollTrigger,
  SplitText,
  MorphSVGPlugin,
  DrawSVGPlugin,
  MotionPathPlugin,
  Physics2DPlugin,
  CustomEase,
  Flip,
  Observer,
  useGSAP,
};
