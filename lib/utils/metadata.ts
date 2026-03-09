import { Metadata } from 'next';

const SITE_NAME = 'NT Movies';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nt-movies.vercel.app';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

export interface MetadataParams {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'video.movie' | 'video.tv_show' | 'profile';
  keywords?: string[];
}

/**
 * Generate metadata for a page with SEO optimization
 */
export function generatePageMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  keywords = [],
}: MetadataParams): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const imageUrl = image?.startsWith('http') ? image : image ? `${TMDB_IMAGE_BASE}${image}` : `${SITE_URL}/og-default.jpg`;

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, 'movies', 'tv shows', 'celebrities', 'TMDB', 'NT Movies'],
    authors: [{ name: 'Nguyen Nhat Tin' }],
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

/**
 * Generate metadata for movie detail pages
 */
export function generateMovieMetadata(movie: {
  title: string;
  overview: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string | null;
  genres?: Array<{ name: string }>;
  id: number;
}) {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const genres = movie.genres?.map(g => g.name) || [];
  
  return generatePageMetadata({
    title: `${movie.title}${releaseYear ? ` (${releaseYear})` : ''}`,
    description: movie.overview || `Watch ${movie.title} and explore cast, crew, reviews, and more.`,
    image: (movie.backdrop_path || movie.poster_path) ?? undefined,
    url: `/movie/${movie.id}`,
    type: 'video.movie',
    keywords: [movie.title, ...genres, releaseYear.toString(), 'movie', 'watch', 'stream'],
  });
}

/**
 * Generate metadata for TV show detail pages
 */
export function generateTVShowMetadata(tvShow: {
  name: string;
  overview: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  first_air_date?: string | null;
  genres?: Array<{ name: string }>;
  id: number;
}) {
  const firstAirYear = tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : '';
  const genres = tvShow.genres?.map(g => g.name) || [];
  
  return generatePageMetadata({
    title: `${tvShow.name}${firstAirYear ? ` (${firstAirYear})` : ''}`,
    description: tvShow.overview || `Watch ${tvShow.name} and explore cast, crew, reviews, and more.`,
    image: (tvShow.backdrop_path || tvShow.poster_path) ?? undefined,
    url: `/tv/${tvShow.id}`,
    type: 'video.tv_show',
    keywords: [tvShow.name, ...genres, firstAirYear.toString(), 'tv show', 'series', 'watch', 'stream'],
  });
}

/**
 * Generate metadata for person detail pages
 */
export function generatePersonMetadata(person: {
  name: string;
  biography?: string | null;
  profile_path?: string | null;
  known_for_department?: string | null;
  id: number;
}) {
  const description = person.biography
    ? person.biography.slice(0, 160) + '...'
    : `Explore ${person.name}'s movies, TV shows, biography, and more.`;
  
  return generatePageMetadata({
    title: person.name,
    description,
    image: person.profile_path ?? undefined,
    url: `/person/${person.id}`,
    type: 'profile',
    keywords: [
      person.name,
      person.known_for_department || 'actor',
      'celebrity',
      'biography',
      'filmography',
    ],
  });
}

/**
 * Generate metadata for search pages
 */
export function generateSearchMetadata(query: string) {
  return generatePageMetadata({
    title: `Search: ${query}`,
    description: `Search results for "${query}" - Find movies, TV shows, and celebrities on NT Movies.`,
    url: `/search?q=${encodeURIComponent(query)}`,
    keywords: [query, 'search', 'find', 'discover'],
  });
}
