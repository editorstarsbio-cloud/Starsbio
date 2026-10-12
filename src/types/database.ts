export type CelebrityStatus = 'draft' | 'in_review' | 'published' | 'archived';
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'flagged';
export type JobStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface Celebrity {
  id: string;
  name: string;
  normalized_name: string;
  slug: string;
  birth_date: string; // YYYY-MM-DD
  death_date?: string | null; // YYYY-MM-DD
  birthplace?: string | null;
  biography?: string | null;
  primary_profession?: string | null;
  zodiac_sign?: string | null;
  image_url?: string | null;
  image_alt?: string | null;
  status: CelebrityStatus;
  content_rights_status: string;
  fact_check_status: VerificationStatus;
  source_verified_at?: string | null;
  seo_title?: string | null;
  meta_description?: string | null;
  created_at: string;
  updated_at: string;
  published_at?: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CelebrityCategory {
  celebrity_id: string;
  category_id: string;
  is_primary: boolean;
}

export interface CelebritySource {
  id: string;
  celebrity_id: string;
  source_name: string;
  source_url?: string | null;
  source_type: string;
  accessed_at: string;
  verification_status: VerificationStatus;
  notes?: string | null;
}

export interface CelebrityRelationship {
  id: string;
  from_celebrity_id: string;
  to_celebrity_id: string;
  relationship_type: string;
  editorial_note?: string | null;
  review_status: VerificationStatus;
  created_at: string;
  related_celebrity?: Celebrity;
}

export interface RedirectEntry {
  id: string;
  old_path: string;
  new_path: string;
  status_code: number;
  created_at: string;
}

export interface ContentRevision {
  id: string;
  entity_type: string;
  entity_id: string;
  revision_data: Record<string, unknown>;
  change_summary?: string | null;
  created_at: string;
}

export interface ImportJob {
  id: string;
  filename: string;
  status: JobStatus;
  started_at: string;
  completed_at?: string | null;
  imported_count: number;
  updated_count: number;
  skipped_count: number;
  error_count: number;
  error_summary?: Record<string, unknown> | null;
}

export interface DailyJob {
  id: string;
  job_type: string;
  execution_date: string;
  status: JobStatus;
  started_at: string;
  completed_at?: string | null;
  result_summary?: Record<string, unknown> | null;
}

export interface SiteSettings {
  key: string;
  value: unknown;
  updated_at: string;
}

export interface ZodiacSignInfo {
  sign: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  dateRange: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  description: string;
}
