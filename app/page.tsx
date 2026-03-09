'use client';

import {
  useTrendingMovies,
  usePopularMovies,
  useNowPlayingMovies,
  useUpcomingMovies,
  useTopRatedMovies,
} from '@/lib/hooks';
import { useTranslation } from 'react-i18next';
import { HeroBanner, MediaCarousel, MediaCard } from '@/components/common';

export default function Home() {
  const { t } = useTranslation();

  // Fetch data for all sections
  const { data: trendingData } = useTrendingMovies('day');
  const { data: popularData } = usePopularMovies();
  const { data: nowPlayingData } = useNowPlayingMovies();
  const { data: upcomingData } = useUpcomingMovies();
  const { data: topRatedData } = useTopRatedMovies();

  // Use first trending movie for hero banner
  const heroMovie = trendingData?.results[0];

  return (
    <div>
      {/* Hero Banner */}
      {heroMovie && <HeroBanner movie={heroMovie} />}

      {/* Content Sections */}
      <div className="container px-4 space-y-8 pb-16">
        {/* Trending Movies */}
        {trendingData && trendingData.results.length > 0 && (
          <MediaCarousel title={t('movie.trending')} viewAllHref="/movies/trending">
            {trendingData.results.slice(0, 20).map((movie) => (
              <div key={movie.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={movie} type="movie" />
              </div>
            ))}
          </MediaCarousel>
        )}

        {/* Popular Movies */}
        {popularData && popularData.results.length > 0 && (
          <MediaCarousel title={t('movie.popular')} viewAllHref="/movies/popular">
            {popularData.results.slice(0, 20).map((movie) => (
              <div key={movie.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={movie} type="movie" />
              </div>
            ))}
          </MediaCarousel>
        )}

        {/* Now Playing Movies */}
        {nowPlayingData && nowPlayingData.results.length > 0 && (
          <MediaCarousel title={t('movie.nowPlaying')} viewAllHref="/movies/now-playing">
            {nowPlayingData.results.slice(0, 20).map((movie) => (
              <div key={movie.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={movie} type="movie" />
              </div>
            ))}
          </MediaCarousel>
        )}

        {/* Upcoming Movies */}
        {upcomingData && upcomingData.results.length > 0 && (
          <MediaCarousel title={t('movie.upcoming')} viewAllHref="/movies/upcoming">
            {upcomingData.results.slice(0, 20).map((movie) => (
              <div key={movie.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={movie} type="movie" />
              </div>
            ))}
          </MediaCarousel>
        )}

        {/* Top Rated Movies */}
        {topRatedData && topRatedData.results.length > 0 && (
          <MediaCarousel title={t('movie.topRated')} viewAllHref="/movies/top-rated">
            {topRatedData.results.slice(0, 20).map((movie) => (
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
