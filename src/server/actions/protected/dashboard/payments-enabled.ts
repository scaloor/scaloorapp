'use server'

import { stripe } from "@/lib/stripe"
import { canAccessBusiness } from "@/server/authorization/business";
import { updateBusinessColumn } from "@/server/data/business";

export async function checkPaymentsEnabledAction(stripeAccountId: string, businessId: string) {
    const chargesEnabled = (await stripe.accounts.retrieve(stripeAccountId)).charges_enabled
    if (chargesEnabled === true && await canAccessBusiness(businessId)) {
        await updateBusinessColumn({ id: businessId, paymentsEnabled: true });
    }
    
    return chargesEnabled
}
