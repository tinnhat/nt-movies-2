import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { tmdbClient } from '../api/tmdb';
import type {
  Person,
  PaginatedResponse,
  PersonDetails,
  MovieCredits,
  TVCredits,
  ImagesResponse,
} from '../api/types';

// Query Keys
export const personKeys = {
  all: ['person'] as const,
  popular: (page?: number) => [...personKeys.all, 'popular', page] as const,
  detail: (id: number) => [...personKeys.all, 'detail', id] as const,
  movieCredits: (id: number) => [...personKeys.all, 'movieCredits', id] as const,
  tvCredits: (id: number) => [...personKeys.all, 'tvCredits', id] as const,
  images: (id: number) => [...personKeys.all, 'images', id] as const,
};

// Popular People
export const usePopularPeople = (
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<Person>>
) => {
  return useQuery({
    queryKey: personKeys.popular(page),
    queryFn: () => tmdbClient.get('/person/popular', { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 10,
    ...options,
  });
};

// Person Details
export const usePersonDetails = (
  id: number,
  options?: UseQueryOptions<PersonDetails>
) => {
  return useQuery({
    queryKey: personKeys.detail(id),
    queryFn: () => tmdbClient.get(`/person/${id}`).then((res) => res.data),
    staleTime: 1000 * 60 * 30,
    enabled: !!id,
    ...options,
  });
};

// Person Movie Credits
export const usePersonMovieCredits = (
  id: number,
  options?: UseQueryOptions<MovieCredits>
) => {
  return useQuery({
    queryKey: personKeys.movieCredits(id),
    queryFn: () => tmdbClient.get(`/person/${id}/movie_credits`).then((res) => res.data),
    staleTime: 1000 * 60 * 30,
    enabled: !!id,
    ...options,
  });
};

// Person TV Credits
export const usePersonTVCredits = (
  id: number,
  options?: UseQueryOptions<TVCredits>
) => {
  return useQuery({
    queryKey: personKeys.tvCredits(id),
    queryFn: () => tmdbClient.get(`/person/${id}/tv_credits`).then((res) => res.data),
    staleTime: 1000 * 60 * 30,
    enabled: !!id,
    ...options,
  });
};

// Person Images
export const usePersonImages = (
  id: number,
  options?: UseQueryOptions<ImagesResponse>
) => {
  return useQuery({
    queryKey: personKeys.images(id),
    queryFn: () => tmdbClient.get(`/person/${id}/images`).then((res) => res.data),
    staleTime: 1000 * 60 * 30,
    enabled: !!id,
    ...options,
  });
};
