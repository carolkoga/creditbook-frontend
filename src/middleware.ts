/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/in/:path*', '/login', '/admin/:path*'],
};

export function middleware(req: NextRequest) {
  function _getTokenAndUser() {
    let user: { role: 'user' | 'admin' } | null = null;
    const token = req.cookies.get('nextauth.token');
    const userDataAsJSON = req.cookies.get('nextauth.user');

    if (userDataAsJSON) {
      user = JSON.parse(userDataAsJSON as string);
    }

    return { token, user };
  }

  if (req.nextUrl.pathname.startsWith('/admin')) {
    const { token: isAuthenticated, user } = _getTokenAndUser();

    let path = !isAuthenticated ? '/login' : req.nextUrl.pathname;

    if (isAuthenticated && user?.role === 'admin') {
      if (req.nextUrl.pathname === '/login') {
        path = '/admin/dashboard';
      }
    } else if (user?.role === 'user') {
      path = '/in/home';
    } else {
      path = '/';
    }
    return NextResponse.rewrite(new URL(path, req.url));
  }

  if (req.nextUrl.pathname.startsWith('/in') || req.nextUrl.pathname.startsWith('/login')) {
    const { token: isAuthenticated, user } = _getTokenAndUser();

    let path = !isAuthenticated ? '/login' : req.nextUrl.pathname;

    if (isAuthenticated && user?.role === 'user') {
      if (req.nextUrl.pathname === '/login') {
        path = '/in/home';
      }
    }

    return NextResponse.rewrite(new URL(path, req.url));
  }
}
