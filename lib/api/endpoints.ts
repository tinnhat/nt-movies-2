import { tmdbClient } from './tmdb';
import type {
  Movie,
  MovieDetails,
  TVShow,
  TVShowDetails,
  Person,
  PersonDetails,
  Genre,
  Credits,
  VideosResponse,
  Review,
  ImagesResponse,
  PaginatedResponse,
} from './types';

// ==================== CONFIGURATION ====================
export const getConfiguration = async () => {
  return tmdbClient.get('/configuration');
};

export const getGenres = async (type: 'movie' | 'tv') => {
  return tmdbClient.get<{ genres: Genre[] }>(`/genre/${type}/list`);
};

// ==================== MOVIES ====================
export const getTrendingMovies = async (timeWindow: 'day' | 'week' = 'day') => {
  return tmdbClient.get<PaginatedResponse<Movie>>(`/trending/movie/${timeWindow}`);
};

export const getPopularMovies = async (page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<Movie>>('/movie/popular', {
    params: { page },
  });
};

export const getNowPlayingMovies = async (page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<Movie>>('/movie/now_playing', {
    params: { page },
  });
};

export const getUpcomingMovies = async (page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<Movie>>('/movie/upcoming', {
    params: { page },
  });
};

export const getTopRatedMovies = async (page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<Movie>>('/movie/top_rated', {
    params: { page },
  });
};

export const getMovieDetails = async (movieId: number) => {
  return tmdbClient.get<MovieDetails>(`/movie/${movieId}`, {
    params: {
      append_to_response: 'videos,credits,images,reviews,similar,recommendations',
    },
  });
};

export const getMovieCredits = async (movieId: number) => {
  return tmdbClient.get<Credits>(`/movie/${movieId}/credits`);
};

export const getMovieVideos = async (movieId: number) => {
  return tmdbClient.get<VideosResponse>(`/movie/${movieId}/videos`);
};

export const getMovieReviews = async (movieId: number, page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<Review>>(`/movie/${movieId}/reviews`, {
    params: { page },
  });
};

export const getSimilarMovies = async (movieId: number, page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<Movie>>(`/movie/${movieId}/similar`, {
    params: { page },
  });
};

export const getMovieRecommendations = async (movieId: number, page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<Movie>>(`/movie/${movieId}/recommendations`, {
    params: { page },
  });
};

export const getMovieImages = async (movieId: number) => {
  return tmdbClient.get<ImagesResponse>(`/movie/${movieId}/images`);
};

export const discoverMovies = async (params: Record<string, any>) => {
  return tmdbClient.get<PaginatedResponse<Movie>>('/discover/movie', { params });
};

// ==================== TV SHOWS ====================
export const getTrendingTVShows = async (timeWindow: 'day' | 'week' = 'day') => {
  return tmdbClient.get<PaginatedResponse<TVShow>>(`/trending/tv/${timeWindow}`);
};

export const getPopularTVShows = async (page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<TVShow>>('/tv/popular', {
    params: { page },
  });
};

export const getTopRatedTVShows = async (page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<TVShow>>('/tv/top_rated', {
    params: { page },
  });
};

export const getOnTheAirTVShows = async (page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<TVShow>>('/tv/on_the_air', {
    params: { page },
  });
};

export const getTVShowDetails = async (tvId: number) => {
  return tmdbClient.get<TVShowDetails>(`/tv/${tvId}`, {
    params: {
      append_to_response: 'videos,credits,images,reviews,similar,recommendations',
    },
  });
};

export const getTVShowCredits = async (tvId: number) => {
  return tmdbClient.get<Credits>(`/tv/${tvId}/credits`);
};

export const getTVShowVideos = async (tvId: number) => {
  return tmdbClient.get<VideosResponse>(`/tv/${tvId}/videos`);
};

export const getTVShowReviews = async (tvId: number, page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<Review>>(`/tv/${tvId}/reviews`, {
    params: { page },
  });
};

export const getSimilarTVShows = async (tvId: number, page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<TVShow>>(`/tv/${tvId}/similar`, {
    params: { page },
  });
};

export const getTVShowRecommendations = async (tvId: number, page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<TVShow>>(`/tv/${tvId}/recommendations`, {
    params: { page },
  });
};

export const getTVShowImages = async (tvId: number) => {
  return tmdbClient.get<ImagesResponse>(`/tv/${tvId}/images`);
};

export const getTVSeasonDetails = async (tvId: number, seasonNumber: number) => {
  return tmdbClient.get(`/tv/${tvId}/season/${seasonNumber}`);
};

export const discoverTVShows = async (params: Record<string, any>) => {
  return tmdbClient.get<PaginatedResponse<TVShow>>('/discover/tv', { params });
};

// ==================== PEOPLE ====================
export const getPopularPeople = async (page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<Person>>('/person/popular', {
    params: { page },
  });
};

export const getPersonDetails = async (personId: number) => {
  return tmdbClient.get<PersonDetails>(`/person/${personId}`);
};

export const getPersonMovieCredits = async (personId: number) => {
  return tmdbClient.get(`/person/${personId}/movie_credits`);
};

export const getPersonTVCredits = async (personId: number) => {
  return tmdbClient.get(`/person/${personId}/tv_credits`);
};

export const getPersonImages = async (personId: number) => {
  return tmdbClient.get<{ id: number; profiles: ImagesResponse['posters'] }>(
    `/person/${personId}/images`
  );
};

// ==================== SEARCH ====================
export const searchMovies = async (query: string, page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<Movie>>('/search/movie', {
    params: { query, page },
  });
};

export const searchTVShows = async (query: string, page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<TVShow>>('/search/tv', {
    params: { query, page },
  });
};

export const searchPeople = async (query: string, page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<Person>>('/search/person', {
    params: { query, page },
  });
};

export const searchMulti = async (query: string, page: number = 1) => {
  return tmdbClient.get<PaginatedResponse<Movie | TVShow | Person>>('/search/multi', {
    params: { query, page },
  });
};
