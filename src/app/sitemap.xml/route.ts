import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/lib/utils';
import { getAllCelebrities } from '@/lib/repository';

export const dynamic = 'force-dynamic';
export const revalidate = 2592000; // 30-day CDN cache

const CHUNK_SIZE = 5000;

export async function GET() {
  const baseUrl = SITE_CONFIG.siteUrl;
  const allCelebrities = await getAllCelebrities();
  const celebChunks = Math.ceil(allCelebrities.length / CHUNK_SIZE);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Core pages, categories, 365 calendar days, zodiac
  xml += `  <sitemap>\n    <loc>${baseUrl}/sitemap/0.xml</loc>\n  </sitemap>\n`;

  // Celebrity profile chunks
  for (let i = 1; i <= celebChunks; i++) {
    xml += `  <sitemap>\n    <loc>${baseUrl}/sitemap/${i}.xml</loc>\n  </sitemap>\n`;
  }

  xml += `</sitemapindex>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400',
    },
  });
}
