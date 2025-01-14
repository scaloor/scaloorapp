'use server'
import { canAccessOrganization } from "@/server/authorization/organization"
import { Checkout } from "@/server/data/checkout-class"


export async function deleteCheckoutByIdAction(checkoutId: string, organizationId: string) {
    try {
        if (!await canAccessOrganization(organizationId)) {
            throw new Error("You are not authorized to access this organization")
        }
        const { error } = await Checkout.deleteById(checkoutId)
        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}
