# NT Movies V2 - Features Documentation

## 📚 Tổng Quan

Document này mô tả chi tiết tất cả features trong dự án NT Movies V2, bao gồm specifications, user flows, và implementation details.

---

## 🎯 Core Features

### **1. Homepage**

#### **1.1 Hero Banner**
**Mô tả:** Banner lớn hiển thị trending movie với auto-play carousel

**Components:**
- `HeroBanner.tsx` - Main hero component
- Auto-play carousel với 5-7 trending movies
- Background: Backdrop image với gradient overlay
- Content: Movie title, overview, rating, genres

**Features:**
- ✅ Auto-play carousel (5s interval)
- ✅ Manual navigation (prev/next arrows)
- ✅ Pagination indicators (dots)
- ✅ Play trailer button → Opens video modal
- ✅ View details button → Navigate to movie detail
- ✅ Smooth fade transitions giữa slides
- ✅ Pause on hover

**User Flow:**
1. User lands on homepage
2. Sees current trending movie in hero banner
3. Can click arrows để navigate manually
4. Can click "Play Trailer" để xem trailer
5. Can click "View Details" để xem full info

**API Endpoints:**
- `GET /trending/movie/day` - Lấy trending movies

**Responsive:**
- Desktop: Full-width banner, height 600px
- Tablet: Height 500px, adjusted text sizes
- Mobile: Height 400px, minimal text

---

#### **1.2 Trending Section**
**Mô tả:** Section hiển thị trending movies/TV shows với tab switching

**Components:**
- `TrendingSection.tsx` - Main section component
- Tabs: "Today" | "This Week"
- Horizontal scrollable carousel

**Features:**
- ✅ Tab switching (Today / This Week)
- ✅ Separate endpoints cho movies và TV shows
- ✅ Smooth scroll carousel
- ✅ 10-20 items per view
- ✅ Hover effects trên cards
- ✅ Loading skeletons khi fetch data

**User Flow:**
1. User scrolls to Trending section
2. Sees "Today" trending by default
3. Can switch to "This Week" tab
4. Can scroll horizontally để xem thêm
5. Click card để navigate to detail page

**API Endpoints:**
- `GET /trending/movie/day` - Trending today
- `GET /trending/movie/week` - Trending this week

---

#### **1.3 Popular Movies Section**
**Mô tả:** Hiển thị popular movies in theaters

**Components:**
- `PopularSection.tsx`
- Horizontal carousel với movie cards

**Features:**
- ✅ Horizontal scrollable carousel
- ✅ 20 movies loaded
- ✅ "See All" button → Navigate to `/movies/popular`
- ✅ Smooth scroll với momentum
- ✅ Movie cards với poster, title, rating

**API Endpoints:**
- `GET /movie/popular?page=1`

---

#### **1.4 Now Playing Section**
**Mô tả:** Movies currently in theaters

**Components:**
- `NowPlayingSection.tsx`
- Similar structure to Popular

**Features:**
- ✅ Same carousel structure
- ✅ "See All" → `/movies/now-playing`
- ✅ Movie cards

**API Endpoints:**
- `GET /movie/now_playing?page=1`

---

#### **1.5 Upcoming Movies Section**
**Mô tả:** Upcoming movie releases

**Components:**
- `UpcomingSection.tsx`

**Features:**
- ✅ Carousel với upcoming movies
- ✅ Release date badge trên cards
- ✅ "See All" → `/movies/upcoming`

**API Endpoints:**
- `GET /movie/upcoming?page=1`

---

#### **1.6 Top Rated Section**
**Mô tả:** Highest rated movies of all time

**Components:**
- `TopRatedSection.tsx`

**Features:**
- ✅ Carousel với top rated movies
- ✅ Rating badge prominent trên cards
- ✅ "See All" → `/movies/top-rated`

**API Endpoints:**
- `GET /movie/top_rated?page=1`

---

### **2. Movie Detail Page**

#### **2.1 Movie Hero Section**
**Mô tả:** Top section với backdrop, poster, và basic info

**Components:**
- `MovieHero.tsx` - Hero section
- `MovieInfo.tsx` - Detailed information

