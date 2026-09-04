'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/ProductCard';
import HeroCarousel from '@/components/home/HeroCarousel';
import CategoryCircles from '@/components/home/CategoryCircles';
import ProductGridSection from '@/components/home/ProductGridSection';
import TabbedShowcase from '@/components/home/TabbedShowcase';
import Testimonials from '@/components/home/Testimonials';
import TrustBadges from '@/components/home/TrustBadges';
import { PRODUCTS } from '@/lib/data';

const FEATURED_COPY: Record<string, { title: string; subtitle: string }> = {
  'bird-making': {
    title: 'Bird Making',
    subtitle: 'Lifelike avian sculptures handcrafted by Kondapalli, Bankura and Krishnanagar artisans.',
  },
  'leather-bag': {
    title: 'Leather Bags',
    subtitle: 'Hand-tooled, block-printed and woven leather bags from Kanpur, Barmer and beyond.',
  },
  'bell-art': {
    title: 'Bell Art',
    subtitle: 'Resonant temple bells and wind chimes cast by Varanasi and Moradabad metalworkers.',
  },
  'rogan-art': {
    title: 'Rogan Art',
    subtitle: 'Ancient castor-oil painting from Kutch — a technique passed down for over 400 years.',
  },
  'shola-art': {
    title: 'Shola Art',
    subtitle: 'Ethereal white sponge-wood florals and figures from the malakari artists of Bengal.',
  },
};

export default function Home() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-[#7e7e84] font-sans text-[1.1rem] italic">Loading gallery...</div>}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    setIsClient(true);
    fetchProducts();
    const saved = JSON.parse(localStorage.getItem('bs_wishlist') || '[]');
    setWishlist(saved);
  }, [fetchProducts]);

  const query = searchParams.get('q')?.toLowerCase().trim() || '';
  const source = products.length > 0 ? products : PRODUCTS;

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

  if (query) {
    const list = source
      .filter(p => p.title.toLowerCase().includes(query) || p.categoryLabel.toLowerCase().includes(query))
      .map((p, i) => ({ id: String(p.id), isWL: isClient && wishlist.includes(String(p.id)), index: i }));

    return (
      <main className="w-full p-1.5 sm:p-2.5" id="main-content" aria-label="Art gallery">
        {isLoading && source.length === 0 ? (
          <p className="text-center py-20 text-[#7e7e84] font-sans text-[1.1rem] italic">Loading gallery...</p>
        ) : list.length !== 0 ? (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2.5" id="masonry-grid" role="list" aria-label="Art pieces">
            {list.map(item => {
              const p = source.find(x => String(x.id) === item.id);
              if (!p) return null;
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  isWishlisted={item.isWL}
                  showActions={isClient}
                  onToggleWishlist={toggleWishlist}
                  onOpen={handleProductClick}
                  index={item.index}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center py-20 text-[#7e7e84] font-sans text-[1.1rem] italic">No pieces found</p>
        )}
      </main>
    );
  }

  const slugs = Array.from(
    source.reduce((map, p) => {
      const slug = String(p.category || '').toLowerCase().replace(/\s+/g, '-');
      const label = p.categoryLabel || p.category || '';
      if (!slug) return map;
      const cur = map.get(slug);
      map.set(slug, { label, count: (cur?.count ?? 0) + 1 });
      return map;
    }, new Map<string, { label: string; count: number }>())
  )
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3)
    .map(([slug, info]) => {
      const copy = FEATURED_COPY[slug];
      return {
        slug,
        label: info.label,
        title: copy?.title ?? info.label,
        subtitle: copy?.subtitle ?? `Handcrafted ${info.label.toLowerCase()} pieces, made to order by master artisans.`,
        items: source.filter(p => String(p.category || '').toLowerCase().replace(/\s+/g, '-') === slug),
      };
    });

  return (
    <>
      <main className="w-full" id="main-content" aria-label="Blooming Sparrow home">
        <HeroCarousel />

        <CategoryCircles products={source} />

        {slugs.map((s, i) => (
          <ProductGridSection
            key={s.slug}
            title={s.title}
            subtitle={s.subtitle}
            products={s.items}
            isClient={isClient}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            onOpen={handleProductClick}
            viewAllHref={`/categories?cat=${s.slug}`}
            bg={i % 2 === 0 ? 'white' : 'cream'}
          />
        ))}

        <TabbedShowcase
          products={source}
          isClient={isClient}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          onOpen={handleProductClick}
        />

        <Testimonials />

        <TrustBadges />
      </main>
    </>
  );
}