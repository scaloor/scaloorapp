/**
 * An array of routes that are accessible to the public.
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
]

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users.
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset-password",
    "/auth/new-password"
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile"