/**
 * JSON-LD structured data utilities for SEO
 * https://schema.org/
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nt-movies.vercel.app';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/original';

/**
 * Generate JSON-LD for Movie schema
 */
export function generateMovieJsonLd(movie: {
  id: number;
  title: string;
  overview?: string | null;
  poster_path?: string | null;
  release_date?: string | null;
  vote_average?: number;
  vote_count?: number;
  runtime?: number | null;
  genres?: Array<{ name: string }>;
  credits?: {
    cast?: Array<{ id: number; name: string }>;
    crew?: Array<{ id: number; name: string; job: string }>;
  };
}) {
  const directors = movie.credits?.crew?.filter(c => c.job === 'Director') || [];
  const actors = movie.credits?.cast?.slice(0, 10) || [];

  return {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    description: movie.overview ?? undefined,
    image: movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : undefined,
    datePublished: movie.release_date ?? undefined,
    aggregateRating: movie.vote_average
      ? {
          '@type': 'AggregateRating',
          ratingValue: movie.vote_average.toFixed(1),
          bestRating: '10',
          ratingCount: movie.vote_count,
        }
      : undefined,
    duration: movie.runtime ? `PT${movie.runtime}M` : undefined,
    genre: movie.genres?.map(g => g.name),
    director: directors.map(d => ({
      '@type': 'Person',
      name: d.name,
      url: `${SITE_URL}/person/${d.id}`,
    })),
    actor: actors.map(a => ({
      '@type': 'Person',
      name: a.name,
      url: `${SITE_URL}/person/${a.id}`,
    })),
    url: `${SITE_URL}/movie/${movie.id}`,
  };
}

/**
 * Generate JSON-LD for TV Series schema
 */
export function generateTVShowJsonLd(tvShow: {
  id: number;
  name: string;
  overview?: string | null;
  poster_path?: string | null;
  first_air_date?: string | null;
  vote_average?: number;
  vote_count?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  genres?: Array<{ name: string }>;
  credits?: {
    cast?: Array<{ id: number; name: string }>;
  };
}) {
  const actors = tvShow.credits?.cast?.slice(0, 10) || [];

  return {
    '@context': 'https://schema.org',
    '@type': 'TVSeries',
    name: tvShow.name,
    description: tvShow.overview ?? undefined,
    image: tvShow.poster_path ? `${TMDB_IMAGE_BASE}${tvShow.poster_path}` : undefined,
    datePublished: tvShow.first_air_date ?? undefined,
    aggregateRating: tvShow.vote_average
      ? {
          '@type': 'AggregateRating',
          ratingValue: tvShow.vote_average.toFixed(1),
          bestRating: '10',
          ratingCount: tvShow.vote_count,
        }
      : undefined,
    numberOfSeasons: tvShow.number_of_seasons,
    numberOfEpisodes: tvShow.number_of_episodes,
    genre: tvShow.genres?.map(g => g.name),
    actor: actors.map(a => ({
      '@type': 'Person',
      name: a.name,
      url: `${SITE_URL}/person/${a.id}`,
    })),
    url: `${SITE_URL}/tv/${tvShow.id}`,
  };
}

/**
 * Generate JSON-LD for Person schema
 */
export function generatePersonJsonLd(person: {
  id: number;
  name: string;
  biography?: string | null;
  profile_path?: string | null;
  birthday?: string | null;
  place_of_birth?: string | null;
  known_for_department?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    description: person.biography ?? undefined,
    image: person.profile_path ? `${TMDB_IMAGE_BASE}${person.profile_path}` : undefined,
    birthDate: person.birthday ?? undefined,
    birthPlace: person.place_of_birth ?? undefined,
    jobTitle: person.known_for_department ?? undefined,
    url: `${SITE_URL}/person/${person.id}`,
  };
}

/**
 * Generate JSON-LD for BreadcrumbList schema
 */
export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate JSON-LD for WebSite schema with search action
 */
export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NT Movies',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
