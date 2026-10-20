const fs = require('fs');
const https = require('https');
const path = require('path');

const CELEBS_FILE = path.resolve(__dirname, '../data/celebrities.json');

function checkCandidate(slug) {
  return new Promise((resolve) => {
    const parts = slug.split('-');
    const cand1 = 'https://www.famousbirthdays.com/faces/' + slug + '-image.jpg';
    const cand2 =
      parts.length >= 2
        ? 'https://www.famousbirthdays.com/faces/' +
          parts[parts.length - 1] +
          '-' +
          parts.slice(0, -1).join('-') +
          '-image.jpg'
        : null;

    const testUrl = (url) =>
      new Promise((r) => {
        if (!url) return r(null);
        const req = https.request(
          url,
          {
            method: 'HEAD',
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
          },
          (res) => {
            if (res.statusCode === 200 && res.headers['content-type']?.includes('image')) {
              r(url);
            } else {
              r(null);
            }
          }
        );
        req.on('error', () => r(null));
        req.setTimeout(2500, () => {
          req.destroy();
          r(null);
        });
        req.end();
      });

    testUrl(cand2).then((found2) => {
      if (found2) return resolve(found2);
      testUrl(cand1).then(resolve);
    });
  });
}

// Concurrency pool helper
async function pool(items, limit, fn) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      try {
        const res = await fn(items[i], i);
        results[i] = res;
      } catch (err) {
        results[i] = null;
      }
    }
  }

  const workers = Array.from({ length: limit }, () => worker());
  await Promise.all(workers);
  return results;
}

async function main() {
  const targetBatchLimit = parseInt(process.argv[2] || '500', 10);
  console.log(`Loading celebrities dataset...`);
  const celebs = JSON.parse(fs.readFileSync(CELEBS_FILE, 'utf8'));

  const missing = celebs.filter((c) => !c.image_url || c.image_url.trim() === '');
  console.log(`Total missing images: ${missing.length}`);
  console.log(`Searching images for top ${targetBatchLimit} priority missing creators...`);

  const batch = missing.slice(0, targetBatchLimit);
  let foundCount = 0;
  let processed = 0;

  await pool(batch, 8, async (celeb) => {
    const imgUrl = await checkCandidate(celeb.slug);
    processed++;
    if (imgUrl) {
      celeb.image_url = imgUrl;
      celeb.image_alt = `${celeb.name} profile portrait`;
      foundCount++;
      console.log(`[${foundCount}] FOUND: ${celeb.name} -> ${imgUrl}`);
    }
    if (processed % 50 === 0) {
      console.log(`Processed ${processed}/${batch.length}... Found ${foundCount} so far.`);
      fs.writeFileSync(CELEBS_FILE, JSON.stringify(celebs));
    }
  });

  fs.writeFileSync(CELEBS_FILE, JSON.stringify(celebs));
  console.log(`\nCOMPLETED! Total new creator images found & attached: ${foundCount}`);
}

main().catch(console.error);
