import Link from 'next/link';

const QUICK_LINKS = [
  { label: 'About us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/' },
  { label: 'Return & Refund', href: '/returns' },
  { label: 'Terms and Conditions', href: '/terms' },
];

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Pinterest', href: 'https://pinterest.com/' },
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'YouTube', href: 'https://youtube.com/' },
];

const STICKERS = [
  '/st1.jpeg',
  '/st2.jpeg',
  '/st3.jpeg',
  '/st4.jpeg',
  '/st5.jpeg',
  '/st6.jpeg',
];

const linkClass =
  'font-serif font-bold text-[1.1rem] text-white no-underline hover:text-white/90 hover:underline transition-colors duration-200';

export default function Footer() {
  return (
    <footer className="bg-[#7B241C] text-white" role="contentinfo">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-14 sm:pt-20">

        {/* Heading — line — text — line */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
          <span aria-hidden="true" className="flex-1 max-w-[240px] h-px bg-white/50" />
          <h2 className="font-serif italic font-bold text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] text-white whitespace-nowrap">
            Blooming Sparrow
          </h2>
          <span aria-hidden="true" className="flex-1 max-w-[240px] h-px bg-white/50" />
        </div>

        {/* 3-column row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-14 sm:mb-16">

          {/* LEFT — quick links */}
          <nav aria-label="Footer quick links" className="text-center md:text-left">
            <ul className="space-y-3.5 list-none p-0 m-0">
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CENTER — contact info */}
          <div className="text-center font-serif">
            <p className="font-bold text-[1.1rem] text-white">contact us - +91 9696136895</p>
            <p className="mt-3.5 text-[1.05rem] text-white/90 leading-relaxed">
              WW9H+36R,Madiyanva,<br />
              Lucknow ,UttarPradesh 226021
            </p>
          </div>

          {/* RIGHT — social media links */}
          <nav aria-label="Social media links" className="text-center md:text-right">
            <ul className="space-y-3.5 list-none p-0 m-0">
              {SOCIAL_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Stickers — standing at the bottom edge */}
      <div className="px-6 sm:px-10 pb-1">
        <div className="flex flex-wrap items-end justify-center md:justify-between gap-x-2 gap-y-3">
          {STICKERS.map(src => (
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              className="h-24 sm:h-28 md:h-28 lg:h-36 xl:h-40 w-auto"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