**Layout:**
```
[Backdrop Image (blurred background)]
├── [Poster Image - Left]
└── [Movie Info - Right]
    ├── Title + Release Year
    ├── Tagline
    ├── Genres badges
    ├── Runtime | Release Date | Rating
    ├── Overview
    └── Actions: [Play Trailer] [Share] [Add to Favorites]
```

**Features:**
- ✅ Full-width backdrop với gradient overlay
- ✅ Poster image (342px width)
- ✅ Movie title + original title (if different)
- ✅ Tagline italic text
- ✅ Genre badges clickable → filter by genre
- ✅ Rating với stars visualization
- ✅ Vote count display
- ✅ Runtime formatted (2h 30m)
- ✅ Release date formatted
- ✅ Overview/Synopsis
- ✅ Play Trailer button → Video modal
- ✅ Share button → Social media options
- ✅ Add to Favorites (localStorage)

**User Flow:**
1. User clicks movie card từ anywhere
2. Navigates to `/movies/[id]`
3. Sees hero section với full info
4. Can play trailer
5. Can share to social media
6. Can add to favorites

**API Endpoints:**
- `GET /movie/{id}` - Movie details

---

#### **2.2 Cast Section**
**Mô tả:** Horizontal carousel hiển thị cast members

**Components:**
- `CastSection.tsx`
- `PersonCard.tsx` - Reusable person card

**Features:**
- ✅ Horizontal scrollable carousel
- ✅ Profile photo (185px)
- ✅ Actor name
- ✅ Character name
- ✅ Click card → Navigate to person detail
- ✅ Show top 20 cast members
- ✅ "See Full Cast" button → Full cast page

**API Endpoints:**
- `GET /movie/{id}/credits` - Cast & crew

---

#### **2.3 Trailers & Videos Section**
**Mô tả:** Display trailers, teasers, clips

**Components:**
- `TrailersSection.tsx`
- `VideoPlayer.tsx` - Embedded YouTube player

**Features:**
- ✅ Grid of video thumbnails
- ✅ Video type badge (Trailer, Teaser, Clip, etc.)
- ✅ Click thumbnail → Open video modal
- ✅ Modal với embedded YouTube player
- ✅ Close button & ESC key support
- ✅ Filter by video type (All, Trailers, Teasers, Clips)

**API Endpoints:**
- `GET /movie/{id}/videos` - Videos

---

#### **2.4 Reviews Section**
**Mô tả:** User reviews from TMDB community

**Components:**
- `ReviewsSection.tsx`
- `ReviewCard.tsx` - Single review

**Features:**
- ✅ List of reviews
- ✅ Author name & avatar
- ✅ Rating (if available)
- ✅ Review content với "Read More" expansion
- ✅ Created date
- ✅ Show 3 reviews initially
- ✅ "Load More" button để xem thêm
- ✅ Empty state nếu no reviews

**API Endpoints:**
- `GET /movie/{id}/reviews?page=1` - Reviews

---

#### **2.5 Similar Movies Section**
**Mô tả:** Movies similar to current movie

**Components:**
- `SimilarMovies.tsx`

**Features:**
- ✅ Horizontal carousel
- ✅ Movie cards
- ✅ Click card → Navigate to that movie

**API Endpoints:**
- `GET /movie/{id}/similar?page=1` - Similar movies

---

#### **2.6 Recommendations Section**
**Mô tả:** Recommended movies based on current movie

**Components:**
- `Recommendations.tsx`

**Features:**
- ✅ Same structure as Similar Movies
- ✅ Different algorithm (TMDB recommendations)

**API Endpoints:**
- `GET /movie/{id}/recommendations?page=1` - Recommendations

---

#### **2.7 Images Gallery Section**
**Mô tả:** Gallery of posters, backdrops, logos

**Components:**
- `ImagesSection.tsx`
- Integration với `yet-another-react-lightbox`

**Features:**
- ✅ Tabs: Posters | Backdrops | Logos
- ✅ Grid layout (responsive)
- ✅ Click image → Open lightbox
- ✅ Lightbox features:
  - Full-screen view
  - Next/Previous navigation
  - Zoom in/out
  - Keyboard navigation (arrows, ESC)
  - Touch gestures (mobile)
