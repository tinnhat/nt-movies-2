# NT Movies V2 - Project Plan

## 📋 Tổng Quan Dự Án

**Tên dự án:** NT Movies V2  
**Mô tả:** Ứng dụng web tra cứu thông tin phim/TV shows toàn diện sử dụng TMDB API  
**Thời gian thực hiện:** 11-12 ngày  
**Package Manager:** pnpm  
**Deployment:** Vercel  

---

## 🎯 Mục Tiêu Dự Án

1. Xây dựng ứng dụng movie database đầy đủ tính năng với Next.js 16 và React 19.2
2. Tích hợp The Movie Database (TMDB) API để lấy dữ liệu phim/TV shows
3. Thiết kế UI/UX hiện đại, mượt mà với animations và dark/light theme
4. Hỗ trợ đa ngôn ngữ (Tiếng Việt & Tiếng Anh)
5. Tối ưu SEO và accessibility
6. Testing coverage cơ bản cho các tính năng quan trọng
7. Deploy lên Vercel với analytics

---

## 📅 Timeline Chi Tiết (11 Phases)

### **Phase 1: Project Setup & Configuration** (Ngày 1)
**Thời gian:** 4-6 giờ

#### Công việc:
1. **Khởi tạo Next.js 16 Project**
   ```bash
   pnpm create next-app@latest nt-movies-v2 --typescript --tailwind --app --turbopack
   cd nt-movies-v2
   ```

2. **Cài đặt Dependencies**
   ```bash
   # UI Components & Styling
   pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
   pnpm add @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-tooltip
   pnpm add class-variance-authority clsx tailwind-merge
   pnpm add framer-motion lucide-react
   
   # State & Data Fetching
   pnpm add @tanstack/react-query zustand
   pnpm add axios
   
   # i18n
   pnpm add react-i18next i18next i18next-resources-to-backend
   
   # UI Enhancements
   pnpm add sonner nprogress yet-another-react-lightbox
   pnpm add react-share
   
   # Analytics
   pnpm add @vercel/analytics
   
   # Dev Dependencies
   pnpm add -D @types/node @types/react @types/react-dom
   pnpm add -D eslint eslint-config-next prettier
   pnpm add -D vitest @vitejs/plugin-react jsdom
   pnpm add -D @testing-library/react @testing-library/jest-dom
   pnpm add -D @playwright/test
   ```

3. **Cấu hình Files**
   - `next.config.ts` - Turbopack, images domain, i18n
   - `tailwind.config.ts` - Custom theme colors, dark mode
   - `tsconfig.json` - Path aliases, strict mode
   - `.eslintrc.json` - Linting rules
   - `.prettierrc` - Code formatting
   - `vitest.config.ts` - Unit test setup
   - `playwright.config.ts` - E2E test setup

4. **Setup Shadcn/ui**
   ```bash
   pnpm dlx shadcn-ui@latest init
   pnpm dlx shadcn-ui@latest add button card input select tabs toast
   ```

5. **Cấu trúc thư mục**
   ```
   src/
   ├── app/
   │   ├── layout.tsx
   │   ├── page.tsx
   │   ├── movies/
   │   ├── tv/
   │   ├── person/
   │   └── search/
   ├── components/
   │   ├── ui/           # Shadcn components
   │   ├── common/       # Shared components
   │   ├── layout/       # Header, Footer
   │   └── features/     # Feature-specific
   ├── lib/
   │   ├── api/          # TMDB API
   │   ├── hooks/        # Custom hooks
   │   ├── stores/       # Zustand stores
   │   ├── utils/        # Utilities
   │   └── i18n/         # i18n config
   └── types/            # TypeScript types
   ```

#### Deliverables:
- ✅ Project khởi tạo với Next.js 16 + Turbopack
- ✅ Tất cả dependencies đã cài đặt
- ✅ Config files hoàn chỉnh
- ✅ Cấu trúc thư mục chuẩn

---

### **Phase 2: Core Setup - API, Theme, i18n** (Ngày 2)
**Thời gian:** 6-8 giờ

#### Công việc:
1. **TMDB API Integration**
   - `src/lib/api/tmdb.ts` - Axios instance với base config
   - `src/lib/api/endpoints.ts` - Tất cả API endpoints
   - `src/lib/api/types.ts` - Response types từ TMDB
   - Environment variables setup (.env.local)

2. **Theme System**
   - `src/lib/stores/theme-store.ts` - Zustand store cho theme
   - `src/components/common/ThemeToggle.tsx` - Dark/Light toggle button
   - Tailwind dark mode configuration
   - CSS variables cho colors

3. **i18n Setup**
   - `src/lib/i18n/config.ts` - i18next configuration
   - `public/locales/en/common.json` - English translations
   - `public/locales/vi/common.json` - Vietnamese translations
   - `src/components/common/LanguageToggle.tsx` - Language switcher

