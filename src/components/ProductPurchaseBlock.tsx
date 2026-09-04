'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import Swal from '@/lib/swal';
import { Product } from '@/lib/data';

type Props = {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
};

export default function ProductPurchaseBlock({ product, isWishlisted, onToggleWishlist }: Props) {
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

  const specsLine = [p.dimensions, p.material].filter(Boolean).join(' · ');

  return (
    <div className="flex flex-col">
      <p className="text-[0.65rem] tracking-[0.14em] uppercase text-[#7e7e84] font-medium font-sans mb-2">
        {p.categoryLabel}{p.origin ? ` · ${p.origin}` : ''}
      </p>

      <h1 className="font-serif text-[2rem] sm:text-[2.4rem] lg:text-[2.8rem] font-semibold leading-[1.12] text-[#252525] tracking-[-0.01em] mb-2">
        {p.title}
      </h1>

      {p.artisan && p.artisan.trim() !== '' && (
        <p className="text-[0.9rem] font-sans mb-2">
          <span className="text-[#7e7e84]">by </span>
          <span className="font-semibold text-[#287379]">{p.artisan}</span>
        </p>
      )}

      {specsLine && (
        <p className="text-[0.8rem] text-[#7e7e84] font-sans mb-5">{specsLine}</p>
      )}

      <div className="flex items-baseline gap-3 mb-1">
        <span className="font-serif text-[1.9rem] font-semibold text-[#252525]">₹{priceClean}</span>
      </div>
      <p className="text-[0.78rem] text-[#7e7e84] mb-6 font-sans">Inclusive of all taxes · Free shipping</p>

      <div className="flex gap-2 sm:gap-3 mb-3">
        <div className="w-[42%] lg:w-auto lg:flex-1 h-12 rounded-full border border-[#efede8] bg-white lg:border-[#252525] lg:bg-transparent text-[#252525] flex items-center justify-between px-4 font-sans">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="text-xl px-1.5 hover:text-[#287379] transition-colors leading-none pb-0.5 cursor-pointer"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-[0.85rem] font-medium">Qty: {qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="text-xl px-1.5 hover:text-[#287379] transition-colors leading-none pb-0.5 cursor-pointer"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button className="btn-primary flex-1 font-semibold lg:font-medium" onClick={handleBuyNow}>
          Buy Now
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleAddToCart}
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-[#287379] text-white text-[0.875rem] font-semibold font-sans transition-all duration-200 hover:bg-[#B8975A] cursor-pointer"
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
    </div>
  );
}
