import fs from 'fs';
import path from 'path';
import https from 'https';
import { Celebrity } from '../types/database';

function fetchWikimediaImage(name: string): Promise<string | null> {
  return new Promise((resolve) => {
    const encodedName = encodeURIComponent(name);
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodedName}&prop=pageimages&format=json&pithumbsize=600`;

    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': 'StarsBio/1.0 (editor.starsbio@gmail.com)',
        },
      },
      (res) => {
        if (res.statusCode !== 200) {
          resolve(null);
          return;
        }

        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const pages = json.query?.pages;
            if (!pages) {
              resolve(null);
              return;
            }
            const pageId = Object.keys(pages)[0];
            const source = pages[pageId]?.thumbnail?.source || null;
            resolve(source);
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

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const args = process.argv.slice(2);
  let batchLimit = 50;

  for (const arg of args) {
    if (arg.startsWith('--limit=')) {
      batchLimit = parseInt(arg.split('=')[1], 10);
    }
  }

  const dataPath = path.resolve(process.cwd(), 'src/data/celebrities.json');
  const celebrities: Celebrity[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  console.log(`\n======================================================`);
  console.log(`  STARSBIO WIKIMEDIA LEGAL IMAGE FETCHER`);
  console.log(`  Total Dataset: ${celebrities.length} celebrities`);
  console.log(`  Fetching images for next ${batchLimit} celebrities...`);
  console.log(`======================================================\n`);

  let updatedCount = 0;
  let processed = 0;

  for (let i = 0; i < celebrities.length; i++) {
    const celeb = celebrities[i];
    if (celeb.image_url) continue; // Already has image

    processed++;
    process.stdout.write(`[${processed}/${batchLimit}] Fetching image for: ${celeb.name}... `);

    const imageUrl = await fetchWikimediaImage(celeb.name);
    if (imageUrl) {
      celeb.image_url = imageUrl;
      celeb.image_alt = `${celeb.name} licensed portrait`;
      updatedCount++;
      console.log(`Found!`);
    } else {
      console.log(`No free image found.`);
    }

    // Rate-limiting delay to respect Wikimedia API guidelines
    await delay(200);

    if (processed >= batchLimit) break;
  }

  fs.writeFileSync(dataPath, JSON.stringify(celebrities));
  console.log(`\nDone! Successfully attached ${updatedCount} free verified images.`);
}

main().catch((err) => {
  console.error('Fetch error:', err);
  process.exit(1);
});
