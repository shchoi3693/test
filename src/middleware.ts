import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  if (user && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!user && pathname.startsWith('/playlist')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * 제외:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - 이미지 확장자
     * - .well-known
     */
    '/((?!_next/static|_next/image|favicon.ico|.well-known|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
