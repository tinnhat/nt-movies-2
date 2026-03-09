import { Metadata } from 'next';
import { generateSearchMetadata } from '@/lib/utils/metadata';
import SearchPageClient from './SearchPageClient';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q || '';

  if (!query) {
    return {
      title: 'Search | NT Movies',
      description: 'Search for movies, TV shows, and celebrities on NT Movies.',
    };
  }

  return generateSearchMetadata(query);
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const initialQuery = params.q || '';

  return <SearchPageClient initialQuery={initialQuery} />;
}
