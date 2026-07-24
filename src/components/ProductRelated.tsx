'use client';

import { useRouter } from 'next/navigation';
import { Product } from '@/lib/data';

type Props = {
  products: Product[];
  categoryLabel: string;
};

function resolveImageSrc(img: string): string {
  if (img.includes('prod-')) {
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://api.bloomingsparrow.com'}/${img}`;
  }
  return `/${img}`;
}

export default function ProductRelated({ products, categoryLabel }: Props) {
  const router = useRouter();

  if (products.length === 0) return null;

  return (
    <div className="mt-12 pt-10 border-t border-[#E4DED3]">
      <h2 className="font-serif text-[1.6rem] font-semibold text-[#1C1A18] mb-6">
        More {categoryLabel}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {products.map(r => (
          <div
            key={r.id}
            className="rounded-xl overflow-hidden bg-white cursor-pointer border border-[#E4DED3] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] group"
            onClick={() => router.push(`/product/${r.id}`)}
            role="button"
            tabIndex={0}
            aria-label={r.title}
            onKeyDown={(e) => { if (e.key === 'Enter') router.push(`/product/${r.id}`); }}
          >
            <div className="relative w-full bg-[#EFEAE1]">
              <img
                className="w-full aspect-square object-cover transition-transform duration-400 group-hover:scale-105"
                src={resolveImageSrc(r.image)}
                alt={r.title}
                loading="lazy"
              />
            </div>
            <div className="p-2.5 px-3 pb-3">
              <div className="font-serif text-[0.9rem] font-medium mb-0.5 text-[#1C1A18] leading-tight">{r.title}</div>
              <div className="text-[0.8rem] text-[#8C8477] font-sans">₹{String(r.price).replace('₹', '').trim()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
