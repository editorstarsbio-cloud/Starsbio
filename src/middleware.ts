import { NextRequest, NextResponse } from 'next/server';

/**
 * P1-4 Fix: Force lowercase URLs with 301 redirect.
 * /PEOPLE/king-charles-iii → 301 → /people/king-charles-iii
 * Prevents case-sensitive duplicate content and split ranking signals.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip Next.js internals and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname has any uppercase characters
  const lowercasePath = pathname.toLowerCase();
  if (pathname !== lowercasePath) {
    const url = request.nextUrl.clone();
    url.pathname = lowercasePath;
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static, _next/image, favicon
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon|api).*)',
  ],
};
