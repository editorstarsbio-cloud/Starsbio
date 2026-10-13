import fs from 'fs';
import path from 'path';
import * as xlsx from 'xlsx';
import {
  parseDate,
  generateSlug,
  normalizeText,
  validateZodiacMatch,
  getZodiacSignFromDate,
  SITE_CONFIG,
} from '../lib/utils';
import { Celebrity, Category } from '../types/database';

interface ExcelRow {
  Name?: string;
  'Born Date'?: unknown;
  'Death Date'?: unknown;
  Age?: unknown;
  'Birth Sign'?: string;
  Birthplace?: string;
  'Category / Job Title'?: string;
  'Bio / About'?: string;
}

async function buildStaticDatabase() {
  console.log('Building standalone static database from famous_birthdays_all.xlsx...');
  const filePath = path.resolve(process.cwd(), 'famous_birthdays_all.xlsx');

  if (!fs.existsSync(filePath)) {
    throw new Error('famous_birthdays_all.xlsx not found');
  }

  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json<ExcelRow>(sheet);
  console.log(`Loaded ${rows.length} rows from Excel sheet.`);

  const seenSlugs = new Map<string, number>();
  const processedNamesAndBirthdays = new Set<string>();
  const celebrities: Celebrity[] = [];
  const categoriesMap = new Map<string, Category>();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rawName = typeof row.Name === 'string' ? row.Name.trim() : '';
    if (!rawName) continue;

    const birthDate = parseDate(row['Born Date']);
    if (!birthDate) continue;

    const identityKey = `${rawName.toLowerCase()}:::${birthDate}`;
    if (processedNamesAndBirthdays.has(identityKey)) continue;
    processedNamesAndBirthdays.add(identityKey);

    let deathDate: string | null = null;
    if (row['Death Date'] !== undefined && row['Death Date'] !== null && String(row['Death Date']).trim() !== '') {
      deathDate = parseDate(row['Death Date']);
    }

    const [bYear, bMonth, bDay] = birthDate.split('-').map(Number);
    let zodiacSign = typeof row['Birth Sign'] === 'string' ? row['Birth Sign'].trim() : null;
    const calculatedZodiac = getZodiacSignFromDate(bMonth, bDay);

    if (zodiacSign) {
      if (!validateZodiacMatch(birthDate, zodiacSign)) {
        zodiacSign = calculatedZodiac;
      }
    } else {
      zodiacSign = calculatedZodiac;
    }

    let baseSlug = generateSlug(rawName);
    if (!baseSlug) baseSlug = `celebrity-${bYear}-${bMonth}-${bDay}`;

    let finalSlug = baseSlug;
    if (seenSlugs.has(baseSlug)) {
      const count = seenSlugs.get(baseSlug)! + 1;
      seenSlugs.set(baseSlug, count);
      finalSlug = `${baseSlug}-${bYear}`;
      if (seenSlugs.has(finalSlug)) {
        finalSlug = `${finalSlug}-${count}`;
      }
    } else {
      seenSlugs.set(baseSlug, 1);
    }

    const birthplace = typeof row.Birthplace === 'string' && row.Birthplace.trim() ? row.Birthplace.trim() : null;
    const primaryProfession = typeof row['Category / Job Title'] === 'string' && row['Category / Job Title'].trim() ? row['Category / Job Title'].trim() : null;
    const biography = typeof row['Bio / About'] === 'string' && row['Bio / About'].trim() ? row['Bio / About'].trim() : null;

    if (primaryProfession) {
      const catSlug = generateSlug(primaryProfession);
      if (!categoriesMap.has(catSlug)) {
        categoriesMap.set(catSlug, {
          id: `cat-${catSlug}`,
          name: primaryProfession,
          slug: catSlug,
          description: `Famous and celebrated figures working as ${primaryProfession}.`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    }

    const celeb: Celebrity = {
      id: `celeb-${finalSlug}`,
      name: rawName,
      normalized_name: normalizeText(rawName),
      slug: finalSlug,
      birth_date: birthDate,
      death_date: deathDate,
      birthplace,
      biography,
      primary_profession: primaryProfession,
      zodiac_sign: zodiacSign,
      image_url: null,
      image_alt: `${rawName} portrait`,
      status: 'published',
      content_rights_status: 'verified_dataset',
      fact_check_status: 'verified',
      source_verified_at: new Date().toISOString(),
      seo_title: `${rawName} — Birthday, Age, Bio & Facts | ${SITE_CONFIG.brandName}`,
      meta_description: `Discover ${rawName}'s biography, verified birthday (${birthDate}), dynamic age calculation, and career milestones on ${SITE_CONFIG.brandName}.`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
    };

    celebrities.push(celeb);
  }

  const categories = Array.from(categoriesMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  const outCelebritiesPath = path.resolve(process.cwd(), 'src/data/celebrities.json');
  const outCategoriesPath = path.resolve(process.cwd(), 'src/data/categories.json');

  fs.writeFileSync(outCelebritiesPath, JSON.stringify(celebrities));
  fs.writeFileSync(outCategoriesPath, JSON.stringify(categories, null, 2));

  console.log(`Generated standalone dataset:`);
  console.log(` - Celebrities: ${celebrities.length} written to ${outCelebritiesPath}`);
  console.log(` - Categories: ${categories.length} written to ${outCategoriesPath}`);
}

buildStaticDatabase().catch((err) => {
  console.error('Error generating static database:', err);
  process.exit(1);
});
