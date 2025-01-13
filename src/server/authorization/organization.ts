import 'server-only'
import { getAuthUserDetails } from '@/server/actions/protected/users'

export async function canAccessOrganization(organizationId: string) {
    const { dbUser, error: userError } = await getAuthUserDetails()
    if (userError || !dbUser || !dbUser.organizationId) throw new Error(userError?.message || 'User not found')

    return organizationId === dbUser.organizationId
}

export async function canCreateOrganization(userId: string) {
    const { dbUser, error: userError } = await getAuthUserDetails()
    if (userError || !dbUser ) throw new Error(userError?.message || 'User not found')

    return userId === dbUser.id
}

