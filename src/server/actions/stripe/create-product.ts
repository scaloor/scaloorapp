import 'server-only'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

export async function createStripeProduct(product: Stripe.ProductCreateParams, stripeAccountId: string) {
    const stripeProduct = await stripe.products.create(product, { stripeAccount: stripeAccountId })
    return stripeProduct
}
