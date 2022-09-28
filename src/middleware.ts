/* eslint-disable no-nested-ternary */
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/in/:path*', '/login'],
};

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/in') || req.nextUrl.pathname.startsWith('/login')) {
    const isAuthenticated = req.cookies.get('nextauth.token');

    let path = !isAuthenticated ? '/login' : req.nextUrl.pathname;

    if (isAuthenticated) {
      if (req.nextUrl.pathname === '/login') {
        path = '/in/home';
      }
    }

    return NextResponse.rewrite(new URL(path, req.url));
  }
}
