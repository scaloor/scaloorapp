import 'server-only'
import { getAuthUserDetails } from '../actions/users'

export async function canAccessBusiness(businessId: string) {
    const { dbUser, error: userError } = await getAuthUserDetails()
    if (userError || !dbUser || !dbUser.businessId) throw new Error(userError?.message || 'User not found')

    return businessId === dbUser.businessId
}

export async function canCreateBusiness(userId: string) {
    const { dbUser, error: userError } = await getAuthUserDetails()
    if (userError || !dbUser ) throw new Error(userError?.message || 'User not found')

    return userId === dbUser.id
}

