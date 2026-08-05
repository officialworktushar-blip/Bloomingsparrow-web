'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/ProductCard';

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


  return (
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
