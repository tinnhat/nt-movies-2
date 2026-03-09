import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/lib/providers/Providers';
import { Analytics } from '@vercel/analytics/react';
import { Header, Footer } from '@/components/layout';
import { JsonLd } from '@/components/common/JsonLd';
import { generateWebSiteJsonLd } from '@/lib/utils/jsonld';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'NT Movies - Discover Movies & TV Shows',
  description:
    'Explore the latest movies and TV shows. Get information about cast, trailers, reviews, and more.',
  keywords: [
    'movies',
    'tv shows',
    'cinema',
    'entertainment',
    'trailers',
    'reviews',
  ],
  authors: [{ name: 'NT Movies' }],
  creator: 'NT Movies',
  publisher: 'NT Movies',
  metadataBase: new URL('https://nt-movies-v2.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nt-movies-v2.vercel.app',
    title: 'NT Movies - Discover Movies & TV Shows',
    description:
      'Explore the latest movies and TV shows. Get information about cast, trailers, reviews, and more.',
    siteName: 'NT Movies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NT Movies - Discover Movies & TV Shows',
    description:
      'Explore the latest movies and TV shows. Get information about cast, trailers, reviews, and more.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = generateWebSiteJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1" role="main" aria-label="Main content">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
