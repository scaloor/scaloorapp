'use server'

import { stripe } from "@/lib/stripe"
import { getBusinessById } from "@/server/data/business"
import { getCheckoutById } from "@/server/data/checkout"

export async function createPaymentIntent(checkoutId: string) {
    try {
        // Get checkout details
        const { dbCheckout } = await getCheckoutById(checkoutId)
        if (!dbCheckout) {
            return { error: 'Checkout not found' }
        }

        // Get business details
        const { dbBusiness } = await getBusinessById(dbCheckout.businessId)
        if (!dbBusiness?.defaultCurrency || !dbBusiness.stripeAccountId) {
            return { error: 'Default currency or stripe account not set' }
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: dbCheckout.productPrice,
            currency: dbBusiness.defaultCurrency,
            description: dbCheckout.productDescription || undefined,
        }, {
            stripeAccount: dbBusiness.stripeAccountId
        })

        return { clientSecret: paymentIntent.client_secret }
    } catch (error: any) {
        console.error(error)
        return { error: error.message }
    }
}
