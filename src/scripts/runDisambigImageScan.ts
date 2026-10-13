import fs from 'fs';
import path from 'path';
import https from 'https';
import { Celebrity } from '../types/database';

const CELEBRITIES_PATH = path.join(__dirname, '../data/celebrities.json');

function fetchPageImagesBatch(titles: string[]): Promise<Map<string, string>> {
  return new Promise((resolve) => {
    const resultMap = new Map<string, string>();
    if (titles.length === 0) return resolve(resultMap);

    const encodedTitles = titles.map((t) => encodeURIComponent(t)).join('|');
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodedTitles}&prop=pageimages&format=json&pithumbsize=600&redirects=1`;

    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': 'StarsBio/1.0 (editor.starsbio@gmail.com)',
        },
      },
      (res) => {
        if (res.statusCode !== 200) return resolve(resultMap);

        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const pages: Record<string, any> = json.query?.pages || {};
            const redirects: { from: string; to: string }[] = json.query?.redirects || [];

            const redirectMap = new Map<string, string>();
            for (const r of redirects) {
              redirectMap.set(r.to.toLowerCase(), r.from.toLowerCase());
            }

            for (const key of Object.keys(pages)) {
              const page = pages[key];
              if (page.thumbnail?.source) {
                const titleLower = page.title.toLowerCase();
                resultMap.set(titleLower, page.thumbnail.source);

                const orig = redirectMap.get(titleLower);
                if (orig) {
                  resultMap.set(orig, page.thumbnail.source);
                }
              }
            }
            resolve(resultMap);
          } catch {
            resolve(resultMap);
          }
        });
      }
    );

    req.on('error', () => resolve(resultMap));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve(resultMap);
    });
  });
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCandidateTitles(name: string, profession: string): string[] {
  const candidates: string[] = [name];
  const p = profession.toLowerCase();

  if (p.includes('actor') || p.includes('actress')) {
    candidates.push(`${name} (actor)`, `${name} (actress)`);
  } else if (p.includes('singer') || p.includes('rapper') || p.includes('musician')) {
    candidates.push(`${name} (singer)`, `${name} (musician)`, `${name} (rapper)`);
  } else if (p.includes('football') || p.includes('soccer')) {
    candidates.push(`${name} (footballer)`, `${name} (soccer)`);
  } else if (p.includes('basketball')) {
    candidates.push(`${name} (basketball)`);
  } else if (p.includes('wrestler')) {
    candidates.push(`${name} (wrestler)`);
  } else if (p.includes('director') || p.includes('producer')) {
    candidates.push(`${name} (director)`, `${name} (producer)`);
  } else if (p.includes('politician')) {
    candidates.push(`${name} (politician)`);
  } else if (p.includes('comedian')) {
    candidates.push(`${name} (comedian)`);
  }

  return candidates;
}

async function runDisambiguationScan() {
  console.log('--- Starting Disambiguation & Targeted Image Scan ---');
  const raw = fs.readFileSync(CELEBRITIES_PATH, 'utf8');
  const celebs: Celebrity[] = JSON.parse(raw);

  const missing = celebs.filter((c) => !c.image_url);
  console.log(`Total missing images: ${missing.length}`);

  let updatedCount = 0;
  const BATCH_SIZE = 30; // Max 50 titles per query in MediaWiki API

  for (let i = 0; i < missing.length; i += BATCH_SIZE) {
    const batch = missing.slice(i, i + BATCH_SIZE);
    const candidateMap = new Map<string, Celebrity>(); // candidateTitle.toLowerCase() -> Celebrity
    const titlesToQuery: string[] = [];

    for (const c of batch) {
      const candidates = getCandidateTitles(c.name, c.primary_profession || '');
      for (const title of candidates) {
        titlesToQuery.push(title);
        candidateMap.set(title.toLowerCase(), c);
      }
    }

    const resultMap = await fetchPageImagesBatch(titlesToQuery);

    for (const [titleLower, imageUrl] of resultMap.entries()) {
      const celeb = candidateMap.get(titleLower);
      if (celeb && !celeb.image_url) {
        celeb.image_url = imageUrl;
        celeb.image_alt = `${celeb.name} profile portrait`;
        updatedCount++;
      }
    }

    if ((i / BATCH_SIZE) % 15 === 0 || i + BATCH_SIZE >= missing.length) {
      console.log(`Processed ${Math.min(i + BATCH_SIZE, missing.length)} / ${missing.length}... Attached +${updatedCount} new images`);
      // Save checkpoint
      fs.writeFileSync(CELEBRITIES_PATH, JSON.stringify(celebs, null, 2), 'utf8');
    }

    await delay(120);
  }

  // Final write
  fs.writeFileSync(CELEBRITIES_PATH, JSON.stringify(celebs, null, 2), 'utf8');
  console.log(`\nScan Complete! Successfully attached ${updatedCount} additional real celebrity images.`);
}

runDisambiguationScan().catch(console.error);
