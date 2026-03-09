import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getImageUrl,
  getPosterUrl,
  getBackdropUrl,
  getProfileUrl,
  formatRuntime,
  formatCurrency,
  formatDate,
  getYear,
  formatRating,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  truncateText,
  createPageTitle,
} from '@/lib/utils/helpers';

describe('Image URL Helpers', () => {
  const mockImagePath = '/abc123.jpg';
  const mockBaseUrl = 'https://image.tmdb.org/t/p';

  describe('getImageUrl', () => {
    it('should return full image URL with default size (original)', () => {
      const result = getImageUrl(mockImagePath);
      expect(result).toBe(`${mockBaseUrl}/original${mockImagePath}`);
    });

    it('should return full image URL with specified size', () => {
      const result = getImageUrl(mockImagePath, 'w500');
      expect(result).toBe(`${mockBaseUrl}/w500${mockImagePath}`);
    });

    it('should return placeholder when path is null', () => {
      const result = getImageUrl(null);
      expect(result).toBe('/placeholder-movie.png');
    });

    it('should return placeholder when path is undefined', () => {
      const result = getImageUrl(undefined);
      expect(result).toBe('/placeholder-movie.png');
    });

    it('should return placeholder when path is empty string', () => {
      const result = getImageUrl('');
      expect(result).toBe('/placeholder-movie.png');
    });
  });

  describe('getPosterUrl', () => {
    it('should return poster URL with w342 size', () => {
      const result = getPosterUrl(mockImagePath);
      expect(result).toBe(`${mockBaseUrl}/w342${mockImagePath}`);
    });

    it('should return placeholder when path is null', () => {
      const result = getPosterUrl(null);
      expect(result).toBe('/placeholder-movie.png');
    });
  });

  describe('getBackdropUrl', () => {
    it('should return backdrop URL with w1280 size', () => {
      const result = getBackdropUrl(mockImagePath);
      expect(result).toBe(`${mockBaseUrl}/w1280${mockImagePath}`);
    });

    it('should return placeholder when path is null', () => {
      const result = getBackdropUrl(null);
      expect(result).toBe('/placeholder-movie.png');
    });
  });

  describe('getProfileUrl', () => {
    it('should return profile URL with w185 size', () => {
      const result = getProfileUrl(mockImagePath);
      expect(result).toBe(`${mockBaseUrl}/w185${mockImagePath}`);
    });

    it('should return placeholder when path is null', () => {
      const result = getProfileUrl(null);
      expect(result).toBe('/placeholder-movie.png');
    });
  });
});

