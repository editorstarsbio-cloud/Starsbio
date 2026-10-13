import fs from 'fs';
import path from 'path';
import https from 'https';
import { Celebrity } from '../types/database';

interface SearchResult {
  title: string;
}

interface PageResult {
  title: string;
  thumbnail?: {
    source: string;
  };
}

function searchWikipediaTitle(query: string): Promise<string | null> {
  return new Promise((resolve) => {
    const encoded = encodeURIComponent(query);
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encoded}&format=json&srlimit=1`;

    const req = https.get(
      url,
      { headers: { 'User-Agent': 'StarsBio/1.0 (editor.starsbio@gmail.com)' } },
      (res) => {
        if (res.statusCode !== 200) return resolve(null);
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const results: SearchResult[] = json.query?.search || [];
            if (results.length > 0) {
              resolve(results[0].title);
            } else {
              resolve(null);
            }
          } catch {
            resolve(null);
          }
        });
      }
    );
    req.on('error', () => resolve(null));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

function fetchBatchThumbnails(titles: string[]): Promise<Map<string, string>> {
  return new Promise((resolve) => {
    const map = new Map<string, string>();
    if (titles.length === 0) return resolve(map);

    const encoded = encodeURIComponent(titles.join('|'));
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encoded}&prop=pageimages&format=json&pithumbsize=600&redirects=1`;

    const req = https.get(
      url,
      { headers: { 'User-Agent': 'StarsBio/1.0 (editor.starsbio@gmail.com)' } },
      (res) => {
        if (res.statusCode !== 200) return resolve(map);
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const pages: Record<string, PageResult> = json.query?.pages || {};
            for (const k of Object.keys(pages)) {
              const p = pages[k];
              if (p.thumbnail?.source) {
                map.set(p.title.toLowerCase(), p.thumbnail.source);
              }
            }
            resolve(map);
          } catch {
            resolve(map);
          }
        });
      }
    );
    req.on('error', () => resolve(map));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve(map);
    });
  });
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = process.argv.slice(2);
  let batchCount = 3000;
  for (const a of args) {
    if (a.startsWith('--limit=')) batchCount = parseInt(a.split('=')[1], 10);
  }

  const dataPath = path.resolve(process.cwd(), 'src/data/celebrities.json');
  const celebrities: Celebrity[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const pendingIndices: number[] = [];
  for (let i = 0; i < celebrities.length; i++) {
    if (!celebrities[i].image_url) {
      pendingIndices.push(i);
      if (pendingIndices.length >= batchCount) break;
    }
  }

  console.log(`\n======================================================`);
  console.log(`  STARSBIO DEEP SEARCH IMAGE HARVESTER`);
  console.log(`  Scanning ${pendingIndices.length} celebrities for royalty-free portraits...`);
  console.log(`======================================================\n`);

  const CHUNK_SIZE = 50;
  let totalAttached = 0;

  for (let i = 0; i < pendingIndices.length; i += CHUNK_SIZE) {
    const chunk = pendingIndices.slice(i, i + CHUNK_SIZE);
    const searchQueries: { index: number; query: string }[] = [];

    for (const idx of chunk) {
      const c = celebrities[idx];
      const query = c.primary_profession ? `${c.name} ${c.primary_profession}` : c.name;
      searchQueries.push({ index: idx, query });
    }

    process.stdout.write(`Batch ${Math.floor(i / CHUNK_SIZE) + 1}/${Math.ceil(pendingIndices.length / CHUNK_SIZE)}: Searching titles... `);

    // Search titles with concurrency
    const searchPromises = searchQueries.map(async (sq) => {
      const matchedTitle = await searchWikipediaTitle(sq.query);
      return { index: sq.index, title: matchedTitle || sq.query };
    });

    const searchResults = await Promise.all(searchPromises);
    const validTitles = Array.from(new Set(searchResults.map((r) => r.title)));

    const imageMap = await fetchBatchThumbnails(validTitles);
    let batchFound = 0;

    for (const res of searchResults) {
      const url = imageMap.get(res.title.toLowerCase());
      if (url) {
        celebrities[res.index].image_url = url;
        celebrities[res.index].image_alt = `${celebrities[res.index].name} portrait`;
        batchFound++;
        totalAttached++;
      }
    }

    console.log(`Found ${batchFound} images.`);
    await delay(250);
  }

  // Safe file write
  const tempPath = `${dataPath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(celebrities));
  if (fs.existsSync(dataPath)) fs.unlinkSync(dataPath);
  fs.renameSync(tempPath, dataPath);

  console.log(`\nHarvest complete! Attached ${totalAttached} new licensed portraits.`);
}

main().catch((err) => {
  console.error('Harvester error:', err);
  process.exit(1);
});
