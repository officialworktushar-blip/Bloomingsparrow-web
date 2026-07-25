import { create } from 'zustand';
import { Review, ReviewSummary, ReviewCategory, fetchReviews, submitReview, ReviewSubmitPayload } from '@/lib/reviewApi';

interface ReviewState {
  reviews: Review[];
  summary: ReviewSummary | null;
  total: number;
  page: number;
  isLoading: boolean;
  error: string | null;
  activeCategory: ReviewCategory | null;

  loadReviews: (productId: string, page?: number, category?: ReviewCategory | null) => Promise<void>;
  submitNewReview: (payload: ReviewSubmitPayload, token: string) => Promise<boolean>;
  setCategory: (cat: ReviewCategory | null) => void;
  reset: () => void;
}

const EMPTY_SUMMARY: ReviewSummary = {
  averageRating: 0,
  totalReviews: 0,
  categoryAverages: { appearance: 0, sizing: 0, quality: 0, description: 0, ease_of_use: 0, delivery: 0 },
  recommendPercent: 0,
  aiSummary: null,
};

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: [],
  summary: null,
  total: 0,
  page: 1,
  isLoading: false,
  error: null,
  activeCategory: null,

  loadReviews: async (productId, page = 1, category = null) => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchReviews(productId, page, 10, category ?? undefined);
      set({
        reviews: data.reviews,
        summary: data.summary,
        total: data.total,
        page: data.page,
        isLoading: false,
        activeCategory: category,
      });
    } catch {
      set({
        reviews: [],
        summary: EMPTY_SUMMARY,
        total: 0,
        isLoading: false,
        error: null,
      });
    }
  },

  submitNewReview: async (payload, token) => {
    set({ error: null });
    try {
      await submitReview(payload, token);
      const { activeCategory } = get();
      await get().loadReviews(payload.productId, 1, activeCategory);
      return true;
    } catch (err: any) {
      set({ error: err.message || 'Submission failed. Please try again.' });
      return false;
    }
  },

  setCategory: (cat) => {
    set({ activeCategory: cat });
  },

  reset: () => {
    set({ reviews: [], summary: null, total: 0, page: 1, isLoading: false, error: null, activeCategory: null });
  },
}));
