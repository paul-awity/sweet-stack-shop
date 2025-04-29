
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cake } from '../data/cakes';

interface CompareStore {
  items: Cake[];
  addToCompare: (cake: Cake) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearAll: () => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCompare: (cake) => {
        const { items } = get();
        const exists = items.some(item => item.id === cake.id);
        
        // Limit to maximum 4 items for comparison
        if (!exists && items.length < 4) {
          set({ items: [...items, cake] });
        }
      },
      removeFromCompare: (id) => {
        const { items } = get();
        set({ items: items.filter(item => item.id !== id) });
      },
      isInCompare: (id) => {
        return get().items.some(item => item.id === id);
      },
      clearAll: () => {
        set({ items: [] });
      }
    }),
    {
      name: 'sweet-stack-compare',
    }
  )
);
