'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <Link href="/" className="sb-logo" id="sb-logo" aria-label="Blooming Sparrow Home">
        <img src="/images/logo.png" alt="Blooming Sparrow" />
      </Link>
      <Link href="/" className={`sb-icon ${pathname === '/' ? 'active' : ''}`} id="sb-home" data-tip="Home" aria-label="Home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1z"/>
          <path d="M9 21V12h6v9"/>
        </svg>
      </Link>
      <Link href="/categories" className={`sb-icon ${pathname?.startsWith('/categories') ? 'active' : ''}`} id="sb-categories" data-tip="Categories" aria-label="Categories">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      </Link>
      <Link href="/wishlist" className={`sb-icon ${pathname?.startsWith('/wishlist') ? 'active' : ''}`} id="sb-wishlist" data-tip="Wishlist" aria-label="Wishlist">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        </svg>
      </Link>
      <div className="sb-divider"></div>
      <Link href="/notifications" className={`sb-icon ${pathname?.startsWith('/notifications') ? 'active' : ''}`} id="sb-bell" data-tip="Notifications" aria-label="Notifications">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 01-3.46 0"/>
        </svg>
      </Link>
      <Link href="/messages" className={`sb-icon ${pathname?.startsWith('/messages') ? 'active' : ''}`} id="sb-message" data-tip="Messages" aria-label="Messages">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      </Link>
      <div className="sb-spacer"></div>
    </aside>
  );
}
