# NT Movies V2

A modern, feature-rich movie database application built with Next.js 16, React 19, and The Movie Database (TMDB) API.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

- **🎬 Browse Movies & TV Shows**: Explore trending, popular, now playing, upcoming, and top-rated content
- **🔍 Advanced Search**: Multi-tab search interface for movies, TV shows, and celebrities
- **📱 Fully Responsive**: Optimized for all devices with mobile-first design
- **🌓 Dark/Light Theme**: Toggle between dark and light modes with smooth transitions
- **🌍 Internationalization**: English and Vietnamese language support
- **⚡ Performance Optimized**: Built with Next.js 16 App Router and Turbopack
- **♿ Accessible**: WCAG-compliant with semantic HTML and ARIA labels
- **🔎 SEO Optimized**: Complete metadata, OpenGraph, Twitter Cards, and JSON-LD structured data
- **✅ Well Tested**: 100% statement & function coverage with Vitest

## Tech Stack

### Core
- **Framework**: [Next.js 16.1.6](https://nextjs.org/) with App Router & Turbopack
- **UI Library**: [React 19.2.4](https://react.dev/)
- **Language**: [TypeScript 5.3.0](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4.19](https://tailwindcss.com/)

### UI Components & Styling
- **Component Library**: [Shadcn/ui](https://ui.shadcn.com/) (New York style)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

### State & Data Management
- **Server State**: [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
- **Client State**: [Zustand 5](https://github.com/pmndrs/zustand) with persistence
- **HTTP Client**: [Axios 1.13.6](https://axios-http.com/)

### Internationalization
- **i18n**: [react-i18next](https://react.i18next.com/)
- **Languages**: English & Vietnamese

### Testing
- **Unit Tests**: [Vitest 4](https://vitest.dev/)
- **Testing Library**: [@testing-library/react](https://testing-library.com/react)
- **E2E Tests**: [Playwright](https://playwright.dev/)
- **Coverage**: 100% statement & function coverage

### Development Tools
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- **Node.js**: v20.x or higher
- **pnpm**: v8.x or higher (install with `npm install -g pnpm`)
- **TMDB API Key**: Get one from [TMDB](https://www.themoviedb.org/settings/api)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tinnhat/nt-movies-2.git
   cd nt-movies-2
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up environment variables**:
   
   Create a `.env.local` file in the root directory:
   ```env
   # TMDB API Configuration
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
   NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   Replace `your_tmdb_api_key_here` with your actual TMDB API key.

4. **Run the development server**:
   ```bash
   pnpm dev
   ```

5. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run unit tests in watch mode
- `pnpm test:coverage` - Generate test coverage report
- `pnpm test:ui` - Run tests with Vitest UI
- `pnpm test:e2e` - Run E2E tests with Playwright

## Project Structure

```
nt-movies-v2/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Homepage
│   ├── movie/               # Movie pages
│   ├── tv/                  # TV show pages
│   ├── person/              # Person/celebrity pages
│   └── search/              # Search pages
├── components/              # React components
│   ├── common/              # Shared components
│   ├── layout/              # Layout components
│   └── ui/                  # Shadcn/ui components
├── lib/                     # Core library code
│   ├── api/                 # TMDB API client & types
│   ├── hooks/               # React Query hooks (40+ hooks)
│   ├── stores/              # Zustand stores
│   ├── providers/           # React context providers
│   ├── i18n/                # i18next configuration
│   └── utils/               # Utility functions
├── public/                  # Static assets
│   └── locales/             # Translation files
├── __tests__/               # Test files
└── ...config files
```

## Key Features Implementation

### 🎨 Theme System
- Dark mode (default) and light mode
- Smooth transitions between themes
- Persisted user preference
- System preference detection

### 🌐 Internationalization
- English and Vietnamese languages
- Dynamic language switching
- Persisted language preference
- Localized dates, numbers, and text

### 🔍 SEO Optimization
- Dynamic metadata generation
- OpenGraph & Twitter Card tags
- JSON-LD structured data (Schema.org)
- Canonical URLs
- Sitemap generation ready

### 📊 State Management
- **Server State**: TanStack Query for API data with caching
- **Client State**: Zustand for UI state
- **Persistent State**: localStorage integration for preferences
- **Search History**: Last 10 searches saved
- **Recently Viewed**: Last 20 items tracked

### 🎭 Component Architecture
- Server Components for data fetching & SEO
- Client Components for interactivity
- Reusable UI components from Shadcn/ui
- Type-safe props with TypeScript
- Accessible with ARIA labels

## API Integration

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) for all movie and TV show data.

### Available Endpoints:
- Movies: trending, popular, now playing, upcoming, top rated, details
- TV Shows: trending, popular, on air, airing today, top rated, details
- Search: multi-search, movies, TV shows, people
- Person: details, credits, images
- Genres: movie genres, TV genres

See [API_ENDPOINTS.md](./API_ENDPOINTS.md) for complete documentation.

## Testing

The project includes comprehensive tests:

```bash
# Run unit tests
pnpm test

# Generate coverage report
pnpm test:coverage

# Run tests with UI
pnpm test:ui
```

### Test Coverage:
- **144 unit tests** covering all utility functions and stores
- **100% statement coverage**
- **100% function coverage**
- **94.79% branch coverage**

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_TMDB_API_KEY`
   - `NEXT_PUBLIC_TMDB_BASE_URL`
   - `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL`
   - `NEXT_PUBLIC_SITE_URL` (your production URL)
4. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Documentation

- [📋 Project Plan](./PROJECT_PLAN.md) - 11-phase implementation plan
- [🛠 Tech Stack](./TECH_STACK.md) - Detailed technology documentation
- [✨ Features](./FEATURES.md) - Complete feature specifications
- [🔌 API Endpoints](./API_ENDPOINTS.md) - TMDB API reference
- [🧪 Testing Guide](./TESTING_GUIDE.md) - Testing strategy and guidelines
- [🚀 Deployment](./DEPLOYMENT.md) - Deployment guide

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

This project is for educational purposes. All movie data and images are provided by TMDB.

## Credits

- **Movie Data**: [The Movie Database (TMDB)](https://www.themoviedb.org/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/)

## Author

**Nguyen Nhat Tin**
- GitHub: [@tinnhat](https://github.com/tinnhat)
- Project: [NT Movies V2](https://github.com/tinnhat/nt-movies-2)

---

Built with ❤️ using Next.js 16, React 19, and TypeScript
