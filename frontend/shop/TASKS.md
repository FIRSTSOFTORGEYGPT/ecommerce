# Production Hardening Tasks

## 🔴 Critical Issues (Week 1)
- [x] Fix axios timeout (300M ms → 15s) <!-- id: 1 -->
- [x] Remove console.log from request.ts <!-- id: 2 -->
- [x] Remove console.log from auth.ts <!-- id: 3 -->
- [x] Remove console.log from middleware.ts <!-- id: 4 -->
- [x] Remove console.log from puck/client.tsx <!-- id: 5 -->
- [x] Remove console.log from other files <!-- id: 6 -->
- [x] Remove ignoreBuildErrors from next.config.js <!-- id: 7 -->
- [x] Remove ignoreDuringBuilds from next.config.js <!-- id: 8 -->
- [x] Fix TypeScript errors revealed after removing suppressions <!-- id: 9 -->
- [ ] Protect CMS routes with authentication <!-- id: 10 -->

## 🟠 High Severity (Week 2)
- [ ] Add Error Boundaries <!-- id: 11 -->
- [ ] Implement global error handling <!-- id: 12 -->
- [ ] Add robots.txt <!-- id: 13 -->
- [ ] Add sitemap.xml <!-- id: 14 -->

## 🟡 Medium Severity (Week 3)
- [ ] Fix @ts-ignore usages <!-- id: 15 -->
- [ ] Add monitoring (Sentry) <!-- id: 16 -->
- [x] Update package name to Meem Market <!-- id: 17 -->
