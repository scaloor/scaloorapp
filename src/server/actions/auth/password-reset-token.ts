import { db } from "@/server/db";
import { passwordResetTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordResetToken = await db.select().from(passwordResetTokens)
            .where(eq(passwordResetTokens.token, token)).then(res => res[0]);        

        return passwordResetToken;
    } catch {
        return null;
    }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.select().from(passwordResetTokens)
            .where(eq(passwordResetTokens.email, email)).then(res => res[0]);

        return passwordResetToken;
    } catch {
        return null;
    }
};