# StarBirthday — Production Celebrity Birthday & Biography Platform

A high-performance, full-stack celebrity discovery and biography platform built with Next.js App Router, TypeScript, Tailwind CSS, and Supabase PostgreSQL.

---

## 1. Project Overview & Architecture

**StarBirthday** allows users to discover celebrities, public figures, dynamic ages, biographies, zodiac signs, and chronological birthday archives.

- **Frontend & App Architecture:** Next.js App Router (React Server Components, server-side dynamic rendering, minimal client JavaScript).
- **Styling:** Tailwind CSS with responsive, accessible layout and aesthetic initials placeholders.
- **Database & Storage:** Supabase PostgreSQL with strict Row Level Security (RLS).
- **Import Engine:** Safe, server-side CLI import pipeline with dry-run verification, duplicate prevention, and date validation.
- **Strictly No Admin Panel / Web CMS:** No web admin dashboard, admin login, or browser-based write interfaces exist. All editorial approvals and data imports are executed via secure, authenticated CLI scripts.

---

## 2. Directory Structure

```
├── famous_birthdays_all.xlsx          # 17,492-row Excel dataset
├── public/
│   ├── robots.txt                    # Search crawler policy with sitemap link
│   └── llms.txt                      # AI/LLM citation reference
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Homepage with "Born Today", categories, featured
│   │   ├── layout.tsx                # Root layout with WebSite JSON-LD, header, footer
│   │   ├── sitemap.ts                # Dynamic XML sitemap generator
│   │   ├── birthdays/
│   │   │   ├── page.tsx              # 12-month calendar directory
│   │   │   ├── [month]/[day]/page.tsx# Daily archive with dynamic age and prev/next links
│   │   │   └── month/[month]/page.tsx# Monthly calendar breakdown
│   │   ├── category/
│   │   │   ├── page.tsx              # Category & profession directory
│   │   │   └── [slug]/page.tsx       # Filtered celebrity profiles by profession
│   │   ├── zodiac/
│   │   │   ├── page.tsx              # 12 zodiac signs directory
│   │   │   └── [sign]/page.tsx       # Astrological birth window profiles
│   │   ├── people/[slug]/page.tsx    # Celebrity profile page with Person JSON-LD
│   │   ├── search/page.tsx           # Search route (with noindex rule)
│   │   ├── api/cron/daily-maintenance/route.ts # Authenticated scheduled maintenance
│   │   ├── about/page.tsx            # About us
│   │   ├── editorial-policy/page.tsx # Fact-checking & editorial guidelines
│   │   ├── corrections-policy/page.tsx # Factual dispute & corrections procedure
│   │   ├── data-sources/page.tsx     # Intellectual property & data standards
│   │   ├── privacy-policy/page.tsx   # Privacy disclosure
│   │   ├── terms/page.tsx            # Terms of service
│   │   ├── disclaimer/page.tsx       # Informational & astrological disclaimer
│   │   └── contact/page.tsx          # Editorial contact information
│   ├── components/
│   │   ├── Header.tsx                # Accessible navigation with search
│   │   ├── Footer.tsx                # Footer with discovery, editorial & legal links
│   │   ├── CelebrityCard.tsx         # Profile card with dynamic age and image avatar
│   │   └── Breadcrumbs.tsx           # BreadcrumbList Schema.org component
│   ├── lib/
│   │   ├── utils.ts                  # Date parsing, dynamic age, slug, zodiac logic
│   │   ├── utils.test.ts             # Vitest unit test suite (12 tests)
│   │   ├── supabase.ts               # Public vs. Admin Supabase client factory
│   │   └── repository.ts             # Data layer with resilient fallbacks
│   ├── scripts/
│   │   ├── importCelebrities.ts      # Core Excel transformation and batch upsert engine
│   │   ├── runImport.ts              # CLI entry point for importing
│   │   └── approveCelebrities.ts     # CLI script for editorial publication approvals
│   └── types/database.ts             # Domain & database TypeScript interfaces
├── supabase/
│   └── migrations/
│       └── 20261012_001_initial_schema.sql # 10 normalized tables with RLS policies
├── .env.example                      # Documented environment template
└── vitest.config.ts                  # Test configuration
```

