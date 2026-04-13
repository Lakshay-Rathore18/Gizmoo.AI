export default function GizmooLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible' }}
      aria-label="Gizmoo AI"
      role="img"
    >
      <rect x="0" y="11" width="4" height="10" rx="2" fill="#3B82F6" />
      <rect x="7" y="7" width="4" height="18" rx="2" fill="#3B82F6" />
      <rect x="14" y="4" width="4" height="24" rx="2" fill="#3B82F6" />
      <rect x="21" y="0" width="4" height="32" rx="2" fill="#3B82F6" />
      <rect x="28" y="4" width="4" height="24" rx="2" fill="#3B82F6" />
      <rect x="35" y="7" width="4" height="18" rx="2" fill="#3B82F6" />
      <rect x="42" y="11" width="4" height="10" rx="2" fill="#3B82F6" />
      <text x="56" y="23" fill="white" fontWeight="700" fontSize="20" fontFamily="inherit">
        Gizmoo
      </text>
      <text x="124" y="23" fill="#3B82F6" fontWeight="600" fontSize="20" fontFamily="inherit">
        AI
      </text>
    </svg>
  );
}
