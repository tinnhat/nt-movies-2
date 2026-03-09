import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { tmdbClient } from '../api/tmdb';
import type { Genre } from '../api/types';

// Query Keys
export const genreKeys = {
  all: ['genres'] as const,
  movies: () => [...genreKeys.all, 'movies'] as const,
  tv: () => [...genreKeys.all, 'tv'] as const,
};

interface GenreResponse {
  genres: Genre[];
}

// Movie Genres
export const useMovieGenres = (
  options?: UseQueryOptions<GenreResponse>
) => {
  return useQuery({
    queryKey: genreKeys.movies(),
    queryFn: () => tmdbClient.get('/genre/movie/list').then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours (genres rarely change)
    ...options,
  });
};

// TV Genres
export const useTVGenres = (
  options?: UseQueryOptions<GenreResponse>
) => {
  return useQuery({
    queryKey: genreKeys.tv(),
    queryFn: () => tmdbClient.get('/genre/tv/list').then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    ...options,
  });
};
