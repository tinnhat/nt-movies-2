'use client';

import {
  useTrendingMovies,
  usePopularMovies,
  useNowPlayingMovies,
  useUpcomingMovies,
  useTopRatedMovies,
} from '@/lib/hooks';
import { useTranslation } from 'react-i18next';
import { MediaCarousel, MediaCard } from '@/components/common';
import { Breadcrumbs } from '@/components/layout';

export default function MoviesPage() {
  const { t } = useTranslation();

  const { data: trending } = useTrendingMovies('day');
  const { data: popular } = usePopularMovies();
  const { data: nowPlaying } = useNowPlayingMovies();
  const { data: upcoming } = useUpcomingMovies();
  const { data: topRated } = useTopRatedMovies();

  return (
    <div className="container px-4 py-8">
      <Breadcrumbs items={[{ label: t('nav.movies') }]} className="mb-6" />

      <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('nav.movies')}</h1>

      <div className="space-y-8">
        {/* Trending Movies */}
        {trending && trending.results.length > 0 && (
          <MediaCarousel title={t('movie.trending')}>
            {trending.results.map((movie) => (
              <div key={movie.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={movie} type="movie" />
              </div>
            ))}
          </MediaCarousel>
        )}

        {/* Popular Movies */}
        {popular && popular.results.length > 0 && (
          <MediaCarousel title={t('movie.popular')}>
            {popular.results.map((movie) => (
              <div key={movie.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={movie} type="movie" />
              </div>
            ))}
          </MediaCarousel>
        )}

        {/* Now Playing */}
        {nowPlaying && nowPlaying.results.length > 0 && (
          <MediaCarousel title={t('movie.nowPlaying')}>
            {nowPlaying.results.map((movie) => (
              <div key={movie.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={movie} type="movie" />
              </div>
            ))}
          </MediaCarousel>
        )}

        {/* Upcoming */}
        {upcoming && upcoming.results.length > 0 && (
          <MediaCarousel title={t('movie.upcoming')}>
            {upcoming.results.map((movie) => (
              <div key={movie.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={movie} type="movie" />
              </div>
            ))}
          </MediaCarousel>
        )}

        {/* Top Rated Movies */}
        {topRated && topRated.results.length > 0 && (
          <MediaCarousel title={t('movie.topRated')}>
            {topRated.results.map((movie) => (
              <div key={movie.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={movie} type="movie" />
              </div>
            ))}
          </MediaCarousel>
        )}
      </div>
    </div>
  );
}
