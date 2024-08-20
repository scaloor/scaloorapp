'use server'

import { createClient } from '@/lib/supabase/server'
import { RegisterSchema } from '@/app/app/(auth)/_components/schemas'
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

  // Capitalize first and last name
  const firstName = first_name.toLowerCase().charAt(0).toUpperCase() + first_name.toLowerCase().slice(1);
  const lastName = last_name.toLowerCase().charAt(0).toUpperCase() + last_name.toLowerCase().slice(1);


  const { error } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password,
  })

  if (error) {
    console.log(error)
    return { error: "Invalid details!" }
  }

  await addUser({
    firstName,
    lastName,
    email: email.toLowerCase(),
  })

  return { success: "Verification email sent!" };
}