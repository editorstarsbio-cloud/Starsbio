import fs from 'fs';
import path from 'path';

const PAGE_ID = '1377530792117836';
const ACCESS_TOKEN =
  'EAAUt3SZCM33oBS5yLMhokZAy5A7Fpkm5Fkqotf23GC1XffpcyZCQWr8qelfYfaxbyzBBEeMZAjIUtB3ybZBsdQFRPAMwJXKa3H0u731tFl0A6phYzpbdxRR0msEdfdnmfi63plO5Aw7TS0Pn0544KIMPiaTQMulLWXGPydDX1tNZBfe6F3DKv1a7AmhiLXsQzZC0jyxZA8S9e97xmeRUMqEBI1HEZBf4HBSMZCAtBEg5AZD';
const BASE_URL = 'https://www.starsbio.co.uk';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function runBackfill() {
  const filePath = path.join(process.cwd(), 'src/data/celebrities.json');
  const allStars = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // 50 High-profile global icons across Movies, Music, Sports & Creators
  const targetSlugs = [
    'vin-diesel', 'tom-cruise', 'shah-rukh-khan', 'salman-khan', 'cristiano-ronaldo',
    'lionel-messi', 'taylor-swift', 'dwayne-johnson', 'zendaya', 'billie-eilish',
    'ariana-grande', 'selena-gomez', 'justin-bieber', 'leonardo-dicaprio', 'brad-pitt',
    'keanu-reeves', 'will-smith', 'robert-downey-jr', 'chris-hemsworth', 'scarlett-johansson',
    'emma-watson', 'tom-holland', 'kylie-jenner', 'kim-kardashian', 'kendall-jenner',
    'drake', 'eminem', 'rihanna', 'beyonce', 'shakira', 'ed-sheeran', 'harry-styles',
    'dua-lipa', 'lebron-james', 'stephen-curry', 'neymar-jr', 'kylian-mbappe',
    'mrbeast', 'pewdiepie', 'khaby-lame', 'charli-d-amelio', 'addison-rae',
    'cillian-murphy', 'florence-pugh', 'timothee-chalamet', 'jason-statham',
    'morgan-freeman', 'johnny-depp', 'angelina-jolie', 'jennifer-aniston'
  ];

  const pool: any[] = [];
  targetSlugs.forEach((slug) => {
    const found = allStars.find((c: any) => c.slug === slug || c.slug.includes(slug));
    if (found && !pool.some((p) => p.slug === found.slug)) {
      pool.push(found);
    }
  });

  // Fallback to top verified stars if any slug not found
  if (pool.length < 50) {
    for (const c of allStars) {
      if (c.image_url && c.biography && !pool.some((p) => p.slug === c.slug)) {
        pool.push(c);
      }
      if (pool.length === 50) break;
    }
  }

  console.log(`Starting Backfill Engine: Selected ${pool.length} iconic celebrities...`);

  let successCount = 0;
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < pool.length; i++) {
    const star = pool[i];
    const birthYear = star.birth_date ? parseInt(star.birth_date.split('-')[0], 10) : null;
    const currentAge = birthYear ? currentYear - birthYear : null;

    const message = [
      `🌟 Celebrity Spotlight: ${star.name}!`,
      '',
      star.primary_profession ? `🎭 Profession: ${star.primary_profession}` : '',
      star.birth_date ? `🎂 Born: ${star.birth_date}${currentAge ? ` (Age: ${currentAge})` : ''}` : '',
      star.birthplace ? `📍 Birthplace: ${star.birthplace}` : '',
      star.zodiac_sign ? `♈ Zodiac Sign: ${star.zodiac_sign}` : '',
      '',
      star.biography ? `${star.biography.slice(0, 200)}...` : '',
      '',
      `👉 Discover full biography, age difference & verified facts:`,
      `${BASE_URL}/people/${star.slug}`,
      '',
      `#${star.name.replace(/\\s+/g, '')} #StarsBio #${star.primary_profession ? star.primary_profession.replace(/\\s+/g, '') : 'Celebrity'} #CelebrityBirthdays #Biography`
    ].filter(Boolean).join('\n');

    try {
      const res = await fetch(`https://graph.facebook.com/v26.0/${PAGE_ID}/feed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          link: `${BASE_URL}/people/${star.slug}`,
          access_token: ACCESS_TOKEN,
        }),
      });

      const data = await res.json();
      if (res.ok && data.id) {
        successCount++;
        console.log(`[${successCount}/50] Published: ${star.name} (Post ID: ${data.id})`);
      } else {
        console.error(`Failed ${star.name}:`, data);
      }
    } catch (err: any) {
      console.error(`Error ${star.name}:`, err.message);
    }

    // Safety pause of 2.5 seconds to respect Facebook Graph API rate limits
    await sleep(2500);
  }

  console.log(`\n🎉 Backfill Engine Completed: ${successCount}/50 posts successfully published to Facebook Page!`);
}

runBackfill().catch(console.error);
