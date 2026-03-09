# NT Movies V2 - TMDB API Endpoints Reference

## 📚 Tổng Quan

Document này liệt kê tất cả TMDB API endpoints được sử dụng trong dự án NT Movies V2, kèm theo parameters, response structure, và usage examples.

---

## 🔑 API Configuration

### Base URLs
```
API Base URL: https://api.themoviedb.org/3
Image Base URL: https://image.tmdb.org/t/p
```

### Authentication
```
Method: API Key
Parameter: api_key=YOUR_API_KEY
Alternative: Bearer Token in Authorization header
```

### Common Parameters
- `api_key` (required) - Your TMDB API key
- `language` (optional) - ISO 639-1 language code (default: en-US)
  - English: `en-US`
  - Vietnamese: `vi-VN`
- `page` (optional) - Page number (default: 1)
- `region` (optional) - ISO 3166-1 country code

### Rate Limits
- **Free Tier:** 40 requests per 10 seconds
- **Daily Limit:** 50,000 requests

---

## 🎬 Configuration Endpoints

### 1. Get API Configuration
**Endpoint:** `GET /configuration`  
**Description:** Get system-wide configuration info including image base URLs and sizes

**Request:**
```bash
GET https://api.themoviedb.org/3/configuration?api_key={api_key}
```

**Response:**
```json
{
  "images": {
    "base_url": "http://image.tmdb.org/t/p/",
    "secure_base_url": "https://image.tmdb.org/t/p/",
    "backdrop_sizes": ["w300", "w780", "w1280", "original"],
    "logo_sizes": ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    "poster_sizes": ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
    "profile_sizes": ["w45", "w185", "h632", "original"],
    "still_sizes": ["w92", "w185", "w300", "original"]
  }
}
```

**Usage trong Project:**
```tsx
// src/lib/api/config.ts
export const getImageUrl = (path: string, size: string = 'original') => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
```

---

### 2. Get Movie Genres
**Endpoint:** `GET /genre/movie/list`  
**Description:** Get list of official movie genres

**Request:**
```bash
GET https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}&language=en-US
```

**Response:**
```json
{
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 18, "name": "Drama" },
    { "id": 14, "name": "Fantasy" },
    { "id": 27, "name": "Horror" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 53, "name": "Thriller" }
  ]
}
```

**Usage:**
```tsx
// Fetch on app load và cache
const { data: genres } = useQuery({
  queryKey: ['genres', 'movie'],
  queryFn: fetchMovieGenres,
  staleTime: Infinity // Genres rarely change
});
```

---

### 3. Get TV Genres
**Endpoint:** `GET /genre/tv/list`  
**Description:** Get list of official TV genres

**Request:**
```bash
GET https://api.themoviedb.org/3/genre/tv/list?api_key={api_key}&language=en-US
```

**Response:** Similar structure to movie genres

---

## 🎥 Movie Endpoints

### 4. Get Trending Movies
**Endpoint:** `GET /trending/movie/{time_window}`  
**Description:** Get trending movies (daily or weekly)

**Parameters:**
- `time_window` (required) - `day` or `week`
- `page` (optional) - Page number (default: 1)

**Request:**
```bash
GET https://api.themoviedb.org/3/trending/movie/day?api_key={api_key}&page=1
```

