import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl

  let hostname = request.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  const searchParams = request.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""
    }`;

  console.log('hostname', hostname, 'path', path)
  // If the path is the root path, rewrite to the site page
  if (url.pathname === '/' || url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    return NextResponse.rewrite(new URL('/site', request.url));
  }

  // If the path is the app path, rewrite to the app page
  if (hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(new URL(`/app${path === "/" ? "" : path}`, request.url));
  }

  // TODO: What does this do?
  await updateSession(request)

  // If the path is a dynamic page, rewrite to the dynamic page
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url));

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
    //"/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
}