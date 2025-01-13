'use server'

import { canAccessOrganization } from "@/server/authorization/organization"
import { getOrganizationById } from "@/server/data/organization"
import { getCheckoutById, getCheckoutsByOrganizationId } from "@/server/data/checkout"

export async function getCheckoutByIdAction(checkoutId: string) {
    try {
        const { dbCheckout, error } = await getCheckoutById(checkoutId)
        return { dbCheckout, error }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function getCheckoutsByOrganizationIdAction(organizationId: string) {
    try {
        const { data: dbCheckouts, error } = await getCheckoutsByOrganizationId(organizationId)
        return { dbCheckouts, error }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function getCheckoutDetailsAction(checkoutId: string) {
    try {
        const [
            { dbCheckout, error: checkoutError },
            { dbOrganization, error: organizationError }
        ] = await Promise.all([
            getCheckoutById(checkoutId),
            getCheckoutById(checkoutId).then(({ dbCheckout }) => getOrganizationById(dbCheckout!.organizationId))
        ])
        if (dbOrganization && await canAccessOrganization(dbOrganization.id)) {
            return { dbCheckout, dbOrganization }
        } else {
            return { error: "You are not authorized to access this organization" }
        }
    } catch (error: any) {
        return { error: error.message }
    }
}
