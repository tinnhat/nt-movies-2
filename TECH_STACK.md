# NT Movies V2 - Tech Stack Documentation

## 📚 Tổng Quan

Document này mô tả chi tiết tất cả công nghệ, thư viện, và tools được sử dụng trong dự án NT Movies V2.

---

## 🎯 Core Technologies

### **Next.js 16** (Latest Stable - October 2025)
**Website:** https://nextjs.org  
**Version:** ^16.0.0  
**License:** MIT

**Tại sao chọn Next.js 16:**
- **Turbopack**: Bundler mới thay thế Webpack, nhanh hơn 2-5x khi build, 10x khi Fast Refresh
- **React 19.2 Support**: Tích hợp sẵn React 19 với các tính năng mới nhất
- **App Router**: File-based routing với layouts, loading states, error handling
- **Server Components**: Render on server để tối ưu performance
- **Image Optimization**: Next.js Image component tự động optimize
- **SEO Built-in**: Metadata API, sitemap, robots.txt generation

**Tính năng mới trong Next.js 16:**
- **View Transitions API**: Smooth page transitions
- **Cache Components**: `"use cache"` directive để cache server components
- **New `proxy.ts`**: Thay thế middleware.ts với API mới
- **Enhanced Caching**: `revalidateTag()`, `updateTag()`, `refresh()` APIs
- **Layout Deduplication**: Giảm overhead khi navigate
- **Incremental Prefetching**: Tối ưu data prefetching

**Sử dụng trong project:**
- App Router cho routing structure
- Server Components cho data fetching
- Client Components cho interactive UI
- API Routes (optional) nếu cần proxy TMDB API
- Metadata API cho SEO
- Image component cho optimization

---

### **React 19.2**
**Website:** https://react.dev  
**Version:** ^19.2.0  
**License:** MIT

**Tại sao chọn React 19.2:**
- **Improved Concurrent Rendering**: Tốt hơn React 18
- **New APIs**: `useEffectEvent()`, `Activity` component
- **Better Suspense**: Improved loading states
- **Enhanced Transitions**: `startTransition` mạnh hơn
- **Compiler Improvements**: Faster builds

**React 19 New Features:**
- `useEffectEvent()`: Event handlers không trigger re-render
- `<Activity>`: Component cho loading/pending states
- Better error boundaries
- Improved hydration

**Sử dụng trong project:**
- Functional components với hooks
- Context API cho global state (nếu cần)
- Suspense cho lazy loading
- Error boundaries cho error handling
- `useTransition` cho smooth transitions

---

### **TypeScript 5.x**
**Website:** https://www.typescriptlang.org  
**Version:** ^5.3.0  
**License:** Apache 2.0

**Tại sao chọn TypeScript:**
- Type safety cho code quality
- IntelliSense trong IDE
- Catch errors trước runtime
- Better refactoring support
- Self-documenting code

**Configuration:**
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Sử dụng trong project:**
- Strict mode enabled
- Type definitions cho TMDB API responses
- Interface cho component props
- Type-safe hooks và utilities
- Generic types cho reusable components

---

## 🎨 UI & Styling

### **Tailwind CSS 3.x**
**Website:** https://tailwindcss.com  
**Version:** ^3.4.0  
**License:** MIT

**Tại sao chọn Tailwind:**
- Utility-first CSS
- Fast development
- Small bundle size (unused classes purged)
- Responsive design dễ dàng
- Dark mode built-in

**Configuration:**
```js
// tailwind.config.ts
{
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#01b4e4',
        background: {
          dark: '#0a0a0a',
          light: '#ffffff'
        }
      }
    }
  }
}
```

**Sử dụng trong project:**
- Utility classes cho styling
- Custom theme colors
- Dark mode variants
- Responsive breakpoints
- Animation utilities

---

### **Shadcn/ui**
**Website:** https://ui.shadcn.com  
**Version:** Latest  
**License:** MIT

**Tại sao chọn Shadcn/ui:**
- Copy-paste components (không phải dependency)
- Built on Radix UI (accessible)
- Tailwind CSS styling
- Fully customizable
- TypeScript support