4. **React Query Setup**
   - `src/lib/providers/QueryProvider.tsx` - TanStack Query provider
   - Custom hooks cho API calls
   - Cache configuration

#### Deliverables:
- ✅ TMDB API client hoạt động
- ✅ Theme toggle dark/light mode
- ✅ i18n hỗ trợ 2 ngôn ngữ
- ✅ React Query configured

---

### **Phase 3: Layout & Navigation** (Ngày 3)
**Thời gian:** 6-8 giờ

#### Công việc:
1. **Layout Components**
   - `src/components/layout/Header.tsx` - Navigation bar với logo, search, theme toggle, language toggle
   - `src/components/layout/Footer.tsx` - Footer với links và info
   - `src/components/layout/Container.tsx` - Responsive container wrapper
   - `src/app/layout.tsx` - Root layout với providers

2. **Navigation Components**
   - `src/components/common/Breadcrumb.tsx` - Breadcrumb navigation
   - `src/components/common/BackToTop.tsx` - Scroll to top button
   - `src/components/common/LoadingBar.tsx` - nprogress integration

3. **Common Components**
   - `src/components/common/MovieCard.tsx` - Reusable movie card
   - `src/components/common/TVCard.tsx` - Reusable TV show card
   - `src/components/common/PersonCard.tsx` - Reusable person card
   - `src/components/common/ImageWithFallback.tsx` - Image với fallback

#### Deliverables:
- ✅ Header với navigation đầy đủ
- ✅ Footer responsive
- ✅ Breadcrumb navigation
- ✅ Back to top button
- ✅ Card components reusable

---

### **Phase 4: Homepage Implementation** (Ngày 4-5)
**Thời gian:** 10-12 giờ

#### Công việc:
1. **Hero Banner Section**
   - `src/components/features/home/HeroBanner.tsx`
   - Auto-play carousel với trending movies
   - Play trailer button
   - Movie info overlay

2. **Content Sections**
   - `src/components/features/home/TrendingSection.tsx` - Day/Week tabs
   - `src/components/features/home/PopularSection.tsx` - Popular movies
   - `src/components/features/home/NowPlayingSection.tsx` - Now playing
   - `src/components/features/home/UpcomingSection.tsx` - Upcoming movies
   - `src/components/features/home/TopRatedSection.tsx` - Top rated

3. **Carousel Component**
   - `src/components/common/Carousel.tsx` - Horizontal scrollable carousel
   - Navigation arrows
   - Smooth scroll behavior

4. **API Hooks**
   - `src/lib/hooks/useMovies.ts` - All movie-related hooks
   - `useTrending()`, `usePopular()`, `useNowPlaying()`, `useUpcoming()`, `useTopRated()`

5. **Homepage Assembly**
   - `src/app/page.tsx` - Assemble all sections
   - Loading states
   - Error handling

#### Deliverables:
- ✅ Hero banner với carousel
- ✅ 5 content sections với data thật
- ✅ Smooth carousel navigation
- ✅ Loading và error states

---

### **Phase 5: Movie Detail Page** (Ngày 6-7)
**Thời gian:** 10-12 giờ

#### Công việc:
1. **Movie Detail Layout**
   - `src/app/movies/[id]/page.tsx` - Main detail page
   - Backdrop image + poster
   - Title, tagline, overview
   - Genres, runtime, release date
   - Rating và vote count

2. **Detail Components**
   - `src/components/features/movie/MovieHero.tsx` - Hero section
   - `src/components/features/movie/MovieInfo.tsx` - Movie information
   - `src/components/features/movie/CastSection.tsx` - Cast carousel
   - `src/components/features/movie/TrailersSection.tsx` - Video player
   - `src/components/features/movie/ReviewsSection.tsx` - Reviews list
   - `src/components/features/movie/SimilarMovies.tsx` - Similar movies
   - `src/components/features/movie/Recommendations.tsx` - Recommendations
   - `src/components/features/movie/ImagesSection.tsx` - Image gallery với lightbox

3. **Features**
   - Share to social media (Facebook, Twitter, WhatsApp)
   - Save to Recently Viewed (localStorage)
   - Lightbox cho images

4. **API Hooks**
   - `useMovieDetails()`, `useMovieCredits()`, `useMovieVideos()`
   - `useMovieReviews()`, `useSimilarMovies()`, `useMovieRecommendations()`
   - `useMovieImages()`

#### Deliverables:
- ✅ Movie detail page đầy đủ thông tin
- ✅ Cast, trailers, reviews, similar movies
- ✅ Image gallery với lightbox
- ✅ Share to social media
- ✅ Recently viewed tracking

