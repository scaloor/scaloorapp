'use server'

import { addDomain, deleteDomain, getDomainById, getDomainsByBusinessId, updateDomain } from "@/server/data/domains"
import { getAuthUserDetails } from "../users"
import { createPathname } from "@/lib/utils"
import { BLACKLISTED_DOMAINS, validDomainRegex } from "@/lib/constants"
import { addDomainToVercel, getDomainConfig, getDomainFromVercel, getDomainVerification } from "@/server/data/vercel"


export async function getDomainsAction() {
    try {
        const { dbUser } = await getAuthUserDetails()
        if (!dbUser?.businessId) return { error: 'User not found' }
        const { dbDomains, error } = await getDomainsByBusinessId(dbUser.businessId)

        return { dbDomains }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function addScaloorDomainAction(domainName: string) {
    try {
        const processedDomainName = `${createPathname(domainName)}.scaloor.com`
        if (BLACKLISTED_DOMAINS.includes(processedDomainName)) return { error: 'Domain taken.' }
        // Check to see how many scaloor domains the business has.
        const { dbUser } = await getAuthUserDetails()
        if (!dbUser?.businessId) return { error: 'User not found' }
        const { dbDomains, error: getDomainsError } = await getDomainsByBusinessId(dbUser.businessId)
        if (getDomainsError || !dbDomains) throw new Error(getDomainsError)
        if (dbDomains.length >= 3) return { error: 'You can only have 3 scaloor domains' }

        // Add the domain
        const { error: addDomainError } = await addDomain(processedDomainName)

        if (addDomainError) throw new Error(addDomainError)

        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function editDomainAction(domainId: string, domainName: string) {
    try {
        const processedDomainName = `${createPathname(domainName)}.scaloor.com`
        const { error: editDomainError } = await updateDomain(domainId, processedDomainName)
        if (editDomainError) throw new Error(editDomainError)
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function deleteDomainAction(domainId: string) {
    try {
        const { error: deleteDomainError } = await deleteDomain(domainId)
        if (deleteDomainError) throw new Error(deleteDomainError)
        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function addCustomDomainAction(domainName: string) {
    try {
        if (domainName.includes('scaloor')) return { error: 'You cannot use the scaloor domain.' }
        if (!validDomainRegex.test(domainName)) return { error: 'Please enter a valid domain.' }

        const { dbDomain, error: addDomainError } = await addDomain(domainName)
        if (addDomainError) throw new Error(addDomainError)

        if (dbDomain) {
            await Promise.all([
                addDomainToVercel(domainName)
            ])
        }

        return { success: true }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function getDomainConfigAction(domainId: string) {
    try {
        //TODO: add authorization?

        // Check dbDomain to see if it is live
        const { dbDomain, error: getDomainError } = await getDomainById(domainId)
        if (getDomainError || !dbDomain) throw new Error(getDomainError)
        const domain = dbDomain.domain
        // Check if the domain is verified and configured
        const [configResponse, domainResponse] = await Promise.all([
            getDomainConfig(domain),
            getDomainFromVercel(domain)
        ])

        if (domainResponse.status !== 200) return { error: 'Domain not found' }

        const configJson = await configResponse.json()
        const domainJson = await domainResponse.json()

        // If the domain is not verified, verify it
        let verificationResponse = null
        if (!domainJson.verified) {
            verificationResponse = await getDomainVerification(domain)
        }

        const verificationJson = await verificationResponse?.json()


        // If misconfigured, return the domain details
        if (configJson.misconfigured) {
            return {
                name: domainJson.name,
                apex: domainJson.apexName,
                verified: domainJson.verified,
                configured: !configJson.misconfigured,
            }
        }

        await updateDomain(domainId, domain, true)

        return null

    } catch (error: any) {
        return { error: error.message }
    }
}
