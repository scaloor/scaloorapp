import 'server-only'
import { getAuthUserDetails } from '../actions/protected/users'

export async function canAccessProduct(businessId: string) {
    const { dbUser, error: userError } = await getAuthUserDetails()
    if (userError || !dbUser || !dbUser.businessId) throw new Error(userError?.message || 'User not found')
    return dbUser.businessId === businessId
}