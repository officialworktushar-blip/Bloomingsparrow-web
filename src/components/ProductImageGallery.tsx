'use client';

import { useState } from 'react';
import ProductImage from '@/components/ProductImage';
import BestSellerBadge from '@/components/BestSellerBadge';

type Props = {
  images: string[];
  title: string;
  bestSeller?: boolean;
};

export default function ProductImageGallery({ images, title, bestSeller }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const hasMultiple = images.length > 1;

  const goPrev = () => setActiveIdx(i => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIdx(i => (i + 1) % images.length);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row-reverse md:items-start gap-4">
        {/* Main image — appears first on mobile, right side on desktop */}
        <div className="w-full md:flex-1 p-3 sm:p-4 bg-[#f5f2ec] border border-[#efede8]">
          <div className="relative rounded-xl overflow-hidden bg-white aspect-square">
            <ProductImage
              src={images[activeIdx]}
              alt={title}
              className="w-full h-full object-contain"
              loading="eager"
              draggable={false}
            />

            {bestSeller && <BestSellerBadge />}

            {hasMultiple && (
              <>
                <button
                  onClick={goPrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#252525] transition-all duration-200 cursor-pointer z-10"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#252525] transition-all duration-200 cursor-pointer z-10"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail strip — horizontal below the main image on mobile, vertical to the left on desktop */}
        {hasMultiple && (
          <div
            className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full md:w-[84px] md:shrink-0 pb-1 md:pb-0"
            role="tablist"
            aria-label="Product images"
          >
            {images.map((img, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`View image ${i + 1} of ${images.length}`}
                onClick={() => setActiveIdx(i)}
                className={`shrink-0 aspect-[3/4] w-16 md:w-full rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-[#f5f2ec] flex items-center justify-center ${
                  i === activeIdx
                    ? 'border-[#287379]'
                    : 'border-transparent hover:border-[#efede8]'
                }`}
              >
                <ProductImage
                  src={img}
                  alt={`${title} — view ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}