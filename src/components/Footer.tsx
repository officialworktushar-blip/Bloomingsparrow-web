const TRUST_BADGES = [
  {
    label: 'Free Shipping',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v5a1 1 0 01-1 1h-2" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: '100% Purchase Protection',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    label: 'Secure Payment',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    label: 'Assured Quality',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    label: 'Handcrafted Products',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    label: 'Best Price Promise',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E4DED3] bg-white" role="contentinfo">
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-10">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
              <div className="w-10 h-10 rounded-full bg-[#F7F3EC] flex items-center justify-center text-[#8C8477]">
                {badge.icon}
              </div>
              <span className="text-[0.7rem] font-medium tracking-[0.04em] text-[#8C8477] font-sans leading-tight">{badge.label}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-[#E4DED3] pt-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 font-serif text-[0.95rem] text-[#8C8477]">
            <img src="/images/logo.png" alt="Blooming Sparrow" className="w-5 h-5 object-contain" />
            <span className="font-semibold">Blooming Sparrow</span>
          </div>
          <p className="text-[0.75rem] text-[#8C8477] font-sans">© 2025 Blooming Sparrow. Handcrafted with ♥ in India.</p>
        </div>
      </div>
    </footer>
  );
}
