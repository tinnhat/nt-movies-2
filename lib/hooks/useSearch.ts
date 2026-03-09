import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { tmdbClient } from '../api/tmdb';
import type { Movie, TVShow, Person, PaginatedResponse } from '../api/types';

// Query Keys
export const searchKeys = {
  all: ['search'] as const,
  movies: (query: string, page?: number) => [...searchKeys.all, 'movies', query, page] as const,
  tv: (query: string, page?: number) => [...searchKeys.all, 'tv', query, page] as const,
  people: (query: string, page?: number) => [...searchKeys.all, 'people', query, page] as const,
  multi: (query: string, page?: number) => [...searchKeys.all, 'multi', query, page] as const,
};

// Search Movies
export const useSearchMovies = (
  query: string,
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<Movie>>
) => {
  return useQuery({
    queryKey: searchKeys.movies(query, page),
    queryFn: () =>
      tmdbClient.get('/search/movie', { params: { query, page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    enabled: query.length > 0,
    ...options,
  });
};

// Search TV Shows
export const useSearchTVShows = (
  query: string,
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<TVShow>>
) => {
  return useQuery({
    queryKey: searchKeys.tv(query, page),
    queryFn: () =>
      tmdbClient.get('/search/tv', { params: { query, page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    enabled: query.length > 0,
    ...options,
  });
};

// Search People
export const useSearchPeople = (
  query: string,
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<Person>>
) => {
  return useQuery({
    queryKey: searchKeys.people(query, page),
    queryFn: () =>
      tmdbClient.get('/search/person', { params: { query, page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    enabled: query.length > 0,
    ...options,
  });
};

// Multi Search (searches movies, TV shows, and people)
export const useMultiSearch = (
  query: string,
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<Movie | TVShow | Person>>
) => {
  return useQuery({
    queryKey: searchKeys.multi(query, page),
    queryFn: () =>
      tmdbClient.get('/search/multi', { params: { query, page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    enabled: query.length > 0,
    ...options,
  });
};
