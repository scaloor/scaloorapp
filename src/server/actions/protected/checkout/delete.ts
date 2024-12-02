'use server'
import { canAccessBusiness } from "@/server/authorization/business"
import { Checkout } from "@/server/data/checkout-class"


export async function deleteCheckoutByIdAction(checkoutId: string, businessId: string) {
    try {
        if (!await canAccessBusiness(businessId)) {
            throw new Error("You are not authorized to access this business")
        }
        const { error } = await Checkout.deleteById(checkoutId)
        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}