**Response:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 123456,
      "title": "Movie Title",
      "original_title": "Original Title",
      "overview": "Movie overview text...",
      "poster_path": "/path-to-poster.jpg",
      "backdrop_path": "/path-to-backdrop.jpg",
      "release_date": "2024-03-15",
      "vote_average": 8.5,
      "vote_count": 1500,
      "genre_ids": [28, 12, 878],
      "popularity": 1234.567,
      "adult": false,
      "video": false,
      "original_language": "en"
    }
  ],
  "total_pages": 1000,
  "total_results": 20000
}
```

**Usage:**
```tsx
export const useTrendingMovies = (timeWindow: 'day' | 'week') => {
  return useQuery({
    queryKey: ['movies', 'trending', timeWindow],
    queryFn: () => tmdbClient.get(`/trending/movie/${timeWindow}`),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};
```

---

### 5. Get Popular Movies
**Endpoint:** `GET /movie/popular`  
**Description:** Get list of popular movies

**Parameters:**
- `page` (optional) - Page number
- `region` (optional) - Country code

**Request:**
```bash
GET https://api.themoviedb.org/3/movie/popular?api_key={api_key}&page=1
```

**Response:** Same structure as trending movies

---

### 6. Get Now Playing Movies
**Endpoint:** `GET /movie/now_playing`  
**Description:** Get movies currently in theaters

**Request:**
```bash
GET https://api.themoviedb.org/3/movie/now_playing?api_key={api_key}&page=1&region=US
```

**Response:** Same structure as popular movies

---

### 7. Get Upcoming Movies
**Endpoint:** `GET /movie/upcoming`  
**Description:** Get upcoming movie releases

**Request:**
```bash
GET https://api.themoviedb.org/3/movie/upcoming?api_key={api_key}&page=1
```

---

### 8. Get Top Rated Movies
**Endpoint:** `GET /movie/top_rated`  
**Description:** Get highest rated movies

**Request:**
```bash
GET https://api.themoviedb.org/3/movie/top_rated?api_key={api_key}&page=1
```

---

### 9. Get Movie Details
**Endpoint:** `GET /movie/{movie_id}`  
**Description:** Get detailed info for a specific movie

**Parameters:**
- `movie_id` (required) - Movie ID
- `append_to_response` (optional) - Comma-separated list to append: `videos,credits,images,reviews,similar,recommendations`

**Request:**
```bash
GET https://api.themoviedb.org/3/movie/123456?api_key={api_key}&append_to_response=videos,credits
```

**Response:**
```json
{
  "id": 123456,
  "title": "Movie Title",
  "original_title": "Original Title",
  "tagline": "This is the tagline",
  "overview": "Full movie overview...",
  "poster_path": "/poster.jpg",
  "backdrop_path": "/backdrop.jpg",
  "release_date": "2024-03-15",
  "runtime": 142,
  "budget": 150000000,
  "revenue": 500000000,
  "status": "Released",
  "vote_average": 8.5,
  "vote_count": 15000,
  "popularity": 1234.567,
  "adult": false,
  "homepage": "https://movie-homepage.com",
  "imdb_id": "tt1234567",
  "original_language": "en",
  "spoken_languages": [
    { "iso_639_1": "en", "name": "English" }
  ],
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 878, "name": "Science Fiction" }
  ],
  "production_companies": [
    {
      "id": 1,
      "name": "Company Name",
      "logo_path": "/logo.png",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    { "iso_3166_1": "US", "name": "United States of America" }
  ],
  "belongs_to_collection": {
    "id": 123,
    "name": "Collection Name",
    "poster_path": "/collection-poster.jpg",
    "backdrop_path": "/collection-backdrop.jpg"
  }
}
```

**TypeScript Type:**
```tsx
interface MovieDetails {
  id: number;
  title: string;
  original_title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number;
  budget: number;
  revenue: number;
  status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  homepage: string;
  imdb_id: string;
  original_language: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  belongs_to_collection: Collection | null;
}
```

---

### 10. Get Movie Credits
**Endpoint:** `GET /movie/{movie_id}/credits`  
**Description:** Get cast and crew for a movie

**Request:**
```bash
GET https://api.themoviedb.org/3/movie/123456/credits?api_key={api_key}
```

**Response:**
```json
{
  "id": 123456,
  "cast": [
    {
      "id": 1,
      "name": "Actor Name",
      "character": "Character Name",
      "profile_path": "/profile.jpg",
      "order": 0,
      "gender": 2,
      "known_for_department": "Acting",
      "cast_id": 1,
      "credit_id": "abc123"
    }
  ],
  "crew": [
    {
      "id": 2,
      "name": "Director Name",
      "job": "Director",
      "department": "Directing",
      "profile_path": "/profile.jpg",
      "gender": 2,
      "credit_id": "def456"
    }
  ]
}
```

**Usage:**
```tsx
export const useMovieCredits = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => tmdbClient.get(`/movie/${movieId}/credits`),
    enabled: !!movieId
  });
};
```

---

### 11. Get Movie Videos
**Endpoint:** `GET /movie/{movie_id}/videos`  
**Description:** Get trailers, teasers, clips for a movie

**Request:**
```bash
GET https://api.themoviedb.org/3/movie/123456/videos?api_key={api_key}
```

**Response:**
```json
{
  "id": 123456,
  "results": [
    {
      "id": "abc123",
      "key": "dQw4w9WgXcQ",
      "name": "Official Trailer",
      "site": "YouTube",
      "size": 1080,
      "type": "Trailer",
      "official": true,
      "published_at": "2024-03-01T12:00:00.000Z",
      "iso_639_1": "en",
      "iso_3166_1": "US"
    }
  ]
}
```

**Video Types:**
- `Trailer` - Official trailers
- `Teaser` - Teaser clips
- `Clip` - Movie clips
- `Featurette` - Behind the scenes
- `Behind the Scenes`
- `Bloopers`

**Usage:**
```tsx
// Filter trailers only
const trailers = videos.filter(v => v.type === 'Trailer' && v.official);

