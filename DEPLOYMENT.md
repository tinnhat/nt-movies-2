# NT Movies V2 - Deployment Guide

## 📚 Tổng Quan

Document này hướng dẫn chi tiết cách deploy NT Movies V2 lên Vercel, bao gồm setup, configuration, và best practices.

---

## 🚀 Deployment to Vercel

### Prerequisites
- ✅ GitHub account
- ✅ Vercel account (sign up tại https://vercel.com)
- ✅ TMDB API Key
- ✅ Code đã push lên GitHub repository

---

## 📦 Step 1: Prepare for Deployment

### 1.1 Build Test Locally
```bash
# Test production build locally
pnpm build

# Check build output
ls -la .next

# Test production server
pnpm start
```

**Kiểm tra:**
- ✅ Build successful (no errors)
- ✅ All pages load correctly
- ✅ Images display properly
- ✅ API calls work
- ✅ No console errors

---

### 1.2 Environment Variables
Tạo file `.env.example` để document các biến cần thiết:

```bash
# .env.example
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

**⚠️ Important:** Never commit `.env.local` to Git!

---

### 1.3 Update package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:e2e": "playwright test"
  }
}
```

---

## 🔧 Step 2: Push to GitHub

### 2.1 Initialize Git (if not already)
```bash
git init
git add .
git commit -m "Initial commit: NT Movies V2 project"
```

### 2.2 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `nt-movies-v2`
3. Description: "Movie database app with Next.js 16 & TMDB API"
4. Visibility: Public hoặc Private (your choice)
5. **Do NOT** initialize with README (đã có sẵn)
6. Click "Create repository"

### 2.3 Push Code to GitHub
```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/nt-movies-v2.git

# Push code
git branch -M main
git push -u origin main
```

---

## 🌐 Step 3: Deploy to Vercel

### 3.1 Import Project
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account và repository `nt-movies-v2`
4. Click "Import"

### 3.2 Configure Project

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./` (default)

**Build Command:** 
```bash
pnpm build
```

**Output Directory:** 
```
.next
```

**Install Command:**
```bash
pnpm install
```

### 3.3 Environment Variables
Add các biến môi trường trong Vercel dashboard:

**Settings → Environment Variables**

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_TMDB_API_KEY` | `your_actual_api_key` | Production, Preview, Development |
| `NEXT_PUBLIC_TMDB_BASE_URL` | `https://api.themoviedb.org/3` | All |
| `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` | `https://image.tmdb.org/t/p` | All |

**⚠️ Important:** 
- `NEXT_PUBLIC_` prefix cho client-side variables
- Production environment = live site
- Preview = pull request previews
- Development = `vercel dev` local

### 3.4 Deploy
1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Vercel sẽ show URL khi done: `https://nt-movies-v2.vercel.app`

---

## ✅ Step 4: Post-Deployment Verification

### 4.1 Test Deployment
Visit your Vercel URL và check:

- [ ] Homepage loads
- [ ] Hero banner displays
- [ ] Movie cards show images
- [ ] Search works
- [ ] Movie detail pages load
- [ ] Theme toggle works
- [ ] Language toggle works
- [ ] No console errors
- [ ] Images load (TMDB images)
- [ ] API calls successful

### 4.2 Check Vercel Analytics
1. Go to Vercel Dashboard → Your Project
2. Click "Analytics" tab
3. Verify analytics tracking works

### 4.3 Run Lighthouse Audit
```bash
# In Chrome DevTools
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select: Performance, Accessibility, Best Practices, SEO
4. Click "Analyze page load"
```

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: 100

---

## 🔄 Continuous Deployment

### Automatic Deployments
Vercel automatically deploys on:
- ✅ Push to `main` branch → Production
- ✅ Push to other branches → Preview deployment
- ✅ Pull requests → Preview deployment

### Manual Deployment
```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

---

## 🎨 Custom Domain (Optional)

### Add Custom Domain
1. Go to Vercel Dashboard → Your Project
2. Click "Settings" → "Domains"
3. Add domain (e.g., `ntmovies.com`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

### DNS Configuration Example
**For Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 📊 Vercel Dashboard Features

### 1. Deployments
- View all deployments
- Rollback to previous versions
- Preview deployments
- Deployment logs

### 2. Analytics
- Page views
- Unique visitors
- Top pages
- Top referrers
- Core Web Vitals (LCP, FID, CLS)

### 3. Logs
- Runtime logs
- Build logs
- Error tracking
- Filter by time range

### 4. Environment Variables
- Add/Edit/Delete variables
- Per-environment settings
- Redeploy to apply changes

### 5. Settings
- Domains
- Git integration
- Functions
- Build & Output settings
- Security (CORS, Headers)

---

## 🔒 Security Configuration

### Content Security Policy (Optional)
Add to `next.config.ts`:

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

### API Rate Limiting
Add edge config hoặc middleware để protect API routes (if using proxy):

```typescript
// middleware.ts (if needed)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add rate limiting logic
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*'
};
```

---

## 🚀 Performance Optimization

### 1. Image Optimization
Next.js automatically optimizes images:
- WebP format
- Responsive sizes
- Lazy loading
- Blur placeholder

**Already configured in project**

### 2. Caching Strategy
```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org'
      }
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7 // 7 days
  }
};
```

### 3. Edge Functions (Optional)
For API routes với low latency:

```typescript
// app/api/movies/route.ts
export const runtime = 'edge';

