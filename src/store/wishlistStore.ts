
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cake } from '../data/cakes';

interface WishlistStore {
  items: Cake[];
  addToWishlist: (cake: Cake) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (cake) => {
        const { items } = get();
        const exists = items.some(item => item.id === cake.id);
        
        if (!exists) {
          set({ items: [...items, cake] });
        }
      },
      removeFromWishlist: (id) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== id) });
      },
      isInWishlist: (id) => {
        return get().items.some(item => item.id === id);
      }
    }),
    {
      name: 'sweet-stack-wishlist',
    }
  )
);
