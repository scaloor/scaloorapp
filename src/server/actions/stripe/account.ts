'use server';

import { stripe } from "@/lib/stripe";

type CreateStripeAccountOptions = {
    country: string | null;
    email: string;
}

export default async function createStripeAccount(
    { country, email }: CreateStripeAccountOptions
) {
    try {
        // Create Stripe account
        // Add country
        const account = await stripe.accounts.create({
            email,
            controller: {
                fees: {
                    payer: 'account',
                },
                losses: {
                    payments: 'stripe',
                },
                stripe_dashboard: {
                    type: 'full',
                }
            }
        });
        console.log('Account created:', account);
        // Send account ID to server for database update
        return { accountId: account.id };
    } catch (error: any) {
        console.error('An error occurred when calling the Stripe API to create an account:', error);
        return { error: 'Internal Server Error' };
    }
}