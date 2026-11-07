// Script: attachAllCreatorImagesSafely.ts
// Securely resolves images for remaining creators and serves them under
// StarsBio own proxy (/api/celebrity-image/[slug].jpg) with Cloudflare 7-day caching.

import fs from 'fs';
import path from 'path';
import https from 'https';

const CELEBS_PATH = path.join(__dirname, '../data/celebrities.json');

function checkImageCandidate(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const req = https.request(
      url,
      {
        method: 'HEAD',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'image/jpeg,image/webp,image/*,*/*',
        },
      },
      (res) => {
        if (res.statusCode === 200 && res.headers['content-type']?.includes('image')) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
    req.on('error', () => resolve(false));
    req.setTimeout(3500, () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Generate URL candidates based on name and slug permutations
function getCandidates(slug: string, name: string): string[] {
  const cleanSlug = slug.toLowerCase().replace(/-\d{4}$/, '');
  const parts = cleanSlug.split('-');
  const candidates: string[] = [];

  // 1. Direct slug: e.g. shadowapples-image.jpg
  candidates.push(`https://www.famousbirthdays.com/faces/${cleanSlug}-image.jpg`);

  // 2. Last name first: e.g. smith-john-image.jpg
  if (parts.length >= 2) {
    const lastNameFirst = `${parts[parts.length - 1]}-${parts.slice(0, -1).join('-')}`;
    candidates.push(`https://www.famousbirthdays.com/faces/${lastNameFirst}-image.jpg`);
  }

  // 3. Name stripped of special characters: e.g. mrbeat-image.jpg
  const alphaOnly = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (alphaOnly !== cleanSlug.replace(/-/g, '')) {
    candidates.push(`https://www.famousbirthdays.com/faces/${alphaOnly}-image.jpg`);
  }

  return candidates;
}

async function run() {
  console.log('🚀 Loading celebrities dataset...');
  const celebs: any[] = JSON.parse(fs.readFileSync(CELEBS_PATH, 'utf8'));

  const missing = celebs.filter((c) => !c.image_url || !c.original_image_url);
  console.log(`Total missing images: ${missing.length}`);

  let foundCount = 0;
  let checkedCount = 0;

  // Process in small controlled batches
  const BATCH_SIZE = 6;

  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    const batch = missing.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (c) => {
        const cands = getCandidates(c.slug, c.name);
        for (const url of cands) {
          const exists = await checkImageCandidate(url);
          if (exists) {
            c.original_image_url = url;
            c.image_url = `/api/celebrity-image/${c.slug}.jpg`;
            c.image_alt = `${c.name} profile portrait`;
            foundCount++;
            console.log(`[+${foundCount}] ATTACHED: ${c.name} (${c.primary_profession || 'Star'}) -> /api/celebrity-image/${c.slug}.jpg`);
            break;
          }
        }
        checkedCount++;
      })
    );

    if (checkedCount % 60 === 0 || i + BATCH_SIZE >= missing.length) {
      console.log(`Checked ${checkedCount}/${missing.length} | Attached +${foundCount} new portraits so far...`);
      fs.writeFileSync(CELEBS_PATH, JSON.stringify(celebs, null, 2), 'utf8');
    }

    await delay(100);
  }

  fs.writeFileSync(CELEBS_PATH, JSON.stringify(celebs, null, 2), 'utf8');
  console.log('\n=======================================');
  console.log(`🎉 Complete! Total new images attached: ${foundCount}`);
  console.log('=======================================');
}

run().catch(console.error);
