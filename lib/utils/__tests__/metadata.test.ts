import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generatePageMetadata,
  generateMovieMetadata,
  generateTVShowMetadata,
  generatePersonMetadata,
  generateSearchMetadata,
} from '@/lib/utils/metadata';

describe('Metadata Generators', () => {
  const mockSiteUrl = 'https://nt-movies.vercel.app';

  describe('generatePageMetadata', () => {
    it('should generate basic metadata', () => {
      const result = generatePageMetadata({
        title: 'Test Page',
        description: 'Test description',
      });

      expect(result.title).toBe('Test Page | NT Movies');
      expect(result.description).toBe('Test description');
      expect(result.keywords).toContain('movies');
      expect(result.keywords).toContain('tv shows');
      expect(result.keywords).toContain('TMDB');
    });

    it('should generate OpenGraph metadata', () => {
      const result = generatePageMetadata({
        title: 'Test Page',
        description: 'Test description',
        url: '/test',
      });

      expect(result.openGraph).toBeDefined();
      expect(result.openGraph?.title).toBe('Test Page | NT Movies');
      expect(result.openGraph?.description).toBe('Test description');
      expect(result.openGraph?.url).toBe(`${mockSiteUrl}/test`);
      expect(result.openGraph?.siteName).toBe('NT Movies');
      expect(result.openGraph?.type).toBe('website');
    });

    it('should generate Twitter Card metadata', () => {
      const result = generatePageMetadata({
        title: 'Test Page',
        description: 'Test description',
      });

      expect(result.twitter).toBeDefined();
      expect(result.twitter?.card).toBe('summary_large_image');
      expect(result.twitter?.title).toBe('Test Page | NT Movies');
      expect(result.twitter?.description).toBe('Test description');
    });

    it('should handle custom image URL', () => {
      const customImage = 'https://example.com/custom-image.jpg';
      const result = generatePageMetadata({
        title: 'Test Page',
        description: 'Test description',
        image: customImage,
      });

      expect(result.openGraph?.images?.[0].url).toBe(customImage);
      expect(result.twitter?.images?.[0]).toBe(customImage);
    });

    it('should handle TMDB image path', () => {
      const tmdbPath = '/abc123.jpg';
      const result = generatePageMetadata({
        title: 'Test Page',
        description: 'Test description',
        image: tmdbPath,
      });

      expect(result.openGraph?.images?.[0].url).toBe(
        `https://image.tmdb.org/t/p/original${tmdbPath}`
      );
    });

    it('should use default image when no image provided', () => {
      const result = generatePageMetadata({
        title: 'Test Page',
        description: 'Test description',
      });

      expect(result.openGraph?.images?.[0].url).toBe(`${mockSiteUrl}/og-default.jpg`);
    });

    it('should handle custom type', () => {
      const result = generatePageMetadata({
        title: 'Test Page',
        description: 'Test description',
        type: 'article',
      });

      expect(result.openGraph?.type).toBe('article');
    });

    it('should merge custom keywords with default keywords', () => {
      const result = generatePageMetadata({
        title: 'Test Page',
        description: 'Test description',
        keywords: ['custom', 'keywords'],
      });

      expect(result.keywords).toContain('custom');
      expect(result.keywords).toContain('keywords');
      expect(result.keywords).toContain('movies');
      expect(result.keywords).toContain('tv shows');
    });

    it('should set canonical URL', () => {
      const result = generatePageMetadata({
        title: 'Test Page',
        description: 'Test description',
        url: '/test',
      });

      expect(result.alternates?.canonical).toBe(`${mockSiteUrl}/test`);
    });

    it('should include author information', () => {
      const result = generatePageMetadata({
        title: 'Test Page',
        description: 'Test description',
      });

      expect(result.authors).toBeDefined();
      expect(result.authors).toEqual([{ name: 'Nguyen Nhat Tin' }]);
    });
  });

  describe('generateMovieMetadata', () => {
    const mockMovie = {
      id: 123,
      title: 'Test Movie',
      overview: 'This is a test movie overview',
      poster_path: '/poster123.jpg',
      backdrop_path: '/backdrop123.jpg',
      release_date: '2024-03-15',
      genres: [{ name: 'Action' }, { name: 'Thriller' }],
    };

    it('should generate movie metadata with all fields', () => {
      const result = generateMovieMetadata(mockMovie);

      expect(result.title).toBe('Test Movie (2024) | NT Movies');
      expect(result.description).toBe('This is a test movie overview');
      expect(result.openGraph?.type).toBe('video.movie');
      expect(result.alternates?.canonical).toBe(`${mockSiteUrl}/movie/123`);
    });

    it('should use backdrop path over poster path', () => {
      const result = generateMovieMetadata(mockMovie);

      expect(result.openGraph?.images?.[0].url).toContain(mockMovie.backdrop_path);
    });

    it('should fallback to poster when no backdrop', () => {
      const movieWithoutBackdrop = {
        ...mockMovie,
        backdrop_path: null,
      };

      const result = generateMovieMetadata(movieWithoutBackdrop);

      expect(result.openGraph?.images?.[0].url).toContain(mockMovie.poster_path);
    });

    it('should handle missing release date', () => {
      const movieWithoutDate = {
        ...mockMovie,
        release_date: null,
      };

      const result = generateMovieMetadata(movieWithoutDate);

      expect(result.title).toBe('Test Movie | NT Movies');
    });

    it('should handle missing overview', () => {
      const movieWithoutOverview = {
        ...mockMovie,
        overview: '',
      };

      const result = generateMovieMetadata(movieWithoutOverview);

      expect(result.description).toBe('Watch Test Movie and explore cast, crew, reviews, and more.');
    });

    it('should include genre keywords', () => {
      const result = generateMovieMetadata(mockMovie);

      expect(result.keywords).toContain('Action');
      expect(result.keywords).toContain('Thriller');
      expect(result.keywords).toContain('movie');
      expect(result.keywords).toContain('watch');
    });

    it('should handle missing genres', () => {
      const movieWithoutGenres = {
        ...mockMovie,
        genres: undefined,
      };

      const result = generateMovieMetadata(movieWithoutGenres);

      expect(result.keywords).toContain('movie');
      expect(result.keywords).toContain('Test Movie');
    });

    it('should handle null poster and backdrop paths', () => {
      const movieWithoutImages = {
        ...mockMovie,
        poster_path: null,
        backdrop_path: null,
      };

      const result = generateMovieMetadata(movieWithoutImages);

      expect(result.openGraph?.images?.[0].url).toBe(`${mockSiteUrl}/og-default.jpg`);
    });
  });

  describe('generateTVShowMetadata', () => {
    const mockTVShow = {
      id: 456,
      name: 'Test TV Show',
      overview: 'This is a test TV show overview',
      poster_path: '/poster456.jpg',
      backdrop_path: '/backdrop456.jpg',
      first_air_date: '2023-05-20',
      genres: [{ name: 'Drama' }, { name: 'Sci-Fi' }],
    };

    it('should generate TV show metadata with all fields', () => {
      const result = generateTVShowMetadata(mockTVShow);

      expect(result.title).toBe('Test TV Show (2023) | NT Movies');
      expect(result.description).toBe('This is a test TV show overview');
      expect(result.openGraph?.type).toBe('video.tv_show');
      expect(result.alternates?.canonical).toBe(`${mockSiteUrl}/tv/456`);
    });

    it('should include TV-specific keywords', () => {
      const result = generateTVShowMetadata(mockTVShow);

      expect(result.keywords).toContain('tv show');
      expect(result.keywords).toContain('series');
      expect(result.keywords).toContain('Drama');
      expect(result.keywords).toContain('Sci-Fi');
    });

    it('should handle missing first air date', () => {
      const tvShowWithoutDate = {
        ...mockTVShow,
        first_air_date: null,
      };

      const result = generateTVShowMetadata(tvShowWithoutDate);

      expect(result.title).toBe('Test TV Show | NT Movies');
    });

    it('should handle missing overview', () => {
      const tvShowWithoutOverview = {
        ...mockTVShow,
        overview: '',
      };

      const result = generateTVShowMetadata(tvShowWithoutOverview);

      expect(result.description).toBe(
        'Watch Test TV Show and explore cast, crew, reviews, and more.'
      );
    });

    it('should use backdrop path over poster path', () => {
      const result = generateTVShowMetadata(mockTVShow);

      expect(result.openGraph?.images?.[0].url).toContain(mockTVShow.backdrop_path);
    });
  });

  describe('generatePersonMetadata', () => {
    const mockPerson = {
      id: 789,
      name: 'John Doe',
      biography: 'This is a very long biography that exceeds 160 characters and should be truncated to fit within the meta description length limit for SEO purposes and readability.',
      profile_path: '/profile789.jpg',
      known_for_department: 'Acting',
    };

    it('should generate person metadata with all fields', () => {
      const result = generatePersonMetadata(mockPerson);

      expect(result.title).toBe('John Doe | NT Movies');
      expect(result.description).toContain('This is a very long biography');
      expect(result.description).toHaveLength(163); // 160 + '...'
      expect(result.openGraph?.type).toBe('profile');
      expect(result.alternates?.canonical).toBe(`${mockSiteUrl}/person/789`);
    });

    it('should truncate long biography', () => {
      const result = generatePersonMetadata(mockPerson);

      expect(result.description).toMatch(/\.\.\.$/);
      expect(result.description?.length).toBeLessThanOrEqual(164);
    });

    it('should handle missing biography', () => {
      const personWithoutBio = {
        ...mockPerson,
        biography: null,
      };

      const result = generatePersonMetadata(personWithoutBio);

      expect(result.description).toBe(
        "Explore John Doe's movies, TV shows, biography, and more."
      );
    });

    it('should include person-specific keywords', () => {
      const result = generatePersonMetadata(mockPerson);

      expect(result.keywords).toContain('John Doe');
      expect(result.keywords).toContain('Acting');
      expect(result.keywords).toContain('celebrity');
      expect(result.keywords).toContain('biography');
      expect(result.keywords).toContain('filmography');
    });

    it('should fallback to "actor" when known_for_department is missing', () => {
      const personWithoutDepartment = {
        ...mockPerson,
        known_for_department: null,
      };

      const result = generatePersonMetadata(personWithoutDepartment);

      expect(result.keywords).toContain('actor');
    });

    it('should handle missing profile path', () => {
      const personWithoutProfile = {
        ...mockPerson,
        profile_path: null,
      };

      const result = generatePersonMetadata(personWithoutProfile);

      expect(result.openGraph?.images?.[0].url).toBe(`${mockSiteUrl}/og-default.jpg`);
    });

    it('should handle short biography (no truncation needed)', () => {
      const personWithShortBio = {
        ...mockPerson,
        biography: 'A short bio.',
      };

      const result = generatePersonMetadata(personWithShortBio);

      expect(result.description).toBe('A short bio....');
    });
  });

  describe('generateSearchMetadata', () => {
    it('should generate search metadata', () => {
      const result = generateSearchMetadata('avengers');

      expect(result.title).toBe('Search: avengers | NT Movies');
      expect(result.description).toBe(
        'Search results for "avengers" - Find movies, TV shows, and celebrities on NT Movies.'
      );
      expect(result.alternates?.canonical).toBe(`${mockSiteUrl}/search?q=avengers`);
    });

    it('should include search-specific keywords', () => {
      const result = generateSearchMetadata('batman');

      expect(result.keywords).toContain('batman');
      expect(result.keywords).toContain('search');
      expect(result.keywords).toContain('find');
      expect(result.keywords).toContain('discover');
    });

    it('should encode special characters in URL', () => {
      const result = generateSearchMetadata('the dark knight');

      expect(result.alternates?.canonical).toBe(
        `${mockSiteUrl}/search?q=the%20dark%20knight`
      );
    });

    it('should handle empty query', () => {
      const result = generateSearchMetadata('');

      expect(result.title).toBe('Search:  | NT Movies');
      expect(result.description).toContain('""');
    });

    it('should handle queries with special characters', () => {
      const result = generateSearchMetadata('spider-man: no way home');

      expect(result.alternates?.canonical).toContain('spider-man%3A%20no%20way%20home');
    });
  });
});
