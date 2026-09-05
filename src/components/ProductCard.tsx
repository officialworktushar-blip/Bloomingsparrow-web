'use client';

import { useEffect, useRef, useState } from 'react';
import ProductImage from '@/components/ProductImage';
import BestSellerBadge from '@/components/BestSellerBadge';
import { useStore } from '@/store/useStore';
import type { Product } from '@/lib/data';

type Props = {
  product: Product;
  isWishlisted: boolean;
  showActions: boolean;
  onToggleWishlist: (e: React.MouseEvent, id: string | number) => void;
  onOpen: (id: string) => void;
  index?: number;
};

function Stars() {
  return (
    <span className="inline-flex items-center gap-[2px]" aria-label="Rated 4.8 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#108474" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      <span className="ml-1 text-[0.68rem] font-medium text-[#7e7e84] font-sans">4.8</span>
    </span>
  );
}

export default function ProductCard({
  product: p,
  isWishlisted,
  showActions,
  onToggleWishlist,
  onOpen,
  index = 0,
}: Props) {
  const addToCart = useStore(state => state.addToCart);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (addedTimer.current) window.clearTimeout(addedTimer.current);
  }, []);

  const open = () => onOpen(p.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: p.id,
      title: p.title,
      price: p.price,
      numericPrice: Number(String(p.price).replace(/[₹,]/g, '')) || 0,
      image: p.images?.[0] || p.image,
      quantity: 1,
    });
    setAdded(true);
    if (addedTimer.current) window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setAdded(false), 1200);
  };

  const firstImage = p.images?.[0] || p.image;
  const secondImage = p.images?.[1];

  return (
    <div
      key={p.id}
      className={`h-full w-full flex flex-col bg-white cursor-pointer relative group product-card art-card`}
      role="button"
      tabIndex={0}
      aria-label={`${p.title} — ${p.price}`}
      style={{ animationDelay: `${index * 0.04}s` }}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter') open();
      }}
    >
      <div className="relative overflow-hidden w-full aspect-square bg-[#f5f2ec] product-card__media">
        <ProductImage
          className="w-full h-full object-cover block transition-opacity duration-500 ease-in-out"
          src={firstImage}
          alt={p.title}
          loading="lazy"
        />
        {secondImage && (
          <ProductImage
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
            src={secondImage}
            alt={`${p.title} alternate view`}
            loading="lazy"
          />
        )}

        <BestSellerBadge />

        {showActions && (
          <button
            className={`absolute top-2 right-2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isWishlisted
                ? 'bg-[#e05252] text-white'
                : 'bg-white/90 text-[#202025] hover:bg-[#287379] hover:text-white shadow-[0_2px_8px_rgba(0,0,0,0.14)]'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={(e) => onToggleWishlist(e, p.id)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-10">
          <button
            className={`w-full h-10 inline-flex items-center justify-center gap-1.5 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer border-t border-[#efede8] ${
              added ? 'bg-[#252525] text-white' : 'bg-white text-[#202025] hover:bg-[#287379] hover:text-white'
            }`}
            onClick={handleAddToCart}
            aria-label={`Add ${p.title} to cart`}
          >
            {added ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      <div className="px-3.5 pt-3 pb-3.5 flex flex-col flex-1 gap-1 product-card__info">
        <span className="product-label">{p.categoryLabel || 'Art'}</span>
        <h3 className="font-sans text-[0.82rem] font-medium text-[#202025] leading-[1.35]">
          {p.title}
        </h3>
        <Stars />
        <div className="font-sans text-[0.95rem] font-semibold text-[#287379]">
          ₹{String(p.price).replace(/[₹\s]/g, '').trim()}
        </div>
      </div>
    </div>
  );
}