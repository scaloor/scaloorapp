"use server";

import * as z from "zod";

import { ResetSchema } from "@/server/auth/schemas";
import { getUserByEmail } from "@/server/actions/users";
import { sendPasswordResetEmail } from "@/server/mail/auth/password-reset";
import { generatePasswordResetToken } from "@/server/auth/tokens";

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  if (!!passwordResetToken) {
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );
  }

  return { success: "Reset email sent!" };
}