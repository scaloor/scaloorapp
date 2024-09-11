'use server'

import { getAuthUserDetails } from "@/server/actions/users"
import { getBusinessById } from "@/server/data/business"
import { getRecentFunnels } from "../../funnel"

export async function getDashboardDetailsAction() {
    const { dbUser } = await getAuthUserDetails()
    if (!dbUser?.businessId) return { error: "User not found" }
    const { dbBusiness } = await getBusinessById(dbUser.businessId)
    if (!dbBusiness) return { error: "Business not found" }
    const { funnels } = await getRecentFunnels({ businessId: dbBusiness.id! })
    if (!funnels) return { error: "Funnels not found" }
    return { dbUser, dbBusiness, funnels }
}
