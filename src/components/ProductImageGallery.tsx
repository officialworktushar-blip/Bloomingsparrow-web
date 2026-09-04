'use client';

import { useRef, useState, useCallback } from 'react';
import ProductImage from '@/components/ProductImage';

type Props = {
  images: string[];
  title: string;
};

export default function ProductImageGallery({ images, title }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverZoom, setHoverZoom] = useState(false);
  const [pinnedZoom, setPinnedZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const hasMultiple = images.length > 1;
  const zooming = hoverZoom || pinnedZoom;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  }, []);

  const goPrev = () => setActiveIdx(i => (i - 1 + images.length) % images.length);
  const goNext = () => setActiveIdx(i => (i + 1) % images.length);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className="w-full lg:flex-1 p-3 sm:p-4 bg-[#f5f2ec] rounded-2xl border border-[#efede8]">
          <div
            ref={containerRef}
            className="relative rounded-xl overflow-hidden bg-white aspect-[15/16] cursor-zoom-in"
            role="img"
            aria-label={`Image of ${title}`}
            onMouseEnter={() => setHoverZoom(true)}
            onMouseLeave={() => setHoverZoom(false)}
            onMouseMove={handleMouseMove}
          >
            <ProductImage
              src={images[activeIdx]}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 ease-out"
              style={zooming ? { transform: 'scale(2.2)', transformOrigin: `${origin.x}% ${origin.y}%` } : undefined}
              loading="eager"
              draggable={false}
            />

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

            <button
              onClick={() => setPinnedZoom(z => !z)}
              aria-pressed={pinnedZoom}
              aria-label={pinnedZoom ? 'Disable zoom' : 'Enable zoom'}
              title={pinnedZoom ? 'Disable zoom' : 'Enable zoom'}
              className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#252525] transition-all duration-200 cursor-pointer z-10 ${
                pinnedZoom ? 'ring-2 ring-[#287379] text-[#d24418]' : ''
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </button>

            <div className="absolute top-3 left-3 w-7 h-7 border-l-[1.5px] border-t-[1.5px] border-[#287379] pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-3 left-3 w-7 h-7 border-l-[1.5px] border-b-[1.5px] border-[#287379] pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-3 right-3 w-7 h-7 border-r-[1.5px] border-b-[1.5px] border-[#287379] pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        {hasMultiple && (
          <div
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full lg:w-[84px] lg:shrink-0 pb-1 lg:pb-0"
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
                className={`shrink-0 aspect-[3/4] w-16 lg:w-full rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-[#f5f2ec] flex items-center justify-center ${
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
