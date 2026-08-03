'use client';

import { useRef, useState, useCallback } from 'react';
import ProductImage from '@/components/ProductImage';

type Props = {
  images: string[];
  title: string;
};

export default function ProductImageGallery({ images, title }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const hasMultiple = images.length > 1;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="p-3 sm:p-4 bg-[#EFEAE1] rounded-2xl border border-[#E4DED3]">
        <div
          ref={containerRef}
          className="relative rounded-xl overflow-hidden bg-white aspect-[3/4] cursor-zoom-in"
          role="img"
          aria-label={`Image of ${title}`}
          onMouseEnter={() => setZooming(true)}
          onMouseLeave={() => setZooming(false)}
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
          <div className="absolute top-3 left-3 w-7 h-7 border-l-[1.5px] border-t-[1.5px] border-[#C8A96E] pointer-events-none" aria-hidden="true" />
          <div className="absolute top-3 right-3 w-7 h-7 border-r-[1.5px] border-t-[1.5px] border-[#C8A96E] pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-3 left-3 w-7 h-7 border-l-[1.5px] border-b-[1.5px] border-[#C8A96E] pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-3 right-3 w-7 h-7 border-r-[1.5px] border-b-[1.5px] border-[#C8A96E] pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1" role="tablist" aria-label="Product images">
          {images.map((img, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIdx}
              aria-label={`View image ${i + 1} of ${images.length}`}
              onClick={() => setActiveIdx(i)}
              className={`shrink-0 aspect-[3/4] w-16 sm:w-20 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-[#EFEAE1] flex items-center justify-center ${
                i === activeIdx
                  ? 'border-[#1C1A18]'
                  : 'border-transparent hover:border-[#E4DED3]'
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
  );
}
