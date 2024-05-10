import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from '@/server/actions/auth/routes'
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    const url = req.nextUrl
    const searchParams = url.searchParams.toString();
    let hostname = req.headers

    if (url.pathname === '/' || url.pathname === '/site' && url.host === process.env.NEXT_PUBLIC_DOMAIN) {
        return NextResponse.rewrite(new URL('/site', req.url));
    }

    if (isApiAuthRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return;
    }


    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search
        }

        const encodedCallbackUrl = encodeURIComponent(callbackUrl);

        return NextResponse.redirect(new URL(
            `/auth/login?callbackUrl=${encodedCallbackUrl}`,
            nextUrl
        ));
    }

    return;
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};