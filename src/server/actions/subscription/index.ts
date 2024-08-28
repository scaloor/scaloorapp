import { db } from "@/server/db";
import { business, subscription } from "@/server/db/schema";
import { eq } from "drizzle-orm";


export async function cancelSubscription({
    stripeSubscriptionId,
}: {
    stripeSubscriptionId: string
}) {
    try {
        const { businessId } = await db.update(subscription).set({
            active: false,
            updatedAt: new Date().toDateString(),
        }).where(eq(subscription.stripeSubscriptionId, stripeSubscriptionId)).returning({ businessId: subscription.businessId })
            .then(res => res[0])
        await db.update(business).set({
            currentSubscriptionId: null,
            updatedAt: new Date().toDateString(),
        }).where(eq(business.id, businessId))
        console.log('Subscription cancelled')
        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}