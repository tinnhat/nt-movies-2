# NT Movies V2 - Testing Guide

## 📚 Tổng Quan

Document này mô tả testing strategy, setup instructions, và examples cho dự án NT Movies V2 sử dụng Vitest (unit tests) và Playwright (E2E tests).

---

## 🎯 Testing Strategy

### Testing Approach
- **Unit Tests:** Test individual components, hooks, và utilities
- **E2E Tests:** Test critical user flows end-to-end
- **Coverage Target:** 70% cho critical paths (không aim for 100%)
- **Focus Areas:** Core features, user interactions, API integration

### What to Test
✅ **High Priority:**
- Core components (MovieCard, SearchBar, etc.)
- Custom hooks (useMovies, useSearch, etc.)
- Utility functions
- Critical user flows (search, navigation, detail view)

❌ **Skip:**
- Third-party library code
- Trivial components (pure presentational)
- Auto-generated code
- Vendor code

---

## 🧪 Unit Testing với Vitest

### Setup

#### 1. Install Dependencies
```bash
pnpm add -D vitest @vitejs/plugin-react jsdom
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm add -D @testing-library/react-hooks
```

#### 2. Vitest Configuration
```tsx
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json'],
      exclude: [
        'node_modules/',
        'tests/',
        '.next/',
        '**/*.config.ts',
        '**/*.config.js',
        '**/types/**'
      ],
      all: true,
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

#### 3. Test Setup File
```tsx
// tests/setup.ts
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
global.localStorage = localStorageMock as any;
```

---

### Testing Components

#### Example 1: MovieCard Component
```tsx
// tests/unit/components/MovieCard.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MovieCard } from '@/components/common/MovieCard';

describe('MovieCard', () => {
  const mockMovie = {
    id: 123,
    title: 'Inception',
    poster_path: '/poster.jpg',
    release_date: '2010-07-16',
    vote_average: 8.8,
    overview: 'A thief who steals corporate secrets...'
  };

  it('renders movie title', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  it('renders release year', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('2010')).toBeInTheDocument();
  });

  it('renders rating', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('8.8')).toBeInTheDocument();
  });

  it('renders poster image with correct alt text', () => {
    render(<MovieCard movie={mockMovie} />);
    const image = screen.getByAltText('Inception');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('poster.jpg'));
  });

  it('navigates to detail page on click', async () => {
    const mockPush = vi.fn();
    vi.mock('next/navigation', () => ({
      useRouter: () => ({ push: mockPush })
    }));

    const { user } = render(<MovieCard movie={mockMovie} />);
    const card = screen.getByRole('article');
    await user.click(card);
    
    expect(mockPush).toHaveBeenCalledWith('/movies/123');
  });

  it('handles missing poster with fallback', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieWithoutPoster} />);
    
    const image = screen.getByAltText('Inception');
    expect(image).toHaveAttribute('src', expect.stringContaining('placeholder'));
  });
});
```

#### Example 2: SearchBar Component
```tsx
// tests/unit/components/SearchBar.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchBar } from '@/components/common/SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();
  
  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders search input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('calls onSearch with debounced input', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} debounceMs={300} />);
    
    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, 'Inception');
    
    // Should not call immediately
    expect(mockOnSearch).not.toHaveBeenCalled();
    
    // Should call after debounce delay
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('Inception');
    }, { timeout: 500 });
  });

  it('shows clear button when input has value', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search/i);
    await user.type(input, 'test');
    
    const clearButton = screen.getByRole('button', { name: /clear/i });
    expect(clearButton).toBeInTheDocument();
  });

  it('clears input when clear button clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
    await user.type(input, 'test');
    
    const clearButton = screen.getByRole('button', { name: /clear/i });
    await user.click(clearButton);
    
    expect(input.value).toBe('');
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('');
    });
  });

  it('shows search history dropdown on focus', async () => {
    const user = userEvent.setup();
    const mockHistory = ['Inception', 'Interstellar', 'The Matrix'];
    
    render(<SearchBar onSearch={mockOnSearch} history={mockHistory} />);
    
    const input = screen.getByPlaceholderText(/search/i);
    await user.click(input);
    
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.getByText('The Matrix')).toBeInTheDocument();
  });
});
```

---

### Testing Custom Hooks

#### Example: useMovies Hook
```tsx
// tests/unit/hooks/useMovies.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTrendingMovies } from '@/lib/hooks/useMovies';
import * as tmdbApi from '@/lib/api/tmdb';

