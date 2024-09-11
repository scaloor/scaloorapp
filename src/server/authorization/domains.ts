import 'server-only'
import { getAuthUserDetails } from '../actions/users'


export async function canAccessDomains(businessId: string) {
    const { dbUser, error: userError } = await getAuthUserDetails()
    if (!dbUser || userError) throw new Error(userError.message || "User not found")

    return dbUser.businessId === businessId
}