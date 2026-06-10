'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';

function GalleryGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = JSON.parse(localStorage.getItem('bs_wishlist') || '[]');
    setWishlist(saved);
  }, []);

  const query = searchParams.get('q')?.toLowerCase().trim() || '';

  const list = PRODUCTS.filter(p => {
    if (!query) return true;
    return p.title.toLowerCase().includes(query) || p.categoryLabel.toLowerCase().includes(query);
  });

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const inList = wishlist.includes(id);
    const updated = inList ? wishlist.filter(x => x !== id) : [...wishlist, id];
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
    <div className="masonry" id="masonry-grid" role="list" aria-label="Art pieces">
      {!list.length ? (
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
              onKeyPress={(e) => handleKeyPress(e, p.id)}
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
  );
}

export default function Home() {
  return (
    <main className="grid-wrap" id="main-content" aria-label="Art gallery">
      <Suspense fallback={<div className="empty-state">Loading gallery...</div>}>
        <GalleryGrid />
      </Suspense>
    </main>
  );
}
