'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LoginSchema } from '@/app/app/(auth)/_components/schemas'
import { z } from 'zod'

export async function login(data: z.infer<typeof LoginSchema>) {
  const supabase = await createClient()

  const validation = LoginSchema.safeParse(data)
  if (!validation.success) {
    console.log("Failed server validation")
    return { error: "Something went wrong!" }
  }

  const { email, password } = data;

  const { error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  })

  if (error) {
    console.log(error)
    return { error: "Invalid credentials!" }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}