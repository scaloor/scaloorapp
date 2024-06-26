'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'


export async function loginWithGoogle() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
    },
  })

  if (error) {
    console.log(error)
    return { error: "Invalid credentials!" }
  }

  redirect(data.url);
}