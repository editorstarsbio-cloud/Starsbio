export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { getCelebritiesBornOn, getAllCelebrities } from '@/lib/repository';
import { SITE_CONFIG, getMonthName } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const PAGE_ID = '1377530792117836';
const ACCESS_TOKEN =
  'EAAUt3SZCM33oBS5yLMhokZAy5A7Fpkm5Fkqotf23GC1XffpcyZCQWr8qelfYfaxbyzBBEeMZAjIUtB3ybZBsdQFRPAMwJXKa3H0u731tFl0A6phYzpbdxRR0msEdfdnmfi63plO5Aw7TS0Pn0544KIMPiaTQMulLWXGPydDX1tNZBfe6F3DKv1a7AmhiLXsQzZC0jyxZA8S9e97xmeRUMqEBI1HEZBf4HBSMZCAtBEg5AZD';

/**
 * Intelligent Daily Auto-Poster Bot for Facebook Page
 * Trigger: /api/cron/facebook-daily-post?type=birthday | spotlight | comparison
 *
 * Types:
 * 1. birthday (Morning): Today's Birthday Spotlight + other stars celebrating today
 * 2. comparison (Afternoon): Head-to-Head Celebrity Battle & Age Gap
 * 3. spotlight (Evening): Trending Iconic Celebrity Bio & Facts
 */
