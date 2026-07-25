import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface CartItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  image: string;
  quantity: number;
}

interface StoreState {
  user: User | null;
  token: string | null;
  cart: CartItem[];
  setUser: (user: User | null, token: string | null) => void;
  logout: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  token: null,
  cart: [],
  setUser: (user, token) => {
    if (token) localStorage.setItem('userToken', token);
    else localStorage.removeItem('userToken');
    if (user) localStorage.setItem('bs_user', JSON.stringify(user));
    else localStorage.removeItem('bs_user');
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('bs_user');
    set({ user: null, token: null, cart: [] });
  },
  addToCart: (item) => set((state) => {
    const existing = state.cart.find(c => c.id === item.id);
    if (existing) {
      return { cart: state.cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + item.quantity } : c) };
    }
    return { cart: [...state.cart, item] };
  }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(c => c.id !== id) })),
  updateQuantity: (id, quantity) => set((state) => {
    if (quantity <= 0) {
      return { cart: state.cart.filter(c => c.id !== id) };
    }
    return { cart: state.cart.map(c => c.id === id ? { ...c, quantity } : c) };
  }),
  clearCart: () => set({ cart: [] })
}));
