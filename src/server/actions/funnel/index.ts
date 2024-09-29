'use server'

import { db } from "@/server/db"
import { desc, eq } from "drizzle-orm"
import { funnel } from "@/server/db/schema"
import { createPathname } from "@/lib/utils"
import { addFunnel, deleteFunnel, getFunnelById, getFunnelsByBusinessId } from "@/server/data/funnels"
import { getAuthUserDetails } from "../users"
import { canAccessFunnel } from "@/server/authorization/funnel"
import { getDomainById } from "@/server/data/domains"

// TODO: Add authorization check
export async function getRecentFunnels({ businessId }: { businessId: string }) {
    try {
        if (!canAccessFunnel(businessId)) {
            return { error: "You are not authorized to access this funnel" }
        }
        const funnels = await db.query.funnel.findMany({
            where: eq(funnel.businessId, businessId),
            orderBy: [desc(funnel.updatedAt)],
            limit: 5,
        })
        return { funnels }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function getAllFunnelsAction() {
    const { dbUser } = await getAuthUserDetails()
    if (!dbUser?.businessId) return { error: 'User not found' }
    const { funnels, error } = await getFunnelsByBusinessId(dbUser.businessId)
    if (error) return { error: error }
    return { funnels, businessId: dbUser.businessId }
}

export async function createNewFunnelAction(
    {
        businessId,
        name,
    }: {
        businessId: string;
        name: string;
    }
) {
    try {
        const pathName = createPathname(name);
        const { error } = await addFunnel({ name, businessId, pathName })
        if (error) {
            return { error: error.message }
        }
        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}


export async function getFunnelByIdAction(funnelId: string) {
    try {
        const { dbFunnel, error: funnelError } = await getFunnelById(funnelId);
        if (funnelError) throw new Error(funnelError.message)
        if (!dbFunnel) return { error: "Funnel not found" }
        if (!canAccessFunnel(dbFunnel?.businessId)) {
            throw new Error("You are not authorized to access this funnel")
        }
        if (!dbFunnel.domainId) return { dbFunnel }
        const { dbDomain, error: domainError } = await getDomainById(dbFunnel.domainId)
        if (domainError) throw new Error(domainError.message)
        return { dbFunnel, dbDomain }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }

    }
}

export async function deleteFunnelAction(funnelId: string) {
    try {
        // Authorization check
        const { dbFunnel, error: getFunnelError } = await getFunnelById(funnelId);
        if (getFunnelError || !dbFunnel) return { error: getFunnelError?.message }
        if (!canAccessFunnel(dbFunnel.businessId)) {
            return { error: "You are not authorized to access this funnel" }
        }

        // Delete funnel
        const { error: deleteFunnelError } = await deleteFunnel(funnelId)
        if (deleteFunnelError) {
            return { error: deleteFunnelError.message }
        }
        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}
