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
      <div className="cat-bar" role="navigation" aria-label="Category filter">
        <div className="cat-bar-inner">
          {categories.map(c => (
            <button 
              key={c.id}
              className={`pill ${activeCat === c.id ? 'active' : ''}`}
              onClick={() => setActiveCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      
      <main className="grid-wrap" id="main-content" aria-label="Art gallery">
        <div className="masonry" id="masonry-grid" role="list" aria-label="Art pieces">
          {isLoading ? (
            <p className="empty-state">Loading gallery...</p>
          ) : !list.length ? (
            <p className="empty-state">No pieces found</p>
          ) : (
            list.map((p, i) => {
              const isWL = isClient && wishlist.includes(p.id);
              return (
                <div 
                  key={p.id}
                  className="art-card" 
                  role="button" 
                  tabIndex={0}
                  aria-label={`${p.title} — ${p.price}`}
                  style={{ animationDelay: `${i * 0.04}s` }}
                  onClick={() => handleProductClick(p.id)}
                  onKeyPress={(e) => { if (e.key === 'Enter') handleProductClick(p.id); }}
                >
                  <div className="card-img-wrap">
                    <img className="card-img" src={`/${p.image}`} alt={p.title} loading="lazy" />
                    <div className="card-overlay">
                      <span className="card-overlay-btn">View Piece</span>
                    </div>
                    {isClient && (
                      <button 
                        className={`card-wl-btn ${isWL ? 'card-wl-btn--active' : ''}`}
                        aria-label={isWL ? 'Remove from wishlist' : 'Add to wishlist'}
                        title={isWL ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        onClick={(e) => toggleWishlist(e, p.id)}
                      >
                        {isWL ? '♥' : '♡'}
                      </button>
                    )}
                  </div>
                  <div className="card-info">
                    <div className="card-cat">{p.categoryLabel}</div>
                    <div className="card-title">{p.title}</div>
                    <div className="card-price">{p.price}</div>
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