// YouTube embed URL
const embedUrl = `https://www.youtube.com/embed/${video.key}`;
```

---

### 12. Get Movie Reviews
**Endpoint:** `GET /movie/{movie_id}/reviews`  
**Description:** Get user reviews for a movie

**Parameters:**
- `page` (optional) - Page number

**Request:**
```bash
GET https://api.themoviedb.org/3/movie/123456/reviews?api_key={api_key}&page=1
```

**Response:**
```json
{
  "id": 123456,
  "page": 1,
  "results": [
    {
      "id": "review123",
      "author": "Username",
      "author_details": {
        "name": "Display Name",
        "username": "username",
        "avatar_path": "/avatar.jpg",
        "rating": 9.0
      },
      "content": "This is the review content...",
      "created_at": "2024-03-15T10:30:00.000Z",
      "updated_at": "2024-03-15T10:30:00.000Z",
      "url": "https://www.themoviedb.org/review/review123"
    }
  ],
  "total_pages": 5,
  "total_results": 50
}
```

---

### 13. Get Similar Movies
**Endpoint:** `GET /movie/{movie_id}/similar`  
**Description:** Get movies similar to a specific movie

**Request:**
```bash
GET https://api.themoviedb.org/3/movie/123456/similar?api_key={api_key}&page=1
```

**Response:** Same structure as trending/popular movies

---

### 14. Get Movie Recommendations
**Endpoint:** `GET /movie/{movie_id}/recommendations`  
**Description:** Get movie recommendations based on a specific movie

**Request:**
```bash
GET https://api.themoviedb.org/3/movie/123456/recommendations?api_key={api_key}&page=1
```

**Response:** Same structure as similar movies

---

### 15. Get Movie Images
**Endpoint:** `GET /movie/{movie_id}/images`  
**Description:** Get posters, backdrops, and logos for a movie

**Parameters:**
- `include_image_language` (optional) - Filter by language (e.g., `en,null`)

**Request:**
```bash
GET https://api.themoviedb.org/3/movie/123456/images?api_key={api_key}
```

**Response:**
```json
{
  "id": 123456,
  "posters": [
    {
      "aspect_ratio": 0.667,
      "file_path": "/poster.jpg",
      "height": 3000,
      "width": 2000,
      "iso_639_1": "en",
      "vote_average": 5.318,
      "vote_count": 4
    }
  ],
  "backdrops": [
    {
      "aspect_ratio": 1.778,
      "file_path": "/backdrop.jpg",
      "height": 2160,
      "width": 3840,
      "iso_639_1": null,
      "vote_average": 5.246,
      "vote_count": 2
    }
  ],
  "logos": [
    {
      "aspect_ratio": 3.5,
      "file_path": "/logo.png",
      "height": 200,
      "width": 700,
      "iso_639_1": "en",
      "vote_average": 0,
      "vote_count": 0
    }
  ]
}
```

**Usage:**
```tsx
// Get poster URL
const posterUrl = getImageUrl(poster.file_path, 'w500');

// Get backdrop URL
const backdropUrl = getImageUrl(backdrop.file_path, 'w1280');
```

---

### 16. Discover Movies (Advanced Filter)
**Endpoint:** `GET /discover/movie`  
**Description:** Discover movies with advanced filtering

**Parameters:**
- `sort_by` (optional) - Sort results:
  - `popularity.desc` / `popularity.asc`
  - `release_date.desc` / `release_date.asc`
  - `vote_average.desc` / `vote_average.asc`
  - `vote_count.desc` / `vote_count.asc`
- `with_genres` (optional) - Genre IDs (comma-separated or pipe-separated)
- `primary_release_year` (optional) - Filter by release year
- `primary_release_date.gte` (optional) - Filter by date greater than or equal
- `primary_release_date.lte` (optional) - Filter by date less than or equal
- `vote_average.gte` (optional) - Filter by rating >= value
- `vote_average.lte` (optional) - Filter by rating <= value
- `with_original_language` (optional) - Filter by language (ISO 639-1)
- `page` (optional) - Page number

**Request Example:**
```bash
# Action movies from 2023 with rating >= 7.0
GET https://api.themoviedb.org/3/discover/movie?api_key={api_key}&with_genres=28&primary_release_year=2023&vote_average.gte=7.0&sort_by=popularity.desc
```

**Response:** Same structure as popular movies

**Usage:**
```tsx
export const useDiscoverMovies = (filters: DiscoverFilters) => {
  return useQuery({
    queryKey: ['movies', 'discover', filters],
    queryFn: () => tmdbClient.get('/discover/movie', { params: filters })
  });
};

