"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { NewPasswordSchema } from "@/lib/schemas";
import { getPasswordResetTokenByToken } from "@/server/actions/auth/password-reset-token";
import { getUserByEmail } from "@/server/actions/users";
import { db } from "@/server/db";
import { passwordResetTokens, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
) => {
    if (!token) {
        return { error: "Missing token!" };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, existingUser.id));

    await db.delete(passwordResetTokens)
        .where(eq(passwordResetTokens.identifier, existingToken.identifier));

    return { success: "Password updated!" };
};