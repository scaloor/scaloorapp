'use server'

import { createClient } from '@/lib/supabase/server'
import { RegisterSchema } from '@/app/app/(auth)/_components/schemas'
import { z } from 'zod'
import { addUser, getUserByEmail } from '@/server/data/users'
import { capitalizeFirstLetter } from '@/lib/utils'

export async function signup(data: z.infer<typeof RegisterSchema>) {
  const supabase = createClient()

  const validation = RegisterSchema.safeParse(data)
  if (!validation.success) {
    console.log("Failed server validation")
    return { error: "Something went wrong!" }
  }

  const { first_name, last_name, email, password } = data;

  const supaUser = await supabase.auth.getUser()
  const verified = supaUser.data.user?.email_confirmed_at

  // Check that the email is not already in use
  const { dbUser: existingUser } = await getUserByEmail(email.toLowerCase());


  if (!!existingUser) {
    if (!verified) {
      await supabase.auth.resend({ type: "signup", email })
      return { success: "Verification email resent!" }
    }
    return { error: "Email already in use!" };
  }

  // Capitalize first and last name
  const firstName = capitalizeFirstLetter(first_name)
  const lastName = capitalizeFirstLetter(last_name)


  const { error } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password,
  })

  if (error) {
    console.log('here', error)
    return { error: "Invalid details!" }
  }

  await addUser({
    firstName,
    lastName,
    email: email.toLowerCase(),
  })

  return { success: "Verification email sent!" };
}