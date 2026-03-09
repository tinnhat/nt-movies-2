'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Movie, TVShow } from '@/lib/api/types';

interface MediaCardProps {
  item: Movie | TVShow;
  type: 'movie' | 'tv';
  className?: string;
}

export function MediaCard({ item, type, className }: MediaCardProps) {
  const title = 'title' in item ? item.title : item.name;
  const releaseDate = 'release_date' in item ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const href = `/${type}/${item.id}`;

  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-xl transition-all duration-300',
        className
      )}
      aria-label={`${title} (${year})`}
    >
      {/* Poster */}
      <article className="relative aspect-[2/3] overflow-hidden">
        {item.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={`${title} poster`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No Image</span>
          </div>
        )}
        
        {/* Rating Badge */}
        {item.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1" role="status" aria-label={`Rating: ${item.vote_average.toFixed(1)} out of 10`}>
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            <span className="text-xs font-semibold text-white">
              {item.vote_average.toFixed(1)}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <h3 className="font-semibold text-white text-sm line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center justify-between text-xs text-white/80">
              <span>{year}</span>
              {item.vote_count > 0 && (
                <span>{item.vote_count} votes</span>
              )}
            </div>
            {item.overview && (
              <p className="text-xs text-white/70 line-clamp-3">
                {item.overview}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
