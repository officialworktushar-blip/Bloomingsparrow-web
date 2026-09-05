'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useProductStore } from '@/store/useProductStore';
import { PRODUCTS } from '@/lib/data';
import ProductImage from '@/components/ProductImage';

const WHATSAPP_URL = 'https://wa.link/lvchko';

const ANNOUNCEMENTS = [
  'Free Shipping on orders above ₹500',
  'Get ₹100 OFF on your First Order',
  'Handcrafted Indian Art · Made by Master Artisans',
  '5% OFF on orders above ₹5,000',
];

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, cart } = useStore();
  const { products, fetchProducts } = useProductStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [announceIndex, setAnnounceIndex] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setAnnounceIndex(i => (i + 1) % ANNOUNCEMENTS.length), 3500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!openShop) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenShop(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenShop(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openShop]);

  useEffect(() => () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
  }, []);

  const scheduleClose = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setOpenShop(false), 150);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const toggleShop = () => setOpenShop(prev => !prev);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    const source = products.length > 0 ? products : PRODUCTS;
    source.forEach(p => {
      const slug = String(p.category || '').toLowerCase().replace(/\s+/g, '-');
      const label = p.categoryLabel || p.category || '';
      if (slug && label && !map.has(slug)) map.set(slug, label);
    });
    return Array.from(map.entries()).map(([slug, label]) => ({ slug, label }));
  }, [products]);

  const categoryCards = useMemo(() => {
    const source = products.length > 0 ? products : PRODUCTS;
    return categories.map(c => {
      const first = source.find(p => String(p.category || '').toLowerCase().replace(/\s+/g, '-') === c.slug);
      return { ...c, image: first ? (first.images?.[0] || first.image) : '/placeholder.png' };
    });
  }, [categories, products]);

  useEffect(() => {
    const readWishlistCount = () => {
      const saved = JSON.parse(localStorage.getItem('bs_wishlist') || '[]');
      setWishlistCount(Array.isArray(saved) ? saved.length : 0);
    };
    readWishlistCount();
    window.addEventListener('focus', readWishlistCount);
    window.addEventListener('storage', readWishlistCount);
    return () => {
      window.removeEventListener('focus', readWishlistCount);
      window.removeEventListener('storage', readWishlistCount);
    };
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q')?.toString().trim();
    setSearchOpen(false);
    if (q) router.push(`/?q=${encodeURIComponent(q)}`);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSearchOpen(false);
    setOpenShop(false);
  };

  const navLinkClass = (active: boolean) =>
    `shrink-0 h-[76px] hidden lg:inline-flex items-center gap-1.5 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] no-underline px-3.5 relative after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-[22px] after:h-[1px] after:bg-[#7e7e84] after:origin-left after:transition-transform after:duration-300 ${
      active ? 'text-[#287379] after:scale-x-100' : 'text-[#287379] after:scale-x-0 hover:after:scale-x-100'
    }`;

  const drawerLinkClass =
    'flex items-center justify-between gap-3 px-5 py-3 text-[0.88rem] font-medium text-[#202025] no-underline hover:bg-[#f5f2ec] border-b border-[#efede8] transition-colors font-sans';

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#e8e7d5] text-[#287379] h-9 flex items-center justify-center text-center px-4 overflow-hidden" role="region" aria-label="Announcements">
        <span key={announceIndex} className="animate-announce text-[0.74rem] sm:text-[0.8rem] font-sans font-medium tracking-[0.04em] whitespace-nowrap" aria-live="polite">
          {ANNOUNCEMENTS[announceIndex]}
        </span>
      </div>

      {/* Sticky header */}
      <div className={`sticky top-0 z-[100] bg-[#fcf7f3] border-b transition-shadow duration-300 ${isScrolled ? 'border-[#efede8] shadow-[0_6px_20px_rgba(0,0,0,0.06)]' : 'border-[#efede8]'}`}>
        <div className="max-w-[1750px] mx-auto px-4 sm:px-8 h-[76px] flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="lg:hidden -ml-1 flex items-center justify-center w-10 h-10 rounded-md text-[#202025] hover:bg-[#f5f2ec] transition-colors cursor-pointer"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0" aria-label="Blooming Sparrow Home">
              <img src="/images/logo.png" alt="Blooming Sparrow" className="w-9 h-9 object-contain" />
              <span className="hidden sm:block font-display text-[1.35rem] font-bold uppercase tracking-[0.08em] text-[#287379] whitespace-nowrap">
                Blooming Sparrow
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav ref={navRef} className="relative flex items-center gap-1" aria-label="Shop categories">
            <Link href="/" className={navLinkClass(pathname === '/')}>
              Home
            </Link>

            <button
              type="button"
              className={`${navLinkClass(pathname?.startsWith('/categories') ?? false)} cursor-pointer`}
              aria-haspopup="true"
              aria-expanded={openShop}
              onMouseEnter={isTouch ? undefined : () => { cancelClose(); setOpenShop(true); }}
              onMouseLeave={isTouch ? undefined : scheduleClose}
              onClick={() => { if (isTouch) toggleShop(); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleShop(); } }}
            >
              Shop
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <Link href="/about" className={navLinkClass(pathname?.startsWith('/about') ?? false)}>
              About Us
            </Link>
            <Link href="/faq" className={navLinkClass(pathname?.startsWith('/faq') ?? false)}>
              FAQs
            </Link>

            {/* Mega menu */}
            <div
              className={`${openShop ? 'block' : 'hidden'} lg:block lg:absolute lg:top-full lg:left-1/2 lg:-translate-x-1/2 lg:w-[min(1100px,90vw)] lg:z-[110] ${
                openShop
                  ? 'lg:visible lg:opacity-100 lg:translate-y-0'
                  : 'lg:invisible lg:opacity-0 lg:translate-y-2'
              } lg:transition-all lg:duration-200`}
              onMouseEnter={isTouch ? undefined : cancelClose}
              onMouseLeave={isTouch ? undefined : scheduleClose}
            >
              <div className="bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] border border-[#f1f1f1] mt-2">
                <div className="max-w-[1750px] mx-auto px-5 sm:px-8 py-7 flex flex-col lg:flex-row gap-6 lg:gap-10">
                  <div className="lg:w-[210px] lg:shrink-0">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#7e7e84] font-sans mb-3">
                      Collections
                    </p>
                    <Link
                      href="/categories"
                      onClick={() => setOpenShop(false)}
                      className="flex items-center justify-between gap-2 rounded-none px-3 py-2.5 bg-[#287379] text-white text-[0.82rem] font-semibold uppercase tracking-[0.12em] font-sans no-underline hover:bg-[#252525] transition-colors"
                    >
                      All Artworks
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                      {categoryCards.map(card => (
                        <Link
                          key={card.slug}
                          href={`/categories?cat=${card.slug}`}
                          onClick={() => setOpenShop(false)}
                          className="group block no-underline text-center"
                        >
                          <div className="relative overflow-hidden aspect-square bg-[#f5f2ec]">
                            <ProductImage
                              src={card.image}
                              alt={card.label}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <span className="block mt-2 font-sans text-[0.82rem] font-medium tracking-[0.02em] text-[#287379] group-hover:text-[#1e5a5e] transition-colors">
                            {card.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Icons (right) */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              className="relative flex items-center justify-center w-10 h-10 rounded-md hover:bg-[#f5f2ec] transition-colors cursor-pointer header-icon"
              onClick={() => setSearchOpen(v => !v)}
              aria-label="Toggle search"
              aria-expanded={searchOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <Link
              href={user ? '/profile' : '/login'}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 h-10 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.1em] header-icon no-underline hover:text-[#1e5a5e] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {user ? 'My Profile' : 'Sign In'}
            </Link>

            <Link
              href="/wishlist"
              className="relative flex items-center justify-center w-10 h-10 rounded-md hover:bg-[#f5f2ec] transition-colors no-underline header-icon"
              aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="header-count-badge border-2 border-[#fcf7f3]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/checkout"
              className="relative flex items-center justify-center w-10 h-10 rounded-md hover:bg-[#f5f2ec] transition-colors no-underline header-icon"
              aria-label={`Cart, ${cartCount} items`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && (
                <span className="header-count-badge border-2 border-[#fcf7f3]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search panel */}
        <form
          role="search"
          onSubmit={handleSearch}
          aria-hidden={!searchOpen}
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${searchOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        >
          <div className={`overflow-hidden min-h-0 ${searchOpen ? 'px-4 sm:px-8 pb-5 pt-2' : 'px-4 sm:px-8 pb-0 pt-0'}`}>
            <div className="max-w-[720px] mx-auto">
              <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#7e7e84] mb-2 text-center">
                What are you looking for?
              </p>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#7e7e84] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="search"
                  name="q"
                  placeholder="Search artworks, categories…"
                  aria-label="Search products"
                  autoComplete="off"
                  className="w-full h-12 bg-transparent border-b-2 border-[#287379] pl-10 pr-10 text-[0.95rem] text-[#202025] outline-none transition-colors placeholder:text-[#a4a099] font-sans focus:border-[#1e5a5e]"
                />
                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 text-[#287379] hover:text-[#1e5a5e] transition-colors" aria-label="Submit search">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Mobile overlay */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/25 z-[190]" onClick={closeDrawer} aria-hidden="true" />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-full w-[300px] bg-white z-[200] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#efede8] shrink-0">
          <Link href="/" className="flex items-center gap-2.5 no-underline" onClick={closeDrawer} aria-label="Blooming Sparrow Home">
            <img src="/images/logo.png" alt="Blooming Sparrow" className="w-8 h-8 object-contain" />
            <span className="font-display text-[1.15rem] font-bold uppercase tracking-[0.08em] text-[#287379]">Blooming Sparrow</span>
          </Link>
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-md text-[#202025] hover:bg-[#f5f2ec] transition-colors cursor-pointer"
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <Link href="/" className={drawerLinkClass} onClick={closeDrawer}>
            Home
          </Link>
          <Link href="/categories" className={drawerLinkClass} onClick={closeDrawer}>
            Shop All
          </Link>
          <div className="px-5 pt-4 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#7e7e84] font-sans">
            Categories
          </div>
          {categories.map(c => (
            <Link key={c.slug} href={`/categories?cat=${c.slug}`} className={`${drawerLinkClass} pl-9`} onClick={closeDrawer}>
              {c.label}
            </Link>
          ))}
          <div className="px-5 pt-4 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#7e7e84] font-sans">
            Company
          </div>
          <Link href="/about" className={drawerLinkClass} onClick={closeDrawer}>
            About Us
          </Link>
          <Link href="/faq" className={drawerLinkClass} onClick={closeDrawer}>
            FAQs
          </Link>
          <Link href="/shipping" className={drawerLinkClass} onClick={closeDrawer}>
            Shipping
          </Link>
          <Link href="/returns" className={drawerLinkClass} onClick={closeDrawer}>
            Returns & Exchanges
          </Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={drawerLinkClass} onClick={closeDrawer}>
            Contact on WhatsApp
          </a>
        </nav>

        <div className="border-t border-[#efede8] shrink-0">
          <Link href={user ? '/profile' : '/login'} className={drawerLinkClass} onClick={closeDrawer}>
            {user ? 'My Profile' : 'Sign In'}
          </Link>
          <Link href="/wishlist" className={drawerLinkClass} onClick={closeDrawer}>
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="bg-[#287379] text-white rounded-full min-w-[19px] h-[19px] px-1 text-[10px] font-semibold flex items-center justify-center leading-none">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/checkout" className={drawerLinkClass} onClick={closeDrawer}>
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-[#287379] text-white rounded-full min-w-[19px] h-[19px] px-1 text-[10px] font-semibold flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}