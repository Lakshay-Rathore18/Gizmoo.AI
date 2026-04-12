export const brand = {
  name: 'Gizmoo AI',
  logo: '/logo.png',
  logoAlt: 'Gizmoo AI',
  tagline: 'Never Miss a Call. Ever.',
  description:
    "Gizmoo AI answers your phone 24/7, qualifies jobs, and books customers directly into your calendar — built for Australian plumbers, electricians, HVAC technicians, and builders.",
  url: 'https://gizmoo.me',
  phone: '+61 489 072 416',
  salesPhone: '+61 0424 700 797',
  email: 'hellogizmooai@gmail.com',
  calLink: 'https://cal.com/lakshay-rathore-eaosso/demo-booking',
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
