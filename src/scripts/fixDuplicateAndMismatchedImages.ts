// Script: fixDuplicateAndMismatchedImages.ts
// Resolves duplicate images by disambiguating based on (name + profession)
// and resetting mismatched images to clean fallback avatars.

import fs from 'fs';
import path from 'path';
import https from 'https';

const CELEBRITIES_PATH = path.join(__dirname, '../data/celebrities.json');

interface Celebrity {
  id: string;
  name: string;
  slug: string;
  primary_profession?: string;
  birth_date?: string;
  birthplace?: string;
  image_url?: string | null;
  original_image_url?: string | null;
  image_alt?: string | null;
  [key: string]: any;
}

function wikiSearch(query: string): Promise<Array<{ title: string; desc?: string; thumb?: string }>> {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      query
    )}&gsrlimit=6&prop=pageimages|description&pithumbsize=800&format=json`;

    https
      .get(
        url,
        {
          headers: {
            'User-Agent': 'StarsBio/1.0 (editor.starsbio@gmail.com; https://www.starsbio.co.uk)',
          },
        },
        (res) => {
          if (res.statusCode !== 200) return resolve([]);
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              const pages: any[] = Object.values(json.query?.pages || {});
              resolve(
                pages.map((p) => ({
                  title: p.title,
                  desc: p.description,
                  thumb: p.thumbnail?.source,
                }))
              );
            } catch {
              resolve([]);
            }
          });
        }
      )
      .on('error', () => resolve([]));
  });
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Clean profession into standard keywords
function mapProfessionToKeywords(prof: string = ''): string[] {
  const p = prof.toLowerCase();
  const res: string[] = [];
  if (p.includes('actor') || p.includes('actress')) res.push('actor', 'actress', 'film actor');
  if (p.includes('singer') || p.includes('musician') || p.includes('rapper') || p.includes('dj')) res.push('singer', 'musician', 'music');
  if (p.includes('politician') || p.includes('prime minister') || p.includes('president')) res.push('politician', 'cricketer', 'prime minister');
  if (p.includes('football') || p.includes('soccer')) res.push('footballer', 'soccer');
  if (p.includes('basketball')) res.push('basketball');
  if (p.includes('wrestler')) res.push('wrestler');
  if (p.includes('boxer')) res.push('boxer');
  if (p.includes('comedian')) res.push('comedian');
  if (p.includes('director')) res.push('director');
  if (p.includes('model')) res.push('model');
  return res;
}

async function findAccurateImage(name: string, prof: string = '', birthYear?: number): Promise<{ url: string; title: string } | null> {
  const keywords = mapProfessionToKeywords(prof);
  
  // Queries to try
  const queries = [
    `${name} ${keywords[0] || prof || ''}`.trim(),
    name,
    `${name} (${keywords[0] || ''})`.trim()
  ];

  for (const q of queries) {
    const results = await wikiSearch(q);
    for (const r of results) {
      if (!r.thumb) continue;
      
      const tLower = r.title.toLowerCase();
      const nLower = name.toLowerCase();
      const dLower = (r.desc || '').toLowerCase();

      // Check if page title matches the celebrity name
      const titleMatches = tLower === nLower || tLower.startsWith(nLower + ' (') || tLower.startsWith(nLower + ',');
      if (!titleMatches) continue;

      // Check profession / description relevance if there's ambiguity
      if (keywords.length > 0) {
        const matchesProfInTitle = keywords.some(k => tLower.includes(k));
        const matchesProfInDesc = keywords.some(k => dLower.includes(k));
        
        // If query was disambiguated or title has bracket, ensure it matches
        if (tLower.includes('(')) {
          if (!matchesProfInTitle && !matchesProfInDesc) {
            continue; // Skip wrong disambiguation!
          }
        }
      }

      // Check birth year if available in description
      if (birthYear && dLower.includes('born ')) {
        const yearMatch = dLower.match(/born\s+(\d{4})/);
        if (yearMatch && Math.abs(parseInt(yearMatch[1]) - birthYear) > 1) {
          continue; // Mismatched birth year!
        }
      }

      return { url: r.thumb, title: r.title };
    }
  }

  return null;
}

async function run() {
  console.log('🚀 Loading celebrities.json...');
  const celebs: Celebrity[] = JSON.parse(fs.readFileSync(CELEBRITIES_PATH, 'utf8'));

  // 1. Group by original_image_url
  const urlMap = new Map<string, Celebrity[]>();
  for (const c of celebs) {
    if (c.original_image_url) {
      const clean = c.original_image_url.split('?')[0];
      if (!urlMap.has(clean)) urlMap.set(clean, []);
      urlMap.get(clean)!.push(c);
    }
  }

  const dupes = Array.from(urlMap.entries()).filter(([_, list]) => list.length > 1);
  console.log(`Found ${dupes.length} groups of duplicate images (${dupes.reduce((a, b) => a + b[1].length, 0)} total entries).`);

  let resolvedNewImage = 0;
  let clearedMismatches = 0;
  let keptConfirmed = 0;

  for (let g = 0; g < dupes.length; g++) {
    const [origUrl, list] = dupes[g];
    console.log(`\n[${g + 1}/${dupes.length}] Processing Duplicate Group: ${list.map(c => c.name).join(', ')}`);

    for (const celeb of list) {
      const birthYear = celeb.birth_date ? parseInt(celeb.birth_date.slice(0, 4)) : undefined;
      const accurate = await findAccurateImage(celeb.name, celeb.primary_profession || '', birthYear);
      
      await delay(150);

      if (accurate) {
        console.log(`  ✅ Found accurate image for ${celeb.name} (${celeb.primary_profession}): "${accurate.title}"`);
        celeb.original_image_url = accurate.url;
        celeb.image_url = `/api/celebrity-image/${celeb.slug}.jpg`;
        celeb.image_alt = `${celeb.name} profile portrait`;
        resolvedNewImage++;
      } else {
        // Does this person's name strictly match the current URL filename?
        const filename = decodeURIComponent(origUrl.split('/').pop() || '').toLowerCase().replace(/_/g, ' ');
        const nameMatchesFile = filename.includes(celeb.name.toLowerCase());

        if (nameMatchesFile && list.filter(other => filename.includes(other.name.toLowerCase())).length === 1) {
          console.log(`  👌 Retained verified owner: ${celeb.name} (${celeb.primary_profession})`);
          keptConfirmed++;
        } else {
          // Clear mismatched duplicate image so fallback avatar displays correctly
          console.log(`  🧹 Removed mismatched duplicate image from ${celeb.name} (${celeb.primary_profession})`);
          celeb.original_image_url = null;
          celeb.image_url = null;
          clearedMismatches++;
        }
      }
    }
  }

  console.log('\n=======================================');
  console.log(`🎉 Complete!`);
  console.log(`- Resolved with accurate specific images: ${resolvedNewImage}`);
  console.log(`- Retained verified rightful image owners: ${keptConfirmed}`);
  console.log(`- Removed mismatched duplicate images: ${clearedMismatches}`);
  console.log('=======================================');

  fs.writeFileSync(CELEBRITIES_PATH, JSON.stringify(celebs, null, 2), 'utf8');
  console.log('💾 celebrities.json updated successfully!');
}

run().catch(console.error);
