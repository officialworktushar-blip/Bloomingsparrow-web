'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { useReviewStore } from '@/store/useReviewStore';
import Swal from '@/lib/swal';
import { Product } from '@/lib/data';

type Props = {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
};

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= rating ? '#108474' : 'none'} stroke={i <= rating ? '#108474' : '#D4D0C8'} strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function ProductPurchaseBlock({ product, isWishlisted, onToggleWishlist }: Props) {
  const router = useRouter();
  const { addToCart } = useStore();
  const { summary } = useReviewStore();
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

  const specsLine = [p.dimensions, p.material].filter(Boolean).join(' · ');
  const totalReviews = summary?.totalReviews ?? 0;

  return (
    <div className="flex flex-col">
      <p className="order-1 text-[0.65rem] tracking-[0.14em] uppercase text-[#7e7e84] font-medium font-sans mb-[var(--space-xs)]">
        {p.categoryLabel}{p.origin ? ` · ${p.origin}` : ''}
      </p>

      <div className="order-2 md:order-3">
        <div className="flex items-baseline gap-3">
          <span className="font-sans text-[1.9rem] font-semibold text-[#252525]">₹{priceClean}</span>
        </div>
        <p className="text-[0.78rem] text-[#7e7e84] mb-[var(--space-gap)] font-sans">Inclusive of all taxes · Free shipping</p>
      </div>

      <h1 className="order-3 md:order-2 font-sans text-[1.9rem] sm:text-[2.3rem] lg:text-[2.6rem] font-semibold leading-[1.12] text-[#252525] tracking-[-0.01em] mb-[var(--space-gap)]">
        {p.title}
      </h1>

      {summary && (
        <a
          href="#reviews"
          className="order-4 inline-flex items-center gap-2 mb-1 w-fit no-underline group scroll-mt-28"
          aria-label={`Rated ${summary.averageRating.toFixed(1)} out of 5, read ${totalReviews} review${totalReviews === 1 ? '' : 's'}`}
        >
          <StarRating rating={Math.round(summary.averageRating)} />
          <span className="text-[0.78rem] text-[#7e7e84] font-sans group-hover:text-[#252525] transition-colors">
            {totalReviews > 0
              ? `${summary.averageRating.toFixed(1)} (${totalReviews} review${totalReviews === 1 ? '' : 's'})`
              : 'Be the first to review'}
          </span>
        </a>
      )}

      {p.artisan && p.artisan.trim() !== '' && (
        <p className="order-5 text-[0.9rem] font-sans mb-1">
          <span className="text-[#7e7e84]">by </span>
          <span className="font-semibold text-[#287379]">{p.artisan}</span>
        </p>
      )}

      {specsLine && (
        <p className="order-6 text-[0.8rem] text-[#7e7e84] font-sans mb-[var(--space-md)]">{specsLine}</p>
      )}

      <hr className="order-7 border-t border-[#efede8] mt-0 mb-[var(--space-md)]" />

      <div className="order-8 flex gap-2 sm:gap-3 mb-[var(--space-btn)]">
        <div className="flex-1 h-12 rounded-full border border-[#efede8] bg-white text-[#252525] flex items-center justify-between px-2 font-sans">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-full bg-[#287379] text-white flex items-center justify-center text-lg leading-none hover:bg-[#252525] transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-[0.85rem] font-medium">Qty: {qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="w-8 h-8 rounded-full bg-[#287379] text-white flex items-center justify-center text-lg leading-none hover:bg-[#252525] transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          onClick={onToggleWishlist}
          className={`shrink-0 w-12 h-12 rounded-full border bg-white flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? 'border-[#d24418] text-[#d24418]'
              : 'border-[#efede8] text-[#7e7e84] hover:border-[#d24418] hover:text-[#d24418]'
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

      <button onClick={handleAddToCart} className="order-9 btn-primary w-full mb-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
        </svg>
        Add to Cart
      </button>

      <button onClick={handleBuyNow} className="order-10 btn-secondary w-full">
        Buy Now
      </button>
    </div>
  );
}