export async function GET(request: Request) {
  // Your API logic
}
```

---

## 📈 Monitoring & Analytics

### 1. Vercel Analytics
Already integrated via `@vercel/analytics`:

```tsx
// app/layout.tsx
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
- Real User Monitoring (RUM)
- Core Web Vitals
- Page load times
- User interactions

### 2. Error Tracking (Optional)
Integrate Sentry for error monitoring:

```bash
pnpm add @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0
});
```

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm build
```

**Error: "Environment variable not found"**
- Check Vercel dashboard → Environment Variables
- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Redeploy after adding variables

### Images Not Loading

**TMDB images 403 error:**
- Check API key is valid
- Verify `NEXT_PUBLIC_TMDB_API_KEY` in Vercel
- Check TMDB image domains in `next.config.ts`

**Fix:**
```typescript
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**'
      }
    ]
  }
};
```

### API Rate Limiting

**TMDB API 429 error:**
- Implement React Query caching (already done)
- Increase `staleTime` in queries
- Consider caching on Vercel Edge

```tsx
// Increase cache time
export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(id),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000 // 30 minutes
  });
};
```

### Slow Performance

**Check bundle size:**
```bash
pnpm add -D @next/bundle-analyzer
```

```typescript
// next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer(nextConfig);
```

```bash
ANALYZE=true pnpm build
```

**Optimize:**
- Dynamic imports for heavy components
- Reduce bundle size
- Optimize images
- Enable compression

---

## 🔄 Rollback Deployment

### Via Vercel Dashboard
1. Go to "Deployments"
2. Find previous working deployment
3. Click "..." menu
4. Click "Promote to Production"

### Via Vercel CLI
```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

---

## 📝 Deployment Checklist

### Pre-Deployment
- [ ] Code builds successfully locally
- [ ] All tests passing
- [ ] Environment variables documented
- [ ] `.env.local` not committed
- [ ] Images optimized
- [ ] Bundle size acceptable
- [ ] No console errors/warnings
- [ ] Lighthouse scores acceptable

### Deployment
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Build successful on Vercel
- [ ] Production URL accessible

### Post-Deployment
- [ ] Homepage loads correctly
- [ ] All features working
- [ ] Images displaying
- [ ] API calls successful
- [ ] Analytics tracking
- [ ] No console errors
- [ ] Lighthouse audit passed
- [ ] Mobile responsive
- [ ] Theme toggle works
- [ ] Language toggle works

---

## 🎯 Next Steps

After successful deployment:

1. **Monitor Analytics**
   - Check Vercel Analytics daily
   - Review Core Web Vitals
   - Track user behavior

2. **SEO Optimization**
   - Submit sitemap to Google Search Console
   - Add site to Bing Webmaster Tools
   - Monitor search rankings

3. **Performance Monitoring**
   - Set up alerts for errors
   - Monitor API rate limits
   - Track page load times

4. **User Feedback**
   - Collect user feedback
   - Fix reported bugs
   - Implement feature requests

5. **Regular Updates**
   - Update dependencies monthly
   - Security patches
   - New features based on feedback

---

## 📚 Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Vercel CLI:** https://vercel.com/docs/cli
- **Analytics Guide:** https://vercel.com/docs/analytics
- **Custom Domains:** https://vercel.com/docs/concepts/projects/custom-domains

---

## 🆘 Support

### Vercel Support
- Email: support@vercel.com
- Docs: https://vercel.com/support
- Community: https://github.com/vercel/next.js/discussions

### TMDB API Support
- Docs: https://developers.themoviedb.org/3
- Forum: https://www.themoviedb.org/talk
- Status: https://status.themoviedb.org

---

**Last Updated:** March 9, 2026  
**Version:** 1.0.0  
**Maintained By:** OpenCode Agent
