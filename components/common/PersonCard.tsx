'use client';

import Link from 'next/link';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Person } from '@/lib/api/types';

interface PersonCardProps {
  person: Person;
  className?: string;
}

export function PersonCard({ person, className }: PersonCardProps) {
  const href = `/person/${person.id}`;

  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-lg bg-card shadow-lg hover:shadow-xl transition-all duration-300',
        className
      )}
      aria-label={person.name}
    >
      {/* Profile Image */}
      <article className="relative aspect-[2/3] overflow-hidden">
        {person.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
            alt={`${person.name} profile`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <User className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <h3 className="font-semibold text-white text-sm line-clamp-2">
              {person.name}
            </h3>
            {person.known_for_department && (
              <p className="text-xs text-white/80">
                {person.known_for_department}
              </p>
            )}
            {person.known_for && person.known_for.length > 0 && (
              <p className="text-xs text-white/70 line-clamp-2">
                Known for: {person.known_for.map(item => 'title' in item ? item.title : item.name).join(', ')}
              </p>
            )}
          </div>
        </div>
      </article>

      {/* Name (Always Visible) */}
      <div className="p-3 bg-card">
        <h3 className="font-medium text-sm text-foreground line-clamp-1">
          {person.name}
        </h3>
        {person.known_for_department && (
          <p className="text-xs text-muted-foreground mt-1">
            {person.known_for_department}
          </p>
        )}
      </div>
    </Link>
  );
}
