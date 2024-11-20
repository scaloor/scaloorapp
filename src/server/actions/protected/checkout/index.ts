'use server'

import { canAccessBusiness } from "@/server/authorization/business"
import { getBusinessById } from "@/server/data/business"
import { getCheckoutById, getCheckoutsByBusinessId } from "@/server/data/checkout"

export async function getCheckoutByIdAction(checkoutId: string) {
    try {
        const { dbCheckout, error } = await getCheckoutById(checkoutId)
        return { dbCheckout, error }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function getCheckoutsByBusinessIdAction(businessId: string) {
    try {
        const { data: dbCheckouts, error } = await getCheckoutsByBusinessId(businessId)
        return { dbCheckouts, error }
    } catch (error: any) {
        return { error: error.message }
    }
}

export async function getCheckoutDetailsAction(checkoutId: string) {
    try {
        const [
            { dbCheckout, error: checkoutError },
            { dbBusiness, error: businessError }
        ] = await Promise.all([
            getCheckoutById(checkoutId),
            getCheckoutById(checkoutId).then(({ dbCheckout }) => getBusinessById(dbCheckout!.businessId))
        ])
        if (dbBusiness && await canAccessBusiness(dbBusiness.id)) {
            return { dbCheckout, dbBusiness }
        } else {
            return { error: "You are not authorized to access this business" }
        }
    } catch (error: any) {
        return { error: error.message }
    }
}
