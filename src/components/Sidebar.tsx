'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/useStore';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, cart } = useStore();

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
      
      <Link href="/checkout" className={`sb-icon ${pathname?.startsWith('/checkout') ? 'active' : ''}`} data-tip="Cart" aria-label="Cart" style={{ position: 'relative' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
        {cart.length > 0 && (
          <span style={{ position: 'absolute', top: 5, right: 5, background: 'var(--accent)', color: 'white', borderRadius: '50%', width: 16, height: 16, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </Link>

      <Link href={user ? "/profile" : "/login"} className={`sb-icon ${pathname?.startsWith('/login') || pathname?.startsWith('/profile') ? 'active' : ''}`} data-tip={user ? "Profile" : "Login"} aria-label={user ? "Profile" : "Login"}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </Link>

      <div className="sb-spacer"></div>
    </aside>
  );
}