**Components sử dụng:**
- Button
- Card
- Input
- Select
- Tabs
- Toast/Sonner
- Tooltip
- Dialog
- Dropdown Menu
- Separator
- Badge
- Avatar

**Customization:**
- Theme colors từ Tailwind
- Custom variants
- Animation với Framer Motion

---

### **Framer Motion**
**Website:** https://www.framer.com/motion  
**Version:** ^11.0.0  
**License:** MIT

**Tại sao chọn Framer Motion:**
- Production-ready animations
- Declarative API
- Layout animations
- Gesture support
- Scroll animations
- View transitions

**Animation Types:**
- Page transitions
- Fade in/out
- Slide animations
- Scale effects
- Stagger animations cho lists
- Parallax scrolling

**Sử dụng trong project:**
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  Content
</motion.div>
```

---

### **Lucide React**
**Website:** https://lucide.dev  
**Version:** ^0.300.0  
**License:** ISC

**Tại sao chọn Lucide:**
- Beautiful icons
- Tree-shakeable (import từng icon)
- Consistent design
- TypeScript support
- Customizable size, color, stroke

**Icons sử dụng:**
- Navigation: Menu, X, ChevronLeft, ChevronRight
- Actions: Play, Share, Heart, Bookmark
- UI: Search, Filter, Settings, Moon, Sun
- Media: Film, Tv, Image, Video
- Social: Facebook, Twitter, Instagram

---

## 🔄 State Management & Data Fetching

### **TanStack Query (React Query) v5**
**Website:** https://tanstack.com/query/latest  
**Version:** ^5.0.0  
**License:** MIT

**Tại sao chọn React Query:**
- Server state management
- Automatic caching
- Background refetching
- Optimistic updates
- Pagination & infinite scroll support
- Devtools cho debugging

**Configuration:**
```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});
```

**Sử dụng trong project:**
- Fetch TMDB API data
- Cache movie/TV data
- Pagination cho lists
- Prefetching cho detail pages
- Loading & error states

**Custom Hooks Example:**
```tsx
export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(id),
    staleTime: 10 * 60 * 1000
  });
};
```

---

### **Zustand**
**Website:** https://zustand-demo.pmnd.rs  
**Version:** ^4.5.0  
**License:** MIT

**Tại sao chọn Zustand:**
- Lightweight (< 1KB)
- Simple API
- No boilerplate
- TypeScript support
- DevTools support
- Middleware support

**Use Cases trong project:**
- Theme state (dark/light)
- Language state (vi/en)
- Search history
- Recently viewed movies
- UI state (sidebar open/close)

**Store Example:**
```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark'
        }))
    }),
    { name: 'theme-storage' }
  )
);
```

---

## 🌍 Internationalization

### **react-i18next**
**Website:** https://react.i18next.com  
**Version:** ^14.0.0  
**License:** MIT

**Tại sao chọn react-i18next:**
- Industry standard cho React i18n
- Lazy loading translations
- Pluralization support
- Interpolation
- Context-based translations
- TypeScript support

**Dependencies:**
- `i18next` - Core i18n framework
- `react-i18next` - React bindings
- `i18next-resources-to-backend` - Lazy load translations

**Configuration:**
```tsx
// src/lib/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(resourcesToBackend((language, namespace) =>
    import(`../../../public/locales/${language}/${namespace}.json`)
  ))
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi'],
    ns: ['common', 'home', 'movie', 'tv', 'search'],
    defaultNS: 'common'
  });
```

**Translation Files:**
```
public/locales/
├── en/
│   ├── common.json
│   ├── home.json
│   ├── movie.json
│   ├── tv.json
│   └── search.json
└── vi/
    ├── common.json
    ├── home.json
    ├── movie.json
    ├── tv.json
    └── search.json