---

### **Phase 6: TV Shows Pages** (Ngày 8)
**Thời gian:** 8-10 giờ

#### Công việc:
1. **TV Shows Listing**
   - `src/app/tv/page.tsx` - TV shows listing với tabs
   - Trending, Popular, Top Rated, On The Air tabs
   - Pagination
   - Filter by genre

2. **TV Show Detail Page**
   - `src/app/tv/[id]/page.tsx` - Main TV show detail
   - Similar structure như movie detail
   - Seasons section với episode count
   - `src/components/features/tv/SeasonsSection.tsx`

3. **Season Detail** (Optional - có thể skip nếu thiếu thời gian)
   - `src/app/tv/[id]/season/[seasonNumber]/page.tsx`
   - Episode list
   - Episode details

4. **API Hooks**
   - `useTVShows.ts` - All TV-related hooks
   - `useTVDetails()`, `useTVCredits()`, `useTVSeasons()`

#### Deliverables:
- ✅ TV shows listing page
- ✅ TV show detail page
- ✅ Seasons information
- ✅ Similar TV shows

---

### **Phase 7: Search & Filter** (Ngày 9)
**Thời gian:** 8-10 giờ

#### Công việc:
1. **Search Page**
   - `src/app/search/page.tsx` - Main search page
   - Multi-tab search (Movies, TV Shows, People, All)
   - Search input với debouncing
   - Results grid

2. **Advanced Filters**
   - `src/components/features/search/FilterPanel.tsx`
   - Filter by:
     - Genre (multi-select)
     - Release year (range)
     - Rating (range)
     - Sort by (popularity, rating, release date)

3. **Search History**
   - `src/lib/stores/search-store.ts` - Zustand store
   - Save search history to localStorage
   - Recent searches dropdown

4. **Search Components**
   - `src/components/common/SearchBar.tsx` - Reusable search input
   - `src/components/features/search/SearchResults.tsx`
   - `src/components/features/search/SearchFilters.tsx`

5. **API Hooks**
   - `useSearch.ts` - Search hooks
   - `useSearchMovies()`, `useSearchTV()`, `useSearchPerson()`, `useSearchMulti()`
   - `useDiscover()` - For advanced filtering

#### Deliverables:
- ✅ Search page với multi-tab
- ✅ Real-time search với debouncing
- ✅ Advanced filters
- ✅ Search history tracking

---

### **Phase 8: Person/Celebrity Pages** (Ngày 10)
**Thời gian:** 6-8 giờ

#### Công việc:
1. **People Listing**
   - `src/app/person/page.tsx` - Popular people listing
   - Grid layout với person cards

2. **Person Detail Page**
   - `src/app/person/[id]/page.tsx` - Person detail
   - Profile photo, name, biography
   - Known for section
   - Filmography (Movies & TV shows tabs)
   - `src/components/features/person/PersonInfo.tsx`
   - `src/components/features/person/Filmography.tsx`
   - `src/components/features/person/PersonImages.tsx`

3. **API Hooks**
   - `usePerson.ts` - Person hooks
   - `usePopularPeople()`, `usePersonDetails()`
   - `usePersonMovieCredits()`, `usePersonTVCredits()`
   - `usePersonImages()`

#### Deliverables:
- ✅ Popular people listing
- ✅ Person detail với full bio
- ✅ Complete filmography
- ✅ Person images gallery

---

### **Phase 9: SEO & Accessibility** (Ngày 11)
**Thời gian:** 6-8 giờ

#### Công việc:
1. **SEO Optimization**
   - `src/app/layout.tsx` - Root metadata
   - Dynamic metadata cho mỗi page
   - Open Graph tags
   - Twitter Card tags
   - Canonical URLs
   - `src/app/sitemap.ts` - Dynamic sitemap generation
   - `src/app/robots.ts` - robots.txt generation
   - Structured data (JSON-LD) cho movies/TV shows

2. **Accessibility**
   - ARIA labels cho tất cả interactive elements
   - Keyboard navigation support
   - Focus indicators
   - Alt text cho images
   - Semantic HTML
   - Screen reader testing

3. **Performance Optimization**
   - Image optimization với Next.js Image
   - Lazy loading cho images và components
   - Code splitting
   - Bundle analysis

#### Deliverables:
- ✅ SEO meta tags đầy đủ
- ✅ Dynamic sitemap và robots.txt
- ✅ Structured data JSON-LD
- ✅ Full accessibility support
- ✅ Performance optimized

---

### **Phase 10: Testing** (Ngày 11-12)
**Thời gian:** 6-8 giờ