- ✅ Show 12 images initially
- ✅ "Load More" button nếu có thêm

**API Endpoints:**
- `GET /movie/{id}/images` - All images

---

#### **2.8 Additional Movie Info**
**Mô tả:** Sidebar hoặc bottom section với extra info

**Components:**
- `MovieMetadata.tsx`

**Features:**
- ✅ Status (Released, Post Production, etc.)
- ✅ Original Language
- ✅ Budget (formatted)
- ✅ Revenue (formatted)
- ✅ Production Companies (với logos)
- ✅ Production Countries
- ✅ Homepage link (if available)
- ✅ IMDB link

**Data từ:**
- `GET /movie/{id}` response

---

### **3. TV Shows Features**

#### **3.1 TV Shows Listing Page**
**URL:** `/tv`

**Components:**
- `src/app/tv/page.tsx`
- `TVShowsGrid.tsx`

**Features:**
- ✅ Tabs: Trending | Popular | Top Rated | On The Air
- ✅ Grid layout (responsive)
- ✅ TV show cards
- ✅ Pagination
- ✅ Filter sidebar:
  - Genre filter (multi-select)
  - First Air Date year
  - Sort by (Popularity, Rating, First Air Date)
- ✅ Loading skeletons
- ✅ Empty state

**API Endpoints:**
- `GET /trending/tv/{time_window}`
- `GET /tv/popular`
- `GET /tv/top_rated`
- `GET /tv/on_the_air`
- `GET /discover/tv` - For filtering

---

#### **3.2 TV Show Detail Page**
**URL:** `/tv/[id]`

**Similar structure to Movie Detail với additions:**

**Extra Components:**
- `SeasonsSection.tsx` - List of all seasons

**Seasons Section Features:**
- ✅ List of seasons với posters
- ✅ Season number + name
- ✅ Air date
- ✅ Episode count
- ✅ Overview
- ✅ Click season → Navigate to season detail (optional)

**API Endpoints:**
- `GET /tv/{id}` - TV show details
- `GET /tv/{id}/credits` - Cast
- `GET /tv/{id}/videos` - Trailers
- `GET /tv/{id}/reviews` - Reviews
- `GET /tv/{id}/similar` - Similar shows
- `GET /tv/{id}/recommendations` - Recommendations
- `GET /tv/{id}/season/{season_number}` - Season details

---

### **4. Search & Discovery**

#### **4.1 Search Page**
**URL:** `/search?q={query}`

**Components:**
- `src/app/search/page.tsx`
- `SearchBar.tsx` - Search input với debouncing
- `SearchFilters.tsx` - Advanced filters
- `SearchResults.tsx` - Results grid

**Features:**
- ✅ Search input in header (global)
- ✅ Real-time search với debouncing (500ms)
- ✅ Multi-tab results:
  - All (Multi search)
  - Movies
  - TV Shows
  - People
- ✅ Results count per tab
- ✅ Grid layout responsive
- ✅ Pagination
- ✅ Empty state với suggestions
- ✅ Search history dropdown (localStorage)
- ✅ Clear search history option
- ✅ Loading states

**Search Bar Features:**
- ✅ Autocomplete suggestions (optional)
- ✅ Recent searches dropdown
- ✅ Clear button (X)
- ✅ Search icon
- ✅ Keyboard shortcut (Cmd+K / Ctrl+K) để focus

**API Endpoints:**
- `GET /search/multi?query={q}` - Search all
- `GET /search/movie?query={q}` - Search movies
- `GET /search/tv?query={q}` - Search TV shows
- `GET /search/person?query={q}` - Search people

---

#### **4.2 Advanced Filters**
**Location:** Search page sidebar hoặc filter panel

**Components:**
- `FilterPanel.tsx`

**Filter Options:**

**For Movies:**
- ✅ Genres (multi-select checkboxes)
- ✅ Release Year Range (from - to)
- ✅ Rating Range (0-10 slider)
- ✅ Sort By:
  - Popularity (desc/asc)
  - Rating (desc/asc)
  - Release Date (desc/asc)
  - Title (A-Z, Z-A)
