import Link from 'next/link';
import FooterNewsletter from '@/components/FooterNewsletter';
import { PRODUCTS } from '@/lib/data';

const INFORMATION_LINKS = [
  { label: 'Our Story', href: '/about' },
  { label: 'Blog', href: '/' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Contact on WhatsApp', href: 'https://wa.link/lvchko' },
];

const POLICY_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Return & Refund Policy', href: '/returns' },
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Grievance Redressal', href: '/grievance' },
];

const SOCIAL_ICONS: { label: string; href: string; icon: React.ReactNode }[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/blooming-sparrow/?viewAsMember=true',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: 'https://pin.it/1jXuSq7p0',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 1C5.4 1 1 5.3 1 11.5c0 3.2 1.6 5.9 4.2 7.5 0-1.6.3-3.2.7-4.2l2-7.6s-.3-.7-.3-1.7c0-1.7 1-3 2.1-3 1.2 0 1.8.9 1.8 2 0 1.2-.8 3-1.2 4.7-.3 1.4.7 2.5 2 2.5 2.4 0 4.1-3.1 4.1-6.8 0-2.8-1.9-4.9-5.3-4.9-3.9 0-6.3 2.9-6.3 6.1 0 1.1.4 2.3.8 2.9.1.1.1.2.1.3l-.3 1.2c-.1.3-.2.4-.5.2-1.6-.7-2.3-2.6-2.3-4.6 0-4 3.6-8.7 9.8-8.7 5.2 0 8.2 3.7 8.2 8 0 5.5-3 9.5-7.3 9.5-1.5 0-2.9-.8-3.4-1.7l-.9 3.6c-.3 1.2-1.1 2.7-1.6 3.6 1.1.3 2.3.5 3.5.5 6.6 0 11-4.3 11-10.5S18.6 1 12 1z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/blooming_sparrow?igsi=MTJwaThmZm5id2k3OA==',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@bloomingsparrow1?si=EZefE_Aj98m3PhrB',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
];

const STICKERS = [
  '/st1.jpeg',
  '/st2.jpeg',
  '/st3.jpeg',
  '/st4.jpeg',
  '/st5.jpeg',
  '/st6.jpeg',
];

const columnTitleClass = 'font-display text-[1.25rem] font-semibold uppercase tracking-[0.02em] text-[#287379] mb-4';

const footerLinkClass =
  'relative font-sans text-[0.9rem] text-[#202025] no-underline transition-colors hover:text-[#1e5a5e] after:content-[""] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-[#202025] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100';

function CategoryLinks() {
  const seen = new Map<string, string>();
  PRODUCTS.forEach(p => {
    const slug = String(p.category || '').toLowerCase().replace(/\s+/g, '-');
    if (slug && !seen.has(slug)) seen.set(slug, p.categoryLabel || p.category || '');
  });
  const cats = Array.from(seen.entries());
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5">
      {cats.map(([slug, label]) => (
        <Link key={slug} href={`/categories?cat=${slug}`} className={footerLinkClass}>
          {label}
        </Link>
      ))}
      <Link href="/categories" className={footerLinkClass}>
        All Artworks
      </Link>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#e8e7d5] text-[#202025] border-t-2 border-[#287379]" role="contentinfo">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 pt-12 sm:pt-16 pb-10">

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 no-underline mb-4" aria-label="Blooming Sparrow Home">
              <img src="/images/logo.png" alt="Blooming Sparrow logo" className="w-11 h-11 object-contain" />
              <span className="font-display text-[1.5rem] font-bold uppercase tracking-[0.06em] text-[#202025]">
                Blooming Sparrow
              </span>
            </Link>
            <p className="font-sans text-[0.88rem] text-[#202025]/70 leading-relaxed max-w-[280px]">
              Handcrafted Indian art — Rogan, Lacquer, Bell, Leather, Shola, Bird Making and more, made by master artisans across India.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_ICONS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-transparent text-[#287379] border border-[#287379]/40 transition-colors hover:bg-[#287379] hover:text-white hover:border-[#287379]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Information */}
          <nav aria-label="Information links">
            <h3 className={columnTitleClass}>Information</h3>
            <ul className="space-y-3 list-none p-0 m-0">
              {INFORMATION_LINKS.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLinkClass} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Policies */}
          <nav aria-label="Policy links">
            <h3 className={columnTitleClass}>Our Policies</h3>
            <ul className="space-y-3 list-none p-0 m-0">
              {POLICY_LINKS.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div>
            <h3 className={columnTitleClass}>Be in the Know</h3>
            <FooterNewsletter />
          </div>
        </div>

        {/* Categories + contact */}
        <div className="mt-12 pt-10 border-t border-[#c9cdbb]">
          <h3 className={columnTitleClass}>Shop by Category</h3>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
            <CategoryLinks />
            <div className="font-sans text-[0.85rem] text-[#202025]/70 leading-relaxed lg:text-right">
              <p className="font-medium text-[#202025]">Contact us — +91 9696136895</p>
              <p className="mt-2">
                WW9H+36R, Madiyanva,<br />
                Lucknow, Uttar Pradesh 226021
              </p>
            </div>
          </div>
        </div>

        {/* Stickers */}
        <div className="mt-10 flex flex-wrap items-center justify-center md:justify-between gap-x-2 gap-y-3">
          {STICKERS.map(src => (
            <img key={src} src={src} alt="" loading="lazy" className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto" />
          ))}
        </div>
      </div>

      {/* Copyright strip */}
      <div className="bg-[#287379] text-white">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sans text-[0.8rem] tracking-[0.04em]">© Blooming Sparrow | All Rights Reserved</p>
          <p className="font-sans text-[0.8rem] tracking-[0.04em]">Handcrafted with love in India</p>
        </div>
      </div>
    </footer>
  );
}