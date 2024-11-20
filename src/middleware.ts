import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl

  // If the request is for an API route, don't apply any rewrites
  if (url.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  let hostname = request.headers.get("host")!;
  const developmentDomains = [
    ".localhost:3000",
    ".scaloorapp-git-mvp02-scaloors-projects.vercel.app", // Replace with your testing environment domain
    ".scaloorapp-qywwdbprr-scaloors-projects.vercel.app",
  ];

  for (const devDomain of developmentDomains) {
    if (hostname.endsWith(devDomain)) {
      hostname = hostname.replace(devDomain, `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
      console.log("hostname updated:", hostname)
      break;
    }
  }

  const searchParams = request.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  // If the path is the app path, rewrite to the app page
  if (hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    if (path === "/") {
      return NextResponse.redirect(new URL("/app/dashboard", request.url));
    }
    console.log("rewriting to:", `/app${path}`)
    return NextResponse.rewrite(new URL(`/app${path}`, request.url));
  }

  // If the path is the root path, rewrite to the site page
  if (url.pathname === '/' || url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    return NextResponse.rewrite(new URL('/site', request.url));
  }

  // TODO: What does this do?
  await updateSession(request)

  // Get the first path segment
  // This is for testing, can probably remove in prod.
  const firstPath = url.pathname.split('/')[1];
  console.log("first path segment:", firstPath);
  if (firstPath === "app") {
    console.log("rewriting to:", `${hostname}${path}`)
    return NextResponse.rewrite(new URL(`http://${hostname}${path}`, request.url));
  }


  // If the path is a dynamic page, rewrite to the dynamic page
  //return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url));
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
    '/api/:path*'  // Add this line to include API routes in the matcher
  ],
}