import fs from 'fs';
import path from 'path';
import https from 'https';
import { Celebrity } from '../types/database';

interface WikipediaPage {
  pageid: number;
  title: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
}

function fetchWikipediaBatch(titles: string[]): Promise<Map<string, string>> {
  return new Promise((resolve) => {
    const resultMap = new Map<string, string>();
    if (titles.length === 0) {
      resolve(resultMap);
      return;
    }

    const encodedTitles = encodeURIComponent(titles.join('|'));
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodedTitles}&prop=pageimages&format=json&pithumbsize=600&redirects=1`;

    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': 'StarsBio/1.0 (editor.starsbio@gmail.com)',
        },
      },
      (res) => {
        if (res.statusCode !== 200) {
          resolve(resultMap);
          return;
        }

        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const pages: Record<string, WikipediaPage> = json.query?.pages || {};
            const redirects: { from: string; to: string }[] = json.query?.redirects || [];

            // Map redirects to match original titles
            const redirectMap = new Map<string, string>();
            for (const r of redirects) {
              redirectMap.set(r.to.toLowerCase(), r.from.toLowerCase());
            }

            for (const key of Object.keys(pages)) {
              const page = pages[key];
              if (page.thumbnail?.source) {
                const titleLower = page.title.toLowerCase();
                resultMap.set(titleLower, page.thumbnail.source);

                const originalFrom = redirectMap.get(titleLower);
                if (originalFrom) {
                  resultMap.set(originalFrom, page.thumbnail.source);
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
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = process.argv.slice(2);
  let maxToProcess = 500; // Default fast chunk
  for (const a of args) {
    if (a.startsWith('--limit=')) {
      maxToProcess = parseInt(a.split('=')[1], 10);
    }
  }

  const dataPath = path.resolve(process.cwd(), 'src/data/celebrities.json');
  const celebrities: Celebrity[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const pendingIndices: number[] = [];
  for (let i = 0; i < celebrities.length; i++) {
    if (!celebrities[i].image_url) {
      pendingIndices.push(i);
      if (pendingIndices.length >= maxToProcess) break;
    }
  }

  console.log(`\n======================================================`);
  console.log(`  STARSBIO ULTRA-FAST BATCH IMAGE FETCHER`);
  console.log(`  Processing ${pendingIndices.length} celebrities in 50-item batches...`);
  console.log(`======================================================\n`);

  const BATCH_SIZE = 50;
  let foundCount = 0;

  for (let i = 0; i < pendingIndices.length; i += BATCH_SIZE) {
    const chunkIndices = pendingIndices.slice(i, i + BATCH_SIZE);
    const chunkTitles = chunkIndices.map((idx) => celebrities[idx].name);

    process.stdout.write(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(pendingIndices.length / BATCH_SIZE)} (${chunkTitles.length} celebrities)... `);

    const imageMap = await fetchWikipediaBatch(chunkTitles);

    let batchFound = 0;
    for (const idx of chunkIndices) {
      const nameLower = celebrities[idx].name.toLowerCase();
      const foundUrl = imageMap.get(nameLower);
      if (foundUrl) {
        celebrities[idx].image_url = foundUrl;
        celebrities[idx].image_alt = `${celebrities[idx].name} portrait`;
        batchFound++;
        foundCount++;
      }
    }

    console.log(`Found ${batchFound} images.`);
    await delay(300); // Polite rate limit
  }

  // Save after batch completes safely
  const tempPath = `${dataPath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(celebrities));
  if (fs.existsSync(dataPath)) {
    fs.unlinkSync(dataPath);
  }
  fs.renameSync(tempPath, dataPath);

  console.log(`\nDone! Successfully attached ${foundCount} verified celebrity portraits.`);
}

main().catch((err) => {
  console.error('Fatal batch error:', err);
  process.exit(1);
});
