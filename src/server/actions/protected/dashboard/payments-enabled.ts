'use server'

import { stripe } from "@/lib/stripe"
import { canAccessOrganization } from "@/server/authorization/organization";
import { updateOrganizationColumn } from "@/server/data/organization";

export async function checkPaymentsEnabledAction(stripeAccountId: string, organizationId: string) {
    const chargesEnabled = (await stripe.accounts.retrieve(stripeAccountId)).charges_enabled
    if (chargesEnabled === true && await canAccessOrganization(organizationId)) {
        await updateOrganizationColumn({ id: organizationId, paymentsEnabled: true });
    }
    
    return chargesEnabled
}
