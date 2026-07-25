import Link from 'next/link';

const SHOP_LINKS = [
  { label: 'All Categories', href: '/categories' },
  { label: 'New Arrivals', href: '/categories?sort=new' },
  { label: 'Best Sellers', href: '/categories?sort=best' },
  { label: 'Wishlist', href: '/wishlist' },
  { label: 'Track My Order', href: '/profile' },
];

const POLICY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Shipping & Delivery', href: '/shipping' },
  { label: 'Returns & Refunds', href: '/returns' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Grievance Redressal', href: '/grievance' },
];

const TRUST_BADGES = [
  {
    label: 'Free Shipping',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v5a1 1 0 01-1 1h-2" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Secure Payment',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    label: 'Assured Quality',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    label: 'Handcrafted Products',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
];

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#EFEAE1] border-t border-[#E4DED3]" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link href="/" className="inline-flex items-center gap-2.5 no-underline mb-4">
              <img
                src="/images/logo.png"
                alt="Blooming Sparrow"
                className="w-9 h-9 object-contain"
              />
              <span className="font-serif text-[1.15rem] font-semibold text-[#1C1A18]">Blooming Sparrow</span>
            </Link>
            <p className="text-[0.8rem] leading-relaxed text-[#8C8477] font-sans max-w-[260px] mb-4">
              Handcrafted Indian Art — Bird Sculptures, Wooden Toys &amp; Folk Crafts
            </p>
            <p className="text-[0.7rem] text-[#8C8477] font-sans">
              &copy; {year} Blooming Sparrow. Handcrafted with &#9829; in India.
            </p>
          </div>

          {/* Column 2 — Shop */}
          <nav aria-label="Shop links">
            <h3 className="font-sans text-[0.65rem] tracking-[0.12em] uppercase font-semibold text-[#1C1A18] mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {SHOP_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.8rem] text-[#8C8477] font-sans no-underline hover:text-[#1C1A18] hover:underline transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Policies & Info */}
          <nav aria-label="Policy links">
            <h3 className="font-sans text-[0.65rem] tracking-[0.12em] uppercase font-semibold text-[#1C1A18] mb-4">
              Policies &amp; Info
            </h3>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {POLICY_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.8rem] text-[#8C8477] font-sans no-underline hover:text-[#1C1A18] hover:underline transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — Contact & Social */}
          <div>
            <h3 className="font-sans text-[0.65rem] tracking-[0.12em] uppercase font-semibold text-[#1C1A18] mb-4">
              Connect With Us
            </h3>
            <a
              href="mailto:bloomingsparrow@gmail.com"
              className="text-[0.8rem] text-[#8C8477] font-sans no-underline hover:text-[#1C1A18] hover:underline transition-colors duration-200 block mb-5"
            >
              bloomingsparrow@gmail.com
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* Instagram — UPDATE_URL: replace # with your Instagram profile URL */}
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#E4DED3] flex items-center justify-center text-[#8C8477] hover:border-[#1C1A18] hover:text-[#1C1A18] transition-all duration-200"
                aria-label="Follow us on Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Facebook — UPDATE_URL: replace # with your Facebook page URL */}
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#E4DED3] flex items-center justify-center text-[#8C8477] hover:border-[#1C1A18] hover:text-[#1C1A18] transition-all duration-200"
                aria-label="Follow us on Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* Pinterest — UPDATE_URL: replace # with your Pinterest profile URL */}
              <a
                href="https://pinterest.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#E4DED3] flex items-center justify-center text-[#8C8477] hover:border-[#1C1A18] hover:text-[#1C1A18] transition-all duration-200"
                aria-label="Follow us on Pinterest"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.425 1.808-2.425.853 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.282a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Trust badges — divider above */}
        <div className="border-t border-[#E4DED3] pt-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {TRUST_BADGES.map(badge => (
              <div key={badge.label} className="flex items-center gap-2 text-[#8C8477]">
                <div className="w-8 h-8 rounded-full bg-white border border-[#E4DED3] flex items-center justify-center shrink-0">
                  {badge.icon}
                </div>
                <span className="text-[0.7rem] font-medium tracking-[0.03em] font-sans whitespace-nowrap">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
