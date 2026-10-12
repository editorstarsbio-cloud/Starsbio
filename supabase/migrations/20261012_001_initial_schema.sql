-- ====================================================================
-- STARBIRTHDAY SUPABASE DATABASE INITIAL MIGRATION
-- Production-ready schema with RLS, foreign keys, constraints, and indexes
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. Enumerated Types
DO $$ BEGIN
  CREATE TYPE celebrity_status AS ENUM ('draft', 'in_review', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE verification_status AS ENUM ('unverified', 'pending', 'verified', 'flagged');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE job_status AS ENUM ('pending', 'running', 'completed', 'failed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ====================================================================
-- Table A: celebrities
-- ====================================================================
CREATE TABLE IF NOT EXISTS celebrities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  normalized_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  birth_date DATE NOT NULL,
  death_date DATE,
  birthplace TEXT,
  biography TEXT,
  primary_profession TEXT,
  zodiac_sign TEXT,
  image_url TEXT,
  image_alt TEXT,
  status celebrity_status NOT NULL DEFAULT 'draft',
  content_rights_status TEXT NOT NULL DEFAULT 'unreviewed',
  fact_check_status verification_status NOT NULL DEFAULT 'unverified',
  source_verified_at TIMESTAMPTZ,
  seo_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  CONSTRAINT chk_celebrity_dates CHECK (death_date IS NULL OR death_date >= birth_date)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_celebrities_slug ON celebrities(slug);
CREATE INDEX IF NOT EXISTS idx_celebrities_status ON celebrities(status);
CREATE INDEX IF NOT EXISTS idx_celebrities_birth_date ON celebrities(birth_date);
CREATE INDEX IF NOT EXISTS idx_celebrities_birth_month_day ON celebrities (EXTRACT(MONTH FROM birth_date), EXTRACT(DAY FROM birth_date));
CREATE INDEX IF NOT EXISTS idx_celebrities_zodiac_sign ON celebrities(zodiac_sign);
CREATE INDEX IF NOT EXISTS idx_celebrities_primary_profession ON celebrities(primary_profession);
CREATE INDEX IF NOT EXISTS idx_celebrities_normalized_name_trgm ON celebrities USING gin (normalized_name gin_trgm_ops);

-- ====================================================================
-- Table B: categories
-- ====================================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- ====================================================================
-- Table C: celebrity_categories
-- ====================================================================
CREATE TABLE IF NOT EXISTS celebrity_categories (
  celebrity_id UUID NOT NULL REFERENCES celebrities(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (celebrity_id, category_id)
);

CREATE INDEX IF NOT EXISTS idx_celebrity_categories_category_id ON celebrity_categories(category_id);

-- ====================================================================
-- Table D: celebrity_sources
-- ====================================================================
CREATE TABLE IF NOT EXISTS celebrity_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  celebrity_id UUID NOT NULL REFERENCES celebrities(id) ON DELETE CASCADE,
  source_name TEXT NOT NULL,
  source_url TEXT,
  source_type TEXT NOT NULL DEFAULT 'web',
  accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  verification_status verification_status NOT NULL DEFAULT 'unverified',
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_celebrity_sources_celebrity_id ON celebrity_sources(celebrity_id);

-- ====================================================================
-- Table E: celebrity_relationships
-- ====================================================================
CREATE TABLE IF NOT EXISTS celebrity_relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_celebrity_id UUID NOT NULL REFERENCES celebrities(id) ON DELETE CASCADE,
  to_celebrity_id UUID NOT NULL REFERENCES celebrities(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  editorial_note TEXT,
  review_status verification_status NOT NULL DEFAULT 'unverified',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_no_self_relationship CHECK (from_celebrity_id <> to_celebrity_id),
  CONSTRAINT uq_celebrity_relationship UNIQUE (from_celebrity_id, to_celebrity_id, relationship_type)
);

CREATE INDEX IF NOT EXISTS idx_celebrity_relationships_from ON celebrity_relationships(from_celebrity_id);
CREATE INDEX IF NOT EXISTS idx_celebrity_relationships_to ON celebrity_relationships(to_celebrity_id);

-- ====================================================================
-- Table F: redirects
-- ====================================================================
CREATE TABLE IF NOT EXISTS redirects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  old_path TEXT NOT NULL UNIQUE,
  new_path TEXT NOT NULL,
  status_code INT NOT NULL DEFAULT 301,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_no_redirect_loop CHECK (old_path <> new_path)
);

CREATE INDEX IF NOT EXISTS idx_redirects_old_path ON redirects(old_path);

-- ====================================================================
-- Table G: content_revisions
-- ====================================================================
CREATE TABLE IF NOT EXISTS content_revisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  revision_data JSONB NOT NULL,
  change_summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_revisions_entity ON content_revisions(entity_type, entity_id);

-- ====================================================================
-- Table H: import_jobs
-- ====================================================================
CREATE TABLE IF NOT EXISTS import_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  status job_status NOT NULL DEFAULT 'pending',
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  imported_count INT NOT NULL DEFAULT 0,
  updated_count INT NOT NULL DEFAULT 0,
  skipped_count INT NOT NULL DEFAULT 0,
  error_count INT NOT NULL DEFAULT 0,
  error_summary JSONB
);

-- ====================================================================
-- Table I: daily_jobs
-- ====================================================================
CREATE TABLE IF NOT EXISTS daily_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_type TEXT NOT NULL,
  execution_date DATE NOT NULL,
  status job_status NOT NULL DEFAULT 'pending',
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  result_summary JSONB
);

