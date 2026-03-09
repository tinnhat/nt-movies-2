import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { tmdbClient } from '../api/tmdb';
import type {
  Movie,
  PaginatedResponse,
  MovieDetails,
  Credits,
  VideosResponse,
  Review,
  ImagesResponse,
  DiscoverMovieParams,
} from '../api/types';

// Query Keys
export const movieKeys = {
  all: ['movies'] as const,
  trending: (timeWindow: 'day' | 'week') => [...movieKeys.all, 'trending', timeWindow] as const,
  popular: (page?: number) => [...movieKeys.all, 'popular', page] as const,
  nowPlaying: (page?: number) => [...movieKeys.all, 'nowPlaying', page] as const,
  upcoming: (page?: number) => [...movieKeys.all, 'upcoming', page] as const,
  topRated: (page?: number) => [...movieKeys.all, 'topRated', page] as const,
  detail: (id: number) => [...movieKeys.all, 'detail', id] as const,
  credits: (id: number) => [...movieKeys.all, 'credits', id] as const,
  videos: (id: number) => [...movieKeys.all, 'videos', id] as const,
  reviews: (id: number, page?: number) => [...movieKeys.all, 'reviews', id, page] as const,
  similar: (id: number, page?: number) => [...movieKeys.all, 'similar', id, page] as const,
  recommendations: (id: number, page?: number) => [...movieKeys.all, 'recommendations', id, page] as const,
  images: (id: number) => [...movieKeys.all, 'images', id] as const,
  discover: (params?: DiscoverMovieParams) => [...movieKeys.all, 'discover', params] as const,
};

// Trending Movies
export const useTrendingMovies = (
  timeWindow: 'day' | 'week' = 'day',
  options?: UseQueryOptions<PaginatedResponse<Movie>>
) => {
  return useQuery({
    queryKey: movieKeys.trending(timeWindow),
    queryFn: () => tmdbClient.get(`/trending/movie/${timeWindow}`).then((res) => res.data),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });
};

// Popular Movies
export const usePopularMovies = (
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<Movie>>
) => {
  return useQuery({
    queryKey: movieKeys.popular(page),
    queryFn: () => tmdbClient.get('/movie/popular', { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

// Now Playing Movies
export const useNowPlayingMovies = (
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<Movie>>
) => {
  return useQuery({
    queryKey: movieKeys.nowPlaying(page),
    queryFn: () => tmdbClient.get('/movie/now_playing', { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

// Upcoming Movies
export const useUpcomingMovies = (
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<Movie>>
) => {
  return useQuery({
    queryKey: movieKeys.upcoming(page),
    queryFn: () => tmdbClient.get('/movie/upcoming', { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

// Top Rated Movies
export const useTopRatedMovies = (
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<Movie>>
) => {
  return useQuery({
    queryKey: movieKeys.topRated(page),
    queryFn: () => tmdbClient.get('/movie/top_rated', { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

// Movie Details
export const useMovieDetails = (
  id: number,
  options?: UseQueryOptions<MovieDetails>
) => {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => tmdbClient.get(`/movie/${id}`).then((res) => res.data),
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!id,
    ...options,
  });
};

// Movie Credits
export const useMovieCredits = (
  id: number,
  options?: UseQueryOptions<Credits>
) => {
  return useQuery({
    queryKey: movieKeys.credits(id),
    queryFn: () => tmdbClient.get(`/movie/${id}/credits`).then((res) => res.data),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
    ...options,
  });
};

// Movie Videos
export const useMovieVideos = (
  id: number,
  options?: UseQueryOptions<VideosResponse>
) => {
  return useQuery({
    queryKey: movieKeys.videos(id),
    queryFn: () => tmdbClient.get(`/movie/${id}/videos`).then((res) => res.data),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
    ...options,
  });
};

// Movie Reviews
export const useMovieReviews = (
  id: number,
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<Review>>
) => {
  return useQuery({
    queryKey: movieKeys.reviews(id, page),
    queryFn: () => tmdbClient.get(`/movie/${id}/reviews`, { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    ...options,
  });
};

// Similar Movies
export const useSimilarMovies = (
  id: number,
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<Movie>>
) => {
  return useQuery({
    queryKey: movieKeys.similar(id, page),
    queryFn: () => tmdbClient.get(`/movie/${id}/similar`, { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
    ...options,
  });
};

// Movie Recommendations
export const useMovieRecommendations = (
  id: number,
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<Movie>>
) => {
  return useQuery({
    queryKey: movieKeys.recommendations(id, page),
    queryFn: () => tmdbClient.get(`/movie/${id}/recommendations`, { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
    ...options,
  });
};

// Movie Images
export const useMovieImages = (
  id: number,
  options?: UseQueryOptions<ImagesResponse>
) => {
  return useQuery({
    queryKey: movieKeys.images(id),
    queryFn: () => tmdbClient.get(`/movie/${id}/images`).then((res) => res.data),
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!id,
    ...options,
  });
};

// Discover Movies
export const useDiscoverMovies = (
  params?: DiscoverMovieParams,
  options?: UseQueryOptions<PaginatedResponse<Movie>>
) => {
  return useQuery({
    queryKey: movieKeys.discover(params),
    queryFn: () => tmdbClient.get('/discover/movie', { params }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
