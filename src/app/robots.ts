import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/lib/utils';

export const dynamic = 'force-static';

export function GET() {
  const content = `User-agent: *
Allow: /

# Exclude internal search query parameters and privileged cron endpoints from crawling
Disallow: /search?
Disallow: /api/

# Dynamic sitemap index location
Sitemap: ${SITE_CONFIG.siteUrl}/sitemap.xml
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
