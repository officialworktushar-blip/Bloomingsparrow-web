'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/data';
import ProductImage from '@/components/ProductImage';

type Props = {
  products: Product[];
  categoryLabel: string;
  categorySlug?: string;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  isInCart: (id: string) => boolean;
};

export default function ProductRelated({ products, categoryLabel, categorySlug, wishlist, onToggleWishlist, onAddToCart, isInCart }: Props) {
  const router = useRouter();

  if (products.length === 0) return null;

  const allSameCategory = products.every(x => x.category === categorySlug);
  const heading = allSameCategory ? `More ${categoryLabel}` : 'You may also like';

  return (
    <section className="mt-16 pt-12 border-t border-[#E4DED3]" aria-label={`Related ${categoryLabel} products`}>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[0.65rem] tracking-[0.16em] uppercase text-[#C8A96E] font-semibold font-sans mb-2">Handpicked for you</p>
          <h2 className="font-serif text-[1.8rem] sm:text-[2.2rem] font-semibold text-[#1C1A18] leading-tight">
            {heading}
          </h2>
          <div className="mt-3 h-[3px] w-14 rounded-full bg-[#C8A96E]" aria-hidden="true" />
        </div>
        {categorySlug && (
          <Link
            href={`/categories?cat=${categorySlug}`}
            className="hidden sm:inline-flex items-center gap-1.5 h-10 px-5 rounded-full border border-[#E4DED3] text-[0.75rem] font-medium text-[#8C8477] font-sans transition-all duration-200 hover:border-[#1C1A18] hover:text-[#1C1A18] no-underline shrink-0"
          >
            View All
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {products.map(r => {
          const isWL = wishlist.includes(String(r.id));
          const inCart = isInCart(String(r.id));
          return (
            <div
              key={r.id}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E4DED3] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(28,26,24,0.13)]"
            >
              <div
                className="relative overflow-hidden aspect-[3/4] bg-[#EFEAE1] cursor-pointer"
                onClick={() => router.push(`/product/${r.id}`)}
                role="button"
                tabIndex={0}
                aria-label={r.title}
                onKeyDown={(e) => { if (e.key === 'Enter') router.push(`/product/${r.id}`); }}
              >
                <ProductImage
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  src={r.images?.[0] || r.image}
                  alt={r.title}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />

                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#1C1A18] text-[0.58rem] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full shadow-sm">
                  {r.categoryLabel || categoryLabel}
                </span>

                <button
                  onClick={(e) => { e.stopPropagation(); onToggleWishlist(String(r.id)); }}
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer ${
                    isWL
                      ? 'bg-[#B5533C] text-white'
                      : 'bg-white/90 backdrop-blur-sm text-[#8C8477] hover:bg-white hover:text-[#B5533C]'
                  }`}
                  aria-label={isWL ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={isWL ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>

                <div className="absolute inset-x-3 bottom-3 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={(e) => { e.stopPropagation(); if (!inCart) onAddToCart(r); }}
                    className={`hidden md:flex w-full h-10 rounded-full items-center justify-center gap-1.5 text-[0.75rem] font-semibold font-sans transition-all duration-200 cursor-pointer ${
                      inCart
                        ? 'bg-[#4B5D45] text-white cursor-default'
                        : 'bg-white text-[#1C1A18] hover:bg-[#C8A96E] hover:text-white'
                    }`}
                    aria-label={inCart ? 'Already in cart' : `Add ${r.title} to cart`}
                  >
                    {inCart ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        In Cart
                      </>
                    ) : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div
                  className="font-serif text-[1.02rem] font-semibold text-[#1C1A18] leading-tight mb-1 cursor-pointer transition-colors hover:text-[#C8A96E]"
                  onClick={() => router.push(`/product/${r.id}`)}
                >
                  {r.title}
                </div>
                {r.artisan && r.artisan.trim() !== '' && (
                  <div className="text-[0.72rem] text-[#8C8477] font-sans mb-2">by {r.artisan}</div>
                )}
                <div className="mt-auto flex items-center justify-between pt-1">
                  <span className="font-serif text-[1.1rem] font-semibold text-[#1C1A18]">
                    ₹{String(r.price).replace('₹', '').trim()}
                  </span>
                  {inCart ? (
                    <span className="text-[0.62rem] font-semibold uppercase tracking-wide bg-[#4B5D45]/10 text-[#4B5D45] px-2.5 py-1 rounded-full">
                      In Cart
                    </span>
                  ) : (
                    <button
                      onClick={() => onAddToCart(r)}
                      className="md:hidden w-8 h-8 rounded-full bg-[#1C1A18] text-white flex items-center justify-center cursor-pointer hover:bg-[#C8A96E] transition-colors"
                      aria-label={`Add ${r.title} to cart`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {categorySlug && (
        <div className="sm:hidden mt-6 text-center">
          <Link
            href={`/categories?cat=${categorySlug}`}
            className="inline-flex items-center gap-1.5 h-10 px-6 rounded-full border border-[#E4DED3] text-[0.75rem] font-medium text-[#8C8477] font-sans transition-all duration-200 hover:border-[#1C1A18] hover:text-[#1C1A18] no-underline"
          >
            View All {categoryLabel}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
