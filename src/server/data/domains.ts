import 'server-only'
import { db } from '../db'
import { domain } from '../db/schema'
import { eq } from 'drizzle-orm'
import { canAccessDomains } from '../authorization/domains'

/**
 * Get domains by business id.
 * @param businessId {string}
 * @returns {SelectDomain[]}
 */
export async function getDomainsByBusinessId(businessId: string) {
    try {
        if (await canAccessDomains(businessId)) {
            return { error: "You are not authorized to access this domain" }
        }
        const domains = await db
            .select()
            .from(domain)
            .where(eq(domain.businessId, businessId))

        return { domains }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}
