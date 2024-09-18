'use server'
import { stripe } from "@/lib/stripe"

export async function checkoutAction() {
    try {
        /*
        * Pass a stripe account ID to the function, and use this for
        * authorization.
        * This action will only work for funnel development, as in production,
        * the customer will not have access to the stripe account ID.
        */

        // Need to get price and stripe account from the database
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 42069,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        }, {
            stripeAccount: 'acct_1Pq0p5PPUP2vo0Tr'
        })
        return { clientSecret: paymentIntent.client_secret }
    } catch (error: any) {
        console.error(error)
        return { error: error.message }
    }
}

export async function getStripePK() {
    return { stripePK: process.env.STRIPE_PUBLIC_KEY }
}

