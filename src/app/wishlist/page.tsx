'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';

export default function WishlistPage() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = JSON.parse(localStorage.getItem('bs_wishlist') || '[]');
    setWishlist(saved);
  }, []);

  const list = PRODUCTS.filter(p => wishlist.includes(p.id));

  const removeWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = wishlist.filter(x => x !== id);
    setWishlist(updated);
    localStorage.setItem('bs_wishlist', JSON.stringify(updated));
  };

  if (!isClient) return <main className="inner-page" id="main-content"><div className="page-header"><h1 className="page-title">Your Wishlist</h1><p className="page-sub">Loading saved pieces…</p></div></main>;

  return (
    <main className="inner-page" id="main-content">
      <div className="page-header">
        <h1 className="page-title">Your Wishlist</h1>
        <p className="page-sub">{list.length} piece{list.length === 1 ? '' : 's'} saved</p>
      </div>

      {!list.length ? (
        <div className="wl-empty" id="wishlist-empty">
          <div className="wl-empty-icon">♡</div>
          <h2>Nothing saved yet</h2>
          <p>Tap the heart on any art piece to save it here.</p>
          <Link href="/" className="wl-browse-btn">Browse Gallery</Link>
        </div>
      ) : (
        <div className="masonry" id="wishlist-grid" role="list">
          {list.map((p, i) => (
            <div 
              key={p.id}
              className="art-card" 
              role="button" 
              tabIndex={0}
              onClick={() => router.push(`/product/${p.id}`)}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="card-img-wrap">
                <img className="card-img" src={`/${p.image}`} alt={p.title} loading="lazy" />
                <div className="card-overlay">
                  <span className="card-overlay-btn">View Piece</span>
                  <button 
                    className="wl-remove-btn" 
                    data-id={p.id} 
                    aria-label="Remove from wishlist"
                    onClick={(e) => removeWishlist(e, p.id)}
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
              <div className="card-info">
                <div className="card-cat">{p.categoryLabel}</div>
                <div className="card-title">{p.title}</div>
                <div className="card-price">{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
