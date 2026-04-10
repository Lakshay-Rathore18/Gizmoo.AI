export const brand = {
  name: 'Gizmoo AI',
  tagline: 'Never Miss a Call. Ever.',
  description:
    "Gizmoo AI answers calls, books appointments, updates your calendar, and makes outbound calls — all with a voice so natural, callers won't know it's AI.",
  url: 'https://gizmoo.ai',
  phone: '+61 XXX XXX XXX',
  social: {
    x: 'https://x.com/gizmooai',
    github: 'https://github.com/gizmooai',
    linkedin: 'https://linkedin.com/company/gizmooai',
    discord: 'https://discord.gg/gizmooai',
  },
  spline: {
    hero: 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
    demo: 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode',
    tech: 'https://prod.spline.design/us3ALejTXl6usHQ5/scene.splinecode',
    cta: 'https://prod.spline.design/zLqKpk-DbgAbjwrR/scene.splinecode',
  },
} as const;

export const metrics = [
  { value: '50,000', label: 'calls answered', suffix: '+' },
  { value: '99.7', label: 'caller satisfaction', suffix: '%' },
  { value: '24/7', label: 'availability', suffix: '' },
  { value: '30', label: 'avg response', suffix: 's' },
] as const;
