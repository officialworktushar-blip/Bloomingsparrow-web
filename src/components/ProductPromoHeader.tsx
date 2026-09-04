import Link from 'next/link';

export default function ProductPromoHeader() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-5">
        <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-[#7e7e84] font-medium font-sans">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d24418" strokeWidth="1.8" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
          Ships across India
        </span>
        <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-[#7e7e84] font-medium font-sans">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d24418" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 8h1a4 4 0 010 8h-1" />
            <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
          Handcrafted by artisans
        </span>
      </div>

      <Link href="/shipping" className="block no-underline mb-6" aria-label="Read our shipping and delivery promise">
        <div className="flex items-center gap-3 rounded-2xl border border-[#287379]/40 bg-[#e8e7d5] px-4 py-3.5 transition-all duration-200 hover:border-[#287379] hover:shadow-[0_4px_18px_rgba(200,169,110,0.2)]">
          <span className="w-9 h-9 rounded-full bg-white border border-[#287379]/50 flex items-center justify-center text-[#d24418] shrink-0">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[0.8rem] font-semibold text-[#252525] font-sans">Backed by the Blooming Sparrow Promise</span>
            <span className="block text-[0.68rem] text-[#7e7e84] font-sans mt-0.5">Authenticity · Safe Delivery · Easy Resolution</span>
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d24418" strokeWidth="2" className="shrink-0" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
