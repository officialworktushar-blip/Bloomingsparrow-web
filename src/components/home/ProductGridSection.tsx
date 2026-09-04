'use client';

import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/data';

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
  isClient: boolean;
  wishlist: string[];
  onToggleWishlist: (e: React.MouseEvent, id: string | number) => void;
  onOpen: (id: string) => void;
  viewAllHref?: string;
  bg?: 'cream' | 'white';
};

export default function ProductGridSection({
  title,
  subtitle,
  products,
  isClient,
  wishlist,
  onToggleWishlist,
  onOpen,
  viewAllHref,
  bg = 'cream',
}: Props) {
  return (
    <section className={`py-10 sm:py-14 ${bg === 'white' ? 'bg-white' : 'bg-[#fcf7f3]'}`} aria-label={title}>
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-8">
          <span className="section-kicker">Handcrafted Collection</span>
          <h2 className="section-title mt-1">{title}</h2>
          {subtitle && <p className="section-subtitle mt-2 max-w-[620px] mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {products.slice(0, 8).map((p, i) => (
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

        {viewAllHref && (
          <div className="text-center mt-10">
            <Link href={viewAllHref} className="btn-secondary">
              View More
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}