export const brand = {
  name: 'Gizmoo AI',
  tagline: 'The AI voice receptionist that answers every call, books every appointment, 24/7.',
  description:
    "Gizmoo AI answers your phone 24/7, qualifies jobs, and books customers directly into your calendar — built for Australian plumbers, electricians, HVAC technicians, and builders.",
  url: 'https://gizmoo.me',
  phone: '+61 489 072 416',
  salesPhone: '+61 424 700 797',
  email: 'hellogizmooai@gmail.com',
  abn: '98 305 399 112',
  calLink: 'https://cal.com/lakshay-rathore-eaosso/demo-booking',
  signIn: 'https://accounts.gizmoo.me/sign-in',
  signUp: 'https://accounts.gizmoo.me/sign-up',
} as const;

export const stats = [
  { value: 50000, label: 'Calls Answered', suffix: '+', display: '50,000+' },
  { value: 99.7, label: 'Satisfaction', suffix: '%', display: '99.7%' },
  { value: 24, label: 'Availability', suffix: '/7', display: '24/7' },
  { value: 30, label: 'Avg Response', suffix: 's', display: '30s' },
  { value: 500, label: 'Businesses', suffix: '+', display: '500+' },
  { value: 15, label: 'Setup Time', suffix: ' min', display: '15 min' },
] as const;

export const testimonials = [
  {
    quote: "Gizmoo picks up every call we miss. Our bookings went up 40% in the first month.",
    name: "Sarah Chen",
    role: "Owner",
    company: "Sydney Plumbing Co.",
  },
  {
    quote: "Patients love that someone always answers. It's like having a full-time receptionist for a fraction of the cost.",
    name: "Dr. James Wright",
    role: "Practice Manager",
    company: "Northside Medical",
  },
  {
    quote: "I was skeptical about AI, but callers genuinely can't tell the difference. It's incredible.",
    name: "Maria Santos",
    role: "Director",
    company: "Elite Real Estate",
  },
  {
    quote: "We went from missing 30% of calls to missing zero. The ROI paid for itself in week one.",
    name: "Tom Baker",
    role: "Owner",
    company: "Baker Electrical",
  },
  {
    quote: "The appointment booking is seamless. My calendar is always full now, no more phone tag.",
    name: "Lisa Park",
    role: "Founder",
    company: "Luxe Hair Studio",
  },
  {
    quote: "Outbound reminders cut our no-shows by 60%. Gizmoo literally pays for itself.",
    name: "Mike Thompson",
    role: "Operations Manager",
    company: "CoolAir HVAC",
  },
] as const;

export const faqs = [
  {
    q: "How natural does Gizmoo AI actually sound?",
    a: "Extremely natural. Gizmoo uses advanced voice AI with natural pauses, filler words, and emotional understanding. Most callers do not realize they are speaking with AI.",
  },
  {
    q: "Can Gizmoo handle complex requests?",
    a: "Yes. Gizmoo understands context, remembers details within a conversation, handles multi-step requests (book, reschedule, take a message, answer a question), and knows exactly when to transfer to a human for complex situations.",
  },
  {
    q: "What happens if Gizmoo cannot help a caller?",
    a: "Gizmoo seamlessly transfers to your team when it hits something it cannot handle, or takes a detailed message with full context and caller sentiment. Nothing ever falls through the cracks.",
  },
  {
    q: "How long does setup take?",
    a: "Most businesses are live within 15 minutes. Forward your existing number or spin up a new AI-powered line, customize your greeting, booking rules, and business info — and you are ready to answer calls.",
  },
  {
    q: "Which calendars does Gizmoo integrate with?",
    a: "Google Calendar, Outlook, Calendly, Acuity Scheduling, Cal.com, and 100+ more through our integration marketplace. Your calendar stays perfectly synced, time-zone aware, and never double-booked.",
  },
  {
    q: "Can Gizmoo make outbound calls?",
    a: "Absolutely. Appointment reminders, follow-up calls, confirmation calls, and re-engagement campaigns. Set the rules and the schedule, and Gizmoo dials — politely, consistently, and at scale.",
  },
  {
    q: "Is my data and caller information secure?",
    a: "Yes. Gizmoo is SOC 2 Type II compliant, uses end-to-end encryption, and follows strict data handling protocols. Healthcare customers can sign a HIPAA BAA. Your business data and caller PII are always protected.",
  },
  {
    q: "What industries use Gizmoo?",
    a: "Medical and dental practices, law firms, real estate, salons and spas, home services (HVAC, plumbing, electrical), restaurants, and any business that receives phone calls.",
  },
  {
    q: "Can I customize what Gizmoo says?",
    a: "Completely. Customize greetings, responses, booking rules, after-hours behavior, business information, and even the personality of the AI to match your brand voice exactly.",
  },
  {
    q: "What happens if I go over my call limit?",
    a: "We will never cut a caller off mid-conversation. You will get a notification as you approach your limit with a one-click upgrade option, so service stays uninterrupted.",
  },
] as const;
