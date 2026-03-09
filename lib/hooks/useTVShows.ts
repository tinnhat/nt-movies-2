import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { tmdbClient } from '../api/tmdb';
import type {
  TVShow,
  PaginatedResponse,
  TVShowDetails,
  Credits,
  VideosResponse,
  Review,
  ImagesResponse,
  Season,
  DiscoverTVParams,
} from '../api/types';

// Query Keys
export const tvKeys = {
  all: ['tv'] as const,
  trending: (timeWindow: 'day' | 'week') => [...tvKeys.all, 'trending', timeWindow] as const,
  popular: (page?: number) => [...tvKeys.all, 'popular', page] as const,
  topRated: (page?: number) => [...tvKeys.all, 'topRated', page] as const,
  onTheAir: (page?: number) => [...tvKeys.all, 'onTheAir', page] as const,
  airingToday: (page?: number) => [...tvKeys.all, 'airingToday', page] as const,
  detail: (id: number) => [...tvKeys.all, 'detail', id] as const,
  credits: (id: number) => [...tvKeys.all, 'credits', id] as const,
  videos: (id: number) => [...tvKeys.all, 'videos', id] as const,
  reviews: (id: number, page?: number) => [...tvKeys.all, 'reviews', id, page] as const,
  similar: (id: number, page?: number) => [...tvKeys.all, 'similar', id, page] as const,
  recommendations: (id: number, page?: number) => [...tvKeys.all, 'recommendations', id, page] as const,
  images: (id: number) => [...tvKeys.all, 'images', id] as const,
  season: (id: number, seasonNumber: number) => [...tvKeys.all, 'season', id, seasonNumber] as const,
  discover: (params?: DiscoverTVParams) => [...tvKeys.all, 'discover', params] as const,
};

// Trending TV Shows
export const useTrendingTVShows = (
  timeWindow: 'day' | 'week' = 'day',
  options?: UseQueryOptions<PaginatedResponse<TVShow>>
) => {
  return useQuery({
    queryKey: tvKeys.trending(timeWindow),
    queryFn: () => tmdbClient.get(`/trending/tv/${timeWindow}`).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

// Popular TV Shows
export const usePopularTVShows = (
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<TVShow>>
) => {
  return useQuery({
    queryKey: tvKeys.popular(page),
    queryFn: () => tmdbClient.get('/tv/popular', { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

// Top Rated TV Shows
export const useTopRatedTVShows = (
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<TVShow>>
) => {
  return useQuery({
    queryKey: tvKeys.topRated(page),
    queryFn: () => tmdbClient.get('/tv/top_rated', { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

// On The Air TV Shows
export const useOnTheAirTVShows = (
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<TVShow>>
) => {
  return useQuery({
    queryKey: tvKeys.onTheAir(page),
    queryFn: () => tmdbClient.get('/tv/on_the_air', { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

// Airing Today TV Shows
export const useAiringTodayTVShows = (
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<TVShow>>
) => {
  return useQuery({
    queryKey: tvKeys.airingToday(page),
    queryFn: () => tmdbClient.get('/tv/airing_today', { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

// TV Show Details
export const useTVShowDetails = (
  id: number,
  options?: UseQueryOptions<TVShowDetails>
) => {
  return useQuery({
    queryKey: tvKeys.detail(id),
    queryFn: () => tmdbClient.get(`/tv/${id}`).then((res) => res.data),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
    ...options,
  });
};

// TV Show Credits
export const useTVShowCredits = (
  id: number,
  options?: UseQueryOptions<Credits>
) => {
  return useQuery({
    queryKey: tvKeys.credits(id),
    queryFn: () => tmdbClient.get(`/tv/${id}/credits`).then((res) => res.data),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
    ...options,
  });
};

// TV Show Videos
export const useTVShowVideos = (
  id: number,
  options?: UseQueryOptions<VideosResponse>
) => {
  return useQuery({
    queryKey: tvKeys.videos(id),
    queryFn: () => tmdbClient.get(`/tv/${id}/videos`).then((res) => res.data),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
    ...options,
  });
};

// TV Show Reviews
export const useTVShowReviews = (
  id: number,
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<Review>>
) => {
  return useQuery({
    queryKey: tvKeys.reviews(id, page),
    queryFn: () => tmdbClient.get(`/tv/${id}/reviews`, { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    ...options,
  });
};

// Similar TV Shows
export const useSimilarTVShows = (
  id: number,
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<TVShow>>
) => {
  return useQuery({
    queryKey: tvKeys.similar(id, page),
    queryFn: () => tmdbClient.get(`/tv/${id}/similar`, { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
    ...options,
  });
};

// TV Show Recommendations
export const useTVShowRecommendations = (
  id: number,
  page?: number,
  options?: UseQueryOptions<PaginatedResponse<TVShow>>
) => {
  return useQuery({
    queryKey: tvKeys.recommendations(id, page),
    queryFn: () => tmdbClient.get(`/tv/${id}/recommendations`, { params: { page } }).then((res) => res.data),
    staleTime: 1000 * 60 * 10,
    enabled: !!id,
    ...options,
  });
};

// TV Show Images
export const useTVShowImages = (
  id: number,
  options?: UseQueryOptions<ImagesResponse>
) => {
  return useQuery({
    queryKey: tvKeys.images(id),
    queryFn: () => tmdbClient.get(`/tv/${id}/images`).then((res) => res.data),
    staleTime: 1000 * 60 * 30,
    enabled: !!id,
    ...options,
  });
};

// TV Show Season
export const useTVShowSeason = (
  id: number,
  seasonNumber: number,
  options?: UseQueryOptions<Season>
) => {
  return useQuery({
    queryKey: tvKeys.season(id, seasonNumber),
    queryFn: () => tmdbClient.get(`/tv/${id}/season/${seasonNumber}`).then((res) => res.data),
    staleTime: 1000 * 60 * 30,
    enabled: !!id && seasonNumber >= 0,
    ...options,
  });
};

// Discover TV Shows
export const useDiscoverTVShows = (
  params?: DiscoverTVParams,
  options?: UseQueryOptions<PaginatedResponse<TVShow>>
) => {
  return useQuery({
    queryKey: tvKeys.discover(params),
    queryFn: () => tmdbClient.get('/discover/tv', { params }).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
