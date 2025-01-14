'use server';

import { CountryProps } from "@/app/_components/common/countries-dropdown/types";
import countries from "@/app/_components/common/countries-dropdown/countries.json";
import { stripe } from "@/lib/stripe";
import { getOrganizationById, updateOrganization, updateOrganizationColumn } from "@/server/data/organization";
import { createStripeAccountLink, StripeConnectReturnUrl } from "./account-link";

type CreateStripeAccountOptions = {
    country_name: string;
    email: string;
    organizationId: string;
    returnUrl: StripeConnectReturnUrl;
}

export default async function createStripeAccount({
    country_name,
    email,
    organizationId,
    returnUrl
}: CreateStripeAccountOptions) {
    try {
        // Find ISO2 code
        const C = countries as CountryProps[];
        const countryId = C.find((country) => country.name === country_name)?.iso2;

        // Check if there is an existing Stripe account
        let accountId: string | undefined;
        const { dbOrganization } = await getOrganizationById(organizationId);
        if (dbOrganization?.stripeAccountId) {
            accountId = dbOrganization.stripeAccountId;
        }

        // Create Stripe account
        if (!dbOrganization?.stripeAccountId) {
            const account = await stripe.accounts.create({
                email,
                ...(countryId ? { country: countryId } : {}),
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
            accountId = account.id;
            // Send account ID to server for database update
            await updateOrganizationColumn({ id: organizationId, stripeAccountId: accountId });
        }

        if (!accountId) {
            return { error: 'Unable to find/create Stripe account' };
        }

        const { url } = await createStripeAccountLink({ accountId: accountId, returnUrl });
        return { url };
    } catch (error: any) {
        console.error('An error occurred when calling the Stripe API to create an account:', error);
        return { error: 'Internal Server Error' };
    }
}