import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  generateMovieJsonLd,
  generateTVShowJsonLd,
  generatePersonJsonLd,
  generateBreadcrumbJsonLd,
  generateWebSiteJsonLd,
} from '@/lib/utils/jsonld';

describe('JSON-LD Generators', () => {
  const mockSiteUrl = 'https://nt-movies.vercel.app';
  const mockImageBase = 'https://image.tmdb.org/t/p/original';

  describe('generateMovieJsonLd', () => {
    const mockMovie = {
      id: 123,
      title: 'Test Movie',
      overview: 'This is a test movie',
      poster_path: '/poster123.jpg',
      release_date: '2024-03-15',
      vote_average: 8.5,
      vote_count: 1000,
      runtime: 150,
      genres: [{ name: 'Action' }, { name: 'Thriller' }],
      credits: {
        cast: [
          { id: 1, name: 'Actor 1' },
          { id: 2, name: 'Actor 2' },
        ],
        crew: [
          { id: 3, name: 'Director 1', job: 'Director' },
          { id: 4, name: 'Producer 1', job: 'Producer' },
        ],
      },
    };

    it('should generate valid Movie JSON-LD', () => {
      const result = generateMovieJsonLd(mockMovie);

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('Movie');
      expect(result.name).toBe('Test Movie');
      expect(result.description).toBe('This is a test movie');
      expect(result.url).toBe(`${mockSiteUrl}/movie/123`);
    });

    it('should include image URL with TMDB base', () => {
      const result = generateMovieJsonLd(mockMovie);

      expect(result.image).toBe(`${mockImageBase}/poster123.jpg`);
    });

    it('should include aggregate rating', () => {
      const result = generateMovieJsonLd(mockMovie);

      expect(result.aggregateRating).toBeDefined();
      expect(result.aggregateRating?.['@type']).toBe('AggregateRating');
      expect(result.aggregateRating?.ratingValue).toBe('8.5');
      expect(result.aggregateRating?.bestRating).toBe('10');
      expect(result.aggregateRating?.ratingCount).toBe(1000);
    });

    it('should format duration in ISO 8601 format', () => {
      const result = generateMovieJsonLd(mockMovie);

      expect(result.duration).toBe('PT150M');
    });

    it('should include genres', () => {
      const result = generateMovieJsonLd(mockMovie);

      expect(result.genre).toEqual(['Action', 'Thriller']);
    });

    it('should filter and include directors', () => {
      const result = generateMovieJsonLd(mockMovie);

      expect(result.director).toHaveLength(1);
      expect(result.director[0]).toEqual({
        '@type': 'Person',
        name: 'Director 1',
        url: `${mockSiteUrl}/person/3`,
      });
    });

    it('should include cast members (up to 10)', () => {
      const result = generateMovieJsonLd(mockMovie);

      expect(result.actor).toHaveLength(2);
      expect(result.actor[0]).toEqual({
        '@type': 'Person',
        name: 'Actor 1',
        url: `${mockSiteUrl}/person/1`,
      });
    });

    it('should limit cast to 10 members', () => {
      const movieWithManyCast = {
        ...mockMovie,
        credits: {
          cast: Array.from({ length: 20 }, (_, i) => ({
            id: i,
            name: `Actor ${i}`,
          })),
          crew: [],
        },
      };

      const result = generateMovieJsonLd(movieWithManyCast);

      expect(result.actor).toHaveLength(10);
    });

    it('should handle missing optional fields', () => {
      const minimalMovie = {
        id: 123,
        title: 'Minimal Movie',
      };

      const result = generateMovieJsonLd(minimalMovie);

      expect(result.name).toBe('Minimal Movie');
      expect(result.description).toBeUndefined();
      expect(result.image).toBeUndefined();
      expect(result.datePublished).toBeUndefined();
      expect(result.aggregateRating).toBeUndefined();
      expect(result.duration).toBeUndefined();
    });

    it('should handle null overview', () => {
      const movieWithNullOverview = {
        ...mockMovie,
        overview: null,
      };

      const result = generateMovieJsonLd(movieWithNullOverview);

      expect(result.description).toBeUndefined();
    });

    it('should handle null runtime', () => {
      const movieWithNullRuntime = {
        ...mockMovie,
        runtime: null,
      };

      const result = generateMovieJsonLd(movieWithNullRuntime);

      expect(result.duration).toBeUndefined();
    });

    it('should handle missing credits', () => {
      const movieWithoutCredits = {
        ...mockMovie,
        credits: undefined,
      };

      const result = generateMovieJsonLd(movieWithoutCredits);

      expect(result.director).toEqual([]);
      expect(result.actor).toEqual([]);
    });
  });

  describe('generateTVShowJsonLd', () => {
    const mockTVShow = {
      id: 456,
      name: 'Test TV Show',
      overview: 'This is a test TV show',
      poster_path: '/poster456.jpg',
      first_air_date: '2023-05-20',
      vote_average: 7.8,
      vote_count: 500,
      number_of_seasons: 3,
      number_of_episodes: 30,
      genres: [{ name: 'Drama' }, { name: 'Sci-Fi' }],
      credits: {
        cast: [
          { id: 5, name: 'TV Actor 1' },
          { id: 6, name: 'TV Actor 2' },
        ],
      },
    };

    it('should generate valid TVSeries JSON-LD', () => {
      const result = generateTVShowJsonLd(mockTVShow);

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('TVSeries');
      expect(result.name).toBe('Test TV Show');
      expect(result.description).toBe('This is a test TV show');
      expect(result.url).toBe(`${mockSiteUrl}/tv/456`);
    });

    it('should include seasons and episodes count', () => {
      const result = generateTVShowJsonLd(mockTVShow);

      expect(result.numberOfSeasons).toBe(3);
      expect(result.numberOfEpisodes).toBe(30);
    });

    it('should include aggregate rating', () => {
      const result = generateTVShowJsonLd(mockTVShow);

      expect(result.aggregateRating).toBeDefined();
      expect(result.aggregateRating?.ratingValue).toBe('7.8');
    });

    it('should include cast members', () => {
      const result = generateTVShowJsonLd(mockTVShow);

      expect(result.actor).toHaveLength(2);
      expect(result.actor[0]).toEqual({
        '@type': 'Person',
        name: 'TV Actor 1',
        url: `${mockSiteUrl}/person/5`,
      });
    });

    it('should limit cast to 10 members', () => {
      const tvShowWithManyCast = {
        ...mockTVShow,
        credits: {
          cast: Array.from({ length: 15 }, (_, i) => ({
            id: i,
            name: `Actor ${i}`,
          })),
        },
      };

      const result = generateTVShowJsonLd(tvShowWithManyCast);

      expect(result.actor).toHaveLength(10);
    });

    it('should handle missing optional fields', () => {
      const minimalTVShow = {
        id: 456,
        name: 'Minimal TV Show',
      };

      const result = generateTVShowJsonLd(minimalTVShow);

      expect(result.name).toBe('Minimal TV Show');
      expect(result.description).toBeUndefined();
      expect(result.aggregateRating).toBeUndefined();
    });

    it('should handle null poster_path', () => {
      const tvShowWithoutPoster = {
        ...mockTVShow,
        poster_path: null,
      };

      const result = generateTVShowJsonLd(tvShowWithoutPoster);

      expect(result.image).toBeUndefined();
    });
  });

  describe('generatePersonJsonLd', () => {
    const mockPerson = {
      id: 789,
      name: 'John Doe',
      biography: 'This is a biography of John Doe',
      profile_path: '/profile789.jpg',
      birthday: '1980-05-15',
      place_of_birth: 'New York, USA',
      known_for_department: 'Acting',
    };

    it('should generate valid Person JSON-LD', () => {
      const result = generatePersonJsonLd(mockPerson);

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('Person');
      expect(result.name).toBe('John Doe');
      expect(result.description).toBe('This is a biography of John Doe');
      expect(result.url).toBe(`${mockSiteUrl}/person/789`);
    });

    it('should include profile image URL', () => {
      const result = generatePersonJsonLd(mockPerson);

      expect(result.image).toBe(`${mockImageBase}/profile789.jpg`);
    });

    it('should include birth date and place', () => {
      const result = generatePersonJsonLd(mockPerson);

      expect(result.birthDate).toBe('1980-05-15');
      expect(result.birthPlace).toBe('New York, USA');
    });

    it('should include job title', () => {
      const result = generatePersonJsonLd(mockPerson);

      expect(result.jobTitle).toBe('Acting');
    });

    it('should handle missing optional fields', () => {
      const minimalPerson = {
        id: 789,
        name: 'Jane Doe',
      };

      const result = generatePersonJsonLd(minimalPerson);

      expect(result.name).toBe('Jane Doe');
      expect(result.description).toBeUndefined();
      expect(result.image).toBeUndefined();
      expect(result.birthDate).toBeUndefined();
      expect(result.birthPlace).toBeUndefined();
      expect(result.jobTitle).toBeUndefined();
    });

    it('should handle null biography', () => {
      const personWithNullBio = {
        ...mockPerson,
        biography: null,
      };

      const result = generatePersonJsonLd(personWithNullBio);

      expect(result.description).toBeUndefined();
    });

    it('should handle null profile_path', () => {
      const personWithoutProfile = {
        ...mockPerson,
        profile_path: null,
      };

      const result = generatePersonJsonLd(personWithoutProfile);

      expect(result.image).toBeUndefined();
    });
  });

  describe('generateBreadcrumbJsonLd', () => {
    it('should generate valid BreadcrumbList JSON-LD', () => {
      const items = [
        { name: 'Home', url: '/' },
        { name: 'Movies', url: '/movies' },
        { name: 'Action', url: '/movies/action' },
      ];

      const result = generateBreadcrumbJsonLd(items);

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('BreadcrumbList');
      expect(result.itemListElement).toHaveLength(3);
    });

    it('should create list items with correct positions', () => {
      const items = [
        { name: 'Home', url: '/' },
        { name: 'Movies', url: '/movies' },
      ];

      const result = generateBreadcrumbJsonLd(items);

      expect(result.itemListElement[0]).toEqual({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${mockSiteUrl}/`,
      });

      expect(result.itemListElement[1]).toEqual({
        '@type': 'ListItem',
        position: 2,
        name: 'Movies',
        item: `${mockSiteUrl}/movies`,
      });
    });

    it('should handle single breadcrumb item', () => {
      const items = [{ name: 'Home', url: '/' }];

      const result = generateBreadcrumbJsonLd(items);

      expect(result.itemListElement).toHaveLength(1);
      expect(result.itemListElement[0].position).toBe(1);
    });

    it('should handle empty array', () => {
      const items: Array<{ name: string; url: string }> = [];

      const result = generateBreadcrumbJsonLd(items);

      expect(result.itemListElement).toEqual([]);
    });

    it('should prepend site URL to relative paths', () => {
      const items = [{ name: 'Test', url: '/test/path' }];

      const result = generateBreadcrumbJsonLd(items);

      expect(result.itemListElement[0].item).toBe(`${mockSiteUrl}/test/path`);
    });
  });

  describe('generateWebSiteJsonLd', () => {
    it('should generate valid WebSite JSON-LD', () => {
      const result = generateWebSiteJsonLd();

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('WebSite');
      expect(result.name).toBe('NT Movies');
      expect(result.url).toBe(mockSiteUrl);
    });

    it('should include SearchAction', () => {
      const result = generateWebSiteJsonLd();

      expect(result.potentialAction).toBeDefined();
      expect(result.potentialAction['@type']).toBe('SearchAction');
    });

    it('should have correct search URL template', () => {
      const result = generateWebSiteJsonLd();

      expect(result.potentialAction.target['@type']).toBe('EntryPoint');
      expect(result.potentialAction.target.urlTemplate).toBe(
        `${mockSiteUrl}/search?q={search_term_string}`
      );
    });

    it('should define query input as required', () => {
      const result = generateWebSiteJsonLd();

      expect(result.potentialAction['query-input']).toBe(
        'required name=search_term_string'
      );
    });
  });
});