- ✅ Language (select)

**For TV Shows:**
- Similar filters với "First Air Date" thay vì "Release Date"

**Filter Behavior:**
- ✅ Apply filters button
- ✅ Clear all filters button
- ✅ Filter count badge
- ✅ Filters persist in URL params
- ✅ Collapsible filter sections (mobile)

**API Endpoints:**
- `GET /discover/movie` - Advanced movie filtering
- `GET /discover/tv` - Advanced TV filtering
- `GET /genre/movie/list` - Movie genres
- `GET /genre/tv/list` - TV genres

---

### **5. Person/Celebrity Features**

#### **5.1 Popular People Listing**
**URL:** `/person`

**Components:**
- `src/app/person/page.tsx`
- `PeopleGrid.tsx`

**Features:**
- ✅ Grid layout của popular people
- ✅ Person cards với:
  - Profile photo
  - Name
  - Known for (e.g., "Acting")
  - Known for movies (thumbnails)
- ✅ Pagination
- ✅ Click card → Person detail

**API Endpoints:**
- `GET /person/popular?page={page}` - Popular people

---

#### **5.2 Person Detail Page**
**URL:** `/person/[id]`

**Components:**
- `src/app/person/[id]/page.tsx`
- `PersonInfo.tsx` - Bio section
- `Filmography.tsx` - Movies & TV credits
- `PersonImages.tsx` - Image gallery

**Layout:**
```
[Profile Photo - Left Sidebar]
├── Personal Info
│   ├── Known For
│   ├── Gender
│   ├── Birthday
│   ├── Place of Birth
│   ├── Also Known As
│   └── Official Site

[Main Content - Right]
├── Biography
├── Known For (top movies/shows)
├── Filmography
│   ├── Tab: Movies (sorted by year)
│   └── Tab: TV Shows (sorted by year)
└── Photos Gallery
```

**Features:**
- ✅ Profile photo (632px height)
- ✅ Full name
- ✅ Biography (với "Read More" nếu dài)
- ✅ Personal info:
  - Known For Department
  - Gender
  - Birthday + Age
  - Place of Birth
  - Also Known As (aliases)
- ✅ "Known For" section - Top movies/shows carousel
- ✅ Filmography tabs (Movies | TV Shows)
- ✅ Filmography list:
  - Poster thumbnail
  - Title
  - Character/Role
  - Year
  - Sorted by release date (latest first)
- ✅ Photos gallery với lightbox
- ✅ Social links (if available)

**API Endpoints:**
- `GET /person/{id}` - Person details
- `GET /person/{id}/movie_credits` - Movie credits
- `GET /person/{id}/tv_credits` - TV credits
- `GET /person/{id}/images` - Photos

---

### **6. UI/UX Enhancements**

#### **6.1 Theme Toggle**
**Mô tả:** Dark/Light mode switching

**Components:**
- `ThemeToggle.tsx` - Toggle button component
- `useThemeStore.ts` - Zustand store

**Features:**
- ✅ Toggle button in header (Moon/Sun icon)
- ✅ Default: Dark mode
- ✅ Smooth transition giữa themes
- ✅ Persist theme trong localStorage
- ✅ Apply theme to entire app
- ✅ CSS variables cho colors
- ✅ Tailwind dark mode variants

**Implementation:**
```tsx
// Zustand store
interface ThemeStore {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

// Usage
const { theme, toggleTheme } = useThemeStore();

// Tailwind classes
<div className="bg-white dark:bg-gray-900" />
```

---

#### **6.2 Language Toggle**
**Mô tả:** Switch giữa Vietnamese và English

**Components:**
- `LanguageToggle.tsx` - Language switcher
- `i18n/config.ts` - i18next configuration

**Features:**
- ✅ Dropdown hoặc toggle button in header
- ✅ Flags icons cho languages
- ✅ Persist language trong localStorage
- ✅ Change language dynamically
- ✅ Update TMDB API language param
- ✅ All UI text translated
- ✅ Date formatting per locale

