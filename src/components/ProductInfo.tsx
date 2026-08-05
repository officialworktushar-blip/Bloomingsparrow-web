'use client';

import { type ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Swal from '@/lib/swal';
import { Product, Specification } from '@/lib/data';

type Props = {
  product: Product;
  cartItem: { id: string; quantity: number } | undefined;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
};

const FALLBACK_FIELDS: { key: keyof Product; label: string }[] = [
  { key: 'material', label: 'Material' },
  { key: 'dimensions', label: 'Dimensions' },
  { key: 'origin', label: 'Origin' },
  { key: 'artisan', label: 'Artisan' },
];

function buildSpecifications(p: Product): Specification[] {
  const items: Specification[] = [];

  if (p.specifications && p.specifications.length > 0) {
    items.push(...p.specifications.filter(s => s.label.trim() !== '' && s.value.trim() !== ''));
  } else {
    FALLBACK_FIELDS.forEach(({ key, label }) => {
      const val = p[key];
      if (val && !(typeof val === 'string' && val.trim() === '')) {
        items.push({ label, value: String(val) });
      }
    });
  }

  return items;
}

const SPEC_ICONS: Record<string, ReactNode> = {
  Material: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  Dimensions: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 3H3v18h18V3z" />
      <path d="M9 3v18" />
      <path d="M3 9h18" />
    </svg>
  ),
  Origin: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="10" r="3" />
      <path d="M12 2a8 8 0 00-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 00-8-8z" />
    </svg>
  ),
  Artisan: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

export default function ProductInfo({ product, isWishlisted, onToggleWishlist }: Props) {
  const router = useRouter();
  const { addToCart } = useStore();
  const p = product;
  const priceClean = p.price.replace('₹', '').trim();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      id: p.id,
      title: p.title,
      price: p.price,
      numericPrice: parseInt(p.price.replace(/\D/g, ''), 10),
      image: p.images?.[0] || p.image,
      quantity: qty,
    });
    Swal.fire({
      title: 'Added to cart!',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: p.id,
      title: p.title,
      price: p.price,
      numericPrice: parseInt(p.price.replace(/\D/g, ''), 10),
      image: p.images?.[0] || p.image,
      quantity: qty,
    });
    router.push('/checkout');
  };

  const specs = buildSpecifications(p);
  const specsLine = [p.dimensions, p.material].filter(Boolean).join(' · ');

  const TRUST_STRIP = [
    {
      label: '100% Handmade',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 8h1a4 4 0 010 8h-1" />
          <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
    },
    {
      label: 'Colour may vary',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
        </svg>
      ),
    },
    {
      label: 'Easy 7-day returns',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M1 4v6h6" />
          <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
        </svg>
      ),
    },
    {
      label: 'Free shipping',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="1" y="3" width="15" height="13" rx="1" />
          <path d="M16 8h4l3 5v5a1 1 0 01-1 1h-2" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-5">
        <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-[#8C8477] font-medium font-sans">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B5533C" strokeWidth="1.8" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
          Ships across India
        </span>
        <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-[#8C8477] font-medium font-sans">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B5533C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
        <div className="flex items-center gap-3 rounded-2xl border border-[#C8A96E]/40 bg-[#F5EDD8] px-4 py-3.5 transition-all duration-200 hover:border-[#C8A96E] hover:shadow-[0_4px_18px_rgba(200,169,110,0.2)]">
          <span className="w-9 h-9 rounded-full bg-white border border-[#C8A96E]/50 flex items-center justify-center text-[#B5533C] shrink-0">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </span>
          <span className="flex-1 min-w-0">
            <span className="block text-[0.8rem] font-semibold text-[#1C1A18] font-sans">Backed by the Blooming Sparrow Promise</span>
            <span className="block text-[0.68rem] text-[#8C8477] font-sans mt-0.5">Authenticity · Safe Delivery · Easy Resolution</span>
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B5533C" strokeWidth="2" className="shrink-0" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </Link>

      <p className="text-[0.65rem] tracking-[0.14em] uppercase text-[#8C8477] font-medium font-sans mb-2">
        {p.categoryLabel}{p.origin ? ` · ${p.origin}` : ''}
      </p>

      <h1 className="font-serif text-[2rem] sm:text-[2.4rem] lg:text-[2.8rem] font-semibold leading-[1.12] text-[#1C1A18] tracking-[-0.01em] mb-2">
        {p.title}
      </h1>

      {p.artisan && p.artisan.trim() !== '' && (
        <p className="text-[0.9rem] font-sans mb-2">
          <span className="text-[#8C8477]">by </span>
          <span className="font-semibold text-[#C8A96E]">{p.artisan}</span>
        </p>
      )}

      {specsLine && (
        <p className="text-[0.8rem] text-[#8C8477] font-sans mb-5">{specsLine}</p>
      )}

      <div className="flex items-baseline gap-3 mb-1">
        <span className="font-serif text-[1.9rem] font-semibold text-[#1C1A18]">₹{priceClean}</span>
      </div>
      <p className="text-[0.78rem] text-[#8C8477] mb-6 font-sans">Inclusive of all taxes · Free shipping</p>

      <p className="text-[0.8rem] text-[#1C1A18] font-medium font-sans mb-1">Ships in 2–3 business days</p>
      <p className="text-[0.75rem] text-[#8C8477] font-sans mb-6">Handcrafted piece — dispatched with tracking within 2–3 days</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <div className="h-[3rem] flex-1 rounded-full bg-[#1C1A18] text-white flex items-center justify-between px-4 font-sans">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="text-xl px-1.5 hover:text-[#C8A96E] transition-colors leading-none pb-0.5 cursor-pointer"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-[0.85rem] font-medium">Qty: {qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="text-xl px-1.5 hover:text-[#C8A96E] transition-colors leading-none pb-0.5 cursor-pointer"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button className="btn-secondary flex-1" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleAddToCart}
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-[#C8A96E] text-white text-[0.875rem] font-semibold font-sans transition-all duration-200 hover:bg-[#B8975A] cursor-pointer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
          Add to Cart
        </button>
        <button
          onClick={onToggleWishlist}
          className={`shrink-0 w-12 h-12 rounded-full border bg-white flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? 'border-[#B5533C] text-[#B5533C]'
              : 'border-[#E4DED3] text-[#8C8477] hover:border-[#B5533C] hover:text-[#B5533C]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 mb-8">
        {TRUST_STRIP.map(item => (
          <div key={item.label} className="flex items-center gap-2 text-[#8C8477]">
            <span className="w-8 h-8 rounded-full bg-[#F7F3EC] border border-[#E4DED3] flex items-center justify-center shrink-0">
              {item.icon}
            </span>
            <span className="text-[0.66rem] font-medium tracking-[0.02em] font-sans leading-snug">{item.label}</span>
          </div>
        ))}
      </div>

      {specs.length > 0 && (
        <div className="rounded-2xl border border-[#E4DED3] bg-white p-5">
          <h2 className="text-[0.7rem] tracking-[0.12em] uppercase text-[#8C8477] font-semibold font-sans mb-4">Specifications</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            {specs.map((spec, i) => (
              <div key={i}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  {SPEC_ICONS[spec.label] && (
                    <span className="text-[#8C8477]">{SPEC_ICONS[spec.label]}</span>
                  )}
                  <div className="product-label">{spec.label}</div>
                </div>
                <div className="text-[0.875rem] text-[#1C1A18] font-medium font-sans leading-[1.8]">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
