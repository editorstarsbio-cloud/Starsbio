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

  try {
    const upstreamRes = await fetch(targetUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
      next: { revalidate: 60 * 60 * 24 * 7 }, // Cache for 7 days
    });

    if (!upstreamRes.ok) {
      return new NextResponse('Upstream image error', { status: upstreamRes.status });
    }

    const contentType = upstreamRes.headers.get('content-type') || 'image/jpeg';
    const buffer = await upstreamRes.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Aggressive caching for performance & CDN delivery
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return new NextResponse('Error proxying image', { status: 500 });
  }
}