```

**Usage:**
```tsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t, i18n } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('vi')}>
        Tiếng Việt
      </button>
    </div>
  );
};
```

---

## 🌐 API & HTTP Client

### **Axios**
**Website:** https://axios-http.com  
**Version:** ^1.6.0  
**License:** MIT

**Tại sao chọn Axios:**
- Promise-based HTTP client
- Interceptors cho request/response
- Automatic JSON transformation
- Error handling
- TypeScript support
- Browser & Node.js compatible

**Configuration:**
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
  // Add language param
  config.params = {
    ...config.params,
    language: 'en-US'
  };
  return config;
});

// Response interceptor
tmdbClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);
```

**API Structure:**
```tsx
// src/lib/api/movies.ts
export const moviesApi = {
  getTrending: (timeWindow: 'day' | 'week') =>
    tmdbClient.get(`/trending/movie/${timeWindow}`),
  
  getPopular: (page = 1) =>
    tmdbClient.get('/movie/popular', { params: { page } }),
  
  getDetails: (id: number) =>
    tmdbClient.get(`/movie/${id}`),
  
  // ... more endpoints
};
```

---

## 🎬 TMDB API

### **The Movie Database API v3**
**Website:** https://developers.themoviedb.org/3  
**Version:** v3  
**Authentication:** API Key

**API Base URLs:**
- API: `https://api.themoviedb.org/3`
- Images: `https://image.tmdb.org/t/p`

**Image Sizes:**
- Poster: w92, w154, w185, w342, w500, w780, original
- Backdrop: w300, w780, w1280, original
- Profile: w45, w185, h632, original
- Logo: w45, w92, w154, w185, w300, w500, original

**Rate Limits:**
- 40 requests per 10 seconds
- 50,000 requests per day (free tier)

**Categories Used:**
1. **Configuration**
   - `/configuration` - API configuration
   - `/genre/movie/list` - Movie genres
   - `/genre/tv/list` - TV genres

2. **Movies**
   - `/trending/movie/{time_window}` - Trending movies
   - `/movie/popular` - Popular movies
   - `/movie/now_playing` - Now playing
   - `/movie/upcoming` - Upcoming movies
   - `/movie/top_rated` - Top rated movies
   - `/movie/{id}` - Movie details
   - `/movie/{id}/credits` - Cast & crew
   - `/movie/{id}/videos` - Trailers & videos
   - `/movie/{id}/similar` - Similar movies
   - `/movie/{id}/recommendations` - Recommendations
   - `/movie/{id}/reviews` - User reviews
   - `/movie/{id}/images` - Movie images
   - `/discover/movie` - Advanced filtering

3. **TV Shows**
   - `/trending/tv/{time_window}` - Trending TV
   - `/tv/popular` - Popular TV shows
   - `/tv/top_rated` - Top rated TV
   - `/tv/on_the_air` - Currently airing
   - `/tv/{id}` - TV show details
   - `/tv/{id}/season/{season_number}` - Season details
   - `/tv/{id}/credits` - Cast & crew
   - `/tv/{id}/videos` - Videos
   - `/tv/{id}/similar` - Similar shows
   - `/tv/{id}/recommendations` - Recommendations

4. **People**
   - `/person/popular` - Popular people
   - `/person/{id}` - Person details
   - `/person/{id}/movie_credits` - Movie credits
   - `/person/{id}/tv_credits` - TV credits
   - `/person/{id}/images` - Person images

5. **Search**
   - `/search/movie` - Search movies
   - `/search/tv` - Search TV shows
   - `/search/person` - Search people
   - `/search/multi` - Search all

**Response Types:**
```tsx
// src/types/tmdb.ts
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
  // ... more fields
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  tagline: string;
  status: string;
  // ... more fields
}

// Similar types cho TV, Person, etc.
```

---

## 🧩 UI Enhancement Libraries

### **Sonner**
**Website:** https://sonner.emilkowal.ski  
**Version:** ^1.3.0  
**License:** MIT

**Tại sao chọn Sonner:**
- Beautiful toast notifications
- Smooth animations
- Promise-based toasts
- Action buttons support
- Customizable styling

**Usage:**
```tsx
import { toast } from 'sonner';

toast.success('Movie added to favorites!');
toast.error('Failed to load data');
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: 'Data loaded!',
  error: 'Failed to load'
});
```

