'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type Slide = {
  image: string;
  label: string;
  href: string;
};

const SLIDES: Slide[] = [
  { image: '/images/rogan_1.png', label: 'Rogan Art', href: '/categories?cat=rogan-art' },
  { image: '/images/bird_2.png', label: 'Bird Making', href: '/categories?cat=bird-making' },
  { image: '/images/bag_1.png', label: 'Leather Bags', href: '/categories?cat=leather-bag' },
  { image: '/images/lacquer_2.png', label: 'Lacquerer Art', href: '/categories?cat=lacquerer-art' },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<number | null>(null);

  const go = (next: number) => {
    setActive((next + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    timerRef.current = window.setInterval(() => setActive(i => (i + 1) % SLIDES.length), 5000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#f5f2ec]" aria-label="Featured collections">
      <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
        {SLIDES.map((slide, i) => (
          <Link
            key={slide.image}
            href={slide.href}
            aria-hidden={i !== active}
            className={`absolute inset-0 block transition-opacity duration-[600ms] ease-in-out ${i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img
              src={slide.image}
              alt={slide.label}
              className={`w-full h-full object-cover ${i === active ? 'scale-105' : 'scale-100'} transition-transform duration-[600ms] ease-in-out`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <span className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 inline-flex items-center gap-2 bg-white/90 text-[#202025] px-4 py-2 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm">
              {slide.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#287379" strokeWidth="2.2" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      {/* Arrows */}
      <button
        type="button"
        onClick={() => go(active - 1)}
        className="hidden sm:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/85 text-[#202025] hover:bg-[#287379] hover:text-white transition-colors cursor-pointer"
        aria-label="Previous slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => go(active + 1)}
        className="hidden sm:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/85 text-[#202025] hover:bg-[#287379] hover:text-white transition-colors cursor-pointer"
        aria-label="Next slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2" role="tablist" aria-label="Slide navigation">
        {SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => setActive(i)}
            className={`h-[6px] rounded-full transition-all duration-300 cursor-pointer ${i === active ? 'w-8 bg-[#287379]' : 'w-[6px] bg-white/70'}`}
            aria-label={`Go to slide ${i + 1}`}
            role="tab"
            aria-selected={i === active}
          />
        ))}
      </div>
    </section>
  );
}