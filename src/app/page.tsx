'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';

function GalleryGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { products: PRODUCTS, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    setIsClient(true);
    fetchProducts();
    const saved = JSON.parse(localStorage.getItem('bs_wishlist') || '[]');
    setWishlist(saved);
  }, [fetchProducts]);

  const query = searchParams.get('q')?.toLowerCase().trim() || '';

  const list = PRODUCTS.filter(p => {
    if (!query) return true;
    return p.title.toLowerCase().includes(query) || p.categoryLabel.toLowerCase().includes(query);
  });

  const toggleWishlist = (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    const strId = String(id);
    const inList = wishlist.includes(strId);
    const updated = inList ? wishlist.filter(x => x !== strId) : [...wishlist, strId];
    setWishlist(updated);
    localStorage.setItem('bs_wishlist', JSON.stringify(updated));
    
    // Bounce animation logic
    const btn = e.currentTarget as HTMLButtonElement;
    btn.classList.add('card-wl-btn--bounce');
    setTimeout(() => btn.classList.remove('card-wl-btn--bounce'), 400);
  };

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') handleProductClick(id);
  };


  return (
    <div className="w-full columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-1.5 sm:gap-2.5" id="masonry-grid" role="list" aria-label="Art pieces">
      {isLoading ? (
        <p className="text-center py-20 text-gray-400 font-serif text-[1.4rem] italic">Loading gallery...</p>
      ) : !list.length ? (
        <p className="text-center py-20 text-gray-400 font-serif text-[1.4rem] italic">No pieces found</p>
      ) : (
        list.map((p, i) => {
          const isWL = isClient && wishlist.includes(String(p.id));
          const bounceClass = 'card-wl-btn--bounce'; // Handled via JS/CSS animation
          return (
            <div 
              key={p.id}
              className={`break-inside-avoid mb-1.5 sm:mb-2.5 rounded-xl overflow-hidden bg-white cursor-pointer relative shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-[220ms] inline-block w-full hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] group art-card`}
              role="button" 
              tabIndex={0}
              aria-label={`${p.title} — ${p.price}`}
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => handleProductClick(p.id)}
              onKeyPress={(e) => handleKeyPress(e, p.id)}
            >
              <div className={`relative overflow-hidden w-full ${i % 5 === 0 ? 'aspect-[2/3]' : i % 5 === 1 ? 'aspect-[3/4]' : i % 5 === 2 ? 'aspect-[4/5]' : i % 5 === 3 ? 'aspect-square' : 'aspect-[3/5]'}`}>
                <img className="w-full h-full object-cover block transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105" src={p.image.includes('prod-') ? `${process.env.NEXT_PUBLIC_API_URL || 'https://api.bloomingsparrow.com'}/${p.image}` : `/${p.image}`} alt={p.title} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-55% opacity-0 transition-opacity duration-300 flex items-end p-3.5 group-hover:opacity-100">
                  <span className="bg-white text-gray-900 rounded-full py-1.5 px-4 text-[0.78rem] font-medium font-sans transition-all hover:bg-[#C8A96E] hover:text-white">View Piece</span>
                </div>
                {isClient && (
                  <button 
                    className={`absolute top-2.5 right-2.5 w-[34px] h-[34px] rounded-full bg-white/90 flex items-center justify-center text-gray-400 shadow-[0_2px_8px_rgba(0,0,0,0.14)] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] z-10 leading-none backdrop-blur-sm hover:bg-white hover:text-[#e05252] hover:scale-110 hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)] ${isWL ? 'text-[#e05252] bg-white' : ''}`}
                    aria-label={isWL ? 'Remove from wishlist' : 'Add to wishlist'}
                    title={isWL ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    onClick={(e) => toggleWishlist(e, p.id)}
                  >
                    {isWL ? '♥' : '♡'}
                  </button>
                )}
              </div>
              <div className="px-3.5 pt-2.5 pb-3">
                <div className="text-[0.68rem] font-medium tracking-widest uppercase text-[#C8A96E] mb-1">{p.categoryLabel || p.category}</div>
                <div className="font-serif text-[0.975rem] font-medium text-gray-900 leading-[1.3] mb-1">{p.title}</div>
                <div className="text-[0.84rem] font-medium text-gray-500">Rs. {String(p.price).replace('₹', '').trim()}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full p-1.5 sm:p-2.5" id="main-content" aria-label="Art gallery">
      <Suspense fallback={<div className="text-center py-20 text-gray-400 font-serif text-[1.4rem] italic">Loading gallery...</div>}>
        <GalleryGrid />
      </Suspense>
    </main>
  );
}