**Translation Files:**
```
public/locales/
├── en/
│   ├── common.json      (Header, Footer, buttons, etc.)
│   ├── home.json        (Homepage specific)
│   ├── movie.json       (Movie pages)
│   ├── tv.json          (TV pages)
│   └── search.json      (Search & filters)
└── vi/
    └── (same structure)
```

**Usage:**
```tsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation('common');
  return <h1>{t('welcome')}</h1>;
};
```

---

#### **6.3 Share to Social Media**
**Mô tả:** Share movies/TV shows to social platforms

**Components:**
- `ShareButtons.tsx` - Social share buttons

**Platforms:**
- ✅ Facebook
- ✅ Twitter/X
- ✅ WhatsApp
- ✅ Telegram
- ✅ Copy Link

**Features:**
- ✅ Share button opens modal/popover với options
- ✅ Each platform button pre-fills:
  - URL: Movie/TV show detail page
  - Title: Movie/Show name
  - Description: Overview (truncated)
- ✅ Copy link shows success toast
- ✅ Icons từ Lucide React

**Implementation:**
```tsx
import { FacebookShareButton, TwitterShareButton } from 'react-share';

<FacebookShareButton
  url={`https://nt-movies.vercel.app/movies/${movieId}`}
  quote={`Check out ${movieTitle} on NT Movies!`}
>
  Share on Facebook