// Component
const filters = {
  with_genres: '28,12', // Action, Adventure
  primary_release_year: 2024,
  'vote_average.gte': 7.0,
  sort_by: 'popularity.desc',
  page: 1
};
```

---

## 📺 TV Show Endpoints

### 17. Get Trending TV Shows
**Endpoint:** `GET /trending/tv/{time_window}`  
**Description:** Get trending TV shows

**Request:**
```bash
GET https://api.themoviedb.org/3/trending/tv/day?api_key={api_key}
```

**Response:** Similar to trending movies, với `name` thay vì `title`, `first_air_date` thay vì `release_date`

---

### 18. Get Popular TV Shows
**Endpoint:** `GET /tv/popular`

---

### 19. Get Top Rated TV Shows
**Endpoint:** `GET /tv/top_rated`

---

### 20. Get TV Shows On The Air
**Endpoint:** `GET /tv/on_the_air`  
**Description:** Get TV shows currently airing

---

### 21. Get TV Show Details
**Endpoint:** `GET /tv/{tv_id}`  
**Description:** Get detailed info for a TV show

**Response:**
```json
{
  "id": 123456,
  "name": "TV Show Name",
  "original_name": "Original Name",
  "tagline": "Tagline",
  "overview": "Overview...",
  "poster_path": "/poster.jpg",
  "backdrop_path": "/backdrop.jpg",
  "first_air_date": "2024-01-01",
  "last_air_date": "2024-12-31",
  "status": "Returning Series",
  "type": "Scripted",
  "number_of_seasons": 3,
  "number_of_episodes": 30,
  "episode_run_time": [60],
  "in_production": true,
  "vote_average": 8.5,
  "vote_count": 5000,
  "popularity": 500.0,
  "homepage": "https://show-homepage.com",
  "genres": [
    { "id": 18, "name": "Drama" }
  ],
  "created_by": [
    {
      "id": 1,
      "name": "Creator Name",
      "profile_path": "/profile.jpg"
    }
  ],
  "networks": [
    {
      "id": 1,
      "name": "Network Name",
      "logo_path": "/logo.png",
      "origin_country": "US"
    }
  ],
  "seasons": [
    {
      "id": 1,
      "name": "Season 1",
      "overview": "Season overview",
      "poster_path": "/season-poster.jpg",
      "season_number": 1,
      "episode_count": 10,
      "air_date": "2024-01-01"
    }
  ]
}
```

---

### 22. Get TV Show Credits
**Endpoint:** `GET /tv/{tv_id}/credits`  
**Description:** Get cast and crew for a TV show

---

### 23. Get TV Show Videos
**Endpoint:** `GET /tv/{tv_id}/videos`

---

### 24. Get TV Show Reviews
**Endpoint:** `GET /tv/{tv_id}/reviews`

---

### 25. Get Similar TV Shows
**Endpoint:** `GET /tv/{tv_id}/similar`

---

### 26. Get TV Show Recommendations
**Endpoint:** `GET /tv/{tv_id}/recommendations`

---

### 27. Get TV Season Details
**Endpoint:** `GET /tv/{tv_id}/season/{season_number}`  
**Description:** Get details for a specific season

**Response:**
```json
{
  "id": "season123",
  "name": "Season 1",
  "overview": "Season overview...",
  "poster_path": "/season-poster.jpg",
  "season_number": 1,
  "air_date": "2024-01-01",
  "episodes": [
    {
      "id": 1,
      "name": "Episode Title",
      "overview": "Episode overview...",
      "still_path": "/episode-still.jpg",
      "episode_number": 1,
      "air_date": "2024-01-01",
      "runtime": 60,
      "vote_average": 8.0,
      "vote_count": 100,
      "crew": [],
      "guest_stars": []
    }
  ]
}
```

---

### 28. Discover TV Shows
**Endpoint:** `GET /discover/tv`  
**Description:** Discover TV shows with filtering

**Parameters:** Similar to discover movies, với `first_air_date` thay vì `primary_release_date`

---

## 👤 People Endpoints

### 29. Get Popular People
**Endpoint:** `GET /person/popular`  
**Description:** Get list of popular people

**Request:**
```bash
GET https://api.themoviedb.org/3/person/popular?api_key={api_key}&page=1
```

**Response:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 123,
      "name": "Person Name",
      "profile_path": "/profile.jpg",
      "known_for_department": "Acting",
      "gender": 2,
      "popularity": 100.5,
      "known_for": [
        {
          "id": 1,
          "title": "Movie Title",
          "poster_path": "/poster.jpg",
          "media_type": "movie"
        }
      ]
    }
  ],
  "total_pages": 500,
  "total_results": 10000
}
```

