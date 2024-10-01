'use server'

import { canAccessFunnel } from "@/server/authorization/funnel"
import { getFunnelById } from "@/server/data/funnels"
import { getPageByFunnelIdAndPath, getPagesByFunnelId } from "@/server/data/page"

export async function getFunnelPreview(funnelId: string, pathName: string) {
    try {
        const { dbFunnel, error: funnelError } = await getFunnelById(funnelId)
        if (funnelError || !dbFunnel) return { error: funnelError || "Cannot find funnel" }
        if (!await canAccessFunnel(dbFunnel.businessId)) throw new Error("Unauthorized")
        const { dbPage, error: pageError } = await getPageByFunnelIdAndPath(funnelId, pathName)
        if (pageError || !dbPage) return { error: pageError || "Cannot find page" }
        return { dbPage, checkoutProduct: dbFunnel.checkoutProduct }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function getFirstPageAction(funnelId: string) {
    try {
        const { pages, error: pagesError } = await getPagesByFunnelId(funnelId)
        if (pagesError || !pages) return { error: pagesError || "Cannot find pages" }
        return { pathName: pages[0].pathName }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}