</FacebookShareButton>
```

---

#### **6.4 Back to Top Button**
**Mô tả:** Scroll to top button

**Components:**
- `BackToTop.tsx`

**Features:**
- ✅ Fixed position button (bottom-right)
- ✅ Only visible khi scroll down > 300px
- ✅ Smooth scroll to top on click
- ✅ Fade in/out animation
- ✅ Arrow up icon
- ✅ Circular button với shadow

**Implementation:**
```tsx
useEffect(() => {
  const handleScroll = () => {
    setIsVisible(window.scrollY > 300);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

#### **6.5 Loading Progress Bar**
**Mô tả:** Top loading bar khi navigate

**Components:**
- `LoadingBar.tsx` - nprogress wrapper

**Features:**
- ✅ Appears at top of screen
- ✅ Shows automatically on route change
- ✅ Thin colored bar (3px)
- ✅ Smooth animation
- ✅ Completes on page load

**Implementation:**
```tsx
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

---

#### **6.6 Toast Notifications**
**Mô tả:** Toast messages cho user feedback

**Library:** Sonner

**Components:**
- Integrated via `Toaster` component in layout

**Use Cases:**
- ✅ Success: "Added to favorites", "Link copied"
- ✅ Error: "Failed to load data", "API error"
- ✅ Info: "Loading more results"
- ✅ Promise: "Loading..." → "Success!" / "Error"

**Implementation:**
```tsx
import { toast } from 'sonner';

// Success
toast.success('Movie added to favorites!');

// Error
toast.error('Failed to load movie details');

// Promise
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: 'Data loaded!',
  error: 'Failed to load'
});
```

---

#### **6.7 Image Lightbox**
**Mô tả:** Full-screen image viewer

**Library:** yet-another-react-lightbox

**Components:**
- `ImageGallery.tsx` - Gallery với lightbox

**Features:**
- ✅ Click image → Open lightbox full-screen
- ✅ Navigation: Next/Previous arrows
- ✅ Keyboard support: Arrow keys, ESC
- ✅ Touch gestures (mobile): Swipe
- ✅ Zoom in/out
- ✅ Close button
- ✅ Image counter (1/10)
- ✅ Thumbnails strip (optional)
- ✅ Smooth transitions

**Usage:**
```tsx
import Lightbox from 'yet-another-react-lightbox';

<Lightbox
  open={isOpen}
  close={() => setIsOpen(false)}
  slides={images.map(img => ({ src: img.url }))}
/>
```

---

#### **6.8 Breadcrumb Navigation**
**Mô tả:** Navigation breadcrumbs

**Components:**
- `Breadcrumb.tsx`

**Features:**
- ✅ Show current path
- ✅ Clickable links to parent pages
- ✅ Auto-generate từ URL
- ✅ Home icon cho root
- ✅ Separator icon (chevron right)

**Example:**
```
Home > Movies > Action > The Dark Knight
```

**Implementation:**
```tsx
// Auto-generate từ pathname
const pathname = usePathname();
const segments = pathname.split('/').filter(Boolean);

// Render
{segments.map((segment, i) => (
  <Link href={`/${segments.slice(0, i + 1).join('/')}`}>
    {formatSegment(segment)}
  </Link>
))}
```

---

#### **6.9 Recently Viewed**
**Mô tả:** Track recently viewed movies/shows

**Components:**
- `RecentlyViewed.tsx` - Display component
- `useRecentlyViewed.ts` - Hook quản lý localStorage

**Features:**
- ✅ Auto-save movies/TV shows khi view detail page
- ✅ Store in localStorage (max 20 items)
- ✅ Display in sidebar hoặc separate page
- ✅ Horizontal carousel
- ✅ Remove individual items
- ✅ Clear all history

**Data Structure:**
```tsx
interface ViewedItem {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  posterPath: string;
  viewedAt: Date;
}
```

**Implementation:**
```tsx
// Save on movie detail view
useEffect(() => {
  addToRecentlyViewed({
    id: movie.id,
    type: 'movie',
    title: movie.title,
    posterPath: movie.poster_path,
    viewedAt: new Date()
  });
}, [movie.id]);
```

---

#### **6.10 Search History**
**Mô tả:** Save and display recent searches

**Components:**
- `SearchHistory.tsx` - History dropdown
- `useSearchHistory.ts` - Hook

**Features:**
- ✅ Save searches to localStorage (max 10)
- ✅ Display in dropdown khi focus search input
- ✅ Click history item → Auto-fill and search
- ✅ Remove individual items
- ✅ Clear all history
- ✅ Show only when input is empty

**Data Structure:**
```tsx
interface SearchHistory {
  query: string;
  searchedAt: Date;
}
```

---

### **7. SEO & Accessibility**

#### **7.1 SEO Optimization**

**Metadata per Page:**
```tsx
// src/app/movies/[id]/page.tsx
export async function generateMetadata({ params }) {
  const movie = await fetchMovie(params.id);
  
  return {
    title: `${movie.title} (${movie.releaseYear}) | NT Movies`,
    description: movie.overview,
    openGraph: {
      title: movie.title,
      description: movie.overview,
      images: [movie.backdropUrl],
      type: 'video.movie'
    },
    twitter: {
      card: 'summary_large_image',
      title: movie.title,
      description: movie.overview,
      images: [movie.backdropUrl]
    }
  };
}
```

**Sitemap:**
```tsx
// src/app/sitemap.ts
export default async function sitemap() {
  const movies = await fetchPopularMovies();
  
  return [
    { url: 'https://nt-movies.vercel.app', lastModified: new Date() },
    { url: 'https://nt-movies.vercel.app/movies', lastModified: new Date() },
    ...movies.map(movie => ({
      url: `https://nt-movies.vercel.app/movies/${movie.id}`,
      lastModified: new Date()
    }))
  ];
}
```

**Robots.txt:**
```tsx
// src/app/robots.ts
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/'
    },
    sitemap: 'https://nt-movies.vercel.app/sitemap.xml'
  };
}
```

**Structured Data (JSON-LD):**
```tsx
// Movie page
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Movie",
  "name": "Movie Title",
  "description": "Overview",
  "image": "poster_url",
  "datePublished": "2024-01-01",
  "director": { "@type": "Person", "name": "Director Name" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 8.5,
    "ratingCount": 10000
  }
}
</script>
```

---

#### **7.2 Accessibility Features**

**ARIA Labels:**
- ✅ All buttons có aria-label descriptive
- ✅ Navigation có aria-label="Main navigation"
- ✅ Search có aria-label="Search movies and TV shows"
- ✅ Carousel có aria-live="polite" cho announcements

**Keyboard Navigation:**
- ✅ All interactive elements focusable
- ✅ Visible focus indicators
- ✅ Tab order logical
- ✅ ESC key closes modals
- ✅ Arrow keys navigate carousels
- ✅ Enter/Space activate buttons

**Screen Reader Support:**
- ✅ Alt text cho all images
- ✅ Descriptive link text (no "click here")
- ✅ Hidden text cho icon-only buttons
- ✅ Announce loading states
- ✅ Announce errors

**Semantic HTML:**
- ✅ `<header>`, `<nav>`, `<main>`, `<footer>`
- ✅ `<article>` cho movie cards
- ✅ `<section>` cho content sections
- ✅ Heading hierarchy (h1 → h6)
- ✅ `<button>` thay vì `<div onClick>`

**Color Contrast:**
- ✅ WCAG AA compliant (4.5:1 for text)
- ✅ Test với tools (Lighthouse Accessibility)

**Example:**
```tsx
<button
  aria-label="Play movie trailer"
  onClick={playTrailer}
