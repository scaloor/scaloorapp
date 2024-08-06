'use server'

import { createClient } from '@/lib/supabase/server'
import { RegisterSchema } from '@/app/auth/_components/schemas'
import { z } from 'zod'
import { addUser, getUserByEmail } from '@/server/data/users'

export async function signup(data: z.infer<typeof RegisterSchema>) {
  const supabase = createClient()

  const validation = RegisterSchema.safeParse(data)
  if (!validation.success) {
    console.log("Failed server validation")
    return { error: "Something went wrong!" }
  }

  const { first_name, last_name, email, password } = data;

  // Check that the email is not already in use
  const { dbUser: existingUser } = await getUserByEmail(email.toLowerCase());
  if (!!existingUser) {
    return { error: "Email already in use!" };
  }

  await addUser({
    firstName: first_name.toLowerCase(),
    lastName: last_name.toLowerCase(),
    email: email.toLowerCase(),
  })

  const { error } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password,
  })

  if (error) {
    console.log(error)
    return { error: "Invalid details!" }
  }

  return { success: "Verification email sent!" };
}