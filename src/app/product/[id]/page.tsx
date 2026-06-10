'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '@/lib/data';
import EnquiryModal from '@/components/EnquiryModal';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = JSON.parse(localStorage.getItem('bs_wishlist') || '[]');
    setWishlist(saved);
  }, []);

  const p = PRODUCTS.find(x => x.id === id);

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
          <div className="empty-state">Product not found. <br/><Link href="/" style={{ color: 'var(--accent)' }}>← Back to Gallery</Link></div>
        </div>
      </main>
    );
  }

  const related = PRODUCTS.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const isWL = isClient && wishlist.includes(p.id);

  const toggleWishlist = () => {
    const inList = wishlist.includes(p.id);
    const updated = inList ? wishlist.filter(x => x !== p.id) : [...wishlist, p.id];
    setWishlist(updated);
    localStorage.setItem('bs_wishlist', JSON.stringify(updated));
  };

  return (
    <main className="product-page" id="main-content" aria-label="Product detail">
      <button className="back-btn" onClick={() => router.back()} aria-label="Go back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Gallery
      </button>

      <div id="product-content" role="region" aria-label="Product information">
        <div className="product-layout">
          <div className="product-img-wrap"><img src={`/${p.image}`} alt={p.title} /></div>
          <div className="product-details">
            <div className="product-breadcrumb">
              <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href={`/categories?cat=${p.category}`}>{p.categoryLabel}</Link>
            </div>
            <h1 className="product-title">{p.title}</h1>
            <div className="product-price-block">
              <span className="product-price-label">Price</span>
              <span className="product-price">{p.price}</span>
              <span className="product-price-note">Inclusive of all taxes &middot; Free shipping</span>
            </div>
            <div className="divider"></div>
            <p className="product-desc">{p.description}</p>
            <div className="product-meta">
              <div className="meta-item"><div className="meta-label">Material</div><div className="meta-value">{p.material}</div></div>
              <div className="meta-item"><div className="meta-label">Dimensions</div><div className="meta-value">{p.dimensions}</div></div>
              <div className="meta-item"><div className="meta-label">Origin</div><div className="meta-value">{p.origin}</div></div>
              <div className="meta-item"><div className="meta-label">Artisan</div><div className="meta-value">{p.artisan}</div></div>
            </div>
            <div className="product-actions">
              <button className="btn-primary" id="btn-enquire" onClick={() => setIsModalOpen(true)}>✉ Enquire Now</button>
              {isClient && (
                <button 
                  className="btn-secondary" 
                  id="btn-wishlist"
                  onClick={toggleWishlist}
                  style={isWL ? { color: '#e05252', borderColor: '#e05252' } : {}}
                >
                  {isWL ? '♥ Wishlisted' : '♡ Add to Wishlist'}
                </button>
              )}
            </div>
            <div className="product-trust">
              <span className="trust-badge">🎨 Handcrafted</span>
              <span className="trust-badge">✅ Authentic</span>
              <span className="trust-badge">📦 Insured Delivery</span>
              <span className="trust-badge">↩ Easy Returns</span>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="related-section">
            <h2 className="section-title">More {p.categoryLabel}</h2>
            <div className="related-grid">
              {related.map(r => (
                <div key={r.id} className="related-card" onClick={() => router.push(`/product/${r.id}`)} role="button" tabIndex={0} aria-label={r.title}>
                  <div className="related-card-img-wrap"><img src={`/${r.image}`} alt={r.title} /></div>
                  <div className="related-card-info">
                    <div className="related-card-title">{r.title}</div>
                    <div className="related-card-price">{r.price}</div>
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
