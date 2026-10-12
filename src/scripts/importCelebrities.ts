import fs from 'fs';
import path from 'path';
import * as xlsx from 'xlsx';
import dotenv from 'dotenv';
import {
  parseDate,
  generateSlug,
  normalizeText,
  validateZodiacMatch,
  getZodiacSignFromDate,
  SITE_CONFIG,
} from '../lib/utils';
import { getAdminSupabase } from '../lib/supabase';

// Load environment variables
dotenv.config();

export interface ExcelRow {
  Name?: string;
  'Born Date'?: unknown;
  'Death Date'?: unknown;
  Age?: unknown;
  'Birth Sign'?: string;
  Birthplace?: string;
  'Category / Job Title'?: string;
  'Bio / About'?: string;
}

export interface ProcessedCelebrity {
  name: string;
  normalized_name: string;
  slug: string;
  birth_date: string;
  death_date: string | null;
  birthplace: string | null;
  biography: string | null;
  primary_profession: string | null;
  zodiac_sign: string | null;
  status: 'draft' | 'in_review' | 'published';
  content_rights_status: string;
  fact_check_status: 'unverified' | 'pending' | 'verified';
  seo_title: string;
  meta_description: string;
  category_name: string | null;
  warning_flags: string[];
}

export interface ImportSummary {
  totalRows: number;
  validRows: number;
  duplicateRows: number;
  invalidRows: number;
  imported: number;
  updated: number;
  skipped: number;
  failed: number;
  errors: { row: number; name?: string; message: string }[];
  warnings: { row: number; name?: string; message: string }[];
}

/**
 * Validates and transforms a single Excel row into a clean entity
 */
export function validateAndTransformRow(
  row: ExcelRow,
  rowIndex: number,
  seenSlugs: Map<string, number>,
  options: { autoPublish?: boolean } = {}
): { entity?: ProcessedCelebrity; error?: string; warning?: string } {
  const rawName = typeof row.Name === 'string' ? row.Name.trim() : '';
  if (!rawName) {
    return { error: 'Missing celebrity name' };
  }

  // Parse birth date
  const birthDate = parseDate(row['Born Date']);
  if (!birthDate) {
    return { error: `Invalid or missing birth date (${String(row['Born Date'])})` };
  }

  // Parse optional death date
  let deathDate: string | null = null;
  if (row['Death Date'] !== undefined && row['Death Date'] !== null && String(row['Death Date']).trim() !== '') {
    deathDate = parseDate(row['Death Date']);
    if (!deathDate) {
      return { error: `Invalid death date format (${String(row['Death Date'])})` };
    }
    // Validation: death date must not precede birth date
    if (deathDate < birthDate) {
      return { error: `Death date (${deathDate}) is earlier than birth date (${birthDate})` };
    }
  }

  const warnings: string[] = [];

  // Zodiac verification
  let zodiacSign = typeof row['Birth Sign'] === 'string' ? row['Birth Sign'].trim() : null;
  const [bYear, bMonth, bDay] = birthDate.split('-').map(Number);
  const calculatedZodiac = getZodiacSignFromDate(bMonth, bDay);

  if (zodiacSign) {
    const isMatch = validateZodiacMatch(birthDate, zodiacSign);
    if (!isMatch) {
      warnings.push(`Zodiac sign in sheet (${zodiacSign}) did not match date-calculated sign (${calculatedZodiac}). Using verified sign.`);
      zodiacSign = calculatedZodiac;
    }
  } else {
    zodiacSign = calculatedZodiac;
  }

  // Generate unique slug
  let baseSlug = generateSlug(rawName);
  if (!baseSlug) {
    baseSlug = `celebrity-${bYear}-${bMonth}-${bDay}`;
  }

  // Check if identical slug already encountered in this batch
  let finalSlug = baseSlug;
  if (seenSlugs.has(baseSlug)) {
    // If slug collision, append year or count to distinguish different individuals
    const count = seenSlugs.get(baseSlug)! + 1;
    seenSlugs.set(baseSlug, count);
    finalSlug = `${baseSlug}-${bYear}`;
  } else {
    seenSlugs.set(baseSlug, 1);
  }

  const normalizedName = normalizeText(rawName);
  const birthplace = typeof row.Birthplace === 'string' && row.Birthplace.trim() ? row.Birthplace.trim() : null;
  const primaryProfession = typeof row['Category / Job Title'] === 'string' && row['Category / Job Title'].trim() ? row['Category / Job Title'].trim() : null;
  const biography = typeof row['Bio / About'] === 'string' && row['Bio / About'].trim() ? row['Bio / About'].trim() : null;

  // SEO metadata defaults
  const professionLabel = primaryProfession ? `${primaryProfession}` : 'Celebrity';
  const seoTitle = `${rawName} — Birthday, Age, Bio & Facts | ${SITE_CONFIG.brandName}`;
  const metaDescription = `Discover ${rawName}'s biography, birthday (${birthDate}), age, zodiac sign (${zodiacSign || ''}), and career milestones.`;

  // Determine initial status based on publication readiness
  // Excel records start as 'in_review' unless explicitly approved or autoPublish flag is set
  const initialStatus = options.autoPublish ? 'published' : 'in_review';

  const entity: ProcessedCelebrity = {
    name: rawName,
    normalized_name: normalizedName,
    slug: finalSlug,
    birth_date: birthDate,
    death_date: deathDate,
    birthplace,
    biography,
    primary_profession: primaryProfession,
    zodiac_sign: zodiacSign,
    status: initialStatus,
    content_rights_status: 'excel_import_pending_verification',
    fact_check_status: 'pending',
    seo_title: seoTitle,
    meta_description: metaDescription,
    category_name: primaryProfession,
    warning_flags: warnings,
  };

  return {
    entity,
    warning: warnings.length > 0 ? warnings.join('; ') : undefined,
  };
}

