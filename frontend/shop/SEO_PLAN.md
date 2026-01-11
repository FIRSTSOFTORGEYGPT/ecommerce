# SEO Implementation Plan

> Exported: 2026-01-10

## Progress Overview

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | ⏳ Later | Core Infrastructure (robots.txt, sitemap) |
| Phase 2 | ✅ Done | Page-Specific Meta Tags |
| Phase 3 | ⏳ Later | Structured Data (JSON-LD) |
| Phase 4 | ⏳ Later | Internationalization SEO |
| Phase 5 | ⏳ Later | Additional Optimizations |

---

## ✅ Completed

- [x] Basic `default-seo.tsx` with global meta tags
- [x] Localized SEO keys in `en/common.json` and `ar/common.json`
- [x] Site name updated to "Meem Market"

---

## ✅ Phase 2: Page-Specific Meta Tags (Completed)

### Tasks
- [x] Add `NextSeo` to `index.tsx` (homepage)
- [x] Add `NextSeo` to `products/[slug].tsx` with dynamic product data
- [x] Add `NextSeo` to `category/[slug].tsx` with dynamic category data
- [x] Add `NextSeo` to `search.tsx`
- [x] Add `NextSeo` to `contact-us.tsx`
- [x] Add `NextSeo` to `faq.tsx`
- [x] Add `NextSeo` to `terms.tsx`
- [x] Add `NextSeo` to `privacy.tsx`

---

## ⏳ Phase 1: Core Infrastructure (Later)

- [ ] Add `public/robots.txt`
- [ ] Install `next-sitemap` package
- [ ] Configure `next-sitemap.config.js`

---

## ⏳ Phase 3: Structured Data (Later)

- [ ] Create `ProductJsonLd` component
- [ ] Create `OrganizationJsonLd` component
- [ ] Create `BreadcrumbJsonLd` component
- [ ] Add JSON-LD to product pages
- [ ] Add JSON-LD to `_app.tsx` for organization

---

## ⏳ Phase 4: Internationalization SEO (Later)

- [ ] Add hreflang tags via `languageAlternates`
- [ ] Update `default-seo.tsx` with dynamic locale

---

## ⏳ Phase 5: Additional Optimizations (Later)

- [ ] Add preconnect hints to `_document.tsx`
- [ ] Audit image alt tags
- [ ] Add canonical URLs per page
