import fs from 'fs';
import path from 'path';
import https from 'https';
import { Celebrity } from '../types/database';

interface WikipediaPage {
  pageid: number;
  title: string;
  thumbnail?: {
    source: string;
  };
}

function fetchWikipediaBatch(titles: string[]): Promise<Map<string, string>> {
  return new Promise((resolve) => {
    const resultMap = new Map<string, string>();
    if (titles.length === 0) return resolve(resultMap);

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
        if (res.statusCode !== 200) return resolve(resultMap);

        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const pages: Record<string, WikipediaPage> = json.query?.pages || {};
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
  return new Promise((r) => setTimeout(r, ms));
}

async function runFullScan() {
  const dataPath = path.resolve(process.cwd(), 'src/data/celebrities.json');
  const celebrities: Celebrity[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log(`Starting scan across all ${celebrities.length} celebrities...`);

  // Target any celebrity who doesn't have an image yet
  const pendingIndices: number[] = [];
  for (let i = 0; i < celebrities.length; i++) {
    if (!celebrities[i].image_url) {
      pendingIndices.push(i);
    }
  }

  console.log(`Found ${pendingIndices.length} celebrities without image. Scanning in batches of 50...`);

  const BATCH_SIZE = 50;
  let totalFound = 0;

  // Process in chunks of 50
  for (let i = 0; i < pendingIndices.length; i += BATCH_SIZE) {
    const chunkIndices = pendingIndices.slice(i, i + BATCH_SIZE);
    const chunkTitles = chunkIndices.map((idx) => celebrities[idx].name);

    const imageMap = await fetchWikipediaBatch(chunkTitles);

    let batchCount = 0;
    for (const idx of chunkIndices) {
      const nameLower = celebrities[idx].name.toLowerCase();
      const foundUrl = imageMap.get(nameLower);
      if (foundUrl) {
        celebrities[idx].image_url = foundUrl;
        celebrities[idx].image_alt = `${celebrities[idx].name} portrait`;
        batchCount++;
        totalFound++;
      }
    }

    if (batchCount > 0) {
      process.stdout.write(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: Found ${batchCount} images (Total so far: ${totalFound})\r`);
    }

    await delay(150);

    // Periodic safe save every 1000 items
    if ((i + BATCH_SIZE) % 1000 === 0 || i + BATCH_SIZE >= pendingIndices.length) {
      const tempPath = `${dataPath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(celebrities));
      if (fs.existsSync(dataPath)) fs.unlinkSync(dataPath);
      fs.renameSync(tempPath, dataPath);
      console.log(`\n[Saved progress: Total attached ${totalFound}]`);
    }
  }

  console.log(`\nCompleted full scan! Total images successfully attached: ${totalFound}`);
}

runFullScan().catch((err) => {
  console.error('Scan error:', err);
  process.exit(1);
});
