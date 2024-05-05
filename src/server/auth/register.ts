"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/server/auth/schemas";
import { addUser, getUserByEmail } from "@/server/actions/users";
import { generateVerificationToken } from "@/server/auth/tokens";
import { sendVerificationEmail } from "@/server/mail/auth/verification";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (!!existingUser) {
    return { error: "Email already in use!" };
  }

  await addUser({ name, email, hashedPassword });

  const verificationToken = await generateVerificationToken(email);
  if (!!verificationToken) {
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
    return { success: "Confirmation email sent!" };
  }
};