---

### **nprogress**
**Website:** https://ricostacruz.com/nprogress  
**Version:** ^0.2.0  
**License:** MIT

**Tại sao chọn nprogress:**
- Slim progress bars
- Automatic route change detection
- Customizable appearance
- Zero configuration

**Usage:**
```tsx
// src/components/common/LoadingBar.tsx
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

export function LoadingBar() {
  const pathname = usePathname();
  
  useEffect(() => {
    NProgress.done();
    return () => NProgress.start();
  }, [pathname]);
  
  return null;
}
```

**Styling:**
```css
/* global.css */
#nprogress .bar {
  background: #01b4e4;
  height: 3px;
}
```

---

### **yet-another-react-lightbox**
**Website:** https://yet-another-react-lightbox.com  
**Version:** ^3.15.0  
**License:** MIT

**Tại sao chọn yet-another-react-lightbox:**
- Modern lightbox component
- Keyboard navigation
- Touch gestures
- Zoom support
- Thumbnail plugin
- Captions plugin

**Usage:**
```tsx
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

<Lightbox
  open={open}
  close={() => setOpen(false)}
  slides={images.map(img => ({ src: img.url }))}
/>
```

---

### **react-share**
**Website:** https://github.com/nygardk/react-share  
**Version:** ^5.1.0  
**License:** MIT

**Tại sao chọn react-share:**
- Social media share buttons
- Pre-built components
- Customizable
- TypeScript support

**Platforms:**
- Facebook
- Twitter/X
- WhatsApp
- Telegram
- Reddit
- Email

**Usage:**
```tsx
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';

const ShareButtons = ({ url, title }) => (
  <>
    <FacebookShareButton url={url} quote={title}>
      Share on Facebook
    </FacebookShareButton>
    <TwitterShareButton url={url} title={title}>
      Share on Twitter
    </TwitterShareButton>
  </>
);
```

---

## 📊 Analytics

### **Vercel Analytics**
**Website:** https://vercel.com/analytics  
**Version:** ^1.1.0  
**License:** MIT

**Tại sao chọn Vercel Analytics:**
- Built for Next.js
- Privacy-friendly
- Core Web Vitals tracking
- Page views & events
- No configuration needed

**Integration:**
```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Metrics Tracked:**
- Page views
- Unique visitors
- Top pages
- Top referrers
- Core Web Vitals (LCP, FID, CLS)
- Custom events (optional)

---

## 🧪 Testing

### **Vitest**
**Website:** https://vitest.dev  
**Version:** ^1.2.0  
**License:** MIT

**Tại sao chọn Vitest:**
- Vite-powered (fast)
- Jest-compatible API
- TypeScript support
- Built-in coverage
- Watch mode
- UI mode

**Configuration:**
```tsx
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules/', 'tests/', '.next/']
    }
  }
});
```

---

### **React Testing Library**
**Website:** https://testing-library.com/react  
**Version:** ^14.1.0  
**License:** MIT

**Tại sao chọn React Testing Library:**
- User-centric testing
- Encourages accessible code
- Simple API
- Works with Vitest

**Test Example:**
```tsx
import { render, screen } from '@testing-library/react';
import { MovieCard } from '@/components/common/MovieCard';

describe('MovieCard', () => {
  it('renders movie title', () => {
    render(<MovieCard title="Test Movie" />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });
});
```

---

### **Playwright**
**Website:** https://playwright.dev  
**Version:** ^1.41.0  
**License:** Apache 2.0

**Tại sao chọn Playwright:**
- Cross-browser testing
- Auto-waiting
- Parallel execution
- Screenshots & videos
- Test generator
- UI mode for debugging

**Configuration:**
```tsx
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  webServer: {
    command: 'pnpm dev',
    port: 3000
  }
});
```

**Test Example:**
```tsx
import { test, expect } from '@playwright/test';

