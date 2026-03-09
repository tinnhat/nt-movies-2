// TMDB API Types

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  tagline: string;
  status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  belongs_to_collection: Collection | null;
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  origin_country: string[];
  original_language: string;
}

export interface TVShowDetails extends TVShow {
  genres: Genre[];
  created_by: Creator[];
  episode_run_time: number[];
  in_production: boolean;
  last_air_date: string;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: Season[];
  status: string;
  type: string;
  homepage: string;
}

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  gender: number;
  popularity: number;
  known_for: (Movie | TVShow)[];
}

export interface PersonDetails extends Person {
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  homepage: string | null;
  imdb_id: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
  english_name: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface Creator {
  id: number;
  name: string;
  profile_path: string | null;
  credit_id: string;
  gender: number;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  gender: number;
  known_for_department: string;
  cast_id: number;
  credit_id: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  gender: number;
  credit_id: string;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | 'Bloopers';
  official: boolean;
  published_at: string;
  iso_639_1: string;
  iso_3166_1: string;
}

export interface VideosResponse {
  id: number;
  results: Video[];
}

export interface Review {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface Image {
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
}

export interface ImagesResponse {
  id: number;
  posters: Image[];
  backdrops: Image[];
  logos: Image[];
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Configuration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
}

// Discover Movie Parameters
export interface DiscoverMovieParams {
  page?: number;
  language?: string;
  region?: string;
  sort_by?: string;
  with_genres?: string;
  with_keywords?: string;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  with_cast?: string;
  with_crew?: string;
  with_people?: string;
  year?: number;
}

// Discover TV Parameters
export interface DiscoverTVParams {
  page?: number;
  language?: string;
  sort_by?: string;
  with_genres?: string;
  with_keywords?: string;
  'first_air_date.gte'?: string;
  'first_air_date.lte'?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  with_networks?: string;
  with_companies?: string;
  year?: number;
}

// Person Credits Types
export interface MovieCredits {
  id: number;
  cast: Movie[];
  crew: Movie[];
}

export interface TVCredits {
  id: number;
  cast: TVShow[];
  crew: TVShow[];
}
