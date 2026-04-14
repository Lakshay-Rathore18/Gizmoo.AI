'use client';

export function AmbientMesh({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      {/* Cyan orb — top left */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          animation: 'meshDrift1 20s ease-in-out infinite',
        }}
      />
      {/* Gold orb — center right */}
      <div
        className="absolute top-[20%] right-[-15%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          animation: 'meshDrift2 25s ease-in-out infinite',
        }}
      />
      {/* Lime orb — bottom center */}
      <div
        className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          animation: 'meshDrift3 22s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes meshDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, 30px) scale(1.05); }
          66% { transform: translate(-20px, -15px) scale(0.97); }
        }
        @keyframes meshDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 20px) scale(0.95); }
          66% { transform: translate(25px, -25px) scale(1.03); }
        }
        @keyframes meshDrift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.04); }
          66% { transform: translate(-35px, 15px) scale(0.96); }
        }
      `}</style>
    </div>
  );
}
