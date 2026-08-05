'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useProductStore } from '@/store/useProductStore';
import { PRODUCTS } from '@/lib/data';
import ProductImage from '@/components/ProductImage';

const WHATSAPP_URL = 'https://wa.link/lvchko';

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, cart } = useStore();
  const { products, fetchProducts } = useProductStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
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

  const toggleShop = () => {
    setOpenShop(prev => !prev);
  };

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

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q')?.toString().trim();
    if (q) router.push(`/?q=${encodeURIComponent(q)}`);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const searchInputClass =
    'w-full h-11 rounded-full border-[1.5px] border-[#E4DED3] bg-[#F7F3EC] pl-11 pr-5 text-[0.85rem] text-[#1C1A18] outline-none transition-all placeholder:text-[#A39A8B] focus:border-[#1C1A18] focus:bg-white';

  const navLinkClass = (active: boolean) =>
    `shrink-0 h-12 inline-flex items-center gap-1.5 text-[0.8rem] font-medium no-underline px-3.5 border-b-2 border-transparent transition-colors ${
      active ? 'text-white border-[#C8A96E]' : 'text-white/90 hover:text-white hover:border-[#C8A96E]'
    }`;

  const drawerLinkClass = 'flex items-center justify-between gap-3 px-5 py-3 text-[0.9rem] font-medium text-[#1C1A18] no-underline hover:bg-[#F7F3EC] border-b border-[#EFEAE1] transition-colors';

  return (
    <>
      <header>
        <div className="bg-[#1C1A18] text-white h-9 flex items-center justify-center text-center px-4 text-[0.72rem] sm:text-[0.78rem] font-sans font-medium tracking-[0.04em]">
          🎉 Free shipping across India on every handcrafted piece&nbsp;&nbsp;·&nbsp;&nbsp;Ships in 2–3 days
        </div>

        <div className="sticky top-0 z-[100] bg-white border-b border-[#E4DED3]">
          <div className="max-w-[1750px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
            <button
              type="button"
              className="md:hidden -ml-1 flex items-center justify-center w-10 h-10 rounded-full text-[#1C1A18] hover:bg-[#F7F3EC] transition-colors cursor-pointer"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0" aria-label="Blooming Sparrow Home">
              <img src="/images/logo.png" alt="Blooming Sparrow" className="w-9 h-9 object-contain" />
            </Link>

            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <img src="/msme.jpg" alt="MSME Registered" className="h-[30px] w-auto object-contain" />
              <img src="/razorpay.jpg" alt="Secure payments by Razorpay" className="h-[30px] w-auto object-contain" />
            </div>

            <form role="search" onSubmit={handleSearch} className="hidden md:block flex-1 max-w-[560px] mx-auto w-full">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-[#8C8477] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="search"
                  name="q"
                  placeholder="Find products, categories & more…"
                  aria-label="Search products"
                  autoComplete="off"
                  className={searchInputClass}
                />
              </div>
            </form>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={user ? '/profile' : '/login'}
                className="text-[0.8rem] font-medium text-[#1C1A18] no-underline hover:text-[#C8A96E] transition-colors hidden sm:block"
              >
                {user ? 'My Profile' : 'Sign In'}
              </Link>
              <Link
                href="/wishlist"
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#F7F3EC] transition-colors no-underline text-[#1C1A18]"
                aria-label="Wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </Link>
              <Link
                href="/checkout"
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#F7F3EC] transition-colors no-underline text-[#1C1A18]"
                aria-label={`Cart, ${cartCount} items`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#C8A96E] text-white rounded-full min-w-[18px] h-[18px] px-1 text-[10px] font-semibold flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <form role="search" onSubmit={handleSearch} className="md:hidden px-5 pb-3">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-[17px] h-[17px] text-[#8C8477] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                name="q"
                placeholder="Find products, categories & more…"
                aria-label="Search products"
                autoComplete="off"
                className={searchInputClass}
              />
            </div>
          </form>
        </div>

        <nav ref={navRef} className="relative bg-[#1C1A18]" aria-label="Shop categories">
          <div className="max-w-[1750px] mx-auto px-5 sm:px-8 flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <Link href="/about" className={navLinkClass(pathname?.startsWith('/about') ?? false)}>
              About Us
            </Link>
            <Link href="/faq" className={navLinkClass(pathname?.startsWith('/faq') ?? false)}>
              FAQs
            </Link>
          </div>

          <div
            className={`${openShop ? 'block' : 'hidden'} lg:block lg:absolute lg:top-full lg:left-0 lg:right-0 lg:z-[110] ${
              openShop
                ? 'lg:visible lg:opacity-100 lg:translate-y-0'
                : 'lg:invisible lg:opacity-0 lg:-translate-y-1'
            } lg:transition-all lg:duration-200`}
            onMouseEnter={isTouch ? undefined : cancelClose}
            onMouseLeave={isTouch ? undefined : scheduleClose}
          >
            <div className="bg-white shadow-[0_18px_50px_rgba(0,0,0,0.12)] border-t border-[#EFEAE1]">
              <div className="max-w-[1750px] mx-auto px-5 sm:px-8 py-6 flex flex-col lg:flex-row gap-6 lg:gap-10">
                <div className="lg:w-[200px] lg:shrink-0">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8C8477] font-sans mb-3">
                    Collections
                  </p>
                  <Link
                    href="/categories"
                    onClick={() => setOpenShop(false)}
                    className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 bg-[#1C1A18] text-white text-[0.85rem] font-medium font-sans no-underline"
                  >
                    All Artworks
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
                    {categoryCards.map(card => (
                      <Link
                        key={card.slug}
                        href={`/categories?cat=${card.slug}`}
                        onClick={() => setOpenShop(false)}
                        className="group block no-underline"
                      >
                        <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-[#EFEAE1]">
                          <ProductImage
                            src={card.image}
                            alt={card.label}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                          <span className="absolute bottom-2.5 left-2.5 right-2.5 text-white font-serif text-[0.95rem] font-medium leading-snug drop-shadow-sm">
                            {card.label}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/25 z-[190]"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      <aside
        className={`md:hidden fixed left-0 top-0 h-full w-[300px] bg-white z-[200] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFEAE1] shrink-0">
          <Link href="/" className="flex items-center gap-2.5 no-underline" onClick={closeDrawer} aria-label="Blooming Sparrow Home">
            <img src="/images/logo.png" alt="Blooming Sparrow" className="w-8 h-8 object-contain" />
            <span className="font-serif text-[1.1rem] font-semibold text-[#1C1A18]">Blooming Sparrow</span>
          </Link>
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-full text-[#1C1A18] hover:bg-[#F7F3EC] transition-colors cursor-pointer"
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
          <div className="px-5 pt-4 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8C8477] font-sans">
            Categories
          </div>
          {categories.map(c => (
            <Link key={c.slug} href={`/categories?cat=${c.slug}`} className={`${drawerLinkClass} pl-9`} onClick={closeDrawer}>
              {c.label}
            </Link>
          ))}
          <div className="px-5 pt-4 pb-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8C8477] font-sans">
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

        <div className="border-t border-[#EFEAE1] shrink-0">
          <Link href={user ? '/profile' : '/login'} className={drawerLinkClass} onClick={closeDrawer}>
            {user ? 'My Profile' : 'Sign In'}
          </Link>
          <Link href="/wishlist" className={drawerLinkClass} onClick={closeDrawer}>
            Wishlist
          </Link>
          <Link href="/checkout" className={drawerLinkClass} onClick={closeDrawer}>
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-[#C8A96E] text-white rounded-full min-w-[18px] h-[18px] px-1 text-[10px] font-semibold flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}
