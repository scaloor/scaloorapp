import 'server-only'
import { getAuthUserDetails } from '../actions/protected/users'
import { getBusinessById } from '../data/business'

// The User can access the funnel if the associated funnel belongs to the user's business
export async function canAccessFunnel(businessId: string) {
    const { dbUser, error: userError } = await getAuthUserDetails()
    if (userError || !dbUser || !dbUser.businessId) throw new Error(userError?.message || 'User not found')
    const { dbBusiness, error: businessError } = await getBusinessById(businessId)
    if (businessError || !dbBusiness) throw new Error(businessError?.message || 'Business not found')

    return dbBusiness.id === dbUser.businessId
}
