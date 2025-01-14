import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { NextResponse } from "next/server";

const unprotectedRoutes = [
  "/callback",
  "/confirm",
  "/login",
  "/new-password",
  "/register",
  "/reset-password",
]

const developmentDomains = [
  ".localhost:3000",
  ".scaloorapp-git-mvp02-scaloors-projects.vercel.app", // Replace with your testing environment domain
];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl

  // If the request is for an API route, don't apply any rewrites
  if (url.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const supaResponse = await updateSession(request)

  let hostname = request.headers.get("host")!;

  for (const devDomain of developmentDomains) {
    if (hostname.endsWith(devDomain)) {
      hostname = hostname.replace(devDomain, `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
      break;
    }
  }

  const searchParams = request.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  //Middleware does not account for accessing the app directly from /app
  //TODO: Fix this

  // If the path is the app path, rewrite to the app page
  if (hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    // If logged in and viewing a non-auth route, rewrite to app
    if (!unprotectedRoutes.includes(request.nextUrl.pathname) && !supaResponse?.user.error) {
      //console.log("Logged in, non-auth route")
      return NextResponse.rewrite(new URL(`/app${path}`, request.url));
    }
    // If not logged in and viewing an auth route, rewrite to app
    if (unprotectedRoutes.includes(request.nextUrl.pathname) && supaResponse?.user.error) {
      //console.log("Not logged in, auth route")
      return NextResponse.rewrite(new URL(`/app${path}`, request.url));
    }
    // If logged in and viewing an auth route, rewrite to root
    if (unprotectedRoutes.includes(request.nextUrl.pathname) && !supaResponse?.user.error) {
      //console.log("Logged in, auth route")
      return NextResponse.redirect(new URL(`/`, request.url));
    }
    // If not logged in and viewing a non-auth route, rewrite to login
    if (!unprotectedRoutes.includes(request.nextUrl.pathname) && supaResponse?.user.error) {
      //console.log("Not logged in, non-auth route")
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }

  // If the path is the root path, rewrite to the site page
  // This does not account for a custom domain root path, but its not needed yet.
  if (url.pathname === '/' || url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    return NextResponse.rewrite(new URL('/site', request.url));
  }

    // Get the first path segment
  // This is for testing, can probably remove in prod.
  const firstPath = url.pathname.split('/')[1];
  if (firstPath === "app") {
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