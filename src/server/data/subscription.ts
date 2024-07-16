import { eq } from "drizzle-orm";
import { business, subscription } from "../db/schema";
import { db } from "../db";
import { Business, Subscription } from "../db/types";
import Stripe from "stripe";
import { updateBusinessSubscription } from "./business";



export async function getSubscriptionById(subscription_id: number) {
    try {
        const dbSubscription = await db.select().from(subscription).where(
            eq(subscription.id, subscription_id)
        ).then(res => res[0]);
        return dbSubscription
    } catch {
        throw Error('Unable to find subscription');
    }
}

export async function addSubscription({
    stripeSubscription,
}: {
    stripeSubscription: Stripe.Response<Stripe.Subscription>,
}) {
    try {
        const businessId = parseInt(stripeSubscription.metadata.business_id);
        const insertSubscription = async (subscriptionDetails: Stripe.Response<Stripe.Subscription>) => {
            return await db.insert(subscription).values({
                plan: 'funnels',
                price: `${subscriptionDetails.items.data[0].price.unit_amount! / 100}`,
                active: true,
                priceId: subscriptionDetails.items.data[0].price.id,
                customerId: subscriptionDetails.customer as string,
                currentPeriodEndDate: new Date(subscriptionDetails.current_period_end * 1000).toDateString(),
                subscriptionId: subscriptionDetails.id,
                businessId,
                updatedAt: new Date().toDateString(),
            }).returning().then(res => res[0])
        }
        const dbSubscription = await insertSubscription(stripeSubscription)
        const success = await updateBusinessSubscription(businessId, dbSubscription.id)
        return success
    } catch {
        throw Error('Unable to add subscription');
    }
}


export async function updateSubscription({
    stripeSubscription,
}: {
    stripeSubscription: Stripe.Response<Stripe.Subscription>,
}) {
    try {
        const businessId = parseInt(stripeSubscription.metadata.business_id);
        const updateSubscription = async (subscriptionDetails: Stripe.Response<Stripe.Subscription>) => {
            return await db.update(subscription).set({
                plan: 'funnels',
                price: `${subscriptionDetails.items.data[0].price.unit_amount! / 100}`,
                active: true,
                priceId: subscriptionDetails.items.data[0].price.id,
                customerId: subscriptionDetails.customer as string,
                currentPeriodEndDate: new Date(subscriptionDetails.current_period_end * 1000).toDateString(),
                subscriptionId: subscriptionDetails.id,
                businessId,
                updatedAt: new Date().toDateString(),
            }).where(eq(subscription.id, business.currentSubscriptionId)).returning().then(res => res[0])
        }
        const dbSubscription = await updateSubscription(stripeSubscription)
        const success = await updateBusinessSubscription(businessId, dbSubscription.id)
        return success
    } catch {
        throw Error('Unable to update subscription');
    }
}

export async function getSubscriptionByStripeId(subscriptionId: string) {
    try {
        const dbSubscription = await db.select().from(subscription).where(
            eq(subscription.subscriptionId, subscriptionId)
        ).then(res => res[0]);
        return dbSubscription
    } catch {
        throw Error('Unable to find subscription');
    }
}