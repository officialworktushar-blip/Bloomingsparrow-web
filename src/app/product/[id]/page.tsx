'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import EnquiryModal from '@/components/EnquiryModal';
import { useStore } from '@/store/useStore';
import Swal from '@/lib/swal';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, addToCart, updateQuantity } = useStore();
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    setIsClient(true);
    fetchProducts();
    const saved = JSON.parse(localStorage.getItem('bs_wishlist') || '[]');
    setWishlist(saved);
  }, [fetchProducts]);

  const p = products.find(x => x.id === id);

  if (isLoading && !p) {
    return (
      <main className="product-page" id="main-content" aria-label="Product detail">
        <div className="empty-state">Loading product...</div>
      </main>
    );
  }

  if (!p) {
    return (
      <main className="product-page" id="main-content" aria-label="Product detail">
        <button className="back-btn" onClick={() => router.back()} aria-label="Go back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Gallery
        </button>
        <div id="product-content" role="region" aria-label="Product information">
          <div className="empty-state">Product not found.</div>
        </div>
      </main>
    );
  }

  const related = products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const isWL = isClient && wishlist.includes(p.id);
  const cartItem = isClient ? cart.find(item => item.id === p.id) : undefined;

  const toggleWishlist = () => {
    const inList = wishlist.includes(p.id);
    const updated = inList ? wishlist.filter(x => x !== p.id) : [...wishlist, p.id];
    setWishlist(updated);
    localStorage.setItem('bs_wishlist', JSON.stringify(updated));
  };

  return (
    <main className="max-w-[1400px] mx-auto pt-10 px-8 pb-20" id="main-content" aria-label="Product detail">
      <button className="inline-flex items-center gap-2 text-sm text-gray-500 py-2 transition-colors mb-8 hover:text-gray-900 group" onClick={() => router.back()} aria-label="Go back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-1" aria-hidden="true">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Gallery
      </button>

      <div id="product-content" role="region" aria-label="Product information">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_450px] gap-16 items-start">
          <div className="rounded-[20px] overflow-hidden shadow-lg"><img className="w-full h-auto object-cover block" src={`/${p.image}`} alt={p.title} /></div>
          <div className="sticky top-[100px]">
            <div className="text-[0.72rem] tracking-[0.1em] uppercase text-[#C8A96E] font-medium mb-3.5">
              <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href={`/categories?cat=${p.category}`}>{p.categoryLabel}</Link>
            </div>
            <h1 className="font-serif text-[2.4rem] font-normal leading-[1.2] mb-3.5 text-gray-900">{p.title}</h1>
            <div className="mb-6">
              <span className="text-[0.85rem] text-gray-500 uppercase tracking-wider font-medium mr-2">Price</span>
              <span className="text-2xl font-medium text-gray-900">{p.price}</span>
              <span className="block text-[0.8rem] text-gray-400 mt-1.5">Inclusive of all taxes &middot; Free shipping</span>
            </div>
            <div className="h-[1px] bg-gray-200 my-5"></div>
            <div className="flex gap-2.5 mb-7">
              {cartItem ? (
                <div className="flex-1 h-12 rounded-full border-2 border-gray-900 bg-white flex items-center justify-between px-6 text-gray-900 font-medium">
                  <button onClick={() => updateQuantity(p.id, cartItem.quantity - 1)} className="text-2xl px-2 hover:text-[#C8A96E] transition-colors leading-none pb-1">−</button>
                  <span className="text-[1.05rem] w-8 text-center">{cartItem.quantity}</span>
                  <button onClick={() => updateQuantity(p.id, cartItem.quantity + 1)} className="text-2xl px-2 hover:text-[#C8A96E] transition-colors leading-none pb-1">+</button>
                </div>
              ) : (
                <button 
                  className="flex-[1.5] h-12 rounded-full bg-gray-900 text-white text-sm font-medium tracking-wide transition-all hover:bg-[#C8A96E] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,169,110,0.35)] flex items-center justify-center" 
                  onClick={() => {
                    addToCart({
                      id: p.id,
                      title: p.title,
                      price: p.price,
                      numericPrice: parseInt(p.price.replace(/\D/g, ''), 10),
                      image: p.image,
                      quantity: 1
                    });
                    Swal.fire({
                      title: 'Added to cart!',
                      icon: 'success',
                      timer: 1500,
                      showConfirmButton: false
                    });
                  }}
                >
                  🛒 Add to Cart
                </button>
              )}
              {isClient && (
                <button 
                  className="flex-1 h-12 text-gray-900 text-sm font-medium transition-all hover:text-[#e05252] flex items-center justify-center gap-2" 
                  id="btn-wishlist"
                  onClick={toggleWishlist}
                  style={isWL ? { color: '#e05252' } : {}}
                >
                  <span className="text-lg">{isWL ? '♥' : '♡'}</span> {isWL ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
              )}
            </div>
            <p className="text-[0.9375rem] text-gray-500 leading-[1.75] mb-[1.4rem]">{p.description}</p>
            <div className="grid grid-cols-2 gap-3.5 mb-7">
              <div className="bg-[#FAFAFA] rounded-xl py-3 px-4"><div className="text-[0.68rem] tracking-[0.08em] uppercase text-gray-400 font-medium mb-1">Material</div><div className="text-[0.875rem] text-gray-900">{p.material}</div></div>
              <div className="bg-[#FAFAFA] rounded-xl py-3 px-4"><div className="text-[0.68rem] tracking-[0.08em] uppercase text-gray-400 font-medium mb-1">Dimensions</div><div className="text-[0.875rem] text-gray-900">{p.dimensions}</div></div>
              <div className="bg-[#FAFAFA] rounded-xl py-3 px-4"><div className="text-[0.68rem] tracking-[0.08em] uppercase text-gray-400 font-medium mb-1">Origin</div><div className="text-[0.875rem] text-gray-900">{p.origin}</div></div>
              <div className="bg-[#FAFAFA] rounded-xl py-3 px-4"><div className="text-[0.68rem] tracking-[0.08em] uppercase text-gray-400 font-medium mb-1">Artisan</div><div className="text-[0.875rem] text-gray-900">{p.artisan}</div></div>
            </div>
            <div className="product-trust mt-6 mb-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3 text-sm text-gray-600">
              <span className="trust-badge flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">🎨 Handcrafted</span>
              <span className="trust-badge flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">✅ Authentic</span>
              <span className="trust-badge flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">📦 Insured Delivery</span>
              <span className="trust-badge flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">↩ Easy Returns</span>
            </div>

          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="font-serif text-[1.7rem] font-normal mb-6">More {p.categoryLabel}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {related.map(r => (
                <div key={r.id} className="rounded-xl overflow-hidden bg-white cursor-pointer shadow-sm transition-all hover:-translate-y-1 hover:shadow-md group" onClick={() => router.push(`/product/${r.id}`)} role="button" tabIndex={0} aria-label={r.title}>
                  <div className="relative w-full"><img className="w-full aspect-square object-cover transition-transform duration-400 group-hover:scale-105" src={`/${r.image}`} alt={r.title} /></div>
                  <div className="p-2 px-3 pb-3">
                    <div className="font-serif text-[0.9rem] font-medium mb-1 text-gray-900">{r.title}</div>
                    <div className="text-[0.8rem] text-gray-500">{r.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productTitle={p.title} 
      />
    </main>
  );
}
