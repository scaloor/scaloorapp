'use server'

import { stripe } from "@/lib/stripe"
import { getOrganizationById } from "@/server/data/organization"
import { getCheckoutById } from "@/server/data/checkout"

export async function createPaymentIntent(checkoutId: string) {
    try {
        // Get checkout details
        const { dbCheckout } = await getCheckoutById(checkoutId)
        if (!dbCheckout) {
            return { error: 'Checkout not found' }
        }

        // Get organization details
        const { dbOrganization } = await getOrganizationById(dbCheckout.organizationId)
        if (!dbOrganization?.defaultCurrency || !dbOrganization.stripeAccountId) {
            return { error: 'Default currency or stripe account not set' }
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: dbCheckout.productPrice,
            currency: dbOrganization.defaultCurrency,
            description: dbCheckout.productDescription || undefined,
        }, {
            stripeAccount: dbOrganization.stripeAccountId
        })

        return { clientSecret: paymentIntent.client_secret }
    } catch (error: any) {
        console.error(error)
        return { error: error.message }
    }
}
