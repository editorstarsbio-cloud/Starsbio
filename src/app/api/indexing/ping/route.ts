import { NextRequest, NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/lib/utils';
import { getAllCelebrities } from '@/lib/repository';

export const runtime = 'nodejs';

// POST /api/indexing/ping
// Pings IndexNow (Bing, Yandex, Yahoo) with top trending URLs for instant crawl
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // Optional simple security check if CRON_SECRET is set
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const celebrities = await getAllCelebrities();
    const siteUrl = SITE_CONFIG.siteUrl.replace(/\/$/, '');
    
    // Pick top 200 URLs to submit to IndexNow protocol
    const urlList = [
      `${siteUrl}/`,
      `${siteUrl}/birthdays`,
      `${siteUrl}/category`,
      `${siteUrl}/blog`,
      ...celebrities.slice(0, 196).map((c) => `${siteUrl}/people/${c.slug}`),
    ];

    const host = new URL(siteUrl).hostname;
    const indexNowKey = process.env.INDEXNOW_KEY || 'starsbio-indexnow-key';

    // Submit to IndexNow API (Bing / Yandex / Naver)
    const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host,
        key: indexNowKey,
        keyLocation: `${siteUrl}/${indexNowKey}.txt`,
        urlList,
      }),
    });

    return NextResponse.json({
      success: true,
      submittedUrls: urlList.length,
      indexNowStatus: indexNowResponse.status,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET status
export async function GET() {
  return NextResponse.json({
    status: 'ready',
    endpoint: '/api/indexing/ping',
    method: 'POST',
    description: 'IndexNow automated fast-crawler notification for Bing, Yandex, and Indexing engines.',
  });
}
