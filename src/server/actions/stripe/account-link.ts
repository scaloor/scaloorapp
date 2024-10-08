'use server';

import { stripe } from "@/lib/stripe";

export type StripeConnectReturnUrl = 'settings' | 'dashboard'

type CreateStripeAccountLinkOptions = {
    accountId: string;
    returnUrl: StripeConnectReturnUrl;
}


export async function createStripeAccountLink({ accountId, returnUrl }: CreateStripeAccountLinkOptions) {
    try {
        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/${returnUrl}`,
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/${returnUrl}`,
            type: 'account_onboarding',
        });

        console.log((await stripe.accounts.retrieve(accountId)).charges_enabled)
        return { url: accountLink.url };
    } catch (error: any) {
        console.error('An error occurred when calling the Stripe API to create an account:', error);
        return { error: 'Internal Server Error' };
    }
}