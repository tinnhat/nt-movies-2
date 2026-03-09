'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider } from './ThemeProvider';
import { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';
import { useLanguageStore } from '../stores';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageSync />
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

// Component to sync language from store to i18n
function LanguageSync() {
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return null;
}