// Mock API
vi.mock('@/lib/api/tmdb');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches trending movies successfully', async () => {
    const mockMovies = {
      results: [
        { id: 1, title: 'Movie 1' },
        { id: 2, title: 'Movie 2' }
      ]
    };
    
    vi.mocked(tmdbApi.getTrendingMovies).mockResolvedValue(mockMovies);
    
    const { result } = renderHook(() => useTrendingMovies('day'), {
      wrapper: createWrapper()
    });
    
    expect(result.current.isLoading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    
    expect(result.current.data).toEqual(mockMovies);
    expect(tmdbApi.getTrendingMovies).toHaveBeenCalledWith('day');
  });

  it('handles API error', async () => {
    const mockError = new Error('API Error');
    vi.mocked(tmdbApi.getTrendingMovies).mockRejectedValue(mockError);
    
    const { result } = renderHook(() => useTrendingMovies('day'), {
      wrapper: createWrapper()
    });
    
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    
    expect(result.current.error).toEqual(mockError);
  });

  it('caches data correctly', async () => {
    const mockMovies = { results: [{ id: 1, title: 'Movie 1' }] };
    vi.mocked(tmdbApi.getTrendingMovies).mockResolvedValue(mockMovies);
    
    const { result, rerender } = renderHook(() => useTrendingMovies('day'), {
      wrapper: createWrapper()
    });
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    
    // Rerender should use cached data
    rerender();
    
    // API should only be called once
    expect(tmdbApi.getTrendingMovies).toHaveBeenCalledTimes(1);
  });
});
```

---

### Testing Utilities

#### Example: Helper Functions
```tsx
// tests/unit/utils/helpers.test.ts
import { describe, it, expect } from 'vitest';
import { formatRuntime, formatCurrency, getImageUrl } from '@/lib/utils/helpers';

describe('formatRuntime', () => {
  it('formats runtime correctly', () => {
    expect(formatRuntime(120)).toBe('2h 0m');
    expect(formatRuntime(150)).toBe('2h 30m');
    expect(formatRuntime(45)).toBe('0h 45m');
    expect(formatRuntime(0)).toBe('0h 0m');
  });

  it('handles null/undefined', () => {
    expect(formatRuntime(null)).toBe('N/A');
    expect(formatRuntime(undefined)).toBe('N/A');
  });
});

describe('formatCurrency', () => {
  it('formats currency with commas', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000');
    expect(formatCurrency(150000000)).toBe('$150,000,000');
  });

  it('handles zero and negative', () => {
    expect(formatCurrency(0)).toBe('$0');
    expect(formatCurrency(-100)).toBe('-$100');
  });
});

describe('getImageUrl', () => {
  it('returns correct TMDB image URL', () => {
    const url = getImageUrl('/poster.jpg', 'w500');
    expect(url).toBe('https://image.tmdb.org/t/p/w500/poster.jpg');
  });

  it('returns placeholder for null path', () => {
    const url = getImageUrl(null);
    expect(url).toBe('/placeholder.png');
  });

  it('uses original size by default', () => {
    const url = getImageUrl('/poster.jpg');
    expect(url).toBe('https://image.tmdb.org/t/p/original/poster.jpg');
  });
});
```

---

### Running Unit Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage

# Run specific test file
pnpm vitest tests/unit/components/MovieCard.test.tsx

# Run tests matching pattern
pnpm vitest --grep="MovieCard"
```

---

## 🎭 E2E Testing với Playwright

### Setup

#### 1. Install Playwright
```bash
pnpm add -D @playwright/test
pnpm dlx playwright install
```

#### 2. Playwright Configuration
```tsx
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ],

  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
});
```

---

### E2E Test Examples

