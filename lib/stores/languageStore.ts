import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'vi';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => {
        set({ language });
        // Update localStorage for API interceptor
        if (typeof window !== 'undefined') {
          localStorage.setItem('language', language);
        }
      },
    }),
    {
      name: 'nt-movies-language',
    }
  )
);
