import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/in/:path*', '/login'],
};

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/in') || req.nextUrl.pathname.startsWith('/login')) {
    const isAuthenticated = req.cookies.get('nextauth.token');
    const path = !isAuthenticated ? '/login' : req.nextUrl.pathname;

    return NextResponse.rewrite(new URL(path, req.url));
  }

  return NextResponse.rewrite(new URL(req.nextUrl.pathname, req.url));
}
