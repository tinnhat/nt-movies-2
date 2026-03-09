'use client';

import { Play, Info, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import type { Movie } from '@/lib/api/types';

interface HeroBannerProps {
  movie: Movie;
  className?: string;
}

export function HeroBanner({ movie, className }: HeroBannerProps) {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : '';

  return (
    <section
      className={cn(
        'relative h-[70vh] min-h-[500px] w-full overflow-hidden',
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-primary/20 to-primary/10" />
        )}
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative h-full flex items-center px-4">
        <div className="max-w-2xl space-y-6">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {movie.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
            {year && <span className="font-semibold">{year}</span>}
            {movie.vote_average > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
            )}
          </div>

          {/* Overview */}
          {movie.overview && (
            <p className="text-base md:text-lg text-muted-foreground line-clamp-3 md:line-clamp-4">
              {movie.overview}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="gap-2" asChild>
              <a href={`/movie/${movie.id}`}>
                <Play className="h-5 w-5" />
                Watch Now
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href={`/movie/${movie.id}`}>
                <Info className="h-5 w-5" />
                More Info
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
