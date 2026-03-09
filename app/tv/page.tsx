'use client';

import {
  useTrendingTVShows,
  usePopularTVShows,
  useTopRatedTVShows,
  useOnTheAirTVShows,
} from '@/lib/hooks';
import { useTranslation } from 'react-i18next';
import { MediaCarousel, MediaCard } from '@/components/common';
import { Breadcrumbs } from '@/components/layout';

export default function TVShowsPage() {
  const { t } = useTranslation();

  const { data: trending } = useTrendingTVShows('day');
  const { data: popular } = usePopularTVShows();
  const { data: topRated } = useTopRatedTVShows();
  const { data: onTheAir } = useOnTheAirTVShows();

  return (
    <div className="container px-4 py-8">
      <Breadcrumbs items={[{ label: t('nav.tvShows') }]} className="mb-6" />

      <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('nav.tvShows')}</h1>

      <div className="space-y-8">
        {/* Trending TV Shows */}
        {trending && trending.results.length > 0 && (
          <MediaCarousel title={t('tv.trending')}>
            {trending.results.map((show) => (
              <div key={show.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={show} type="tv" />
              </div>
            ))}
          </MediaCarousel>
        )}

        {/* Popular TV Shows */}
        {popular && popular.results.length > 0 && (
          <MediaCarousel title={t('tv.popular')}>
            {popular.results.map((show) => (
              <div key={show.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={show} type="tv" />
              </div>
            ))}
          </MediaCarousel>
        )}

        {/* On The Air */}
        {onTheAir && onTheAir.results.length > 0 && (
          <MediaCarousel title={t('tv.onTheAir')}>
            {onTheAir.results.map((show) => (
              <div key={show.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={show} type="tv" />
              </div>
            ))}
          </MediaCarousel>
        )}

        {/* Top Rated TV Shows */}
        {topRated && topRated.results.length > 0 && (
          <MediaCarousel title={t('tv.topRated')}>
            {topRated.results.map((show) => (
              <div key={show.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={show} type="tv" />
              </div>
            ))}
          </MediaCarousel>
        )}
      </div>
    </div>
  );
}
