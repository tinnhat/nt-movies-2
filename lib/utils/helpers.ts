const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL;

export type ImageSize =
  | 'w92'
  | 'w154'
  | 'w185'
  | 'w342'
  | 'w500'
  | 'w780'
  | 'w1280'
  | 'h632'
  | 'original';

/**
 * Get full TMDB image URL
 * @param path - Image path from TMDB API
 * @param size - Image size (default: 'original')
 * @returns Full image URL or placeholder
 */
export const getImageUrl = (
  path: string | null | undefined,
  size: ImageSize = 'original'
): string => {
  if (!path) {
    return '/placeholder-movie.png'; // We'll create this placeholder later
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Get poster URL (recommended size: w342)
 */
export const getPosterUrl = (path: string | null | undefined): string => {
  return getImageUrl(path, 'w342');
};

/**
 * Get backdrop URL (recommended size: w1280)
 */
export const getBackdropUrl = (path: string | null | undefined): string => {
  return getImageUrl(path, 'w1280');
};

/**
 * Get profile URL (recommended size: w185)
 */
export const getProfileUrl = (path: string | null | undefined): string => {
  return getImageUrl(path, 'w185');
};

/**
 * Format runtime to readable format (e.g., "2h 30m")
 */
export const formatRuntime = (minutes: number | null | undefined): string => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

/**
 * Format currency to readable format (e.g., "$150,000,000")
 */
export const formatCurrency = (amount: number | null | undefined): string => {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format date to readable format
 */
export const formatDate = (
  dateString: string | null | undefined,
  locale: string = 'en-US'
): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Get year from date string
 */
export const getYear = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  return new Date(dateString).getFullYear().toString();
};

/**
 * Format rating to 1 decimal place
 */
export const formatRating = (rating: number | null | undefined): string => {
  if (!rating) return '0.0';
  return rating.toFixed(1);
};

/**
 * Get YouTube embed URL from video key
 */
export const getYouTubeEmbedUrl = (key: string): string => {
  return `https://www.youtube.com/embed/${key}`;
};

/**
 * Get YouTube thumbnail URL
 */
export const getYouTubeThumbnailUrl = (key: string): string => {
  return `https://img.youtube.com/vi/${key}/hqdefault.jpg`;
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Create page title
 */
export const createPageTitle = (title: string): string => {
  return `${title} | NT Movies`;
};