---

## 3. Database Schema & Supabase Setup

The database schema is fully defined in [`supabase/migrations/20261012_001_initial_schema.sql`](file:///d:/Birthday/supabase/migrations/20261012_001_initial_schema.sql).

### Tables Created:
1. `celebrities` — UUID primary key, slug (unique), birth_date, death_date, birthplace, biography, primary_profession, zodiac_sign, image_url, status (`draft`, `in_review`, `published`, `archived`), content_rights_status, fact_check_status, seo metadata.
2. `categories` — Slug (unique), name, description.
3. `celebrity_categories` — Many-to-many relationship with `is_primary` flag.
4. `celebrity_sources` — Source name, URL, verification status, and audit notes.
5. `celebrity_relationships` — Relationships between figures (prevents self-references).
6. `redirects` — 301/308 redirect mapping (prevents loops).
7. `content_revisions` — Audit log of entity edits and change summaries.
8. `import_jobs` — File name, execution logs, imported/skipped/error counts.
9. `daily_jobs` — Scheduled maintenance records and timestamps.
10. `site_settings` — Key-value configuration for brand name, timezone, and titles.

### Row Level Security (RLS) Policies:
- **Public / Anonymous Access:** Can **ONLY SELECT** records where `status = 'published'`. Anonymous writes, updates, and deletes are completely rejected.
- **Drafts and In-Review Profiles:** Invisible to public queries and search crawlers.
- **Service Role Key:** Reserved exclusively for CLI import scripts and backend cron operations.

---

## 4. Excel Import CLI Instructions

The import engine reads the 17,492-row `famous_birthdays_all.xlsx` dataset, validates dates and column headers, flags zodiac mismatches, and prevents duplicate records.

### Step 1: Run Dry-Run Validation (No Database Writes)
```bash
npm run import:dry-run
# Or specify limits and files:
npx tsx src/scripts/runImport.ts --file=famous_birthdays_all.xlsx --dry-run
```
*Dry-run validates all 17,492 rows, reporting valid counts, duplicate rows, and any row-level format errors without touching the database.*

### Step 2: Production Database Import
Ensure `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are configured in your `.env` file, then run:
```bash
npm run import:celebrities -- --file=famous_birthdays_all.xlsx
```
*Records are imported in batches of 100 with status `in_review` to protect content rights.*

### Step 3: Approve Profiles for Publication (CLI)
To publish reviewed profiles without a web admin panel:
```bash
# Preview what would be approved (dry run)
npx tsx src/scripts/approveCelebrities.ts --limit=50

# Confirm and publish reviewed profiles
npx tsx src/scripts/approveCelebrities.ts --limit=50 --confirm
```

---

## 5. Automated Tests & Build

To execute the unit test suite:
```bash
npm test
```
*Runs 12 unit tests covering date parsing, dynamic age calculation for living and deceased individuals, leap day (Feb 29) behavior, zodiac validation, and slug normalization.*

To run the production build:
```bash
npm run build
```

---

## 6. GitHub & Vercel Deployment Checklist

1. **Commit and Push to GitHub:**
   ```bash
   git add .
   git commit -m "feat: complete StarBirthday celebrity birthday and biography platform"
   git push origin main
   ```
2. **Deploy on Vercel:**
   - Link the GitHub repository in the Vercel dashboard.
   - Configure Environment Variables (from `.env.example`):
     - `NEXT_PUBLIC_SITE_URL` (e.g., `https://your-domain.com`)
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY` (secret)
     - `SITE_TIMEZONE` (e.g., `Europe/Berlin` or `America/New_York`)
     - `CRON_SECRET`
   - Deploy.
3. **Configure Custom Domain & Verify:**
   - Assign custom domain in Vercel.
   - Verify HTTPS and DNS records.
   - Test `robots.txt` at `/robots.txt` and sitemap at `/sitemap.xml`.
