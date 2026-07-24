'use client';

import { useState } from 'react';

type Props = {
  images: string[];
  title: string;
};

function resolveImageSrc(img: string): string {
  if (img.includes('prod-')) {
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://api.bloomingsparrow.com'}/${img}`;
  }
  return `/${img}`;
}

export default function ProductImageGallery({ images, title }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const hasMultiple = images.length > 1;

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative rounded-2xl overflow-hidden bg-[#EFEAE1] flex items-center justify-center p-6 sm:p-10 lg:p-14 min-h-[320px] sm:min-h-[420px] lg:min-h-[520px]"
        role="img"
        aria-label={`Image of ${title}`}
      >
        <img
          src={resolveImageSrc(images[activeIdx])}
          alt={title}
          className="w-full h-auto max-h-[55vh] lg:max-h-[70vh] object-contain transition-opacity duration-300"
          draggable={false}
        />
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#C8A96E]/40 rounded-tl-sm" aria-hidden="true" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#C8A96E]/40 rounded-br-sm" aria-hidden="true" />
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
              className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-[#EFEAE1] flex items-center justify-center ${
                i === activeIdx
                  ? 'border-[#1C1A18]'
                  : 'border-transparent hover:border-[#E4DED3]'
              }`}
            >
              <img
                src={resolveImageSrc(img)}
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
