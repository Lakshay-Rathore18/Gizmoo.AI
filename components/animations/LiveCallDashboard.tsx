'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Phone, CalendarCheck, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const callLog = [
  { biz: 'Mitchell Dental', type: 'Inbound', action: 'Booked cleaning — Thu 10am', duration: '1:24', status: 'completed' as const },
  { biz: 'Rodriguez Law', type: 'Inbound', action: 'Took message — estate inquiry', duration: '2:08', status: 'completed' as const },
  { biz: 'Serenity Spa', type: 'Outbound', action: 'Reminder — facial tomorrow 3pm', duration: '0:38', status: 'completed' as const },
  { biz: 'Kim Real Estate', type: 'Inbound', action: 'Scheduled viewing — Sat 2pm', duration: '1:52', status: 'completed' as const },
  { biz: 'Bradley HVAC', type: 'Inbound', action: 'Emergency dispatch — heater down', duration: '1:11', status: 'completed' as const },
  { biz: 'Northwind Clinic', type: 'Outbound', action: 'Confirm appt — Dr. Chen Mon 9am', duration: '0:42', status: 'completed' as const },
  { biz: 'Mitchell Dental', type: 'Inbound', action: 'Rescheduled crown — Fri 11am', duration: '1:36', status: 'completed' as const },
  { biz: 'Serenity Spa', type: 'Inbound', action: 'Booked couples massage — Sat 4pm', duration: '1:48', status: 'completed' as const },
];

const stats = [
  { label: 'Today', value: '47 calls' },
  { label: 'Booked', value: '31' },
  { label: 'Avg', value: '28s' },
  { label: 'Satisfaction', value: '99.8%' },
];

export function LiveCallDashboard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [liveCall, setLiveCall] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % callLog.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const toggle = setInterval(() => {
      setLiveCall((v) => !v);
    }, 5000);
    return () => clearInterval(toggle);
  }, [reduce]);

  const visibleCalls = [];
  for (let i = 0; i < 5; i++) {
    visibleCalls.push(callLog[(activeIdx + i) % callLog.length]);
  }

  return (
    <div className={className}>
      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-px bg-white/[0.06] mb-px">
        {stats.map((s) => (
          <div key={s.label} className="bg-ink px-3 py-2.5 text-center">
            <div className="font-display font-bold text-sm text-paper">{s.value}</div>
            <div className="font-mono text-[8px] uppercase tracking-widest text-paper/40 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Live indicator */}
      <AnimatePresence>
        {liveCall && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-cyber-cyan/10 border-b border-cyber-cyan/30 px-4 py-2.5 flex items-center gap-3">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-cyber-cyan opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-cyber-cyan" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyber-cyan">Live Call</span>
              <span className="text-xs text-paper/80 flex-1 truncate">Bradley HVAC — booking emergency service</span>
              <motion.span
                className="font-mono text-[10px] text-cyber-lime tabular-nums"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                1:24
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call feed */}
      <div className="divide-y divide-white/[0.06]">
        <AnimatePresence mode="sync" initial={false}>
          {visibleCalls.map((call, i) => (
            <motion.div
              key={`${call.biz}-${call.action}-${activeIdx}-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-paper/[0.02] transition-colors"
            >
              <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                call.type === 'Outbound' ? 'bg-cyber-gold/20' : 'bg-cyber-cyan/20'
              }`}>
                {call.type === 'Outbound' ? (
                  <ArrowUpRight className="w-3 h-3 text-cyber-gold" />
                ) : (
                  <Phone className="w-3 h-3 text-cyber-cyan" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display text-xs font-bold text-paper truncate">{call.biz}</span>
                  <span className={`font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 ${
                    call.type === 'Outbound' ? 'text-cyber-gold bg-cyber-gold/10' : 'text-cyber-cyan bg-cyber-cyan/10'
                  }`}>
                    {call.type}
                  </span>
                </div>
                <div className="text-[11px] text-paper/50 truncate mt-0.5">{call.action}</div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <span className="font-mono text-[10px] text-paper/40 tabular-nums">{call.duration}</span>
                <CheckCircle2 className="w-3 h-3 text-cyber-lime" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom bar - waveform */}
      <div className="border-t border-white/[0.06] px-4 py-2.5 flex items-center gap-3">
        <CalendarCheck className="w-3.5 h-3.5 text-cyber-lime" />
        <span className="font-mono text-[9px] uppercase tracking-widest text-paper/40">31 appointments booked today</span>
        <div className="ml-auto flex items-end gap-[2px] h-4">
          {[0.3, 0.7, 0.5, 0.9, 0.4, 0.8, 0.6, 0.3, 0.7, 0.5, 0.8, 0.4].map((h, i) => (
            <motion.span
              key={i}
              className="w-[2px] bg-gradient-to-t from-cyber-cyan/60 to-cyber-gold/60 rounded-full origin-bottom"
              style={{ height: '100%' }}
              animate={reduce ? { scaleY: h } : {
                scaleY: [h, h * 0.3, h * 1.2, h * 0.5, h],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.08,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <Clock className="w-3 h-3 text-paper/30" />
        <span className="font-mono text-[9px] text-paper/30 tabular-nums">24/7</span>
      </div>
    </div>
  );
}
