'use client';

import { Suspense, useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/ProductCard';

export default function CategoriesPage() {
  return (
    <Suspense fallback={null}>
      <CategoriesView />
    </Suspense>
  );
}

function CategoriesView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat');
  const [manualCat, setManualCat] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { products: PRODUCTS, fetchProducts, isLoading } = useProductStore();

  const activeCat = catParam ?? manualCat ?? 'all';

  useEffect(() => {
    setIsClient(true);
    fetchProducts();
    const saved = JSON.parse(localStorage.getItem('bs_wishlist') || '[]');
    setWishlist(saved);
  }, [fetchProducts]);

  const list = PRODUCTS.filter(p => {
    if (activeCat === 'all') return true;
    const cat = String(p.category || '').toLowerCase().replace(/\s+/g, '-');
    return cat === activeCat;
  });

  const toggleWishlist = (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    const strId = String(id);
    const inList = wishlist.includes(strId);
    const updated = inList ? wishlist.filter(x => x !== strId) : [...wishlist, strId];
    setWishlist(updated);
    localStorage.setItem('bs_wishlist', JSON.stringify(updated));
    
    const btn = e.currentTarget as HTMLButtonElement;
    btn.classList.add('card-wl-btn--bounce');
    setTimeout(() => btn.classList.remove('card-wl-btn--bounce'), 400);
  };

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  const categories = useMemo(() => {
    const catsMap = new Map<string, string>();
    PRODUCTS.forEach(p => {
      const label = p.categoryLabel || p.category || '';
      if (!label) return;
      const id = String(p.category || '').toLowerCase().replace(/\s+/g, '-');
      if (id && !catsMap.has(id)) {
        catsMap.set(id, label);
      }
    });
    const dynamicCategories = Array.from(catsMap.entries()).map(([id, label]) => ({ id, label }));
    return [{ id: 'all', label: 'All' }, ...dynamicCategories];
  }, [PRODUCTS]);

  return (
    <>
      <div className="bg-white border-b border-gray-200 py-3 px-4 sticky top-16 z-[90]" role="navigation" aria-label="Category filter">
        <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map(c => (
            <button 
              key={c.id}
              className={`shrink-0 py-[0.42rem] px-[1.05rem] rounded-[22px] border-[1.5px] border-gray-200 bg-white text-[0.8rem] font-medium text-gray-500 cursor-pointer transition-all whitespace-nowrap tracking-[0.02em] font-sans hover:border-gray-900 hover:text-gray-900 ${activeCat === c.id ? '!bg-gray-900 !border-gray-900 !text-white' : ''}`}
              onClick={() => setManualCat(c.id)}
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
              const isWL = isClient && wishlist.includes(String(p.id));
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  isWishlisted={isWL}
                  showActions={isClient}
                  onToggleWishlist={toggleWishlist}
                  onOpen={handleProductClick}
                  index={i}
                />
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
