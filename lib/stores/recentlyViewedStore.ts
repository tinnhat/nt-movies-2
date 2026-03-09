import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MediaType = 'movie' | 'tv' | 'person';

interface RecentlyViewedItem {
  id: number;
  type: MediaType;
  title: string;
  posterPath?: string;
  timestamp: number;
}

interface RecentlyViewedStore {
  items: RecentlyViewedItem[];
  addItem: (item: Omit<RecentlyViewedItem, 'timestamp'>) => void;
  removeItem: (id: number, type: MediaType) => void;
  clearItems: () => void;
}

const MAX_ITEMS = 20;

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          // Remove duplicate if exists (same id and type)
          const filtered = state.items.filter(
            (existingItem) =>
              !(existingItem.id === item.id && existingItem.type === item.type)
          );

          // Add new item at the beginning
          const newItems = [
            {
              ...item,
              timestamp: Date.now(),
            },
            ...filtered,
          ].slice(0, MAX_ITEMS);

          return { items: newItems };
        }),
      removeItem: (id, type) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.type === type)
          ),
        })),
      clearItems: () => set({ items: [] }),
    }),
    {
      name: 'nt-movies-recently-viewed',
    }
  )
);