#### Example 1: Homepage Navigation
```tsx
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display hero banner', async ({ page }) => {
    await page.goto('/');
    
    // Check hero banner exists
    const hero = page.locator('[data-testid="hero-banner"]');
    await expect(hero).toBeVisible();
    
    // Check hero has movie title
    const title = hero.locator('h1');
    await expect(title).toBeVisible();
    await expect(title).not.toBeEmpty();
  });

  test('should display all content sections', async ({ page }) => {
    await page.goto('/');
    
    // Check all sections are present
    await expect(page.getByRole('heading', { name: /trending/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /popular/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /now playing/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /upcoming/i })).toBeVisible();
  });

  test('should navigate to movie detail on card click', async ({ page }) => {
    await page.goto('/');
    
    // Click first movie card
    const firstCard = page.locator('[data-testid="movie-card"]').first();
    await firstCard.click();
    
    // Should navigate to detail page
    await expect(page).toHaveURL(/\/movies\/\d+/);
    
    // Should show movie details
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByText(/overview/i)).toBeVisible();
  });

  test('should switch trending tabs', async ({ page }) => {
    await page.goto('/');
    
    // Click "This Week" tab
    await page.getByRole('tab', { name: /this week/i }).click();
    
    // Should show different content
    await expect(page.locator('[data-testid="trending-section"]')).toBeVisible();
    
    // Tab should be active
    const weekTab = page.getByRole('tab', { name: /this week/i });
    await expect(weekTab).toHaveAttribute('aria-selected', 'true');
  });

  test('should scroll carousel with arrows', async ({ page }) => {
    await page.goto('/');
    
    // Get carousel
    const carousel = page.locator('[data-testid="popular-carousel"]').first();
    
    // Click next arrow
    const nextButton = carousel.locator('[aria-label="Next"]');
    await nextButton.click();
    
    // Carousel should scroll
    // Check if scroll position changed
    const scrollLeft = await carousel.evaluate((el) => el.scrollLeft);
    expect(scrollLeft).toBeGreaterThan(0);
  });
});
```

#### Example 2: Search Functionality
```tsx
// tests/e2e/search.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Search', () => {
  test('should search for movies', async ({ page }) => {
    await page.goto('/');
    
    // Find search input
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('Inception');
    await searchInput.press('Enter');
    
    // Should navigate to search page
    await expect(page).toHaveURL(/\/search\?q=inception/i);
    
    // Should show results
    await expect(page.getByText(/inception/i)).toBeVisible();
  });

  test('should debounce search input', async ({ page }) => {
    await page.goto('/search');
    
    const searchInput = page.getByPlaceholder(/search/i);
    
    // Type quickly
    await searchInput.type('Incept', { delay: 50 });
    
    // Should not search immediately
    await page.waitForTimeout(200);
    let url = page.url();
    expect(url).not.toContain('Incept');
    
    // Wait for debounce
    await page.waitForTimeout(500);
    
    // Now should have searched
    url = page.url();
    expect(url).toContain('Incept');
  });

  test('should switch between search tabs', async ({ page }) => {
    await page.goto('/search?q=avatar');
    
    // Should default to "All" tab
    await expect(page.getByRole('tab', { name: /all/i })).toHaveAttribute('aria-selected', 'true');
    
    // Click "Movies" tab
    await page.getByRole('tab', { name: /^movies$/i }).click();
    
    // Should only show movie results
    const results = page.locator('[data-testid="search-result"]');
    await expect(results.first()).toBeVisible();
    
    // Click "People" tab
    await page.getByRole('tab', { name: /people/i }).click();
    
    // Should show people results
    await expect(page.locator('[data-testid="person-card"]').first()).toBeVisible();
  });

  test('should show search history', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.getByPlaceholder(/search/i);
    
    // Perform searches
    await searchInput.fill('Inception');
    await searchInput.press('Enter');
    await page.waitForURL(/\/search/);
    
    await page.goto('/');
    await searchInput.fill('Interstellar');
    await searchInput.press('Enter');
    await page.waitForURL(/\/search/);
    
    // Go back and click search input
    await page.goto('/');
    await searchInput.click();
    
    // Should show history dropdown
    await expect(page.getByText('Inception')).toBeVisible();
    await expect(page.getByText('Interstellar')).toBeVisible();
  });

  test('should apply filters', async ({ page }) => {
    await page.goto('/search?q=action');
    
    // Open filters
    await page.getByRole('button', { name: /filters/i }).click();
    
    // Select genre
    await page.getByLabel(/action/i).check();
    
    // Set year range
    await page.getByLabel(/year from/i).fill('2020');
    await page.getByLabel(/year to/i).fill('2024');
    
    // Apply filters
    await page.getByRole('button', { name: /apply/i }).click();
    
    // URL should have filter params
    await expect(page).toHaveURL(/with_genres=/);
    await expect(page).toHaveURL(/primary_release_date/);
  });
});
```

