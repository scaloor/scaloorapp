'use server'

import { addDomain, deleteDomain, getDomainsByBusinessId, updateDomain } from "@/server/data/domains"
import { getAuthUserDetails } from "../../users"
import { createPathname } from "@/lib/utils"


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

export async function addDomainAction(domainName: string) {
    try {
        const processedDomainName = `${createPathname(domainName)}.scaloor.com`

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
