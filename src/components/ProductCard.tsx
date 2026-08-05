'use client';

import { useEffect, useState } from 'react';
import ProductImage from '@/components/ProductImage';
import type { Product } from '@/lib/data';

const STAGGER = ['', 'mt-5', 'mt-10', 'mt-2', 'mt-7', 'mt-4', 'mt-12', 'mt-6'];

type Props = {
  product: Product;
  isWishlisted: boolean;
  showActions: boolean;
  onToggleWishlist: (e: React.MouseEvent, id: string | number) => void;
  onOpen: (id: string) => void;
  index?: number;
};

export default function ProductCard({
  product: p,
  isWishlisted,
  showActions,
  onToggleWishlist,
  onOpen,
  index = 0,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const open = () => onOpen(p.id);

  const actionBtnClass =
    'w-[34px] h-[34px] rounded-full bg-white/90 flex items-center justify-center text-gray-400 shadow-[0_2px_8px_rgba(0,0,0,0.14)] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] leading-none backdrop-blur-sm hover:bg-white hover:text-[#1C1A18] hover:scale-110 hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] cursor-pointer';

  return (
    <div
      key={p.id}
      className={`break-inside-avoid mb-1.5 sm:mb-2.5 ${STAGGER[index % STAGGER.length]} rounded-xl overflow-hidden bg-white cursor-pointer relative shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-[220ms] inline-block w-full hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] group art-card`}
      role="button"
      tabIndex={0}
      aria-label={`${p.title} — ${p.price}`}
      style={{ animationDelay: `${index * 0.04}s` }}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter') open();
      }}
    >
      <div className="relative overflow-hidden w-full aspect-[3/4]">
        <ProductImage
          className="w-full h-full object-cover block transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
          src={p.images?.[0] || p.image}
          alt={p.title}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-55% opacity-0 transition-opacity duration-300 flex items-end p-3.5 group-hover:opacity-100">
          <span className="bg-white text-gray-900 rounded-full py-1.5 px-4 text-[0.78rem] font-medium font-sans transition-all hover:bg-[#C8A96E] hover:text-white">View Piece</span>
        </div>

        {showActions && (
          <div className="absolute top-2.5 right-2.5 flex items-center gap-2 z-10">
            <button
              className={`${actionBtnClass} ${isWishlisted ? 'text-[#e05252] bg-white' : ''}`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              onClick={(e) => onToggleWishlist(e, p.id)}
            >
              {isWishlisted ? '♥' : '♡'}
            </button>
            <button
              className={`${actionBtnClass} ${isTouch ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              aria-label="More options"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(v => !v);
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="5" r="1.7" />
                <circle cx="12" cy="12" r="1.7" />
                <circle cx="12" cy="19" r="1.7" />
              </svg>
            </button>
          </div>
        )}

        {menuOpen && (
          <div
            className="absolute top-[52px] right-2.5 z-20 min-w-[175px] bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.16)] border border-[#EFEAE1] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="w-full text-left px-4 py-2.5 text-[0.8rem] font-medium text-[#1C1A18] hover:bg-[#F7F3EC] cursor-pointer"
              onClick={(e) => {
                onToggleWishlist(e, p.id);
                setMenuOpen(false);
              }}
            >
              {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
            <button
              className="w-full text-left px-4 py-2.5 text-[0.8rem] font-medium text-[#1C1A18] hover:bg-[#F7F3EC] cursor-pointer border-t border-[#EFEAE1]"
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            >
              View Piece
            </button>
          </div>
        )}
      </div>
      <div className="px-3.5 pt-2.5 pb-3">
        <div className="text-[0.68rem] font-medium tracking-widest uppercase text-[#C8A96E] mb-1">{p.categoryLabel || p.category}</div>
        <div className="font-serif text-[0.975rem] font-medium text-gray-900 leading-[1.3] mb-1">{p.title}</div>
        <div className="text-[0.84rem] font-medium text-gray-500">Rs. {String(p.price).replace('₹', '').trim()}</div>
      </div>
    </div>
  );
}
