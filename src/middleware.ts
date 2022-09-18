import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/in/:path*', '/login'],
};

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get('nextauth.token');
  const isLoginRoute = req.nextUrl.pathname === '/login';

  let path = isAuthenticated ? req.nextUrl.pathname : '/';
  if (!isAuthenticated && isLoginRoute) {
    path = '/login';
  }

  if (isAuthenticated && isLoginRoute) {
    return NextResponse.redirect(new URL('/in/home', req.url));
  }
  return NextResponse.rewrite(new URL(path, req.url));
}
