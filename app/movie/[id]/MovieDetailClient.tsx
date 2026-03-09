'use client';

import {
  MovieDetails,
  Credits,
  VideosResponse,
  PaginatedResponse,
  Review,
  Movie,
  ImagesResponse,
} from '@/lib/api/types';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from '@/components/layout';
import { MediaCard, MediaCarousel } from '@/components/common';
import { Star, Clock, Calendar, DollarSign } from 'lucide-react';
import { formatCurrency, formatRuntime } from '@/lib/utils/helpers';

interface MovieDetailClientProps {
  movie: MovieDetails;
  credits: Credits;
  videos: VideosResponse;
  reviews: PaginatedResponse<Review>;
  similar: PaginatedResponse<Movie>;
  images: ImagesResponse;
}

export default function MovieDetailClient({
  movie,
  credits,
  videos,
  reviews,
  similar,
}: MovieDetailClientProps) {
  const { t } = useTranslation();

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : '';

  const trailer = videos.results.find((v) => v.type === 'Trailer');
  const cast = credits.cast.slice(0, 20);

  return (
    <div>
      {/* Backdrop Hero */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        {movie.backdrop_path && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
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
            { label: t('nav.movies'), href: '/movies' },
            { label: movie.title },
          ]}
          className="mb-6"
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mb-12">
          {/* Poster */}
          <div className="lg:sticky lg:top-20 h-fit">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
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
              <h1 className="text-3xl md:text-5xl font-bold">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-lg text-muted-foreground italic">
                  {movie.tagline}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {releaseYear && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{releaseYear}</span>
                  </div>
                )}
                {movie.runtime > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                {movie.vote_average > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground">
                      ({movie.vote_count.toLocaleString()})
                    </span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
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
              <h2 className="text-2xl font-bold">{t('movie.overview')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 rounded-lg bg-muted/50">
              {movie.budget > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {t('movie.budget')}
                  </div>
                  <div className="flex items-center gap-1 font-semibold">
                    <DollarSign className="h-4 w-4" />
                    {formatCurrency(movie.budget)}
                  </div>
                </div>
              )}
              {movie.revenue > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {t('movie.revenue')}
                  </div>
                  <div className="flex items-center gap-1 font-semibold">
                    <DollarSign className="h-4 w-4" />
                    {formatCurrency(movie.revenue)}
                  </div>
                </div>
              )}
              {movie.status && (
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {t('movie.status')}
                  </div>
                  <div className="font-semibold">{movie.status}</div>
                </div>
              )}
            </div>

            {/* Trailer */}
            {trailer && (
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">{t('movie.videos')}</h2>
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
                <h2 className="text-2xl font-bold">{t('movie.cast')}</h2>
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

            {/* Reviews */}
            {reviews.results.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{t('movie.reviews')}</h2>
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

        {/* Similar Movies */}
        {similar.results.length > 0 && (
          <MediaCarousel title={t('movie.similar')}>
            {similar.results.map((movie) => (
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