describe('Format Helpers', () => {
  describe('formatRuntime', () => {
    it('should format runtime correctly for hours and minutes', () => {
      expect(formatRuntime(150)).toBe('2h 30m');
    });

    it('should format runtime correctly for only hours', () => {
      expect(formatRuntime(120)).toBe('2h 0m');
    });

    it('should format runtime correctly for only minutes', () => {
      expect(formatRuntime(45)).toBe('0h 45m');
    });

    it('should return N/A when runtime is null', () => {
      expect(formatRuntime(null)).toBe('N/A');
    });

    it('should return N/A when runtime is undefined', () => {
      expect(formatRuntime(undefined)).toBe('N/A');
    });

    it('should return N/A when runtime is 0', () => {
      expect(formatRuntime(0)).toBe('N/A');
    });
  });

  describe('formatCurrency', () => {
    it('should format large amounts correctly', () => {
      expect(formatCurrency(150000000)).toBe('$150,000,000');
    });

    it('should format small amounts correctly', () => {
      expect(formatCurrency(1000)).toBe('$1,000');
    });

    it('should format amounts without decimal places', () => {
      const result = formatCurrency(1234567);
      expect(result).toBe('$1,234,567');
      expect(result).not.toContain('.');
    });

    it('should return N/A when amount is null', () => {
      expect(formatCurrency(null)).toBe('N/A');
    });

    it('should return N/A when amount is undefined', () => {
      expect(formatCurrency(undefined)).toBe('N/A');
    });

    it('should return N/A when amount is 0', () => {
      expect(formatCurrency(0)).toBe('N/A');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly with default locale (en-US)', () => {
      const result = formatDate('2024-03-15');
      expect(result).toBe('March 15, 2024');
    });

    it('should format date correctly with Vietnamese locale', () => {
      const result = formatDate('2024-03-15', 'vi-VN');
      expect(result).toContain('2024');
      expect(result).toContain('15');
    });

    it('should return N/A when date is null', () => {
      expect(formatDate(null)).toBe('N/A');
    });

    it('should return N/A when date is undefined', () => {
      expect(formatDate(undefined)).toBe('N/A');
    });

    it('should return N/A when date is empty string', () => {
      expect(formatDate('')).toBe('N/A');
    });
  });

  describe('getYear', () => {
    it('should extract year from date string', () => {
      expect(getYear('2024-03-15')).toBe('2024');
    });

    it('should extract year from full date-time string', () => {
      expect(getYear('2024-03-15T10:30:00Z')).toBe('2024');
    });

    it('should return empty string when date is null', () => {
      expect(getYear(null)).toBe('');
    });

    it('should return empty string when date is undefined', () => {
      expect(getYear(undefined)).toBe('');
    });

    it('should return empty string when date is empty string', () => {
      expect(getYear('')).toBe('');
    });
  });

  describe('formatRating', () => {
    it('should format rating to 1 decimal place', () => {
      expect(formatRating(8.567)).toBe('8.6');
    });

    it('should format whole numbers with 1 decimal place', () => {
      expect(formatRating(7)).toBe('7.0');
    });

    it('should round down correctly', () => {
      expect(formatRating(8.54)).toBe('8.5');
    });

    it('should round up correctly', () => {
      expect(formatRating(8.55)).toBe('8.6');
    });

    it('should return 0.0 when rating is null', () => {
      expect(formatRating(null)).toBe('0.0');
    });

    it('should return 0.0 when rating is undefined', () => {
      expect(formatRating(undefined)).toBe('0.0');
    });

    it('should return 0.0 when rating is 0', () => {
      expect(formatRating(0)).toBe('0.0');
    });
  });
});

describe('YouTube Helpers', () => {
  describe('getYouTubeEmbedUrl', () => {
    it('should return correct YouTube embed URL', () => {
      const key = 'dQw4w9WgXcQ';
      expect(getYouTubeEmbedUrl(key)).toBe(
        'https://www.youtube.com/embed/dQw4w9WgXcQ'
      );
    });

    it('should handle different video keys', () => {
      const key = 'abc123XYZ';
      expect(getYouTubeEmbedUrl(key)).toBe(
        'https://www.youtube.com/embed/abc123XYZ'
      );
    });
  });

  describe('getYouTubeThumbnailUrl', () => {
    it('should return correct YouTube thumbnail URL', () => {
      const key = 'dQw4w9WgXcQ';
      expect(getYouTubeThumbnailUrl(key)).toBe(
        'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
      );
    });

    it('should handle different video keys', () => {
      const key = 'abc123XYZ';
      expect(getYouTubeThumbnailUrl(key)).toBe(
        'https://img.youtube.com/vi/abc123XYZ/hqdefault.jpg'
      );
    });
  });
});

describe('Text Helpers', () => {
  describe('truncateText', () => {
    it('should truncate text that exceeds max length', () => {
      const text = 'This is a very long text that needs to be truncated';
      expect(truncateText(text, 20)).toBe('This is a very long...');
    });

    it('should return original text if shorter than max length', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe('Short text');
    });

    it('should return original text if exactly max length', () => {
      const text = 'Exactly twenty chars';
      expect(truncateText(text, 20)).toBe('Exactly twenty chars');
    });

    it('should handle empty string', () => {
      expect(truncateText('', 10)).toBe('');
    });

    it('should trim whitespace before adding ellipsis', () => {
      const text = 'This is some text   with spaces';
      const result = truncateText(text, 20);
      expect(result).toBe('This is some text...');
      expect(result).not.toMatch(/\s+\.\.\./);
    });
  });

  describe('createPageTitle', () => {
    it('should create page title with site name', () => {
      expect(createPageTitle('Movies')).toBe('Movies | NT Movies');
    });

    it('should handle empty string', () => {
      expect(createPageTitle('')).toBe(' | NT Movies');
    });

    it('should handle long titles', () => {
      const longTitle = 'The Lord of the Rings: The Fellowship of the Ring';
      expect(createPageTitle(longTitle)).toBe(
        'The Lord of the Rings: The Fellowship of the Ring | NT Movies'
      );
    });
  });
});
