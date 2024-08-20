'use server';

import { stripe } from "@/lib/stripe";

type CreateStripeAccountLinkOptions = {
    accountId: string;
}

export async function createStripeAccountLink({ accountId }: CreateStripeAccountLinkOptions) {
    try {
        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: `${process.env.NEXT_PUBLIC_URL!}/account/dashboard`,
            return_url: `${process.env.NEXT_PUBLIC_URL!}/account/dashboard`,
            type: 'account_onboarding',
        });

        return { url: accountLink.url };
    } catch (error: any) {
        console.error('An error occurred when calling the Stripe API to create an account:', error);
        return { error: 'Internal Server Error' };
    }
}