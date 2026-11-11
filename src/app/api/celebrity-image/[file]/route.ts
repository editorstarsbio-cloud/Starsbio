import { NextRequest, NextResponse } from 'next/server';
import { getCelebrityBySlug } from '@/lib/repository';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;
  const slug = file.replace(/\.(jpg|jpeg|png|webp)$/i, '');

  const celebrity = await getCelebrityBySlug(slug);
  const targetUrl = celebrity?.original_image_url || celebrity?.image_url;

  if (!targetUrl || targetUrl.startsWith('/api/celebrity-image/')) {
    return new NextResponse('Image Not Found', { status: 404 });
  }

  // Instant 307 Temporary Redirect with 1-month CDN cache:
  // Browser & Cloudflare cache this redirect. The client downloads directly
  // from Wikimedia/Wikipedia, consuming 0 MB Vercel bandwidth!
  return NextResponse.redirect(targetUrl, {
    status: 307,
    headers: {
      'Cache-Control': 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400',
    },
  });
}
