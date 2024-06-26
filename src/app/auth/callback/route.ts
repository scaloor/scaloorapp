import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { getSessionUser } from '../provider/authenticated-route'
import { addUser, getUserByEmail } from '@/server/data/users'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    const { user } = await getSessionUser();
    const dbUser = await getUserByEmail(user?.email!)
    if (!dbUser) {
      const names = user?.user_metadata?.full_name?.split(' ')
      const firstName = names?.[0]
      const lastName = names?.[names.length - 1]
      try {
        await addUser({
          firstName,
          lastName,
          email: user?.email!,
        })
      } catch (error) {
        console.log('Error adding user to db:', error)
      }
    }



    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}