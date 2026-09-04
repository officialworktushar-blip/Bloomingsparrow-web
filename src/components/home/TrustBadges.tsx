const BADGES = [
  {
    title: 'Handcrafted',
    caption: 'Every piece is made by hand by master Indian artisans.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    title: 'Authentic',
    caption: 'Genuine craft traditions — Rogan, Shola, Lacquer, Bell & more.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    title: 'Durable',
    caption: 'Made from quality materials meant to be cherished for years.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Ethically Made',
    caption: 'Fairly paid artisans and family-owned craft communities.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function TrustBadges() {
  return (
    <section className="py-10 sm:py-14 bg-white border-t border-[#efede8]" aria-label="Why Blooming Sparrow">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-8">
          <span className="section-kicker">Why Blooming Sparrow</span>
          <h2 className="section-title mt-1">Art You Can Trust</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {BADGES.map(item => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <span className="text-[#287379] mb-3">{item.icon}</span>
              <h3 className="font-sans text-[0.98rem] font-semibold text-[#202025]">{item.title}</h3>
              <p className="font-sans text-[0.82rem] text-[#988d8d] mt-1.5 leading-relaxed max-w-[230px]">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}