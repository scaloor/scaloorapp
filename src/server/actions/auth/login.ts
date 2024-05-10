"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { db } from "@/server/db";
import { signIn } from "@/auth";
import { LoginSchema } from "@/server/actions/auth/schemas";
import { getUserByEmail } from "@/server/data/users";
import { DEFAULT_LOGIN_REDIRECT } from "@/server/actions/auth/routes";
import { generateVerificationToken } from "@/server/actions/auth/tokens";
import { sendVerificationEmail } from "@/server/mail/auth/verification";


export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);  

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser?.email || !existingUser?.password) {
    return { error: "Email does not exist!" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    
    if (!!verificationToken) {
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );
    }

    return { success: "Confirmation email sent!" };

  }


  
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
};