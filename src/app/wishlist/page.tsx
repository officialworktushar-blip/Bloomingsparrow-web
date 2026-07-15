'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';

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
            <div 
              key={p.id}
              className="break-inside-avoid mb-1.5 sm:mb-2.5 rounded-xl overflow-hidden bg-white cursor-pointer relative shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-[220ms] block hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] group art-card" 
              role="button" 
              tabIndex={0}
              onClick={() => router.push(`/product/${p.id}`)}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`relative overflow-hidden w-full ${i % 5 === 0 ? 'aspect-[2/3]' : i % 5 === 1 ? 'aspect-[3/4]' : i % 5 === 2 ? 'aspect-[4/5]' : i % 5 === 3 ? 'aspect-square' : 'aspect-[3/5]'}`}>
                <img className="w-full h-full object-cover block transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105" src={p.image.includes('prod-') ? `${process.env.NEXT_PUBLIC_API_URL || 'https://api.bloomingsparrow.com'}/${p.image}` : `/${p.image}`} alt={p.title} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-55% opacity-0 transition-opacity duration-300 flex items-end p-3.5 group-hover:opacity-100">
                  <span className="bg-white text-gray-900 rounded-full py-1.5 px-4 text-[0.78rem] font-medium font-sans transition-all hover:bg-[#C8A96E] hover:text-white">View Piece</span>
                  <button 
                    className="bg-white/90 text-[#e05252] rounded-[16px] py-[0.35rem] px-[0.8rem] text-[0.75rem] font-medium font-sans cursor-pointer ml-2 transition-all hover:bg-white" 
                    data-id={p.id} 
                    aria-label="Remove from wishlist"
                    onClick={(e) => removeWishlist(e, p.id)}
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
              <div className="px-3.5 pt-2.5 pb-3">
                <div className="text-[0.68rem] font-medium tracking-widest uppercase text-[#C8A96E] mb-1">{p.categoryLabel || p.category}</div>
                <div className="font-serif text-[0.975rem] font-medium text-gray-900 leading-[1.3] mb-1">{p.title}</div>
                <div className="text-[0.84rem] font-medium text-gray-500">Rs. {String(p.price).replace('₹', '').trim()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
