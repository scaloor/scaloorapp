import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import bcrypt from "bcryptjs"
import { db } from "@/server/db"
import authConfig from "@/auth.config"
import { LoginSchema } from "@/server/auth/schemas"
import { getUserByEmail, getUserById } from "@/server/actions/users"
import { users } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            if(!user.id) throw new Error("Cannot find user ID");
            await db.update(users)
                .set({ emailVerified: new Date()})
                .where(eq(users.id, user.id));
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verfication
            if (account?.provider !== "credentials") return true;

            if(!user.id) throw new Error("Cannot find user ID");

            const existingUser = await getUserById(user.id)

            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) return false;

            return true;
        },
        session({ session, token }) {
            if (!!token.sub && !!session.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        jwt({ token }) {

            return token;
        }
    },
    adapter: DrizzleAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if (!user?.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (passwordsMatch) return user;
                }

                return null;
            }
        })
    ],
})