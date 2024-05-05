import { getPasswordResetTokenByEmail } from "@/server/auth/password-reset-token";
import { getVerificationTokenByEmail } from "@/server/auth/verification-token";
import { db } from "@/server/db";
import { passwordResetTokens, verificationTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";


export const generatePasswordResetToken = async (email: string) => {
    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.delete(passwordResetTokens)
            .where(eq(passwordResetTokens.identifier, existingToken.identifier))

    }

    const passwordResetToken = await db.insert(passwordResetTokens)
        .values({
            identifier: crypto.randomUUID(),
            email,
            token,
            expires
        }).returning().then(res => res[0]);

    return passwordResetToken;
}

export const generateVerificationToken = async (email: string) => {
    console.log("Hello from token:")
    const token = crypto.randomUUID();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.delete(verificationTokens)
            .where(eq(verificationTokens.identifier, existingToken.identifier));
    }

    type NewVerificationToken = typeof verificationTokens.$inferInsert;

    const insertToken = async (newToken: NewVerificationToken) => {
        return await db.insert(verificationTokens).values(newToken).returning().then(res => res[0])
    }

    const newToken: NewVerificationToken = {
        identifier: crypto.randomUUID(),
        email,
        token,
        expires
    };

    const verificationToken = insertToken(newToken);

    

    return verificationToken;
};