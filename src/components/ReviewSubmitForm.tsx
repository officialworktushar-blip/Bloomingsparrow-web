'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { useReviewStore } from '@/store/useReviewStore';
import { ReviewCategory, CATEGORY_LABELS } from '@/lib/reviewApi';
import Swal from '@/lib/swal';

type Props = {
  productId: string;
  productTitle: string;
  onClose: () => void;
};

const ALL_CATEGORIES: ReviewCategory[] = ['appearance', 'sizing', 'quality', 'description', 'ease_of_use', 'delivery'];

export default function ReviewSubmitForm({ productId, productTitle, onClose }: Props) {
  const { user, token } = useStore();
  const { submitNewReview, error } = useReviewStore();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedCats, setSelectedCats] = useState<ReviewCategory[]>([]);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const toggleCat = (cat: ReviewCategory) => {
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !token) {
      Swal.fire({ title: 'Sign in required', text: 'Please sign in to submit a review.', icon: 'info', timer: 2500, showConfirmButton: false });
      return;
    }
    if (rating === 0) {
      Swal.fire({ title: 'Rating required', text: 'Please select a star rating.', icon: 'warning', timer: 2000, showConfirmButton: false });
      return;
    }
    if (text.trim().length < 10) {
      Swal.fire({ title: 'Review too short', text: 'Please write at least 10 characters.', icon: 'warning', timer: 2000, showConfirmButton: false });
      return;
    }

    setSubmitting(true);
    const ok = await submitNewReview({
      productId,
      rating,
      categories: selectedCats,
      text: text.trim(),
    }, token);
    setSubmitting(false);

    if (ok) {
      Swal.fire({ title: 'Review submitted!', text: 'Thank you for your feedback.', icon: 'success', timer: 2000, showConfirmButton: false });
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[300] flex items-center justify-center backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-form-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl p-8 w-[520px] max-w-[92vw] max-h-[90vh] overflow-y-auto shadow-[0_8px_28px_rgba(0,0,0,0.12)] border border-[#efede8] relative">
        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#fcf7f3] flex items-center justify-center text-[#7e7e84] cursor-pointer text-sm transition-all hover:bg-[#f5f2ec] hover:text-[#252525]"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="font-serif text-[1.4rem] font-semibold text-[#252525] mb-1" id="review-form-title">Write a Review</h2>
        <p className="text-[0.8rem] text-[#7e7e84] font-sans mb-5">for {productTitle}</p>

        {!user ? (
          <div className="text-center py-6">
            <p className="text-[0.85rem] text-[#7e7e84] font-sans mb-4">Please sign in to submit a review.</p>
            <a href="/login" className="inline-flex items-center h-10 px-6 rounded-full bg-[#252525] text-white text-[0.8rem] font-medium font-sans no-underline transition-all hover:bg-[#3a3a3f]">
              Sign In
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-[0.7rem] font-medium tracking-[0.08em] uppercase text-[#7e7e84] mb-2 font-sans">Overall rating</label>
              <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map(i => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i)}
                    onMouseEnter={() => setHoverRating(i)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="cursor-pointer p-0.5 transition-transform hover:scale-110"
                    aria-label={`${i} star${i > 1 ? 's' : ''}`}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill={(hoverRating || rating) >= i ? '#287379' : 'none'} stroke={(hoverRating || rating) >= i ? '#287379' : '#D4D0C8'} strokeWidth="1.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-[0.7rem] font-medium tracking-[0.08em] uppercase text-[#7e7e84] mb-2 font-sans">Categories (optional)</label>
              <div className="flex flex-wrap gap-2">
                {ALL_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCat(cat)}
                    className={`h-8 px-3.5 rounded-full text-[0.72rem] font-medium font-sans border transition-all cursor-pointer ${
                      selectedCats.includes(cat)
                        ? 'bg-[#252525] border-[#252525] text-white'
                        : 'bg-[#fcf7f3] border-[#efede8] text-[#7e7e84] hover:border-[#252525] hover:text-[#252525]'
                    }`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-[0.7rem] font-medium tracking-[0.08em] uppercase text-[#7e7e84] mb-2 font-sans" htmlFor="review-text">Your review</label>
              <textarea
                id="review-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tell others what you think about this item…"
                className="w-full h-28 rounded-xl border border-[#efede8] bg-[#fcf7f3] px-4 py-3 text-[0.85rem] text-[#252525] font-sans outline-none resize-none transition-all focus:border-[#252525] focus:bg-white placeholder:text-[#7e7e84]"
                required
                minLength={10}
              />
              <p className="text-[0.65rem] text-[#7e7e84] font-sans mt-1 text-right">{text.length} characters</p>
            </div>

            {error && (
              <p className="text-[0.78rem] text-[#d24418] font-sans mb-3">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting || rating === 0}
              className="w-full h-11 rounded-full bg-[#252525] text-white text-[0.85rem] font-medium font-sans cursor-pointer transition-all hover:bg-[#3a3a3f] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting…' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
