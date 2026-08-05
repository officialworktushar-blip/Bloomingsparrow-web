'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { products: PRODUCTS, fetchProducts } = useProductStore();

  useEffect(() => {
    setIsClient(true);
    fetchProducts();
    const saved = JSON.parse(localStorage.getItem('bs_wishlist') || '[]').map(String);
    setWishlist(saved);
  }, [fetchProducts]);

  const list = PRODUCTS.filter(p => wishlist.includes(String(p.id)));

  const removeWishlist = (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    const strId = String(id);
    const updated = wishlist.filter(x => x !== strId);
    setWishlist(updated);
    localStorage.setItem('bs_wishlist', JSON.stringify(updated));
  };

  if (!isClient) return <main className="w-full p-1.5 sm:p-2.5" id="main-content"><div className="flex items-center justify-between px-2 pt-2 mb-6 flex-wrap gap-3"><h1 className="font-serif text-[2rem] font-normal text-gray-900">Your Wishlist</h1><p className="text-[0.875rem] text-gray-500">Loading saved pieces…</p></div></main>;

  return (
    <main className="w-full p-1.5 sm:p-2.5" id="main-content">
      <div className="flex items-center justify-between px-2 pt-2 mb-6 flex-wrap gap-3">
        <h1 className="font-serif text-[2rem] font-normal text-gray-900">Your Wishlist</h1>
        <p className="text-[0.875rem] text-gray-500">{list.length} piece{list.length === 1 ? '' : 's'} saved</p>
      </div>

      {!list.length ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center gap-4" id="wishlist-empty">
          <div className="text-[3.5rem] text-gray-200">♡</div>
          <h2 className="font-serif text-[1.6rem] font-normal text-gray-900">Nothing saved yet</h2>
          <p className="text-[0.9rem] text-gray-500">Tap the heart on any art piece to save it here.</p>
          <Link href="/" className="inline-flex items-center py-[0.55rem] px-[1.4rem] rounded-full bg-gray-900 text-white text-[0.85rem] font-medium font-sans transition-all hover:bg-[#C8A96E]">Browse Gallery</Link>
        </div>
      ) : (
        <div className="w-full columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-1.5 sm:gap-2.5" id="wishlist-grid" role="list">
          {list.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              isWishlisted
              showActions
              onToggleWishlist={removeWishlist}
              onOpen={(id) => router.push(`/product/${id}`)}
              index={i}
            />
          ))}
        </div>
      )}
    </main>
  );
}
