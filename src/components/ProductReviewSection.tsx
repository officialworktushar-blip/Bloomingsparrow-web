'use client';

import { useEffect, useRef, useState } from 'react';
import { useReviewStore } from '@/store/useReviewStore';
import { ReviewCategory, Review, ReviewSummary, CATEGORY_LABELS, CATEGORY_SHORT } from '@/lib/reviewApi';
import ReviewSubmitForm from './ReviewSubmitForm';

type Props = {
  productId: string;
  productTitle: string;
};

const SORT_OPTIONS = [
  { value: 'suggested', label: 'Suggested' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'highest', label: 'Highest Rated' },
  { value: 'lowest', label: 'Lowest Rated' },
  { value: 'helpful', label: 'Most Helpful' },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= rating ? '#108474' : 'none'} stroke={i <= rating ? '#108474' : '#D4D0C8'} strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function MetricRow({ label, value, max = 5 }: { label: string; value: number; max?: number }) {
  const pct = max === 100 ? value : (value / max) * 100;
  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="w-7 h-7 rounded-full border border-[#efede8] flex items-center justify-center text-[0.7rem] font-medium text-[#252525] font-sans shrink-0">
        {max === 100 ? `${value}%` : value > 0 ? value.toFixed(1) : '—'}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[0.75rem] text-[#7e7e84] font-sans">{label}</div>
        {max !== 100 && value > 0 && (
          <div className="mt-1 h-1 rounded-full bg-[#efede8] overflow-hidden">
            <div className="h-full rounded-full bg-[#287379] transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}

function RatingBreakdown({ summary, loadedReviews }: { summary: ReviewSummary; loadedReviews: Review[] }) {
  const dist: { star: number; count: number }[] = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: summary.ratingDistribution && Object.keys(summary.ratingDistribution).length > 0
      ? Object.values(summary.ratingDistribution).some(v => v > 0)
        ? summary.ratingDistribution![star] || 0
        : 0
      : 0,
  }));

  const fromLoaded = dist.every(d => d.count === 0);
  if (fromLoaded) {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    loadedReviews.forEach(r => {
      const key = Math.max(1, Math.min(5, Math.round(r.rating)));
      counts[key] += 1;
    });
    [5, 4, 3, 2, 1].forEach(star => {
      const row = dist.find(d => d.star === star);
      if (row) row.count = counts[star];
    });
  }

  const distTotal = dist.reduce((s, d) => s + d.count, 0);
  if (distTotal === 0) return null;

  return (
    <div className="mb-4">
      <p className="text-[0.7rem] font-semibold text-[#252525] font-sans mb-1.5">Rating breakdown</p>
      {dist.map(row => {
        const pct = Math.round((row.count / distTotal) * 100);
        return (
          <div key={row.star} className="flex items-center gap-2 py-1">
            <span className="w-7 shrink-0 text-[0.72rem] text-[#7e7e84] font-sans">{row.star}★</span>
            <div className="flex-1 h-1.5 rounded-full bg-[#efede8] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: 'var(--color-star)' }}
              />
            </div>
            <span className="w-10 shrink-0 text-right text-[0.7rem] text-[#7e7e84] font-sans">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}

function ReviewCard({ review }: { review: { id: string; userName: string; rating: number; text: string; createdAt: string; categories?: string[] } }) {
  const initial = review.userName?.charAt(0)?.toUpperCase() || '?';
  const colors = ['#287379', '#4B5D45', '#d24418', '#6B8CAE', '#9B7CB8'];
  const bgColor = colors[review.userName.charCodeAt(0) % colors.length];
  const date = new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="py-5 border-b border-[#efede8] last:border-b-0">
      <div className="flex items-start gap-3 mb-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[0.75rem] font-semibold shrink-0" style={{ backgroundColor: bgColor }}>
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[0.8rem] font-medium text-[#252525] font-sans">{review.userName}</span>
            <StarRating rating={review.rating} size={12} />
            <span className="text-[0.7rem] text-[#7e7e84] font-sans">{review.rating}.0</span>
          </div>
          <span className="text-[0.7rem] text-[#7e7e84] font-sans">{date}</span>
        </div>
      </div>
      {review.categories && review.categories.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2 ml-11">
          {review.categories.map(c => (
            <span key={c} className="text-[0.65rem] px-2 py-0.5 rounded-full bg-[#fcf7f3] text-[#7e7e84] font-sans">
              {CATEGORY_SHORT[c as ReviewCategory] || c}
            </span>
          ))}
        </div>
      )}
      <p className="text-[0.825rem] text-[#252525] leading-relaxed font-sans ml-11">{review.text}</p>
    </div>
  );
}

export default function ProductReviewSection({ productId, productTitle }: Props) {
  const { reviews, summary, total, page, isLoading, activeCategory, loadReviews, setCategory } = useReviewStore();
  const [showForm, setShowForm] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const pillsRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    loadReviews(productId);
  }, [productId, loadReviews]);

  useEffect(() => {
    const el = pillsRef.current;
    if (!el) return;
    const check = () => {
      setShowLeftArrow(el.scrollLeft > 4);
      setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };
    check();
    el.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      el.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [reviews]);

  const hasReviews = summary && summary.totalReviews > 0;
  const showAiSummary = summary?.aiSummary && summary.aiSummary.length > 0 && summary.totalReviews >= 5;

  const categoryCounts: Partial<Record<ReviewCategory, number>> = {};
  reviews.forEach(r => {
    r.categories?.forEach(c => {
      categoryCounts[c as ReviewCategory] = (categoryCounts[c as ReviewCategory] || 0) + 1;
    });
  });

  const scrollPills = (dir: 'left' | 'right') => {
    pillsRef.current?.scrollBy({ left: dir === 'left' ? -160 : 160, behavior: 'smooth' });
  };

  const handleCategoryFilter = (cat: ReviewCategory | null) => {
    setCategory(cat);
    loadReviews(productId, 1, cat);
  };

  if (!hasReviews && !isLoading) {
    return (
      <div id="reviews" className="mt-12 pt-10 border-t border-[#efede8] scroll-mt-28">
        <h2 className="font-serif text-[1.6rem] font-semibold text-[#252525] mb-6">Reviews for this item</h2>
        <div className="rounded-xl border border-[#efede8] bg-white p-10 text-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#efede8" strokeWidth="1.5" className="mx-auto mb-4" aria-hidden="true">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <p className="text-[0.95rem] text-[#7e7e84] font-sans mb-4">No reviews yet — be the first to review this item</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-[#252525] text-white text-[0.8rem] font-medium font-sans transition-all hover:bg-[#3a3a3f] cursor-pointer"
          >
            Write a Review
          </button>
        </div>
        {showForm && (
          <ReviewSubmitForm
            productId={productId}
            productTitle={productTitle}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div id="reviews" className="mt-12 pt-10 border-t border-[#efede8] scroll-mt-28">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-[1.6rem] font-semibold text-[#252525]">Reviews for this item</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 h-9 px-5 rounded-full border border-[#efede8] text-[0.75rem] font-medium text-[#7e7e84] font-sans transition-all hover:border-[#252525] hover:text-[#252525] cursor-pointer"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Write a Review
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <div className="rounded-xl border border-[#efede8] bg-white p-5 h-fit">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="font-serif text-[2.8rem] font-bold text-[#252525] leading-none">{summary?.averageRating.toFixed(1)}</span>
            <StarRating rating={Math.round(summary?.averageRating || 0)} size={16} />
          </div>
          <p className="text-[0.7rem] text-[#7e7e84] font-sans underline mb-1">Item average</p>
          <p className="text-[0.7rem] text-[#7e7e84] font-sans mb-4">({summary?.totalReviews} {summary?.totalReviews === 1 ? 'review' : 'reviews'})</p>

          {summary && <RatingBreakdown summary={summary} loadedReviews={reviews} />}

          <div className="mb-4">
            <MetricRow label="Item quality" value={summary?.categoryAverages.quality || 0} />
            <MetricRow label="Delivery" value={summary?.categoryAverages.delivery || 0} />
            <MetricRow label="Customer service" value={summary?.categoryAverages.appearance || 0} />
            <MetricRow label="Buyers recommend" value={summary?.recommendPercent || 0} max={100} />
          </div>

          {showAiSummary && (
            <div className="pt-4 border-t border-[#efede8]">
              <p className="text-[0.7rem] font-semibold text-[#252525] font-sans mb-0.5">What buyers say</p>
              <p className="text-[0.6rem] text-[#7e7e84] font-sans mb-3 italic">Summarised by AI from all item reviews</p>
              <div className="grid grid-cols-2 gap-1.5">
                {summary!.aiSummary!.map((phrase, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[0.7rem] text-[#252525] font-sans">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4B5D45" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {phrase}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="relative mb-4">
            {showLeftArrow && (
              <button onClick={() => scrollPills('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-[#efede8] flex items-center justify-center shadow-sm cursor-pointer hover:bg-[#fcf7f3]" aria-label="Scroll left">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7e7e84" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
            )}
            <div ref={pillsRef} className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1 px-0">
              {(['appearance', 'sizing', 'quality', 'description', 'ease_of_use', 'delivery'] as ReviewCategory[]).map(cat => {
                const count = categoryCounts[cat] || 0;
                if (count === 0) return null;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryFilter(activeCategory === cat ? null : cat)}
                    className={`shrink-0 h-8 px-4 rounded-full text-[0.72rem] font-medium font-sans border transition-all duration-200 cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#252525] border-[#252525] text-white'
                        : 'bg-[#fcf7f3] border-[#efede8] text-[#7e7e84] hover:border-[#252525] hover:text-[#252525]'
                    }`}
                  >
                    {CATEGORY_LABELS[cat]} ({count})
                  </button>
                );
              })}
            </div>
            {showRightArrow && (
              <button onClick={() => scrollPills('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-[#efede8] flex items-center justify-center shadow-sm cursor-pointer hover:bg-[#fcf7f3]" aria-label="Scroll right">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7e7e84" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="py-12 text-center">
              <p className="text-[0.85rem] text-[#7e7e84] font-sans italic">Loading reviews…</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-12 text-center rounded-xl border border-[#efede8] bg-white">
              <p className="text-[0.85rem] text-[#7e7e84] font-sans">
                {activeCategory ? `No reviews in this category yet.` : 'No reviews yet.'}
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-[#efede8] bg-white px-5 divide-transparent">
                {reviews.map(r => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                {total > reviews.length && (
                  <button
                    onClick={() => loadReviews(productId, page + 1, activeCategory)}
                    className="inline-flex items-center gap-2 h-9 px-5 rounded-full border border-[#efede8] text-[0.75rem] font-medium text-[#7e7e84] font-sans transition-all hover:border-[#252525] hover:text-[#252525] cursor-pointer"
                  >
                    View all {total} reviews
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                )}

                <div className="relative ml-auto">
                  <button
                    onClick={() => setShowTooltip(t => !t)}
                    className="inline-flex items-center gap-1 text-[0.7rem] text-[#7e7e84] font-sans cursor-pointer hover:text-[#252525] transition-colors"
                  >
                    Why these reviews?
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </button>
                  {showTooltip && (
                    <div className="absolute bottom-full right-0 mb-2 w-64 p-3 rounded-xl bg-[#252525] text-white text-[0.72rem] font-sans leading-relaxed shadow-lg z-20">
                      Reviews are sorted by helpfulness and recency. Only verified purchase reviews are shown.
                      <div className="absolute top-full right-4 w-2 h-2 bg-[#252525] rotate-45 -mt-1" />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showForm && (
        <ReviewSubmitForm
          productId={productId}
          productTitle={productTitle}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