test('search functionality', async ({ page }) => {
  await page.goto('/');
  await page.fill('input[name="search"]', 'Inception');
  await page.click('button[type="submit"]');
  await expect(page.locator('h1')).toContainText('Inception');
});
```

---

## 🛠️ Development Tools

### **ESLint**
**Version:** ^8.56.0  
**Purpose:** Code linting

**Configuration:**
```json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "warn",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

---

### **Prettier**
**Version:** ^3.2.0  
**Purpose:** Code formatting

**Configuration:**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
```

---

### **pnpm**
**Version:** ^8.15.0  
**Purpose:** Package manager

**Tại sao chọn pnpm:**
- Nhanh hơn npm/yarn
- Efficient disk space usage
- Strict dependency resolution
- Monorepo support

---

## 🔧 Build Tools

### **Turbopack**
**Built into Next.js 16**  
**Purpose:** Build tool thay thế Webpack

**Features:**
- 2-5x faster builds
- 10x faster Fast Refresh
- Incremental compilation
- Better caching
- Native to Next.js 16

**Usage:**
```bash
pnpm dev --turbopack  # Development
pnpm build            # Production (uses Turbopack)
```

---

## 📦 Utility Libraries

### **clsx**
**Version:** ^2.1.0  
**Purpose:** Conditional className utility

```tsx
import clsx from 'clsx';

<div className={clsx(
  'base-class',
  isActive && 'active-class',
  { 'error-class': hasError }
)} />
```

---

### **tailwind-merge**
**Version:** ^2.2.0  
**Purpose:** Merge Tailwind classes intelligently

```tsx
import { twMerge } from 'tailwind-merge';

const className = twMerge('px-4 py-2', 'px-6'); // Result: 'px-6 py-2'
```

---

### **class-variance-authority (CVA)**
**Version:** ^0.7.0  
**Purpose:** Create component variants

```tsx
import { cva } from 'class-variance-authority';

const button = cva('base-styles', {
  variants: {
    intent: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500'
    },
    size: {
      small: 'text-sm',
      large: 'text-lg'
    }
  }
});
```

---

## 🌐 Deployment

### **Vercel**
**Website:** https://vercel.com  
**Purpose:** Hosting & deployment platform

**Features:**
- Automatic deployments từ Git
- Edge Network (global CDN)
- Serverless Functions
- Analytics built-in
- Preview deployments
- Environment variables
- Custom domains
- Automatic HTTPS

**Optimizations:**
- Image Optimization
- Automatic code splitting
- Compression (Gzip/Brotli)
- HTTP/2 & HTTP/3 support
- Caching strategies

---

## 📊 Bundle Size Targets

- **First Load JS:** < 100 KB (target), < 200 KB (acceptable)
- **Total Page Weight:** < 500 KB
- **Images:** Optimized with Next.js Image
- **Code Splitting:** Automatic với Next.js
- **Tree Shaking:** Enabled

---

## 🔒 Security

### **Environment Variables**
- Never commit `.env.local`
- Use `NEXT_PUBLIC_` prefix cho client-side variables
- Store sensitive keys securely on Vercel

### **API Security**
- TMDB API key protected
- Rate limiting awareness
- Error handling không expose sensitive info

### **Content Security**
- Input sanitization
- XSS protection (React default)
- HTTPS only in production

---

## 📱 Browser Support

- **Chrome:** Last 2 versions
- **Firefox:** Last 2 versions
- **Safari:** Last 2 versions
- **Edge:** Last 2 versions
- **Mobile:** iOS 12+, Android 8+

---

## ⚡ Performance Targets

- **Lighthouse Scores:**
  - Performance: > 90
  - Accessibility: > 95
  - Best Practices: > 90
  - SEO: 100

- **Core Web Vitals:**
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1

---

## 📚 Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **React Docs:** https://react.dev
- **TypeScript Handbook:** https://www.typescriptlang.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs
- **TMDB API Docs:** https://developers.themoviedb.org/3
- **Vercel Guides:** https://vercel.com/guides

---

**Last Updated:** March 9, 2026  
**Version:** 1.0.0  
**Maintained By:** OpenCode Agent
