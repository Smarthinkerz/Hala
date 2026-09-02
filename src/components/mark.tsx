export function HalaMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" className="text-sage" />
      <path
        d="M8 22V12.5c0-2.4 1.9-4.3 4.3-4.3h7.4C22.1 8.2 24 10.1 24 12.5V22"
        fill="none"
        stroke="#F4F0E8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M12 22v-6.2c0-.7.6-1.3 1.3-1.3h5.4c.7 0 1.3.6 1.3 1.3V22" fill="none" stroke="#F4F0E8" strokeWidth="1.8" />
    </svg>
  );
}
