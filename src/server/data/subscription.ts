import 'server-only'
import { eq } from "drizzle-orm";
import { business, subscription } from "../db/schema";
import { db } from "../db";
import { InsertBusiness, InsertSubscription } from "../db/schema";
import Stripe from "stripe";
import { updateBusinessSubscription } from "./business";



export async function getSubscriptionById(subscription_id: string) {
    try {
        const dbSubscription = await db.select().from(subscription).where(
            eq(subscription.id, subscription_id)
        ).then(res => res[0]);
        return { dbSubscription }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function addSubscription({
    stripeSubscription,
}: {
    stripeSubscription: Stripe.Response<Stripe.Subscription>,
}) {
    try {
        const businessId = stripeSubscription.metadata.business_id;
        const insertSubscription = async (subscriptionDetails: Stripe.Response<Stripe.Subscription>) => {
            return await db.insert(subscription).values({
                plan: 'funnels',
                price: `${subscriptionDetails.items.data[0].price.unit_amount! / 100}`,
                active: true,
                stripePriceId: subscriptionDetails.items.data[0].price.id,
                stripeCustomerId: subscriptionDetails.customer as string,
                currentPeriodEndDate: new Date(subscriptionDetails.current_period_end * 1000).toDateString(),
                stripeSubscriptionId: subscriptionDetails.id,
                businessId,
                updatedAt: new Date().toDateString(),
            }).returning().then(res => res[0])
        }
        // The add subscription request comes from Stripe, so authorization cannot be checked.
        const dbSubscription = await insertSubscription(stripeSubscription)
        const { success } = await updateBusinessSubscription(businessId, dbSubscription.id)
        return { success }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}


export async function updateSubscription({
    stripeSubscription,
}: {
    stripeSubscription: Stripe.Response<Stripe.Subscription>,
}) {
    try {
        const businessId = stripeSubscription.metadata.business_id;
        const updateSubscription = async (subscriptionDetails: Stripe.Response<Stripe.Subscription>) => {
            return await db.update(subscription).set({
                plan: 'funnels',
                price: `${subscriptionDetails.items.data[0].price.unit_amount! / 100}`,
                active: true,
                stripePriceId: subscriptionDetails.items.data[0].price.id,
                stripeCustomerId: subscriptionDetails.customer as string,
                currentPeriodEndDate: new Date(subscriptionDetails.current_period_end * 1000).toDateString(),
                stripeSubscriptionId: subscriptionDetails.id,
                businessId,
                updatedAt: new Date().toDateString(),
            }).where(eq(subscription.id, business.currentSubscriptionId)).returning().then(res => res[0])
        }
        const dbSubscription = await updateSubscription(stripeSubscription)
        const { success } = await updateBusinessSubscription(businessId, dbSubscription.id)
        return { success }
    } catch (error: any) {
        console.log(error);
        return { error: error.message };
    }
}

export async function getSubscriptionByStripeId(subscriptionId: string) {
    try {
        const dbSubscription = await db.select().from(subscription).where(
            eq(subscription.stripeSubscriptionId, subscriptionId)
        ).then(res => res[0]);
        return { dbSubscription }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}