>
  <PlayIcon aria-hidden="true" />
  <span className="sr-only">Play Trailer</span>
</button>
```

---

### **8. Performance Optimizations**

#### **8.1 Image Optimization**
- ✅ Next.js `<Image>` component
- ✅ Automatic WebP conversion
- ✅ Lazy loading
- ✅ Responsive sizes
- ✅ Blur placeholder

```tsx
<Image
  src={posterUrl}
  alt={movie.title}
  width={342}
  height={513}
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>
```

---

#### **8.2 Code Splitting**
- ✅ Automatic route-based splitting (Next.js)
- ✅ Dynamic imports cho modals/heavy components

```tsx
const VideoModal = dynamic(() => import('@/components/VideoModal'), {
  loading: () => <Spinner />
});
```

---

#### **8.3 Caching Strategy**
- ✅ React Query cache (5-10 min stale time)
- ✅ localStorage cho user preferences
- ✅ Next.js ISR cho static pages (if needed)

---

#### **8.4 Bundle Size**
- ✅ Tree-shaking imports
- ✅ Analyze bundle với `@next/bundle-analyzer`
- ✅ Target: < 200KB first load JS

---

### **9. Analytics**

#### **9.1 Vercel Analytics**

**Features:**
- ✅ Page views tracking
- ✅ Unique visitors
- ✅ Top pages
- ✅ Referrers
- ✅ Core Web Vitals

**Custom Events (Optional):**
```tsx
import { track } from '@vercel/analytics';

// Track movie view
track('movie_view', { movieId: 123, title: 'Movie Title' });

// Track search
track('search', { query: 'inception' });
```

---

## 🎯 Feature Checklist

### Core Features
- [ ] Homepage với Hero Banner
- [ ] Trending Section (Day/Week tabs)
- [ ] Popular Movies Section
- [ ] Now Playing Section
- [ ] Upcoming Movies Section
- [ ] Top Rated Section
- [ ] Movie Detail Page (full info)
- [ ] Cast Section
- [ ] Trailers & Videos
- [ ] Reviews Section
- [ ] Similar Movies
- [ ] Recommendations
- [ ] Image Gallery với Lightbox
- [ ] TV Shows Listing
- [ ] TV Show Detail Page
- [ ] Seasons Information
- [ ] Search Page (multi-tab)
- [ ] Advanced Filters
- [ ] Person Listing
- [ ] Person Detail Page
- [ ] Filmography

### UI/UX Enhancements
- [ ] Dark/Light Theme Toggle
- [ ] Language Toggle (EN/VI)
- [ ] Share to Social Media
- [ ] Back to Top Button
- [ ] Loading Progress Bar
- [ ] Toast Notifications
- [ ] Image Lightbox
- [ ] Breadcrumb Navigation
- [ ] Recently Viewed
- [ ] Search History

### Technical
- [ ] SEO Optimization (meta tags, OG, Twitter Cards)
- [ ] Dynamic Sitemap
- [ ] Robots.txt
- [ ] Structured Data (JSON-LD)
- [ ] Full Accessibility (WCAG AA)
- [ ] Performance Optimizations
- [ ] Vercel Analytics
- [ ] Unit Tests (70% coverage)
- [ ] E2E Tests

---

**Last Updated:** March 9, 2026  
**Version:** 1.0.0  
**Maintained By:** OpenCode Agent
