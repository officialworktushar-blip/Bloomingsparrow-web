'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/data';

type Props = {
  products: Product[];
  isClient: boolean;
  wishlist: string[];
  onToggleWishlist: (e: React.MouseEvent, id: string | number) => void;
  onOpen: (id: string) => void;
};

export default function TabbedShowcase({ products, isClient, wishlist, onToggleWishlist, onOpen }: Props) {
  const [active, setActive] = useState('all');

  const tabs = (() => {
    const seen = new Map<string, string>();
    products.forEach(p => {
      const slug = String(p.category || '').toLowerCase().replace(/\s+/g, '-');
      if (slug && !seen.has(slug)) seen.set(slug, p.categoryLabel || p.category || '');
    });
    return [{ slug: 'all', label: 'All' }, ...Array.from(seen.entries()).map(([slug, label]) => ({ slug, label }))];
  })();

  const list = active === 'all' ? products : products.filter(p => String(p.category || '').toLowerCase().replace(/\s+/g, '-') === active);

  return (
    <section className="py-10 sm:py-14 bg-white border-y border-[#efede8]" aria-label="Product showcase">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-8">
          <span className="section-kicker">Take your pick</span>
          <h2 className="section-title mt-1">Explore the Collection</h2>
          <p className="section-subtitle mt-2 max-w-[620px] mx-auto">
            Switch between categories to discover masterpieces across India&apos;s craft traditions.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10" role="tablist" aria-label="Product categories">
          {tabs.map(tab => (
            <button
              key={tab.slug}
              type="button"
              role="tab"
              aria-selected={active === tab.slug}
              onClick={() => setActive(tab.slug)}
              className={`px-4 py-2 font-sans text-[0.76rem] font-semibold uppercase tracking-[0.14em] border-2 transition-colors cursor-pointer ${
                active === tab.slug
                  ? 'bg-[#287379] border-[#287379] text-white'
                  : 'bg-transparent border-[rgba(40,115,121,0.18)] text-[#202025] hover:border-[#287379] hover:text-[#287379]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {list.slice(0, 12).map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              isWishlisted={isClient && wishlist.includes(String(p.id))}
              showActions={isClient}
              onToggleWishlist={onToggleWishlist}
              onOpen={onOpen}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}