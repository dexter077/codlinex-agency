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

## GEO Score (last updated: 2026-06-23)

**77/100 — GOOD** | Baseline: 19/100 | +58 points

Priority fixes remaining:
1. signals 3/6 → add `lang="en-US"`, RSS feed, freshness meta (+3)
2. ai_discovery 3/6 → Vercel indexing `.well-known/ai.json` and `ai/service.json` (auto, +3)
3. llms_txt 12/18 → enrich with Case Studies, Integrations sections (+4)
4. brand_entity 6/10 → LinkedIn page + Wikidata index (+4)

## Component Authoring

- **Always write components as arrow functions.**
  ```js
  // Correct
  const MyComponent = () => { ... };

  // Wrong
  function MyComponent() { ... }
  ```
  This applies to all JavaScript/TypeScript components, helpers, and UI functions in this project.
