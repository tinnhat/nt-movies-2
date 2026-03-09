'use client';

import { PersonDetails, MovieCredits, TVCredits } from '@/lib/api/types';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from '@/components/layout';
import { MediaCard, MediaCarousel } from '@/components/common';
import { Calendar, MapPin, User } from 'lucide-react';

interface PersonDetailClientProps {
  person: PersonDetails;
  movieCredits: MovieCredits;
  tvCredits: TVCredits;
}

export default function PersonDetailClient({
  person,
  movieCredits,
  tvCredits,
}: PersonDetailClientProps) {
  const { t } = useTranslation();

  const age = person.birthday
    ? Math.floor(
        (new Date().getTime() - new Date(person.birthday).getTime()) /
          (365.25 * 24 * 60 * 60 * 1000)
      )
    : null;

  // Sort movie credits by release date (most recent first)
  const movieCast = [...(movieCredits.cast || [])]
    .filter((m) => m.release_date)
    .sort(
      (a, b) =>
        new Date(b.release_date!).getTime() -
        new Date(a.release_date!).getTime()
    );

  // Sort TV credits by first air date (most recent first)
  const tvCast = [...(tvCredits.cast || [])]
    .filter((t) => t.first_air_date)
    .sort(
      (a, b) =>
        new Date(b.first_air_date!).getTime() -
        new Date(a.first_air_date!).getTime()
    );

  // Get top 10 most popular works for "Known For" section
  const knownFor = [...movieCast, ...tvCast]
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 10);

  return (
    <div className="container px-4 py-8">
      <Breadcrumbs
        items={[
          { label: t('nav.people'), href: '/people' },
          { label: person.name },
        ]}
        className="mb-6"
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mb-12">
        {/* Profile Image */}
        <div className="lg:sticky lg:top-20 h-fit">
          {person.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={person.name}
              className="w-full rounded-lg shadow-2xl"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-muted rounded-lg flex items-center justify-center">
              <User className="h-24 w-24 text-muted-foreground" />
            </div>
          )}

          {/* Personal Info */}
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">
              {t('person.personalInfo')}
            </h3>

            {person.known_for_department && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  {t('person.knownForDepartment')}
                </div>
                <div className="font-semibold">
                  {person.known_for_department}
                </div>
              </div>
            )}

            {person.birthday && (
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">
                    {t('person.birthday')}
                  </div>
                  <div className="font-semibold">
                    {new Date(person.birthday).toLocaleDateString()}
                    {age && ` (${age} years old)`}
                  </div>
                </div>
              </div>
            )}

            {person.place_of_birth && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">
                    {t('person.placeOfBirth')}
                  </div>
                  <div className="font-semibold">{person.place_of_birth}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-8">
          {/* Name */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">{person.name}</h1>
          </div>

          {/* Biography */}
          {person.biography && (
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">{t('person.biography')}</h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {person.biography}
              </div>
            </div>
          )}

          {/* Known For */}
          {knownFor.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{t('person.knownFor')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {knownFor.map((item) => {
                  const isMovie = 'title' in item;
                  return (
                    <MediaCard
                      key={item.id}
                      item={item}
                      type={isMovie ? 'movie' : 'tv'}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Movie Credits */}
      {movieCast.length > 0 && (
        <div className="mb-12">
          <MediaCarousel title={t('person.movieCredits')}>
            {movieCast.map((movie) => (
              <div key={movie.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={movie} type="movie" />
              </div>
            ))}
          </MediaCarousel>
        </div>
      )}

      {/* TV Credits */}
      {tvCast.length > 0 && (
        <div>
          <MediaCarousel title={t('person.tvCredits')}>
            {tvCast.map((show) => (
              <div key={show.id} className="min-w-[150px] md:min-w-[200px]">
                <MediaCard item={show} type="tv" />
              </div>
            ))}
          </MediaCarousel>
        </div>
      )}
    </div>
  );
}
