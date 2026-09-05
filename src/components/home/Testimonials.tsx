'use client';

import { useRef } from 'react';

const TESTIMONIALS = [
  {
    name: 'Ananya Sharma',
    role: 'Home Décor Enthusiast, Delhi',
    color: '#287379',
    quote:
      'The Rogan canvas is absolutely breathtaking — you can feel the artisan’s patience in every stroke. Packaging and delivery were impeccable.',
  },
  {
    name: 'Rohan Mehta',
    role: 'Gifting, Mumbai',
    color: '#d24418',
    quote:
      'Ordered leather bags for my team as festive gifts. Each piece looks richer in person than in photos. Truly heirloom quality.',
  },
  {
    name: 'Priya Nair',
    role: 'Collector, Bengaluru',
    color: '#7e7e84',
    quote:
      'The shola bird figures are exquisite. It’s heartwarming to own art that carries a centuries-old tradition and a maker’s signature.',
  },
  {
    name: 'Vikram Singh',
    role: 'Interior Designer, Jaipur',
    color: '#1e5a5e',
    quote:
      'Blooming Sparrow’s bell art adds soul to my projects. Customers often ask where the pieces come from — the stories sell themselves.',
  },
  {
    name: 'Sneha Iyer',
    role: 'First-time Buyer, Chennai',
    quote: 'Ordered a lacquer jewellery box as a birthday surprise. Quick dispatch, lovely handwritten note, zero regrets.',
    color: '#4b5d45',
  },
];

function Stars() {
  return (
    <div className="flex items-center justify-center gap-1 mb-3" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="#108474" aria-hidden="true">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 24 : 340;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="py-10 sm:py-16 bg-[#fcf7f3]" aria-label="Testimonials">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-8">
          <span className="section-kicker">Loved by collectors</span>
          <h2 className="section-title mt-1">Testimonials</h2>
          <p className="section-subtitle mt-2 max-w-[620px] mx-auto">
            What our customers say about handcrafted art from Blooming Sparrow.
          </p>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map(t => (
              <figure
                key={t.name}
                data-card
                className="flex flex-col items-center justify-start text-center bg-[#f9f9f9] rounded-[6px] px-6 sm:px-8 py-8 min-w-[85%] sm:min-w-[48%] lg:min-w-[31.5%] snap-start"
              >
                <span
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-display text-xl font-bold select-none"
                  style={{ backgroundColor: t.color }}
                  aria-hidden="true"
                >
                  {t.name.split(' ').map(w => w[0]).join('')}
                </span>
                <figcaption className="mt-3">
                  <p className="font-sans text-[0.95rem] font-semibold text-[#202025]">{t.name}</p>
                  <p className="font-sans text-[0.78rem] text-[#7e7e84] mt-0.5">{t.role}</p>
                </figcaption>
                <div className="mt-3">
                  <Stars />
                </div>
                <blockquote className="font-sans text-[0.88rem] leading-relaxed text-[#202025]/80 italic">
                  “{t.quote}”
                </blockquote>
              </figure>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="flex items-center justify-center w-11 h-11 bg-white border border-[#efede8] text-[#202025] hover:bg-[#287379] hover:text-white transition-colors cursor-pointer"
              aria-label="Previous testimonials"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="flex items-center justify-center w-11 h-11 bg-white border border-[#efede8] text-[#202025] hover:bg-[#287379] hover:text-white transition-colors cursor-pointer"
              aria-label="Next testimonials"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}