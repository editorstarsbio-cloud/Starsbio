import { NextRequest, NextResponse } from 'next/server';
import { getCelebritiesBornOn } from '@/lib/repository';
import { SITE_CONFIG, getMonthName } from '@/lib/utils';

/**
 * Automated Daily Facebook Birthday Post Bot
 * Endpoint: /api/cron/facebook-daily-post
 *
 * Runs daily via Vercel Cron or manual authorized call:
 * Authorization: Bearer <CRON_SECRET> (optional if CRON_SECRET is set)
 */
export async function GET(request: NextRequest) {
  // 1. Authorization check (if CRON_SECRET is configured)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Fetch Facebook Credentials from environment or configured constants
  const pageId = process.env.FACEBOOK_PAGE_ID || '1377530792117836';
  const pageToken =
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN ||
    'EAAUt3SZCM33oBS5yLMhokZAy5A7Fpkm5Fkqotf23GC1XffpcyZCQWr8qelfYfaxbyzBBEeMZAjIUtB3ybZBsdQFRPAMwJXKa3H0u731tFl0A6phYzpbdxRR0msEdfdnmfi63plO5Aw7TS0Pn0544KIMPiaTQMulLWXGPydDX1tNZBfe6F3DKv1a7AmhiLXsQzZC0jyxZA8S9e97xmeRUMqEBI1HEZBf4HBSMZCAtBEg5AZD';

  if (!pageToken || !pageId) {
    return NextResponse.json({ error: 'Facebook credentials missing' }, { status: 500 });
  }

  try {
    // 3. Get Today's Date in UTC / UK Time
    const now = new Date();
    const currentMonth = now.getUTCMonth() + 1;
    const currentDay = now.getUTCDate();
    const monthName = getMonthName(currentMonth);

    // 4. Fetch top celebrities born today
    const bornTodayList = await getCelebritiesBornOn(currentMonth, currentDay, 5);

    if (!bornTodayList || bornTodayList.length === 0) {
      return NextResponse.json({ message: 'No celebrities found for today', date: `${monthName} ${currentDay}` });
    }

    // Select the top/most famous celebrity for the main spotlight
    const topStar = bornTodayList[0];
    const topStarAge = topStar.birth_date
      ? now.getUTCFullYear() - parseInt(topStar.birth_date.split('-')[0], 10)
      : null;

    // Format list of other stars celebrating today
    const otherStarsText = bornTodayList
      .slice(1, 4)
      .map((c) => {
        const age = c.birth_date ? now.getUTCFullYear() - parseInt(c.birth_date.split('-')[0], 10) : null;
        return `• ${c.name} (${c.primary_profession || 'Star'}${age ? `, turning ${age}` : ''})`;
      })
      .join('\n');

    // 5. Construct engaging, viral Facebook Post message
    const postMessage = [
      `🎂 Happy Birthday to ${topStar.name}! 🎉`,
      '',
      `Today (${monthName} ${currentDay}), ${topStar.name} turns ${topStarAge || ''} years old!`,
      topStar.primary_profession ? `Known worldwide as a talented ${topStar.primary_profession}.` : '',
      '',
      otherStarsText ? `🌟 Other Famous Birthdays Today:\n${otherStarsText}\n` : '',
      `👉 Check full biography, age difference & verified facts:`,
      `${SITE_CONFIG.siteUrl}/people/${topStar.slug}`,
      '',
      `Explore all ${monthName} ${currentDay} birthdays on StarsBio:`,
      `${SITE_CONFIG.siteUrl}/birthdays/${currentMonth}/${currentDay}`,
      '',
      `#HappyBirthday #${topStar.name.replace(/\\s+/g, '')} #CelebrityBirthdays #StarsBio #${monthName}Birthdays`,
    ]
      .filter((line) => line !== undefined)
      .join('\n');

    // 6. Post to Facebook Page Feed via Graph API
    const fbEndpoint = `https://graph.facebook.com/v26.0/${pageId}/feed`;
    const response = await fetch(fbEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: postMessage,
        link: `${SITE_CONFIG.siteUrl}/people/${topStar.slug}`,
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
      spotlight: topStar.name,
      date: `${monthName} ${currentDay}`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Facebook Daily Post Error:', message);
    return NextResponse.json({ error: 'Internal Server Error', message }, { status: 500 });
  }
}