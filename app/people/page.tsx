'use client';

import { usePopularPeople } from '@/lib/hooks';
import { useTranslation } from 'react-i18next';
import { PersonCard } from '@/components/common/PersonCard';
import { Breadcrumbs } from '@/components/layout';

export default function PeoplePage() {
  const { t } = useTranslation();
  const { data: popularPeople, isLoading, error } = usePopularPeople();

  return (
    <div className="container px-4 py-8">
      <Breadcrumbs items={[{ label: t('nav.people') }]} className="mb-6" />

      <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('nav.people')}</h1>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <p className="text-destructive">Failed to load popular people. Please try again later.</p>
        </div>
      )}

      {/* Popular People Grid */}
      {popularPeople && popularPeople.results.length > 0 && (
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Popular People</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {popularPeople.results.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Empty State */}
      {popularPeople && popularPeople.results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No people found.</p>
        </div>
      )}
    </div>
  );
}