#### Example 3: Movie Detail Page
```tsx
// tests/e2e/movie-detail.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Movie Detail Page', () => {
  test('should display movie information', async ({ page }) => {
    await page.goto('/movies/550'); // Fight Club
    
    // Should show title
    await expect(page.locator('h1')).toContainText(/fight club/i);
    
    // Should show overview
    await expect(page.getByText(/overview/i)).toBeVisible();
    
    // Should show rating
    await expect(page.getByText(/8\./)).toBeVisible(); // Rating ~8.x
    
    // Should show release date
    await expect(page.getByText(/1999/)).toBeVisible();
  });

  test('should play trailer', async ({ page, context }) => {
    await page.goto('/movies/550');
    
    // Click play trailer button
    const playButton = page.getByRole('button', { name: /play trailer/i });
    await playButton.click();
    
    // Modal should open
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
    
    // Should have YouTube iframe
    const iframe = modal.locator('iframe');
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute('src', /youtube/i);
  });

  test('should display cast members', async ({ page }) => {
    await page.goto('/movies/550');
    
    // Scroll to cast section
    const castSection = page.getByRole('heading', { name: /cast/i });
    await castSection.scrollIntoViewIfNeeded();
    
    // Should show cast cards
    const castCards = page.locator('[data-testid="person-card"]');
    await expect(castCards.first()).toBeVisible();
    
    // Click cast member
    await castCards.first().click();
    
    // Should navigate to person page
    await expect(page).toHaveURL(/\/person\/\d+/);
  });

  test('should open image gallery', async ({ page }) => {
    await page.goto('/movies/550');
    
    // Scroll to images section
    await page.getByRole('heading', { name: /images/i }).scrollIntoViewIfNeeded();
    
    // Click first image
    const firstImage = page.locator('[data-testid="gallery-image"]').first();
    await firstImage.click();
    
    // Lightbox should open
    const lightbox = page.locator('[data-testid="lightbox"]');
    await expect(lightbox).toBeVisible();
    
    // Should have navigation arrows
    await expect(page.locator('[aria-label="Next"]')).toBeVisible();
    await expect(page.locator('[aria-label="Previous"]')).toBeVisible();
    
    // Close lightbox with ESC
    await page.keyboard.press('Escape');
    await expect(lightbox).not.toBeVisible();
  });

  test('should share movie', async ({ page, context }) => {
    await page.goto('/movies/550');
    
    // Click share button
    await page.getByRole('button', { name: /share/i }).click();
    
    // Share menu should open
    const shareMenu = page.locator('[data-testid="share-menu"]');
    await expect(shareMenu).toBeVisible();
    
    // Should have social media options
    await expect(shareMenu.getByText(/facebook/i)).toBeVisible();
    await expect(shareMenu.getByText(/twitter/i)).toBeVisible();
    
    // Test copy link
    await shareMenu.getByRole('button', { name: /copy link/i }).click();
    
    // Should show success toast
    await expect(page.getByText(/copied/i)).toBeVisible();
  });

  test('should load similar movies', async ({ page }) => {
    await page.goto('/movies/550');
    
    // Scroll to similar movies
    const similarSection = page.getByRole('heading', { name: /similar/i });
    await similarSection.scrollIntoViewIfNeeded();
    
    // Should show movie cards
    const movieCards = page.locator('[data-testid="movie-card"]');
    await expect(movieCards.first()).toBeVisible();
    
    // Click similar movie
    const firstCard = movieCards.first();
    const firstCardTitle = await firstCard.locator('h3').textContent();
    await firstCard.click();
    
    // Should navigate to that movie
    await expect(page).toHaveURL(/\/movies\/\d+/);
    await expect(page.locator('h1')).not.toContainText(firstCardTitle!);
  });
});
```

