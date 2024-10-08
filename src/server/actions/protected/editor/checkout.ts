'use server'
import { stripe } from "@/lib/stripe"
import { getProductById, getProductsByBusinessId } from "@/server/data/product"
import { getAuthUserDetails } from "../users"
import { getStripeAccountIdByFunnelId } from "@/server/data/business";

export async function checkoutAction({
    productId,
    funnelId,
}: {
    productId: string;
    funnelId: string;
}) {
    try {
        /*
        * Pass a stripe account ID to the function, and use this for
        * authorization.
        * This action will only work for funnel development, as in production,
        * the customer will not have access to the stripe account ID.
        * ??? Authorization probably isn't required to render a checkout?
        */
        const { stripeAccountId, error } = await getStripeAccountIdByFunnelId(funnelId)
        if (error || !stripeAccountId) return { error: error || "Cannot find stripe account ID" }
        const { dbProduct, error: productError } = await getProductById(productId)
        if (productError || !dbProduct) return { error: productError || "Cannot find product" }
        // Need to get price and stripe account from the database
        const paymentIntent = await stripe.paymentIntents.create({
            amount: dbProduct.defaultPrice,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        }, {
            stripeAccount: stripeAccountId,
        })
        return {
            clientSecret: paymentIntent.client_secret,
            productName: dbProduct.name,
            productPrice: dbProduct.defaultPrice,
        }
    } catch (error: any) {
        console.error(error)
        return { error: error.message }
    }
}

export async function getStripeCheckoutDetails(funnelId: string) {
    const { stripeAccountId, error } = await getStripeAccountIdByFunnelId(funnelId)
    if (error || !stripeAccountId) return { error: error || "Cannot find stripe account ID" }
    return { stripePK: process.env.STRIPE_PUBLIC_KEY!, stripeAccountId: stripeAccountId }
}


export async function getProductsForFunnel() {
    try {
        const { dbUser } = await getAuthUserDetails()
        if (!dbUser?.businessId) return { error: "Cannot find business details" }
        const { products, error } = await getProductsByBusinessId(dbUser.businessId)
        if (error) return { error: error }
        return { dbProducts: products }
    } catch (error: any) {
        console.error(error)
        return { error: error.message }
    }
}

