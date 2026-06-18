import { create } from 'zustand';
import { Product } from '@/lib/data';

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,
  fetchProducts: async () => {
    if (get().products.length > 0) return;
    set({ isLoading: true, error: null });
    try {
      const res = await fetch('https://api.bloomingsparrow.com/api/public/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      set({ products: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Something went wrong', isLoading: false });
    }
  }
}));
