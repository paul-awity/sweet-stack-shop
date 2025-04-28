
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cake } from '../data/cakes';

export interface CartItem {
  id: string;
  cake: Cake;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addToCart: (cake: Cake, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addToCart: (cake, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === cake.id);
        
        if (existingItem) {
          const updatedItems = items.map(item => 
            item.id === cake.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          
          set({
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + (item.cake.price * item.quantity), 0),
          });
        } else {
          const updatedItems = [...items, { id: cake.id, cake, quantity }];
          
          set({
            items: updatedItems,
            total: updatedItems.reduce((sum, item) => sum + (item.cake.price * item.quantity), 0),
          });
        }
      },
      removeFromCart: (id) => {
        const { items } = get();
        const updatedItems = items.filter(item => item.id !== id);
        
        set({
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.cake.price * item.quantity), 0),
        });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        
        const { items } = get();
        const updatedItems = items.map(item => 
          item.id === id ? { ...item, quantity } : item
        );
        
        set({
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.cake.price * item.quantity), 0),
        });
      },
      clearCart: () => {
        set({ items: [], total: 0 });
      },
    }),
    {
      name: 'sweet-stack-cart',
    }
  )
);