---

### 30. Get Person Details
**Endpoint:** `GET /person/{person_id}`  
**Description:** Get detailed info for a person

**Request:**
```bash
GET https://api.themoviedb.org/3/person/123?api_key={api_key}
```

**Response:**
```json
{
  "id": 123,
  "name": "Person Name",
  "also_known_as": ["Alias 1", "Alias 2"],
  "biography": "Full biography text...",
  "birthday": "1980-01-01",
  "deathday": null,
  "gender": 2,
  "homepage": "https://person-site.com",
  "place_of_birth": "City, Country",
  "profile_path": "/profile.jpg",
  "popularity": 100.5,
  "known_for_department": "Acting",
  "imdb_id": "nm1234567"
}
```

**Gender Values:**
- `0` - Not specified
- `1` - Female
- `2` - Male
- `3` - Non-binary

---

### 31. Get Person Movie Credits
**Endpoint:** `GET /person/{person_id}/movie_credits`  
**Description:** Get movie credits for a person

**Response:**
```json
{
  "id": 123,
  "cast": [
    {
      "id": 1,
      "title": "Movie Title",
      "character": "Character Name",
      "poster_path": "/poster.jpg",
      "release_date": "2024-01-01",
      "vote_average": 8.0,
      "credit_id": "abc123"
    }
  ],
  "crew": [
    {
      "id": 2,
      "title": "Movie Title",
      "job": "Director",
      "department": "Directing",
      "poster_path": "/poster.jpg",
      "release_date": "2024-01-01",
      "credit_id": "def456"
    }
  ]
}
```

---

### 32. Get Person TV Credits
**Endpoint:** `GET /person/{person_id}/tv_credits`  
**Description:** Get TV credits for a person

---

### 33. Get Person Images
**Endpoint:** `GET /person/{person_id}/images`  
**Description:** Get profile images for a person

**Response:**
```json
{
  "id": 123,
  "profiles": [
    {
      "aspect_ratio": 0.667,
      "file_path": "/profile.jpg",
      "height": 3000,
      "width": 2000,
      "vote_average": 5.0,
      "vote_count": 10
    }
  ]
}
```

---

## 🔍 Search Endpoints

### 34. Search Movies
**Endpoint:** `GET /search/movie`  
**Description:** Search for movies

**Parameters:**
- `query` (required) - Search query
- `page` (optional) - Page number
- `year` (optional) - Filter by release year
- `primary_release_year` (optional) - Primary release year

**Request:**
```bash
GET https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=inception&page=1
```

**Response:** Same structure as trending movies

---

### 35. Search TV Shows
**Endpoint:** `GET /search/tv`  
**Description:** Search for TV shows

**Parameters:**
- `query` (required)
- `page` (optional)
- `first_air_date_year` (optional)

---

### 36. Search People
**Endpoint:** `GET /search/person`  
**Description:** Search for people

**Parameters:**
- `query` (required)
- `page` (optional)

---

### 37. Multi Search
**Endpoint:** `GET /search/multi`  
**Description:** Search movies, TV shows, and people in a single request

**Request:**
```bash
GET https://api.themoviedb.org/3/search/multi?api_key={api_key}&query=inception
```

