'use server'

import { stripe } from "@/lib/stripe"
import { loadStripe } from "@stripe/stripe-js"

export async function checkoutAction() {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 42069,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        }, {
            stripeAccount: 'acct_1Q7VXmPvCiotYkrr'
        })

        //console.log('paymentIntent', paymentIntent)
        return { clientSecret: paymentIntent.client_secret }
    } catch (error: any) {
        console.error(error)
        return { error: error.message }
    }
}

export async function getStripePK() {
    const stripePK = `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
    return { stripePK }
}
