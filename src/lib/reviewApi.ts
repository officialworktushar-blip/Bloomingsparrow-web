const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.bloomingsparrow.com';

export type ReviewCategory = 'appearance' | 'sizing' | 'quality' | 'description' | 'ease_of_use' | 'delivery';

export interface Review {
  id: string;
  productId: string;
  userId: number;
  userName: string;
  rating: number;
  categories: ReviewCategory[];
  text: string;
  createdAt: string;
  verified: boolean;
}

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  categoryAverages: Record<ReviewCategory, number>;
  recommendPercent: number;
  aiSummary: string[] | null;
}

export interface ReviewListResponse {
  reviews: Review[];
  summary: ReviewSummary;
  total: number;
  page: number;
  pageSize: number;
}

export interface ReviewSubmitPayload {
  productId: string;
  rating: number;
  categories: ReviewCategory[];
  text: string;
}

export const CATEGORY_LABELS: Record<ReviewCategory, string> = {
  appearance: 'Appearance',
  sizing: 'Sizing & Fit',
  quality: 'Quality',
  description: 'Description accuracy',
  ease_of_use: 'Ease of use',
  delivery: 'Delivery & Packaging',
};

export const CATEGORY_SHORT: Record<ReviewCategory, string> = {
  appearance: 'Appearance',
  sizing: 'Sizing',
  quality: 'Quality',
  description: 'Accuracy',
  ease_of_use: 'Usability',
  delivery: 'Delivery',
};

const LS_KEY = 'bs_reviews';

function getLocalReviews(): Review[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLocalReviews(reviews: Review[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEY, JSON.stringify(reviews));
}

function computeSummary(reviews: Review[]): ReviewSummary {
  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      categoryAverages: { appearance: 0, sizing: 0, quality: 0, description: 0, ease_of_use: 0, delivery: 0 },
      recommendPercent: 0,
      aiSummary: null,
    };
  }

  const totalRating = reviews.reduce((s, r) => s + r.rating, 0);
  const averageRating = totalRating / reviews.length;

  const catSums: Record<ReviewCategory, { total: number; count: number }> = {
    appearance: { total: 0, count: 0 },
    sizing: { total: 0, count: 0 },
    quality: { total: 0, count: 0 },
    description: { total: 0, count: 0 },
    ease_of_use: { total: 0, count: 0 },
    delivery: { total: 0, count: 0 },
  };

  reviews.forEach(r => {
    r.categories.forEach(c => {
      catSums[c].total += r.rating;
      catSums[c].count += 1;
    });
  });

  const categoryAverages: Record<ReviewCategory, number> = {
    appearance: catSums.appearance.count > 0 ? catSums.appearance.total / catSums.appearance.count : 0,
    sizing: catSums.sizing.count > 0 ? catSums.sizing.total / catSums.sizing.count : 0,
    quality: catSums.quality.count > 0 ? catSums.quality.total / catSums.quality.count : 0,
    description: catSums.description.count > 0 ? catSums.description.total / catSums.description.count : 0,
    ease_of_use: catSums.ease_of_use.count > 0 ? catSums.ease_of_use.total / catSums.ease_of_use.count : 0,
    delivery: catSums.delivery.count > 0 ? catSums.delivery.total / catSums.delivery.count : 0,
  };

  const recommendPercent = Math.round(
    (reviews.filter(r => r.rating >= 4).length / reviews.length) * 100
  );

  return { averageRating, totalReviews: reviews.length, categoryAverages, recommendPercent, aiSummary: null };
}

export async function fetchReviews(
  productId: string,
  page = 1,
  pageSize = 10,
  category?: ReviewCategory
): Promise<ReviewListResponse> {
  try {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (category) params.set('category', category);
    const res = await fetch(`${API_BASE}/api/public/products/${productId}/reviews?${params}`);
    if (res.ok) return res.json();
  } catch {}

  const all = getLocalReviews().filter(r => r.productId === productId);
  const filtered = category ? all.filter(r => r.categories.includes(category)) : all;
  const sorted = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const start = (page - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  return {
    reviews: paged,
    summary: computeSummary(all),
    total: filtered.length,
    page,
    pageSize,
  };
}

export async function submitReview(
  payload: ReviewSubmitPayload,
  token: string
): Promise<Review> {
  try {
    const res = await fetch(`${API_BASE}/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) return res.json();
  } catch {}

  const userStr = localStorage.getItem('userToken');
  let userId = 0;
  let userName = 'You';
  try {
    const userObj = JSON.parse(localStorage.getItem('bs_user') || '{}');
    userId = userObj.id || 0;
    userName = userObj.name || 'You';
  } catch {}

  const review: Review = {
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    productId: payload.productId,
    userId,
    userName,
    rating: payload.rating,
    categories: payload.categories,
    text: payload.text,
    createdAt: new Date().toISOString(),
    verified: true,
  };

  const all = getLocalReviews();
  all.push(review);
  saveLocalReviews(all);

  return review;
}
