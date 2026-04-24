'use client';

type Agent = {
  number: string;
  role: string;
  tagline: string;
  detail: string;
  capabilities: string[];
};

const agents: Agent[] = [
  {
    number: '01',
    role: 'The Receptionist',
    tagline: 'Picks up on ring one.',
    detail:
      'Answers every call day, night, Saturday morning, Boxing Day. Knows your business, your pricing, your service area. Sounds like a real person — because the AI is trained on how real receptionists actually talk.',
    capabilities: ['24/7 answer', 'Real Australian voice', 'Knows your service area', 'Warm, friendly, patient'],
  },
  {
    number: '02',
    role: 'The Qualifier',
    tagline: 'Separates real jobs from tyre-kickers.',
    detail:
      'Asks the right questions in the right order. Urgent leak? Routes to on-call. Quote shopper? Captures details and books a callback. Every call ends with a decision, not a "we\'ll get back to you".',
    capabilities: ['Intent triage', 'Budget + timeline check', 'Suburb + access check', 'Zero awkward silences'],
  },
  {
    number: '03',
    role: 'The Booker',
    tagline: 'Slots jobs into your calendar, live.',
    detail:
      'Reads your Google Calendar / Outlook / Cal.com in real time. Books directly into the slot. Sends SMS confirmations with the suburb, address, time, and your crew. No double bookings. No back-and-forth.',
    capabilities: ['Live calendar sync', 'SMS confirmation', 'Automatic reminders', 'Reschedules in-call'],
  },
  {
    number: '04',
    role: 'The Follow-up',
    tagline: "Chases the leads you would've lost.",
    detail:
      "Quote sent, no reply? A callback 48 hours later. Appointment tomorrow? A reminder tonight. No-show? A same-day message + rebook offer. The AI runs your sales motion while you're on site.",
    capabilities: ['Quote chasing', 'Appointment reminders', 'Same-day rebook', 'Post-job review request'],
  },
];

function AgentCard({ a }: { a: Agent }) {
  const head = a.role.split(' ').slice(0, -1).join(' ');
  const tail = a.role.split(' ').slice(-1).join(' ');
  return (
    <article className="nk-card p-6 md:p-8 h-full">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        Agent {a.number}
      </span>
      <h3 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-display font-normal leading-tight">
        {head} <span className="italic text-accent">{tail}</span>
      </h3>
      <p className="mt-3 text-lg md:text-xl font-display">{a.tagline}</p>
      <p className="mt-3 text-sm md:text-base text-text-secondary leading-relaxed">{a.detail}</p>
      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {a.capabilities.map((c, ci) => (
          <li key={ci} className="flex items-start gap-2">
            <span aria-hidden="true" className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span className="text-sm text-text-primary">{c}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function FourAgents() {
  return (
    <section
      id="agents"
      aria-labelledby="agents-heading"
      className="relative w-full bg-bg-primary"
    >
      <div className="max-w-content mx-auto px-6 pt-section pb-12">
        <span className="section-label block mb-6">04 — The crew</span>
        <h2
          id="agents-heading"
          className="fluid-h2 font-display font-normal tracking-tight max-w-3xl"
        >
          Four agents.{' '}
          <span className="italic text-accent">One phone line.</span>
        </h2>
        <p className="mt-4 fluid-body text-text-secondary max-w-xl">
          Gizmoo isn&apos;t a single bot — it&apos;s a crew of specialised agents, each doing the job a real receptionist + scheduler + sales assistant would do, together.
        </p>
      </div>

      <div className="max-w-content mx-auto px-6 pb-section grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((a, i) => (
          <AgentCard key={i} a={a} />
        ))}
      </div>
    </section>
  );
}
