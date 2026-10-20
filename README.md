# Simba Yamoto - Hot Entertainment & News Web Application
### Single Page Application (SPA) & Progressive Web Application (PWA) with Ads Capabilities

Simba Yamoto is a modern, high-performance news and entertainment platform engineered with **React 19, TypeScript, Vite, and Cloudflare Pages edge hosting**.

---

## Key Features & Capabilities

- **SPA Architecture**: Fast client-side routing loading a single HTML page with dynamic content updates and zero full-page reloads.
- **PWA Ready**: Offline support, service worker caching (`/sw.js`), web manifest (`manifest.webmanifest`), and install-to-homescreen prompt.
- **Brand Theme**: White and Fire Red (`#dc2626`) palette with adaptive responsiveness across mobile, tablet, laptop, and ultra-wide screens.
- **Dark Mode**: Toggle between crisp White & Crimson Red and obsidian charcoal with neon red accents, with local preference memory.
- **Control Panel / Admin Dashboard (`/admin`)**:
  - Full CRUD operations for news articles (Title, Excerpt, Content, Category, Tags, Alt text, Breaking status, Featured status).
  - Ads Manager: Leaderboard (728x90), In-article native ad, Sidebar unit, Sticky mobile sponsor bar with real-time impressions and click tracking.
  - Newsletter subscriber database with CSV export.
  - UTM Campaign Link Generator for marketing and attribution.
  - SEO health audit: Single H1 check, Search Console verification, SSL header check.
- **UX & Interactivity**:
  - Sliding mobile navigation drawer.
  - Instant fuzzy site search modal (Ctrl+K shortcut).
  - Fixed scroll reading progress bar.
  - Smooth scroll back to top button.
  - Floating contact modal for news tips and scoops.
  - Sticky help widget with quick FAQs.
  - Accessible skip-to-content links.
  - Newsletter subscription with validation, honeypot spam protection, and toast alerts.
  - Password visibility toggle (Eye/EyeOff) in admin login.
  - GDPR-compliant cookie consent banner with custom preference drawer.
  - Confirmation modals for destructive actions.
  - Print stylesheet (`@media print`) for clean offline article reading.
  - One-click copy-to-clipboard button with UTM tracking attached.
  - Formatted "Published on" and "Updated X ago" semantic `<time>` tags.
- **SEO & Web Standards**:
  - Guaranteed strictly **1 `<h1>` tag per page**.
  - Dynamic meta titles, meta descriptions, and canonical tags.
  - Schema.org JSON-LD structured data (`NewsArticle`, `WebSite`, `NewsMediaOrganization`, `BreadcrumbList`).
  - `sitemap.xml` and `robots.txt` generated and configured.
  - Google Search Console verification meta tag and HTML verification file.
  - Image alt text on every graphic.
  - Clean URL slugs (`/article/:slug`, `/category/:category`).
  - Comprehensive Backlink Strategy guide (`BACKLINK_STRATEGY.md`).
- **Cloudflare Infrastructure**:
  - `public/_redirects`: `/* /index.html 200` ensures SPA client routing works seamlessly without 404s.
  - `public/_headers`: Enforces HSTS preloaded HTTPS, Content-Security-Policy, and cache headers.
  - `wrangler.toml`: Ready for `wrangler pages deploy dist`.

---

## Quick Start & Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production (Cloudflare Pages)
npm run build
```

Admin credentials:
- Route: `/admin`
- Demo Passcode: `simba2026` (or `admin`)

---

## Deployment to Cloudflare Pages

### Option 1: Cloudflare Dashboard (Recommended)
1. Push repository to GitHub or GitLab.
2. In Cloudflare Dashboard, navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Set build configuration:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Deploy! Cloudflare Pages will automatically read `_redirects` and `_headers`.

### Option 2: Cloudflare Wrangler CLI
```bash
npx wrangler pages deploy dist --project-name simba-yamoto
```