**Response:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 123,
      "media_type": "movie",
      "title": "Inception",
      "poster_path": "/poster.jpg"
    },
    {
      "id": 456,
      "media_type": "person",
      "name": "Leonardo DiCaprio",
      "profile_path": "/profile.jpg"
    },
    {
      "id": 789,
      "media_type": "tv",
      "name": "TV Show",
      "poster_path": "/poster.jpg"
    }
  ],
  "total_pages": 1,
  "total_results": 3
}
```

**Usage:**
```tsx
// Filter by media_type
const movies = results.filter(r => r.media_type === 'movie');
const tvShows = results.filter(r => r.media_type === 'tv');
const people = results.filter(r => r.media_type === 'person');
```

---

## 🖼️ Image URLs

### Image Sizes

**Poster Sizes:**
- `w92` - Thumbnail (92px width)
- `w154` - Small (154px)
- `w185` - Medium (185px)
- `w342` - Large (342px) - **Recommended for cards**
- `w500` - Extra Large (500px)
- `w780` - XXL (780px)
- `original` - Full resolution

**Backdrop Sizes:**
- `w300` - Small (300px)
- `w780` - Medium (780px)
- `w1280` - Large (1280px) - **Recommended for hero**
- `original` - Full resolution

**Profile Sizes:**
- `w45` - Tiny (45px)
- `w185` - Medium (185px) - **Recommended for cards**
- `h632` - Large (632px height)
- `original` - Full resolution

### Usage Example
```tsx
// Utility function
export const getImageUrl = (
  path: string | null,
  size: string = 'original'
): string => {
  if (!path) return '/placeholder-image.png';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Component
<Image
  src={getImageUrl(movie.poster_path, 'w342')}
  alt={movie.title}
  width={342}
  height={513}
/>
```

---

## 🔧 Implementation Examples

### API Client Setup
```tsx
// src/lib/api/tmdb.ts
import axios from 'axios';

export const tmdbClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY
  }
});

// Request interceptor
tmdbClient.interceptors.request.use((config) => {
  // Add language param dynamically
  const language = localStorage.getItem('language') || 'en-US';
  config.params = {
    ...config.params,
    language
  };
  return config;
});

// Response interceptor
tmdbClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 429) {
      toast.error('Rate limit exceeded. Please try again later.');
    }
    return Promise.reject(error);
  }
);
```

---

### Custom Hooks Examples
```tsx
// src/lib/hooks/useMovies.ts
import { useQuery } from '@tanstack/react-query';
import { tmdbClient } from '@/lib/api/tmdb';

export const useTrendingMovies = (timeWindow: 'day' | 'week' = 'day') => {
  return useQuery({
    queryKey: ['movies', 'trending', timeWindow],
    queryFn: () => tmdbClient.get(`/trending/movie/${timeWindow}`),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes
  });
};

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () =>
      tmdbClient.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'videos,credits,images,reviews,similar,recommendations'
        }
      }),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000 // 10 minutes
  });
};

export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['search', 'movies', query, page],
    queryFn: () =>
      tmdbClient.get('/search/movie', {
        params: { query, page }
      }),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000
  });
};
```

---

## 📊 Rate Limiting Best Practices

1. **Use React Query Caching:**
   - Set appropriate `staleTime` (5-10 minutes)
   - Enable `gcTime` to keep unused data longer
   - Dedupe simultaneous requests automatically

2. **Batch Requests:**
   - Use `append_to_response` để combine multiple calls
   - Example: Get movie details + videos + credits in one request

3. **Implement Retry Logic:**
   ```tsx
   queryClient.setDefaultOptions({
     queries: {
       retry: (failureCount, error) => {
         if (error.response?.status === 429) return false; // Don't retry rate limit
         return failureCount < 3;
       }
     }
   });
   ```

4. **Monitor Usage:**
   - Track API calls in Vercel Analytics
   - Set up alerts for approaching limits

---

## 🔐 Security Best Practices

1. **Never Expose API Key:**
   - Use `NEXT_PUBLIC_` prefix only if needed client-side
   - Consider proxy through Next.js API routes for sensitive calls

2. **API Route Proxy Example:**
   ```tsx
   // app/api/movies/[id]/route.ts
   export async function GET(
     request: Request,
     { params }: { params: { id: string } }
   ) {
     const response = await fetch(
       `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.TMDB_API_KEY}`
     );
     const data = await response.json();
     return Response.json(data);
   }
   ```

3. **Validate Inputs:**
   - Sanitize user inputs before passing to API
   - Validate IDs are numbers

---

## 📚 Additional Resources

- **TMDB API Docs:** https://developers.themoviedb.org/3
- **API Status:** https://status.themoviedb.org
- **Support Forum:** https://www.themoviedb.org/talk/category/5047958519c29526b50017d6

---

**Last Updated:** March 9, 2026  
**Version:** 1.0.0  
**Maintained By:** OpenCode Agent
