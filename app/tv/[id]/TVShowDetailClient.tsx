'use client';

import {
  TVShowDetails,
  Credits,
  VideosResponse,
  PaginatedResponse,
  Review,
  TVShow,
} from '@/lib/api/types';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from '@/components/layout';
import { MediaCard, MediaCarousel } from '@/components/common';
import { Star, Calendar, Tv2 } from 'lucide-react';

interface TVShowDetailClientProps {
  tvShow: TVShowDetails;
  credits: Credits;
  videos: VideosResponse;
  reviews: PaginatedResponse<Review>;
  similar: PaginatedResponse<TVShow>;
}

export default function TVShowDetailClient({
  tvShow,
  credits,
  videos,
  reviews,
  similar,
}: TVShowDetailClientProps) {
  const { t } = useTranslation();

  const firstAirYear = tvShow.first_air_date
    ? new Date(tvShow.first_air_date).getFullYear()
    : '';

  const trailer = videos.results.find((v) => v.type === 'Trailer');
  const cast = credits.cast.slice(0, 20);

  return (
    <div>
      {/* Backdrop Hero */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        {tvShow.backdrop_path && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`}
              alt={tvShow.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="container px-4 -mt-48 relative z-10">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: t('nav.tvShows'), href: '/tv' },
            { label: tvShow.name },
          ]}
          className="mb-6"
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mb-12">
          {/* Poster */}
          <div className="lg:sticky lg:top-20 h-fit">
            {tvShow.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                alt={tvShow.name}
                className="w-full rounded-lg shadow-2xl"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">No Poster</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Title & Meta */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">{tvShow.name}</h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {firstAirYear && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{firstAirYear}</span>
                  </div>
                )}
                {tvShow.number_of_seasons > 0 && (
                  <div className="flex items-center gap-1">
                    <Tv2 className="h-4 w-4" />
                    <span>
                      {tvShow.number_of_seasons} {t('tv.numberOfSeasons')}
                    </span>
                  </div>
                )}
                {tvShow.vote_average > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">
                      {tvShow.vote_average.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground">
                      ({tvShow.vote_count.toLocaleString()})
                    </span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {tvShow.genres && tvShow.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tvShow.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">{t('tv.overview')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {tvShow.overview || 'No overview available.'}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 rounded-lg bg-muted/50">
              {tvShow.status && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {t('tv.status')}
                  </div>
                  <div className="font-semibold">{tvShow.status}</div>
                </div>
              )}
              {tvShow.number_of_episodes > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {t('tv.numberOfEpisodes')}
                  </div>
                  <div className="font-semibold">
                    {tvShow.number_of_episodes}
                  </div>
                </div>
              )}
              {tvShow.type && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {t('tv.type')}
                  </div>
                  <div className="font-semibold">{tvShow.type}</div>
                </div>
              )}
            </div>

            {/* Trailer */}
            {trailer && (
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{t('tv.videos')}</h2>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Cast */}
            {cast.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{t('tv.cast')}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {cast.map((person) => (
                    <a
                      key={person.id}
                      href={`/person/${person.id}`}
                      className="group space-y-2"
                    >
                      {person.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                          alt={person.name}
                          className="w-full aspect-[2/3] object-cover rounded-lg group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-xs">No Photo</span>
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {person.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {person.character}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Seasons */}
            {tvShow.seasons && tvShow.seasons.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  {t('tv.numberOfSeasons')}
                </h2>
                <div className="space-y-3">
                  {tvShow.seasons.map((season) => (
                    <div
                      key={season.id}
                      className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      {season.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${season.poster_path}`}
                          alt={season.name}
                          className="w-16 h-24 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-24 bg-muted rounded flex items-center justify-center">
                          <Tv2 className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold">{season.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {season.episode_count} {t('tv.numberOfEpisodes')}
                        </p>
                        {season.air_date && (
                          <p className="text-xs text-muted-foreground">
                            {new Date(season.air_date).getFullYear()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {reviews.results.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{t('tv.reviews')}</h2>
                {reviews.results.slice(0, 3).map((review) => (
                  <div
                    key={review.id}
                    className="p-6 rounded-lg bg-muted/50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{review.author}</span>
                      {review.author_details.rating && (
                        <span className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {review.author_details.rating}/10
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Similar TV Shows */}
        {similar.results.length > 0 && (
          <MediaCarousel title={t('tv.similar')}>
            {similar.results.map((show) => (
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