#### Công việc:
1. **Unit Tests (Vitest)**
   - `tests/unit/components/MovieCard.test.tsx`
   - `tests/unit/components/SearchBar.test.tsx`
   - `tests/unit/hooks/useMovies.test.ts`
   - `tests/unit/utils/helpers.test.ts`
   - Target: 70% coverage cho critical paths

2. **E2E Tests (Playwright)**
   - `tests/e2e/homepage.spec.ts` - Homepage navigation
   - `tests/e2e/search.spec.ts` - Search functionality
   - `tests/e2e/movie-detail.spec.ts` - Movie detail interactions
   - `tests/e2e/theme-toggle.spec.ts` - Theme switching

3. **Test Scripts**
   ```json
   {
     "test": "vitest",
     "test:ui": "vitest --ui",
     "test:coverage": "vitest --coverage",
     "test:e2e": "playwright test",
     "test:e2e:ui": "playwright test --ui"
   }
   ```

#### Deliverables:
- ✅ Unit tests cho critical components
- ✅ E2E tests cho main user flows
- ✅ 70% test coverage đạt được

---

### **Phase 11: Final Polish & Deployment** (Ngày 12)
**Thời gian:** 4-6 giờ

#### Công việc:
1. **Final Touches**
   - Bug fixes
   - UI polish
   - Animation tweaks
   - Loading states refinement
   - Error handling improvements

2. **Documentation**
   - `README.md` - Project overview, setup instructions
   - `CONTRIBUTING.md` - Contribution guidelines
   - Code comments
   - API documentation

3. **Vercel Analytics Setup**
   - Add `@vercel/analytics` to layout
   - Configure analytics dashboard

4. **Pre-deployment Checklist**
   - [ ] All features working
   - [ ] Tests passing
   - [ ] Build successful
   - [ ] Environment variables documented
   - [ ] README complete

5. **GitHub & Deployment**
   - Push code to GitHub repository
   - Provide repo URL to user
   - User deploys to Vercel
   - Post-deployment testing
   - Monitor analytics

#### Deliverables:
- ✅ Bug-free production build
- ✅ Complete documentation
- ✅ GitHub repository ready
- ✅ Deployed to Vercel
- ✅ Analytics configured

---

## 🎨 Design Guidelines

### Theme
- **Dark Mode (Default):** 
  - Background: `#0a0a0a`, `#121212`
  - Text: `#ffffff`, `#e0e0e0`
  - Accent: TMDB Blue `#01b4e4` hoặc custom brand color
  
- **Light Mode:**
  - Background: `#ffffff`, `#f5f5f5`
  - Text: `#0a0a0a`, `#333333`
  - Accent: Same as dark mode

### Typography
- Font: System fonts (Geist Sans/Mono hoặc Inter)
- Headings: Bold, clear hierarchy
- Body: 16px base, 1.5 line-height

### Spacing
- Consistent spacing scale: 4px, 8px, 16px, 24px, 32px, 48px
- Container max-width: 1280px
- Mobile-first responsive breakpoints

### Animations
- Page transitions: Framer Motion
- Hover effects: Scale, opacity, color changes
- Carousel: Smooth scroll với momentum
- Duration: 200-300ms for micro-interactions, 400-600ms for page transitions

---

## 🔑 Environment Variables

```env
# .env.local
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

---

## 📦 Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

---

## ✅ Success Criteria

- [ ] Tất cả features hoạt động như mô tả
- [ ] UI/UX mượt mà với animations
- [ ] Dark/Light theme toggle hoạt động
- [ ] Bilingual support (Vietnamese & English)
- [ ] SEO optimized (meta tags, sitemap, structured data)
- [ ] Accessibility compliant (WCAG 2.1 AA)
- [ ] Test coverage ≥ 70% cho critical paths
- [ ] Build size optimized (< 1MB first load JS)
- [ ] Lighthouse score: Performance > 90, Accessibility > 95
- [ ] Deployed successfully on Vercel
- [ ] Analytics tracking hoạt động

---

## 🚀 Post-Launch Tasks

1. **Monitoring**
   - Check Vercel Analytics daily
   - Monitor error logs
   - Track Core Web Vitals

2. **Potential Enhancements** (Future)
   - User authentication & watchlist
   - Personal ratings & reviews
   - Movie/TV show recommendations based on preferences
   - Advanced search với AI
   - PWA support
   - Multi-language support (thêm ngôn ngữ)

---

## 📞 Support & Resources

- **TMDB API Docs:** https://developers.themoviedb.org/3
- **Next.js 16 Docs:** https://nextjs.org/docs
- **Shadcn/ui Docs:** https://ui.shadcn.com
- **Framer Motion Docs:** https://www.framer.com/motion
- **React Query Docs:** https://tanstack.com/query/latest

---

**Last Updated:** March 9, 2026  
**Version:** 1.0.0  
**Author:** OpenCode Agent
