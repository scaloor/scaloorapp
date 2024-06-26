import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // This code makes /site the root path for the site
  const url = request.nextUrl
  if (url.pathname === '/' || url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN) {
    return NextResponse.rewrite(new URL('/site', request.url));
  }

  
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}