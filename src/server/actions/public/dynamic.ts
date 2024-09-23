'use server'

import { db } from "@/server/db"
import { eq, and } from "drizzle-orm"
import { domain, funnel, page } from "@/server/db/schema"

export async function getDynamicPageAction({ domainName, funnelPath, pagePath }: { domainName: string, funnelPath: string, pagePath: string }) {
    try {
        // Get the domain id
        const { domainId } = await db
            .select({ domainId: domain.id })
            .from(domain)
            .where(eq(domain.domain, domainName))
            .then((res) => res[0])

        if (!domainId) return { error: 'Domain not found' }

        // Get all the funnels using this domain
        const dbFunnel = await db
            .select()
            .from(funnel)
            .where(and(
                eq(funnel.domainId, domainId),
                eq(funnel.pathName, funnelPath)
            ))
            .then((res) => res[0])

        // Check that the funnel is published
        if (!dbFunnel || !dbFunnel.published) return { error: 'Funnel not published' }


        // Get the page that belongs to the funnel
        const dbPage = await db
            .select()
            .from(page)
            .where(and(
                eq(page.funnelId, dbFunnel.id),
                eq(page.pathName, pagePath)
            ))
            .then((res) => res[0])

        if (!dbPage) return { error: 'Page not found' }

        return { dbPage }
    } catch (error) {
        console.error(error)
        return { error: error }
    }
}

export async function getDynamicFunnelAction({ domainName, funnelPath }: { domainName: string, funnelPath: string }) {
    try {
        // Get the domain id
        const { domainId } = await db
            .select({ domainId: domain.id })
            .from(domain)
            .where(eq(domain.domain, domainName))
            .then((res) => res[0])

        if (!domainId) return { error: 'Domain not found' }
        console.log(domainId)

        // Get the funnel using the domain and funnel path
        const dbFunnel = await db
            .select()
            .from(funnel)
            .where(and(
                eq(funnel.domainId, domainId),
                eq(funnel.pathName, funnelPath)
            ))
            .then((res) => res[0])

        if (!dbFunnel) return { error: 'Funnel not found' }

        const landingPage = await db.
            select()
            .from(page)
            .where(and(
                eq(page.funnelId, dbFunnel.id),
                eq(page.order, 1)
            ))
            .then((res) => res[0])

        if (!landingPage) return { error: 'Landing page not found' }

        const path = `${dbFunnel.pathName}/${landingPage.pathName}`

        return { path }

    } catch (error) {
        console.error(error)
        return { error: error }
    }
}
