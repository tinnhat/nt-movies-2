import { Metadata } from 'next';
import { tmdbClient } from '@/lib/api/tmdb';
import {
  TVShowDetails,
  Credits,
  VideosResponse,
  PaginatedResponse,
  Review,
  TVShow,
} from '@/lib/api/types';
import { generateTVShowMetadata } from '@/lib/utils/metadata';
import { generateTVShowJsonLd } from '@/lib/utils/jsonld';
import { JsonLd } from '@/components/common/JsonLd';
import TVShowDetailClient from './TVShowDetailClient';

interface TVShowDetailPageProps {
  params: Promise<{ id: string }>;
}

async function fetchTVShowData(tvId: number) {
  try {
    const [tvShow, credits, videos, reviews, similar] = await Promise.all([
      tmdbClient.get<TVShowDetails>(`/tv/${tvId}`),
      tmdbClient.get<Credits>(`/tv/${tvId}/credits`),
      tmdbClient.get<VideosResponse>(`/tv/${tvId}/videos`),
      tmdbClient.get<PaginatedResponse<Review>>(`/tv/${tvId}/reviews`),
      tmdbClient.get<PaginatedResponse<TVShow>>(`/tv/${tvId}/similar`),
    ]);

    return {
      tvShow: tvShow.data,
      credits: credits.data,
      videos: videos.data,
      reviews: reviews.data,
      similar: similar.data,
    };
  } catch (error) {
    console.error('Error fetching TV show data:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: TVShowDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const tvId = Number(id);

  try {
    const response = await tmdbClient.get<TVShowDetails>(`/tv/${tvId}`);
    return generateTVShowMetadata(response.data);
  } catch (error) {
    return {
      title: 'TV Show Not Found | NT Movies',
      description: 'The requested TV show could not be found.',
    };
  }
}

export default async function TVShowDetailPage({
  params,
}: TVShowDetailPageProps) {
  const { id } = await params;
  const tvId = Number(id);
  const data = await fetchTVShowData(tvId);

  if (!data || !data.tvShow) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">TV Show Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The requested TV show could not be found.
        </p>
      </div>
    );
  }

  // Generate JSON-LD structured data
  const jsonLd = generateTVShowJsonLd({
    id: data.tvShow.id,
    name: data.tvShow.name,
    overview: data.tvShow.overview,
    poster_path: data.tvShow.poster_path,
    first_air_date: data.tvShow.first_air_date,
    vote_average: data.tvShow.vote_average,
    vote_count: data.tvShow.vote_count,
    number_of_seasons: data.tvShow.number_of_seasons,
    number_of_episodes: data.tvShow.number_of_episodes,
    genres: data.tvShow.genres,
    credits: data.credits,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <TVShowDetailClient
        tvShow={data.tvShow}
        credits={data.credits}
        videos={data.videos}
        reviews={data.reviews}
        similar={data.similar}
      />
    </>
  );
}
