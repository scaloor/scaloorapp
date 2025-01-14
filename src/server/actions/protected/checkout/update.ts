'use server'

import { canAccessOrganization } from "@/server/authorization/organization";
import { SelectCheckout } from "@/server/db/schema";
import { updateStripeProduct } from "../../stripe/product";
import { getOrganizationById } from "@/server/data/organization";
import { getCheckoutById, updateCheckout } from "@/server/data/checkout";
import { stripe } from "@/lib/stripe";


export async function updateCheckoutAction(checkout: SelectCheckout) {
    // Authorize the user
    if (!await canAccessOrganization(checkout.organizationId)) {
        throw new Error("You are not authorized to access this organization")
    }

    // Fetch both resources in parallel
    const [{ dbOrganization }, { dbCheckout }] = await Promise.all([
        getOrganizationById(checkout.organizationId),
        getCheckoutById(checkout.id)
    ])

    if (!dbOrganization?.stripeAccountId) {
        throw new Error("Stripe account ID not found")
    }

    if (!dbCheckout) {
        throw new Error("Checkout not found")
    }

    let priceId: string | undefined

    // Only create a new price if the amount has changed
    if (dbCheckout.productPrice !== checkout.productPrice) {
        const price = await stripe.prices.create({
            product: checkout.stripeProductId!,
            unit_amount: checkout.productPrice * 100,
            currency: dbOrganization.defaultCurrency || "usd",
        }, {
            stripeAccount: dbOrganization.stripeAccountId,
        })
        priceId = price.id
    }

    // Update the stripe product
    const stripeProduct = await updateStripeProduct(checkout.stripeProductId!, {
        name: checkout.productName,
        description: checkout.productDescription,
        default_price: priceId,
    }, dbOrganization.stripeAccountId)

    if (!stripeProduct) {
        throw new Error("Failed to update stripe product")
    }

    // Update the checkout record
    const { error } = await updateCheckout(checkout.id, {
        productName: checkout.productName,
        productDescription: checkout.productDescription,
        productPrice: checkout.productPrice,
    })

    if (error) {
        throw new Error("Failed to update checkout")
    }

    return { success: true }
}
