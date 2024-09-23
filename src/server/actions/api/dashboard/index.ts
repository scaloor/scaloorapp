'use server'

import { getAuthUserDetails } from "@/server/actions/users"
import { getBusinessById } from "@/server/data/business"
import { getRecentFunnels } from "../../funnel"
import { getDomainsByBusinessId } from "@/server/data/domains"

export async function getDashboardDetailsAction() {
    const { dbUser } = await getAuthUserDetails()
    if (!dbUser?.businessId) return { error: "User not found" }
    const { dbBusiness } = await getBusinessById(dbUser.businessId)
    if (!dbBusiness) return { error: "Business not found" }
    // TODO: Get custom domain
    const { dbDomains } = await getDomainsByBusinessId(dbBusiness.id)
    const { funnels } = await getRecentFunnels({ businessId: dbBusiness.id! })
    if (!funnels) return { error: "Funnels not found" }
    return { dbUser, dbBusiness, funnels, dbDomains }
}

/* export async function getDashboardDetailsAction() {
    try {
        const [{ dbUser }, { dbBusiness: SelectBusiness }, { funnels }] = await Promise.all([
            getAuthUserDetails(),
            getBusinessById(dbUser?.businessId),
            getRecentFunnels({ businessId: dbBusiness?.id })
        ]);

        if (!dbUser?.businessId) throw new Error("User not found");
        if (!dbBusiness) throw new Error("Business not found");
        if (!funnels) throw new Error("Funnels not found");

        // TODO: Get custom domain
        return { dbUser, dbBusiness, funnels };
    } catch (error) {
        return { error: error.message };
    }
} */



