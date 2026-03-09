import { Metadata } from 'next';
import { tmdbClient } from '@/lib/api/tmdb';
import {
  MovieDetails,
  Credits,
  VideosResponse,
  PaginatedResponse,
  Review,
  Movie,
  ImagesResponse,
} from '@/lib/api/types';
import { generateMovieMetadata } from '@/lib/utils/metadata';
import { generateMovieJsonLd } from '@/lib/utils/jsonld';
import { JsonLd } from '@/components/common/JsonLd';
import MovieDetailClient from './MovieDetailClient';

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

async function fetchMovieData(movieId: number) {
  try {
    const [movie, credits, videos, reviews, similar, images] = await Promise.all([
      tmdbClient.get<MovieDetails>(`/movie/${movieId}`),
      tmdbClient.get<Credits>(`/movie/${movieId}/credits`),
      tmdbClient.get<VideosResponse>(`/movie/${movieId}/videos`),
      tmdbClient.get<PaginatedResponse<Review>>(`/movie/${movieId}/reviews`),
      tmdbClient.get<PaginatedResponse<Movie>>(`/movie/${movieId}/similar`),
      tmdbClient.get<ImagesResponse>(`/movie/${movieId}/images`),
    ]);

    return {
      movie: movie.data,
      credits: credits.data,
      videos: videos.data,
      reviews: reviews.data,
      similar: similar.data,
      images: images.data,
    };
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const movieId = Number(id);

  try {
    const response = await tmdbClient.get<MovieDetails>(`/movie/${movieId}`);
    return generateMovieMetadata(response.data);
  } catch (error) {
    return {
      title: 'Movie Not Found | NT Movies',
      description: 'The requested movie could not be found.',
    };
  }
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;
  const movieId = Number(id);
  const data = await fetchMovieData(movieId);

  if (!data || !data.movie) {
    return (
      <div className="container px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Movie Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The requested movie could not be found.
        </p>
      </div>
    );
  }

  // Generate JSON-LD structured data
  const jsonLd = generateMovieJsonLd({
    id: data.movie.id,
    title: data.movie.title,
    overview: data.movie.overview,
    poster_path: data.movie.poster_path,
    release_date: data.movie.release_date,
    vote_average: data.movie.vote_average,
    vote_count: data.movie.vote_count,
    runtime: data.movie.runtime,
    genres: data.movie.genres,
    credits: data.credits,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <MovieDetailClient
        movie={data.movie}
        credits={data.credits}
        videos={data.videos}
        reviews={data.reviews}
        similar={data.similar}
        images={data.images}
      />
    </>
  );
}
