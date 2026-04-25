'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],

      add: (product, qty = 1) => set((state) => {
        const existing = state.items.find((i) => i.id === product.id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === product.id ? { ...i, qty: i.qty + qty } : i,
            ),
          };
        }
        return {
          items: [...state.items, {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            qty,
          }],
        };
      }),

      remove: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),

      setQty: (id, qty) => set((state) => ({
        items: state.items
          .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
          .filter((i) => i.qty > 0),
      })),

      clear: () => set({ items: [] }),

      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      subtotal: () => get().items.reduce((s, i) => s + i.qty * i.price, 0),
    }),
    {
      name: 'eshop-cart-v1',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
