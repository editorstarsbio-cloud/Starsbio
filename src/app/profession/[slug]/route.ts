import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const targetUrl = new URL(`/category/${slug}`, request.url);
  return NextResponse.redirect(targetUrl, 301);
}