export async function GET(request: NextRequest) {
  // Authorization check (if CRON_SECRET configured)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'birthday';

  const pageId = process.env.FACEBOOK_PAGE_ID || PAGE_ID;
  const pageToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN || ACCESS_TOKEN;
  const siteUrl = SITE_CONFIG.siteUrl || 'https://www.starsbio.co.uk';

  const now = new Date();
  const currentMonth = now.getUTCMonth() + 1;
  const currentDay = now.getUTCDate();
  const currentYear = now.getUTCFullYear();
  const monthName = getMonthName(currentMonth);

  try {
    let postMessage = '';
    let postLink = siteUrl;

    // ==========================================
    // 1. TODAY'S REAL-TIME BIRTHDAY POST (Subah)
    // ==========================================
    if (type === 'birthday') {
      const bornToday = await getCelebritiesBornOn(currentMonth, currentDay, 6);

      if (!bornToday || bornToday.length === 0) {
        return NextResponse.json({ message: 'No birthdays found for today' });
      }

      // Main birthday spotlight
      const mainStar = bornToday[0];
      const birthYear = mainStar.birth_date ? parseInt(mainStar.birth_date.split('-')[0], 10) : null;
      const currentAge = birthYear ? currentYear - birthYear : null;

      // Other stars celebrating on the exact same day
      const others = bornToday
        .slice(1, 4)
        .map((c) => {
          const bYear = c.birth_date ? parseInt(c.birth_date.split('-')[0], 10) : null;
          const age = bYear ? currentYear - bYear : null;
          return `• ${c.name} (${c.primary_profession || 'Celebrity'}${age ? `, turning ${age}` : ''})`;
        })
        .join('\n');

      postMessage = [
        `🎂 Happy Birthday to ${mainStar.name}! 🎉`,
        '',
        `Today (${monthName} ${currentDay}), ${mainStar.name} turns ${currentAge || ''} years old!`,
        mainStar.primary_profession ? `Recognized globally as an exceptional ${mainStar.primary_profession}.` : '',
        mainStar.birthplace ? `📍 Born in: ${mainStar.birthplace}` : '',
        '',
        others ? `🌟 Also Celebrating Birthdays Today:\n${others}\n` : '',
        `👉 Check full biography, verified age & facts:`,
        `${siteUrl}/people/${mainStar.slug}`,
        '',
        `Explore all ${monthName} ${currentDay} birthdays on StarsBio:`,
        `${siteUrl}/birthdays/${currentMonth}/${currentDay}`,
        '',
        `#HappyBirthday #${mainStar.name.replace(/\s+/g, '')} #CelebrityBirthdays #StarsBio #${monthName}Birthdays`,
      ].filter(Boolean).join('\n');

      postLink = `${siteUrl}/people/${mainStar.slug}`;
    }

    // ==========================================
    // 2. HEAD-TO-HEAD COMPARISON BATTLE (Dopahar)
    // ==========================================
    else if (type === 'comparison') {
      const battles = [
        { s1: 'lionel-messi', n1: 'Lionel Messi', s2: 'cristiano-ronaldo', n2: 'Cristiano Ronaldo' },
        { s1: 'shah-rukh-khan', n1: 'Shah Rukh Khan', s2: 'salman-khan', n2: 'Salman Khan' },
        { s1: 'taylor-swift', n1: 'Taylor Swift', s2: 'selena-gomez', n2: 'Selena Gomez' },
        { s1: 'vin-diesel', n1: 'Vin Diesel', s2: 'dwayne-johnson', n2: 'Dwayne Johnson' },
        { s1: 'zendaya', n1: 'Zendaya', s2: 'billie-eilish', n2: 'Billie Eilish' },
        { s1: 'tom-cruise', n1: 'Tom Cruise', s2: 'brad-pitt', n2: 'Brad Pitt' },
        { s1: 'mrbeast', n1: 'MrBeast', s2: 'pewdiepie', n2: 'PewDiePie' },
        { s1: 'kylie-jenner', n1: 'Kylie Jenner', s2: 'kendall-jenner', n2: 'Kendall Jenner' },
      ];

      // Pick random or day-indexed battle
      const battle = battles[currentDay % battles.length];

      postMessage = [
        `🥊 Celebrity Head-to-Head Battle!`,
        '',
        `${battle.n1}  VS  ${battle.n2}`,
        '',
        `Who has more achievements, and who is older?`,
        `Discover their exact chronological age gap, heights, net worth & career milestones on StarsBio!`,
        '',
        `👉 View Full Comparison:`,
        `${siteUrl}/compare/${battle.s1}-vs-${battle.s2}`,
        '',
        `💬 Who is your favorite? Tell us in the comments! 👇`,
        '',
        `#${battle.n1.replace(/\s+/g, '')} #${battle.n2.replace(/\s+/g, '')} #CelebrityComparison #StarsBio #HeadToHead`,
      ].join('\n');

      postLink = `${siteUrl}/compare/${battle.s1}-vs-${battle.s2}`;
    }

    // ==========================================
    // 3. ICONIC SPOTLIGHT & BIOGRAPHY (Shaam)
    // ==========================================
    else {
      const allStars = await getAllCelebrities();
      const verifiedStars = allStars.filter((c) => c.image_url && c.biography);
      const star = verifiedStars[(currentDay * 7) % verifiedStars.length];

      const bYear = star.birth_date ? parseInt(star.birth_date.split('-')[0], 10) : null;
      const age = bYear ? currentYear - bYear : null;

      postMessage = [
        `🌟 Daily Celebrity Spotlight: ${star.name}!`,
        '',
        star.primary_profession ? `🎭 Profession: ${star.primary_profession}` : '',
        star.birth_date ? `🎂 Born: ${star.birth_date}${age ? ` (Age: ${age})` : ''}` : '',
        star.birthplace ? `📍 Birthplace: ${star.birthplace}` : '',
        star.zodiac_sign ? `♈ Zodiac: ${star.zodiac_sign}` : '',
        '',
        star.biography ? `${star.biography.slice(0, 180)}...` : '',
        '',
        `👉 Read full life story & facts on StarsBio:`,
        `${siteUrl}/people/${star.slug}`,
        '',
        `#${star.name.replace(/\s+/g, '')} #StarsBio #${star.primary_profession ? star.primary_profession.replace(/\s+/g, '') : 'Celebrity'} #Biography`,
      ].filter(Boolean).join('\n');

      postLink = `${siteUrl}/people/${star.slug}`;
    }

    // Post to Facebook Feed
    const fbEndpoint = `https://graph.facebook.com/v26.0/${pageId}/feed`;
    const response = await fetch(fbEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: postMessage,
        link: postLink,
        access_token: pageToken,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Facebook Graph API Error:', result);
      return NextResponse.json({ error: 'Facebook API failed', details: result }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      postId: result.id,
      type,
      link: postLink,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: 'Internal Server Error', message: msg }, { status: 500 });
  }
}
