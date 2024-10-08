import 'server-only'
import { eq } from "drizzle-orm";
import { subscription } from "../db/schema";
import { db } from "../db";



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

export async function cancelSubscription(subscriptionId: string) {
    try {
        const { dbSubscription } = await getSubscriptionById(subscriptionId)
        if (!dbSubscription) {
            return { error: "Subscription not found" }
        }
        await db
            .update(subscription)
            .set({
                active: false,
                updatedAt: new Date().toDateString(),
            })
            .where(eq(subscription.id, subscriptionId))
            .returning()
            .then(res => res[0])

        return { success: true }

    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}