/**
 * Main import runner supporting dry-run, batching, re-import upserts, and progress reporting
 */
export async function runCelebrityImport(options: {
  filePath: string;
  dryRun?: boolean;
  limit?: number;
  autoPublish?: boolean;
}): Promise<ImportSummary> {
  const summary: ImportSummary = {
    totalRows: 0,
    validRows: 0,
    duplicateRows: 0,
    invalidRows: 0,
    imported: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
    errors: [],
    warnings: [],
  };

  const resolvedPath = path.resolve(process.cwd(), options.filePath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`File not found at: ${resolvedPath}`);
  }

  console.log(`\n======================================================`);
  console.log(`  STARBIRTHDAY IMPORT SYSTEM`);
  console.log(`  File: ${resolvedPath}`);
  console.log(`  Mode: ${options.dryRun ? 'DRY-RUN (NO DATABASE WRITES)' : 'PRODUCTION IMPORT'}`);
  console.log(`  Auto-Publish: ${options.autoPublish ? 'ENABLED' : 'DISABLED (Saved as in_review)'}`);
  console.log(`======================================================\n`);

  const workbook = xlsx.readFile(resolvedPath);
  const sheetName = workbook.SheetNames[0] || 'Sheet1';
  const worksheet = workbook.Sheets[sheetName];
  if (!worksheet) {
    throw new Error(`Worksheet ${sheetName} could not be loaded.`);
  }

  const rawRows = xlsx.utils.sheet_to_json<ExcelRow>(worksheet);
  summary.totalRows = rawRows.length;
  console.log(`Loaded ${rawRows.length} total rows from ${sheetName}. Validating...`);

  const seenSlugs = new Map<string, number>();
  const validEntities: ProcessedCelebrity[] = [];
  const processedNamesAndBirthdays = new Set<string>();

  const processLimit = options.limit ? Math.min(options.limit, rawRows.length) : rawRows.length;

  for (let i = 0; i < processLimit; i++) {
    const row = rawRows[i];
    const rowNum = i + 2; // 1-based, accounting for header row

    // Duplicate detection in sheet: identical name + birth date
    const nameStr = typeof row.Name === 'string' ? row.Name.trim().toLowerCase() : '';
    const birthDateStr = String(row['Born Date'] || '');
    const identityKey = `${nameStr}:::${birthDateStr}`;

    if (processedNamesAndBirthdays.has(identityKey)) {
      summary.duplicateRows++;
      summary.warnings.push({
        row: rowNum,
        name: row.Name,
        message: `Duplicate row in spreadsheet for "${row.Name}" born ${birthDateStr}. Skipping duplicate.`,
      });
      continue;
    }
    processedNamesAndBirthdays.add(identityKey);

    const result = validateAndTransformRow(row, rowNum, seenSlugs, { autoPublish: options.autoPublish });
    if (result.error) {
      summary.invalidRows++;
      summary.errors.push({
        row: rowNum,
        name: row.Name,
        message: result.error,
      });
    } else if (result.entity) {
      summary.validRows++;
      validEntities.push(result.entity);
      if (result.warning) {
        summary.warnings.push({
          row: rowNum,
          name: result.entity.name,
          message: result.warning,
        });
      }
    }
  }

  console.log(`Validation complete:`);
  console.log(`  - Valid Entities: ${summary.validRows}`);
  console.log(`  - Duplicate Rows Skipped: ${summary.duplicateRows}`);
  console.log(`  - Invalid Rows (Errors): ${summary.invalidRows}`);
  console.log(`  - Warnings Encountered: ${summary.warnings.length}\n`);

  if (options.dryRun) {
    console.log(`[DRY-RUN] No database modifications were performed.`);
    console.log(`Sample Valid Entity:`, JSON.stringify(validEntities[0], null, 2));
    return summary;
  }

  // Connect to Supabase
  const supabase = getAdminSupabase();
  if (!supabase) {
    throw new Error(
      'Missing Supabase credentials (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY). Please set them in .env before importing.'
    );
  }

  console.log(`Starting Supabase upsert in batches of 100...`);
  const BATCH_SIZE = 100;
  for (let i = 0; i < validEntities.length; i += BATCH_SIZE) {
    const batch = validEntities.slice(i, i + BATCH_SIZE);

    // Upsert categories first
    const categoriesToEnsure = Array.from(
      new Set(batch.map((b) => b.category_name).filter((c): c is string => Boolean(c)))
    );

    if (categoriesToEnsure.length > 0) {
      const categoryRows = categoriesToEnsure.map((c) => ({
        name: c,
        slug: generateSlug(c),
        description: `Notable profiles and celebrities working as ${c}.`,
      }));

      await supabase.from('categories').upsert(categoryRows, { onConflict: 'slug' });
    }

    // Upsert celebrities
    const celebrityRows = batch.map((b) => ({
      name: b.name,
      normalized_name: b.normalized_name,
      slug: b.slug,
      birth_date: b.birth_date,
      death_date: b.death_date,
      birthplace: b.birthplace,
      biography: b.biography,
      primary_profession: b.primary_profession,
      zodiac_sign: b.zodiac_sign,
      status: b.status,
      content_rights_status: b.content_rights_status,
      fact_check_status: b.fact_check_status,
      seo_title: b.seo_title,
      meta_description: b.meta_description,
      published_at: b.status === 'published' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from('celebrities')
      .upsert(celebrityRows, { onConflict: 'slug' });

    if (error) {
      console.error(`Batch ${Math.floor(i / BATCH_SIZE) + 1} error:`, error.message);
      summary.failed += batch.length;
      summary.errors.push({
        row: i + 1,
        message: `Database upsert error: ${error.message}`,
      });
    } else {
      summary.imported += batch.length;
      process.stdout.write(`Processed ${Math.min(i + BATCH_SIZE, validEntities.length)} / ${validEntities.length} records\r`);
    }
  }

  console.log(`\nImport complete! Imported/Updated: ${summary.imported}, Failed: ${summary.failed}`);
  return summary;
}
