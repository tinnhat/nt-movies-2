'use client';

import { useSearchMovies, useSearchTVShows, useSearchPeople } from '@/lib/hooks';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { MediaCard } from '@/components/common';
import { Breadcrumbs } from '@/components/layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Film, Tv, Users } from 'lucide-react';
import { useSearchHistoryStore } from '@/lib/stores';
import { cn } from '@/lib/utils/cn';

type TabType = 'all' | 'movies' | 'tv' | 'people';

interface SearchPageClientProps {
  initialQuery: string;
}

export default function SearchPageClient({
  initialQuery,
}: SearchPageClientProps) {
  const { t } = useTranslation();

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const { addSearch } = useSearchHistoryStore();

  // Fetch search results
  const { data: moviesData, isLoading: moviesLoading } =
    useSearchMovies(query);
  const { data: tvData, isLoading: tvLoading } = useSearchTVShows(query);
  const { data: peopleData, isLoading: peopleLoading } =
    useSearchPeople(query);

  useEffect(() => {
    if (query) {
      addSearch(query);
    }
  }, [query, addSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.history.pushState(
        {},
        '',
        `/search?q=${encodeURIComponent(query)}`
      );
    }
  };

  const isLoading = moviesLoading || tvLoading || peopleLoading;
  const hasResults =
    (moviesData?.results.length || 0) > 0 ||
    (tvData?.results.length || 0) > 0 ||
    (peopleData?.results.length || 0) > 0;

  const tabs = [
    {
      id: 'all' as TabType,
      label: t('search.all'),
      icon: Search,
      count:
        (moviesData?.total_results || 0) +
        (tvData?.total_results || 0) +
        (peopleData?.total_results || 0),
    },
    {
      id: 'movies' as TabType,
      label: t('search.movies'),
      icon: Film,
      count: moviesData?.total_results || 0,
    },
    {
      id: 'tv' as TabType,
      label: t('search.tv'),
      icon: Tv,
      count: tvData?.total_results || 0,
    },
    {
      id: 'people' as TabType,
      label: t('search.people'),
      icon: Users,
      count: peopleData?.total_results || 0,
    },
  ];

  const getDisplayResults = () => {
    switch (activeTab) {
      case 'movies':
        return moviesData?.results || [];
      case 'tv':
        return tvData?.results || [];
      case 'people':
        return peopleData?.results || [];
      case 'all':
      default:
        return [
          ...(moviesData?.results || []),
          ...(tvData?.results || []),
          ...(peopleData?.results || []),
        ];
    }
  };

  const results = getDisplayResults();

  return (
    <div className="container px-4 py-8">
      <Breadcrumbs
        items={[
          { label: t('nav.search'), href: '/search' },
          ...(query ? [{ label: query }] : []),
        ]}
        className="mb-6"
      />

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 max-w-2xl mx-auto">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="flex-1"
          />
          <Button type="submit" disabled={!query.trim()}>
            <Search className="h-4 w-4 mr-2" />
            {t('search.search')}
          </Button>
        </div>
      </form>

      {query && (
        <>
          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-muted text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : hasResults && results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {results.map((item: any) => {
                // Determine type
                let type: 'movie' | 'tv' | 'person' = 'movie';
                if ('name' in item && 'first_air_date' in item) {
                  type = 'tv';
                } else if ('known_for_department' in item) {
                  type = 'person';
                }

                if (type === 'person') {
                  return (
                    <a
                      key={item.id}
                      href={`/person/${item.id}`}
                      className="group space-y-2"
                    >
                      {item.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w185${item.profile_path}`}
                          alt={item.name}
                          className="w-full aspect-[2/3] object-cover rounded-lg group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-muted rounded-lg flex items-center justify-center">
                          <Users className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                          {item.name}
                        </div>
                        {item.known_for_department && (
                          <div className="text-xs text-muted-foreground">
                            {item.known_for_department}
                          </div>
                        )}
                      </div>
                    </a>
                  );
                }

                return <MediaCard key={item.id} item={item} type={type} />;
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {t('search.noResults')}
              </h3>
              <p className="text-muted-foreground">
                {t('search.tryDifferentKeywords')}
              </p>
            </div>
          )}
        </>
      )}

      {!query && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">
            {t('search.searchTitle')}
          </h2>
          <p className="text-muted-foreground">
            {t('search.searchDescription')}
          </p>
        </div>
      )}
    </div>
  );
}
