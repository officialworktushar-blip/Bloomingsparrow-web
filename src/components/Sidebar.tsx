'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, cart } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const iconBase = "w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-gray-500 transition-all cursor-pointer relative hover:bg-gray-100 hover:text-gray-900 group after:content-[attr(data-tip)] after:absolute after:left-[calc(100%+10px)] after:top-1/2 after:-translate-y-1/2 after:bg-[#222] after:text-white after:px-[11px] after:py-[5px] after:rounded-lg after:text-[12px] after:whitespace-nowrap after:opacity-0 hover:after:opacity-100 after:pointer-events-none after:transition-opacity after:duration-[180ms] after:shadow-sm after:font-sans";
  const iconActive = "bg-gray-900 text-white hover:bg-gray-900 hover:text-white";
  const svgBase = "w-[19px] h-[19px] md:w-[20px] md:h-[20px] stroke-[1.7]";

  const sidebarTransform = isMobile
    ? (mobileOpen ? 'translateX(0)' : 'translateX(-100%)')
    : undefined;

  return (
    <>
      <button
        className="md:hidden fixed top-1/2 -translate-y-1/2 z-[250] w-7 h-14 bg-white border border-gray-200 rounded-r-lg flex items-center justify-center text-gray-500 transition-all duration-300 ease-in-out hover:bg-gray-50 hover:text-gray-900 shadow-sm"
        style={{ left: mobileOpen ? '56px' : '0' }}
        onClick={() => setMobileOpen(o => !o)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <polyline points={mobileOpen ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
        </svg>
      </button>

      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-[190]"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className="md:relative fixed left-0 top-0 w-[56px] md:w-[72px] h-screen bg-white border-r border-gray-200 flex flex-col items-center pt-4 pb-5 z-[200] gap-1"
        style={sidebarTransform !== undefined ? { transform: sidebarTransform } : undefined}
        aria-label="Main navigation"
      >
        <Link href="/" className="w-11 h-11 mb-3 flex items-center justify-center" id="sb-logo" aria-label="Blooming Sparrow Home">
          <img src="/images/logo.png" alt="Blooming Sparrow" className="w-8 h-8 md:w-9 md:h-9 object-contain" />
        </Link>
        <Link href="/" className={`${iconBase} ${pathname === '/' ? iconActive : ''}`} id="sb-home" data-tip="Home" aria-label="Home" onClick={() => setMobileOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={`${svgBase} ${pathname === '/' ? 'stroke-white' : ''}`}>
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1z"/>
            <path d="M9 21V12h6v9"/>
          </svg>
        </Link>
        <Link href="/categories" className={`${iconBase} ${pathname?.startsWith('/categories') ? iconActive : ''}`} id="sb-categories" data-tip="Categories" aria-label="Categories" onClick={() => setMobileOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={`${svgBase} ${pathname?.startsWith('/categories') ? 'stroke-white' : ''}`}>
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </Link>
        <Link href="/wishlist" className={`${iconBase} ${pathname?.startsWith('/wishlist') ? iconActive : ''}`} id="sb-wishlist" data-tip="Wishlist" aria-label="Wishlist" onClick={() => setMobileOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={`${svgBase} ${pathname?.startsWith('/wishlist') ? 'stroke-white' : ''}`}>
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </Link>

        <div className="w-8 h-px bg-gray-200 my-2"></div>

        <Link href="/checkout" className={`${iconBase} ${pathname?.startsWith('/checkout') ? iconActive : ''}`} data-tip="Cart" aria-label="Cart" onClick={() => setMobileOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={`${svgBase} ${pathname?.startsWith('/checkout') ? 'stroke-white' : ''}`}>
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          </svg>
          {cart.length > 0 && (
            <span className="absolute top-[3px] right-[3px] bg-[#C8A96E] text-white rounded-full w-[15px] h-[15px] text-[9px] flex items-center justify-center leading-none">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Link>

        <Link href={user ? "/profile" : "/login"} className={`${iconBase} ${pathname?.startsWith('/login') || pathname?.startsWith('/profile') ? iconActive : ''}`} data-tip={user ? "Profile" : "Login"} aria-label={user ? "Profile" : "Login"} onClick={() => setMobileOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" className={`${svgBase} ${pathname?.startsWith('/login') || pathname?.startsWith('/profile') ? 'stroke-white' : ''}`}>
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </Link>

        <div className="flex-1"></div>
      </aside>
    </>
  );
}
