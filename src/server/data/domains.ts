import 'server-only'
import { db } from '../db'
import { domain } from '../db/schema'
import { eq } from 'drizzle-orm'
import { canAccessDomains } from '../authorization/domains'
import { getAuthUserDetails } from '../actions/users'
import { removeDomainFromVercelProject } from './vercel'


export async function addDomain(domainName: string) {
    try {
        const { dbUser } = await getAuthUserDetails()
        if (!dbUser?.businessId) return { error: 'User not found' }

        // Check if the domain already exists
        const existingDomain = await db
            .select()
            .from(domain)
            .where(eq(domain.domain, domainName))
            .limit(1)

        if (existingDomain.length > 0) {
            return { error: 'Domain already exists' }
        }

        // This doesn't need authorization as the businessId comes from the user's session
        const dbDomain = await db
            .insert(domain)
            .values({
                domain: domainName,
                businessId: dbUser.businessId
            })
            .returning()
            .then(res => res[0])

        return { dbDomain }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function updateDomain(domainId: string, domainName: string) {
    try {
        const { dbDomain } = await getDomainById(domainId)
        if (!dbDomain) return { error: 'Domain not found' }
        if (!await canAccessDomains(dbDomain.businessId)) {
            return { error: 'You are not authorized to update this domain' }
        }

        await db
            .update(domain)
            .set({ domain: domainName })
            .where(eq(domain.id, domainId))

        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}


export async function getDomainById(domainId: string) {
    try {
        const dbDomain = await db
            .select()
            .from(domain)
            .where(eq(domain.id, domainId))
            .then(res => res[0])
        return { dbDomain }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}


/**
 * Get domains by business id.
 * @param businessId {string}
 * @returns {SelectDomain[]}
 */
export async function getDomainsByBusinessId(businessId: string) {
    try {
        if (!await canAccessDomains(businessId)) {
            return { error: "You are not authorized to access this domain" }
        }
        const dbDomains = await db
            .select()
            .from(domain)
            .where(eq(domain.businessId, businessId))

        return { dbDomains }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function deleteDomain(domainId: string) {
    try {
        const { dbDomain } = await getDomainById(domainId)
        if (!dbDomain) return { error: 'Domain not found' }
        if (!await canAccessDomains(dbDomain.businessId)) {
            return { error: 'You are not authorized to delete this domain' }
        }

        if (!dbDomain.domain.includes('scaloor')) {
            await removeDomainFromVercelProject(dbDomain.domain)
        }

        await db
            .delete(domain)
            .where(eq(domain.id, domainId))

        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}
