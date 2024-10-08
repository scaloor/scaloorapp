import Stripe from "stripe";
import { subscription } from "@/server/db/schema";
import { db } from "@/server/db";
import { updateBusinessSubscription } from "@/server/data/business";

export async function upsertSubscriptionAction(
    stripeSubscription: Stripe.Subscription
) {
    try {
        // Create the subscription entry in the database
        const businessId = stripeSubscription.metadata.business_id;
        const insertSubscription = async (subscriptionDetails: Stripe.Subscription) => {
            return await db
                .insert(subscription)
                .values({
                    plan: 'funnels',
                    price: subscriptionDetails.items.data[0].price.unit_amount!,
                    active: true,
                    stripePriceId: subscriptionDetails.items.data[0].price.id,
                    stripeCustomerId: subscriptionDetails.customer as string,
                    currentPeriodEndDate: new Date(subscriptionDetails.current_period_end * 1000).toDateString(),
                    stripeSubscriptionId: subscriptionDetails.id,
                    businessId,
                    updatedAt: new Date().toDateString(),
                })
                .onConflictDoUpdate({
                    target: subscription.stripeSubscriptionId,
                    set: {
                        active: true,
                        updatedAt: new Date().toDateString(),
                    }
                })
                .returning().then(res => res[0])
        }
        const dbSubscription = await insertSubscription(stripeSubscription)
        // Update the business to include the correct subscription ID
        const { success } = await updateBusinessSubscription(businessId, dbSubscription.id)
        return { success }

    } catch (error: any) {
        console.error("Error creating subscription:", error);
        return { error: error.message };
    }

}