# CodLinex Digital Automation Agent — Claude Guidelines

## Project Context

CodLinex (codlinex.com) — US AI automation agency website. Hosted on Vercel. Auto-deploys on `git push`.

## GEO Rules

- All content must be **bilingual EN + TR** — site uses JS geolocation toggle, GEO bots from Turkey see Turkish
- **Never commit** `AUTHORITY_SETUP.md` — contains platform credentials
- Key GEO files: `robots.txt`, `llms.txt`, `ai/summary.json`, `ai/faq.json`, `ai/service.json`, `.well-known/ai.json`
- `ai/summary.json`: `description` must always be at JSON **root level** (not nested in `en`/`tr`)
- `vercel.json` must include Content-Type headers for `/ai/*` and `/.well-known/*` paths

## Active Skills

- **aaron-seo-geo v9.9.10** — `/aaron:audit https://codlinex.com` for full SEO+GEO+authority audit
- **geo-optimizer-skill** — `geo audit --url https://codlinex.com --format json` for scored audit

## GEO Score (last updated: 2026-07-03)

**95/100 — EXCELLENT** | Baseline: 19/100 | +76 points
Timeline: 19 (baseline) → 77 (2026-06-23, GOOD) → 90 → 95 (2026-07-03, EXCELLENT)

95 is the honest ceiling for the homepage — remaining 5 points require a 5,000+ word
llms.txt (unrealistic) and an Article schema on the homepage (semantically wrong, left
deliberately). Full history: `C:\Users\Pc\Desktop\HERMES AGENT SYS\memory\audits\`.

## Component Authoring

- **Always write components as arrow functions.**
  ```js
  // Correct
  const MyComponent = () => { ... };

  // Wrong
  function MyComponent() { ... }
  ```
  This applies to all JavaScript/TypeScript components, helpers, and UI functions in this project.
