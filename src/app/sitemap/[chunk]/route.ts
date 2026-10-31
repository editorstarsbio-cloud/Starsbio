import { NextRequest, NextResponse } from 'next/server';
import { getAllCelebrities, getAllCategories } from '@/lib/repository';
import { ZODIAC_SIGNS } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const CHUNK_SIZE = 5000;
const BASE_URL = 'https://www.starsbio.co.uk';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chunk: string }> }
) {
  const { chunk } = await params;
  const chunkId = parseInt(chunk, 10);

  if (isNaN(chunkId)) {
    return new NextResponse('Invalid sitemap chunk', { status: 400 });
  }

  const now = new Date().toISOString().split('T')[0];

  // Chunk 0: Core pages, categories, 365 birthday dates, zodiac signs
  if (chunkId === 0) {
    const staticUrls = [
      '',
      '/birthdays',
      '/category',
      '/zodiac',
      '/compare',
      '/in-memoriam',
      '/blog',
      '/blog/who-is-shah-rukh-khan-biography-net-worth-family-awards',
      '/blog/taylor-swift-biography-eras-tour-net-worth-dating-history',
      '/blog/cristiano-ronaldo-biography-net-worth-goals-family-al-nassr',
      '/blog/zendaya-biography-career-awards-tom-holland-relationship',
      '/about',
      '/editorial-policy',
      '/corrections-policy',
      '/data-sources',
      '/privacy-policy',
      '/terms',
      '/disclaimer',
      '/contact',
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    for (const path of staticUrls) {
      xml += `  <url>\n    <loc>${BASE_URL}${path}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>${path === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
    }

    // 365 Days of the Year (/birthdays/M/D)
    const daysInMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let m = 1; m <= 12; m++) {
      for (let d = 1; d <= daysInMonths[m - 1]; d++) {
        xml += `  <url>\n    <loc>${BASE_URL}/birthdays/${m}/${d}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      }
    }

    // Categories
    const categories = await getAllCategories();
    for (const cat of categories) {
      xml += `  <url>\n    <loc>${BASE_URL}/category/${cat.slug}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }

    // Zodiac Signs
    for (const sign of Object.keys(ZODIAC_SIGNS)) {
      xml += `  <url>\n    <loc>${BASE_URL}/zodiac/${sign.toLowerCase()}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }

    xml += `</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  }

  // Chunks 1..N: 5,000 celebrity profiles each
  const allCelebrities = await getAllCelebrities();
  const chunkIndex = chunkId - 1;
  const start = chunkIndex * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;
  const slice = allCelebrities.slice(start, end);

  if (slice.length === 0) {
    return new NextResponse('Sitemap chunk empty', { status: 404 });
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const c of slice) {
    const lastMod = c.updated_at ? c.updated_at.split('T')[0] : now;
    const priority = c.image_url ? '0.9' : '0.7';
    xml += `  <url>\n    <loc>${BASE_URL}/people/${c.slug}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
  }

  xml += `</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
