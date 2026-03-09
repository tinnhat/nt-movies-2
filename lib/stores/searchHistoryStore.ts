import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
}

interface SearchHistoryStore {
  history: SearchHistoryItem[];
  addSearch: (query: string) => void;
  removeSearch: (id: string) => void;
  clearHistory: () => void;
}

const MAX_HISTORY_ITEMS = 10;

export const useSearchHistoryStore = create<SearchHistoryStore>()(
  persist(
    (set) => ({
      history: [],
      addSearch: (query) =>
        set((state) => {
          // Don't add empty queries
          if (!query.trim()) return state;

          // Remove duplicate if exists
          const filtered = state.history.filter(
            (item) => item.query.toLowerCase() !== query.toLowerCase()
          );

          // Add new search at the beginning
          const newHistory = [
            {
              id: `${Date.now()}-${Math.random()}`,
              query: query.trim(),
              timestamp: Date.now(),
            },
            ...filtered,
          ].slice(0, MAX_HISTORY_ITEMS);

          return { history: newHistory };
        }),
      removeSearch: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'nt-movies-search-history',
    }
  )
);
