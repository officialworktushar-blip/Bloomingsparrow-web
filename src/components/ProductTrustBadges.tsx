import { type ReactNode } from 'react';

const TRUST_STRIP: { label: string; icon: ReactNode }[] = [
  {
    label: '100% Handmade',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    label: 'Colour may vary',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      </svg>
    ),
  },
  {
    label: 'Easy 7-day returns',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 4v6h6" />
        <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
      </svg>
    ),
  },
  {
    label: 'Free shipping',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v5a1 1 0 01-1 1h-2" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export default function ProductTrustBadges() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 mb-8">
      {TRUST_STRIP.map(item => (
        <div key={item.label} className="flex items-center gap-2 text-[#8C8477]">
          <span className="w-8 h-8 rounded-full bg-[#F7F3EC] border border-[#E4DED3] flex items-center justify-center shrink-0">
            {item.icon}
          </span>
          <span className="text-[0.66rem] font-medium tracking-[0.02em] font-sans leading-snug">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
