import 'server-only'
import { getAuthUserDetails } from '../actions/protected/users'

export async function canAccessUser(userId: string) {
    const { dbUser, error: userError } = await getAuthUserDetails()
    if (userError || !dbUser) throw new Error(userError?.message || 'User not found')

    return userId === dbUser.id
}

