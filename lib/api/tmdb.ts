import axios from 'axios';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

if (!TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not defined in environment variables');
}

export const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

// Request interceptor to add language
tmdbClient.interceptors.request.use(
  (config) => {
    // Add language param (will be dynamic with i18n later)
    const language =
      typeof window !== 'undefined'
        ? localStorage.getItem('language') || 'en-US'
        : 'en-US';

    config.params = {
      ...config.params,
      language,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
tmdbClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 429) {
      console.error('TMDB API Rate limit exceeded');
    } else if (error.response?.status === 401) {
      console.error('TMDB API Authentication failed - check API key');
    } else {
      console.error('TMDB API Error:', error.message);
    }
    return Promise.reject(error);
  }
);
