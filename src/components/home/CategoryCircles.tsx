'use client';

import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import type { Product } from '@/lib/data';

type Props = {
  products: Product[];
};

export default function CategoryCircles({ products }: Props) {
  const seen = new Map<string, { slug: string; label: string; image: string }>();
  products.forEach(p => {
    const slug = String(p.category || '').toLowerCase().replace(/\s+/g, '-');
    if (!slug || seen.has(slug)) return;
    seen.set(slug, {
      slug,
      label: p.categoryLabel || p.category || '',
      image: p.images?.[0] || p.image || '/placeholder.png',
    });
  });
  const categories = Array.from(seen.values());

  return (
    <section className="py-10 sm:py-14" aria-label="Shop by category">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-8">
          <span className="section-kicker">Curated Collections</span>
          <h2 className="section-title mt-1">Shop by Category</h2>
        </div>

        <div className="flex items-start justify-start md:justify-center gap-6 sm:gap-8 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x">
          {categories.map(c => (
            <Link
              key={c.slug}
              href={`/categories?cat=${c.slug}`}
              className="group flex flex-col items-center gap-2.5 no-underline snap-start shrink-0"
            >
              <span className="category-circle w-[104px] h-[104px] sm:w-[112px] sm:h-[112px] group-hover:scale-[1.04] transition-transform duration-300">
                <ProductImage
                  src={c.image}
                  alt={c.label}
                  className="category-circle__img transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </span>
              <span className="category-circle-label group-hover:text-[#287379] transition-colors">
                {c.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}