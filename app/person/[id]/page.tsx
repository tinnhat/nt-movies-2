import { Metadata } from 'next';
import { tmdbClient } from '@/lib/api/tmdb';
import { PersonDetails, MovieCredits, TVCredits } from '@/lib/api/types';
import { generatePersonMetadata } from '@/lib/utils/metadata';
import { generatePersonJsonLd } from '@/lib/utils/jsonld';
import { JsonLd } from '@/components/common/JsonLd';
import PersonDetailClient from './PersonDetailClient';

interface PersonDetailPageProps {
  params: Promise<{ id: string }>;
}

async function fetchPersonData(personId: number) {
  try {
    const [person, movieCredits, tvCredits] = await Promise.all([
      tmdbClient.get<PersonDetails>(`/person/${personId}`),
      tmdbClient.get<MovieCredits>(`/person/${personId}/movie_credits`),
      tmdbClient.get<TVCredits>(`/person/${personId}/tv_credits`),
    ]);

    return {
      person: person.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
    };
  } catch (error) {
    console.error('Error fetching person data:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PersonDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const personId = Number(id);

  try {
    const response = await tmdbClient.get<PersonDetails>(`/person/${personId}`);
    return generatePersonMetadata(response.data);
  } catch (error) {
    return {
      title: 'Person Not Found | NT Movies',
      description: 'The requested person could not be found.',
    };
  }
}

export default async function PersonDetailPage({
  params,
}: PersonDetailPageProps) {
  const { id } = await params;
  const personId = Number(id);
  const data = await fetchPersonData(personId);

  if (!data || !data.person) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Person Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The requested person could not be found.
        </p>
      </div>
    );
  }

  // Generate JSON-LD structured data
  const jsonLd = generatePersonJsonLd({
    id: data.person.id,
    name: data.person.name,
    biography: data.person.biography,
    profile_path: data.person.profile_path,
    birthday: data.person.birthday,
    place_of_birth: data.person.place_of_birth,
    known_for_department: data.person.known_for_department,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <PersonDetailClient
        person={data.person}
        movieCredits={data.movieCredits}
        tvCredits={data.tvCredits}
      />
    </>
  );
}