#### Example 4: Theme Toggle
```tsx
// tests/e2e/theme-toggle.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test('should toggle between dark and light mode', async ({ page }) => {
    await page.goto('/');
    
    // Default should be dark mode
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
    
    // Click theme toggle
    const themeToggle = page.getByRole('button', { name: /theme/i });
    await themeToggle.click();
    
    // Should switch to light mode
    await expect(html).not.toHaveClass(/dark/);
    
    // Click again
    await themeToggle.click();
    
    // Should switch back to dark
    await expect(html).toHaveClass(/dark/);
  });

  test('should persist theme across page navigation', async ({ page }) => {
    await page.goto('/');
    
    // Switch to light mode
    await page.getByRole('button', { name: /theme/i }).click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
    
    // Navigate to another page
    await page.goto('/movies/550');
    
    // Should still be light mode
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('should persist theme on reload', async ({ page }) => {
    await page.goto('/');
    
    // Switch to light mode
    await page.getByRole('button', { name: /theme/i }).click();
    
    // Reload page
    await page.reload();
    
    // Should still be light mode
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });
});
```

---

### Running E2E Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run in UI mode (recommended for development)
pnpm test:e2e:ui

# Run in headed mode (see browser)
pnpm test:e2e --headed

# Run specific test file
pnpm test:e2e tests/e2e/search.spec.ts

# Run on specific browser
pnpm test:e2e --project=chromium

# Generate test code (record actions)
pnpm dlx playwright codegen http://localhost:3000
```

---

## 📊 Coverage Reports

### View Coverage
```bash
# Generate coverage
pnpm test:coverage

# Open HTML report
open coverage/index.html
```

### Coverage Targets
- **Lines:** 70%
- **Functions:** 70%
- **Branches:** 70%
- **Statements:** 70%

### Focus on Critical Paths
- Core components (MovieCard, SearchBar, HeroBanner)
- Custom hooks (useMovies, useSearch, usePerson)
- Utility functions (helpers, formatters)
- API integration (tmdb client, interceptors)

---

## 🎯 Testing Best Practices

### Unit Tests
1. **Test user behavior, not implementation**
   ```tsx
   // ❌ Bad
   expect(component.state.isOpen).toBe(true);
   
   // ✅ Good
   expect(screen.getByRole('dialog')).toBeVisible();
   ```

2. **Use data-testid sparingly**
   - Prefer semantic queries (role, label, text)
   - Use data-testid only when necessary

3. **Mock external dependencies**
   - Mock API calls
   - Mock Next.js router
   - Mock localStorage

4. **Keep tests isolated**
   - Clean up after each test
   - Don't rely on test order
   - Reset mocks between tests

### E2E Tests
1. **Test critical user flows only**
   - Homepage navigation
   - Search functionality
   - Movie detail interactions
   - Theme switching

2. **Use Page Object Model for complex pages**
   ```tsx
   // tests/e2e/pages/MovieDetailPage.ts
   export class MovieDetailPage {
     constructor(private page: Page) {}
     
     async goto(movieId: number) {
       await this.page.goto(`/movies/${movieId}`);
     }
     
     async playTrailer() {
       await this.page.getByRole('button', { name: /play trailer/i }).click();
     }
     
     async getCastMembers() {
       return this.page.locator('[data-testid="person-card"]');
     }
   }
   ```

3. **Wait for network to be idle**
   ```tsx
   await page.goto('/', { waitUntil: 'networkidle' });
   ```

4. **Take screenshots on failure**
   - Already configured in playwright.config.ts
   - Screenshots saved to `test-results/`

---

## 🐛 Debugging Tests

### Vitest
```bash
# Run with verbose output
pnpm vitest --reporter=verbose

# Debug specific test
pnpm vitest --grep="MovieCard" --reporter=verbose

# Run in watch mode with UI
pnpm test:ui
```

### Playwright
```bash
# Run in debug mode
pnpm test:e2e --debug

# Run with UI mode (recommended)
pnpm test:e2e:ui

# Show trace
pnpm dlx playwright show-trace trace.zip
```

---

## 📝 CI/CD Integration

### GitHub Actions Example
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm dlx playwright install --with-deps
      - run: pnpm test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## ✅ Testing Checklist

### Before Deployment
- [ ] All unit tests passing
- [ ] All E2E tests passing
- [ ] Coverage >= 70% for critical paths
- [ ] No console errors in tests
- [ ] All mocks cleaned up
- [ ] CI/CD pipeline green

### Regular Maintenance
- [ ] Update tests when features change
- [ ] Remove obsolete tests
- [ ] Keep test dependencies updated
- [ ] Review coverage reports monthly
- [ ] Fix flaky tests immediately

---

**Last Updated:** March 9, 2026  
**Version:** 1.0.0  
**Maintained By:** OpenCode Agent