CREATE INDEX IF NOT EXISTS idx_daily_jobs_type_date ON daily_jobs(job_type, execution_date);

-- ====================================================================
-- Table J: site_settings
-- ====================================================================
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
  ('brand_name', '"StarBirthday"'),
  ('site_title', '"StarBirthday — Discover Celebrity Birthdays & Biographies"'),
  ('site_description', '"Explore birthdays, ages, biographies, zodiac signs, and life milestones of global celebrities, public figures, and creators."'),
  ('default_timezone', '"Europe/Berlin"')
ON CONFLICT (key) DO NOTHING;

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Mandatory strict access control:
-- Anonymous/public visitors can ONLY read PUBLISHED and APPROVED records.
-- Write operations (INSERT, UPDATE, DELETE) are completely blocked for public.
-- Service role key bypasses RLS for CLI scripts and secure backend operations.
-- ====================================================================

ALTER TABLE celebrities ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE celebrity_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE celebrity_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE celebrity_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE import_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 1. celebrities: Public can only SELECT published records
CREATE POLICY "Public read published celebrities"
  ON celebrities
  FOR SELECT
  TO public
  USING (status = 'published');

-- 2. categories: Public can read all categories
CREATE POLICY "Public read categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

-- 3. celebrity_categories: Public can read relationships for published celebrities
CREATE POLICY "Public read celebrity categories"
  ON celebrity_categories
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM celebrities c
      WHERE c.id = celebrity_categories.celebrity_id
      AND c.status = 'published'
    )
  );

-- 4. celebrity_sources: Public can read sources for published celebrities
CREATE POLICY "Public read celebrity sources"
  ON celebrity_sources
  FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM celebrities c
      WHERE c.id = celebrity_sources.celebrity_id
      AND c.status = 'published'
    )
  );

-- 5. celebrity_relationships: Public can read verified relationships
CREATE POLICY "Public read celebrity relationships"
  ON celebrity_relationships
  FOR SELECT
  TO public
  USING (
    review_status = 'verified' AND
    EXISTS (SELECT 1 FROM celebrities c1 WHERE c1.id = celebrity_relationships.from_celebrity_id AND c1.status = 'published') AND
    EXISTS (SELECT 1 FROM celebrities c2 WHERE c2.id = celebrity_relationships.to_celebrity_id AND c2.status = 'published')
  );

-- 6. redirects: Public can read redirects
CREATE POLICY "Public read redirects"
  ON redirects
  FOR SELECT
  TO public
  USING (true);

-- 7. site_settings: Public can read site settings
CREATE POLICY "Public read site settings"
  ON site_settings
  FOR SELECT
  TO public
  USING (true);

-- No public policies exist for content_revisions, import_jobs, or daily_jobs.
-- No public INSERT, UPDATE, or DELETE policies exist for ANY table.
