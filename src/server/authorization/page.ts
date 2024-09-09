import 'server-only'
import { getAuthUserDetails } from '../actions/users'
import { getFunnelById } from '../data/funnels'



// The User can access the page if the associated funnel belongs to the user's business
export async function canAccessPage(funnelId: string) {
    const { dbUser, error: userError } = await getAuthUserDetails()
    if (userError || !dbUser || !dbUser.businessId) throw new Error(userError?.message || 'User not found')
    const { dbFunnel, error: funnelError } = await getFunnelById(funnelId)
    if (funnelError || !dbFunnel) throw new Error(funnelError?.message || 'Funnel not found')

    return dbFunnel.businessId === dbUser.businessId
}

