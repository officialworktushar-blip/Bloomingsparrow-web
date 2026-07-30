'use client';

import { useRouter } from 'next/navigation';
import { Product } from '@/lib/data';

type Props = {
  products: Product[];
  categoryLabel: string;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  isInCart: (id: string) => boolean;
};

function resolveImageSrc(img: string): string {
  if (img.includes('prod-')) {
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://api.bloomingsparrow.com'}/${img}`;
  }
  return `/${img}`;
}

export default function ProductRelated({ products, categoryLabel, wishlist, onToggleWishlist, onAddToCart, isInCart }: Props) {
  const router = useRouter();

  if (products.length === 0) return null;

  return (
    <div className="mt-12 pt-10 border-t border-[#E4DED3]">
      <h2 className="font-serif text-[1.6rem] font-semibold text-[#1C1A18] mb-6">
        More {categoryLabel}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {products.map(r => {
          const isWL = wishlist.includes(String(r.id));
          const inCart = isInCart(String(r.id));
          return (
            <div
              key={r.id}
              className="rounded-xl overflow-hidden bg-white border border-[#E4DED3] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] group flex flex-col"
            >
              <div
                className="relative w-full bg-[#EFEAE1] cursor-pointer"
                onClick={() => router.push(`/product/${r.id}`)}
                role="button"
                tabIndex={0}
                aria-label={r.title}
                onKeyDown={(e) => { if (e.key === 'Enter') router.push(`/product/${r.id}`); }}
              >
                <img
                  className="w-full aspect-square object-cover transition-transform duration-400 group-hover:scale-105"
                  src={resolveImageSrc(r.images?.[0] || r.image)}
                  alt={r.title}
                  loading="lazy"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleWishlist(String(r.id)); }}
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isWL ? 'bg-[#B5533C] text-white' : 'bg-white/80 text-[#8C8477] hover:bg-white hover:text-[#B5533C]'
                  }`}
                  aria-label={isWL ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={isWL ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
              <div className="p-2.5 px-3 pb-3 flex flex-col flex-1">
                <div
                  className="font-serif text-[0.9rem] font-medium mb-0.5 text-[#1C1A18] leading-tight cursor-pointer"
                  onClick={() => router.push(`/product/${r.id}`)}
                >
                  {r.title}
                </div>
                <div className="text-[0.8rem] text-[#8C8477] font-sans mb-2">₹{String(r.price).replace('₹', '').trim()}</div>
                <div className="mt-auto flex items-center gap-1.5">
                  <button
                    onClick={() => { if (!inCart) onAddToCart(r); }}
                    className={`hidden md:flex flex-1 h-8 rounded-full text-[0.7rem] font-medium font-sans transition-all duration-200 cursor-pointer ${
                      inCart
                        ? 'bg-[#4B5D45] text-white'
                        : 'bg-[#1C1A18] text-white hover:bg-[#2a2724]'
                    } items-center justify-center gap-1.5`}
                    aria-label={inCart ? 'Already in cart' : `Add ${r.title} to cart`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    {inCart ? 'In Cart' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => { if (!inCart) onAddToCart(r); }}
                    className={`md:hidden h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 cursor-pointer ${
                      inCart
                        ? 'bg-[#4B5D45] text-white'
                        : 'bg-[#1C1A18] text-white hover:bg-[#2a2724]'
                    }`}
                    aria-label={inCart ? 'Already in cart' : `Add ${r.title} to cart`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
