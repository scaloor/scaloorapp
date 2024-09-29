'use server'

import { canAccessFunnel } from "@/server/authorization/funnel"
import { getDomainsByBusinessId } from "@/server/data/domains"
import { getFunnelById, updateFunnelColumns } from "@/server/data/funnels"


export async function getFunnelDomainsAction(funnelId: string) {
    try {
        const { dbFunnel, error: funnelError } = await getFunnelById(funnelId)
        if (funnelError) throw new Error(funnelError)
        if (!dbFunnel) throw new Error("Funnel not found")
        if (!canAccessFunnel(dbFunnel.businessId)) throw new Error("You are not authorized to access this funnel")

        const { dbDomains, error: domainError } = await getDomainsByBusinessId(dbFunnel.businessId)
        if (domainError) throw new Error(domainError)
        if (!dbDomains) throw new Error("No domains found")

        return {
            dbDomains,
            currentDomain: dbFunnel.domainId
        };

    } catch (error: any) {
        return {
            error: error.message
        }
    }
}

export async function updateFunnelDomainAction(domainId: string, funnelId: string) {
    try {
        const { dbFunnel, error: funnelError } = await getFunnelById(funnelId)
        if (funnelError) throw new Error(funnelError)
        if (!dbFunnel) throw new Error("Funnel not found")
        if (!canAccessFunnel(dbFunnel.businessId)) throw new Error("You are not authorized to access this funnel")

        const { error: updateError } = await updateFunnelColumns({ id: funnelId, domainId })
        if (updateError) throw new Error(updateError)

        return { success: true }

    } catch (error: any) {
        return {
            error: error.message
        }
    }
}
