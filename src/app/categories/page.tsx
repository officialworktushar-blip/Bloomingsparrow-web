'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';

export default function CategoriesPage() {
  const router = useRouter();
  const [activeCat, setActiveCat] = useState('all');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { products: PRODUCTS, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    setIsClient(true);
    fetchProducts();
    const saved = JSON.parse(localStorage.getItem('bs_wishlist') || '[]');
    setWishlist(saved);
  }, [fetchProducts]);

  const list = PRODUCTS.filter(p => {
    if (activeCat === 'all') return true;
    return p.category === activeCat;
  });

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const inList = wishlist.includes(id);
    const updated = inList ? wishlist.filter(x => x !== id) : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem('bs_wishlist', JSON.stringify(updated));
    
    const btn = e.currentTarget as HTMLButtonElement;
    btn.classList.add('card-wl-btn--bounce');
    setTimeout(() => btn.classList.remove('card-wl-btn--bounce'), 400);
  };

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'rogan-art', label: 'Rogan Art' },
    { id: 'lacquerer-art', label: 'Lacquerer Art' },
    { id: 'bell-art', label: 'Bell Art' },
    { id: 'leather-toys', label: 'Leather Toys' },
    { id: 'shola-art', label: 'Shola Art' },
    { id: 'bird-making', label: 'Bird Making' },
    { id: 'leather-bag', label: 'Leather Bag' }
  ];

  return (
    <>
      <div className="bg-white border-b border-gray-200 py-3 px-4 sticky top-[62px] z-[90]" role="navigation" aria-label="Category filter">
        <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map(c => (
            <button 
              key={c.id}
              className={`shrink-0 py-[0.42rem] px-[1.05rem] rounded-[22px] border-[1.5px] border-gray-200 bg-white text-[0.8rem] font-medium text-gray-500 cursor-pointer transition-all whitespace-nowrap tracking-[0.02em] font-sans hover:border-gray-900 hover:text-gray-900 ${activeCat === c.id ? '!bg-gray-900 !border-gray-900 !text-white' : ''}`}
              onClick={() => setActiveCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      
      <main className="w-full p-1.5 sm:p-2.5" id="main-content" aria-label="Art gallery">
        <div className="w-full columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-1.5 sm:gap-2.5" id="masonry-grid" role="list" aria-label="Art pieces">
          {isLoading ? (
            <p className="text-center py-20 text-gray-400 font-serif text-[1.4rem] italic">Loading gallery...</p>
          ) : !list.length ? (
            <p className="text-center py-20 text-gray-400 font-serif text-[1.4rem] italic">No pieces found</p>
          ) : (
            list.map((p, i) => {
              const isWL = isClient && wishlist.includes(p.id);
                          return (
                <div 
                  key={p.id}
                  className={`break-inside-avoid mb-1.5 sm:mb-2.5 rounded-xl overflow-hidden bg-white cursor-pointer relative shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-[220ms] block hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] group art-card`}
                  role="button" 
                  tabIndex={0}
                  aria-label={`${p.title} — ${p.price}`}
                  style={{ animationDelay: `${i * 0.04}s` }}
                  onClick={() => handleProductClick(p.id)}
                  onKeyPress={(e) => { if (e.key === 'Enter') handleProductClick(p.id); }}
                >
                  <div className={`relative overflow-hidden w-full ${i % 5 === 0 ? 'aspect-[2/3]' : i % 5 === 1 ? 'aspect-[3/4]' : i % 5 === 2 ? 'aspect-[4/5]' : i % 5 === 3 ? 'aspect-square' : 'aspect-[3/5]'}`}>
                    <img className="w-full h-full object-cover block transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105" src={`/${p.image}`} alt={p.title} loading="lazy" />
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
                    <div className="text-[0.68rem] font-medium tracking-widest uppercase text-[#C8A96E] mb-1">{p.categoryLabel}</div>
                    <div className="font-serif text-[0.975rem] font-medium text-gray-900 leading-[1.3] mb-1">{p.title}</div>
                    <div className="text-[0.84rem] font-medium text-gray-500">Rs. {String(p.price).replace('₹', '').trim()}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
