import { db } from "@/server/db";
import { organization, subscription } from "@/server/db/schema";
import { eq } from "drizzle-orm";


export async function cancelSubscription({
    stripeSubscriptionId,
}: {
    stripeSubscriptionId: string
}) {
    try {
        const { organizationId } = await db.update(subscription).set({
            active: false,
            updatedAt: new Date().toDateString(),
        }).where(eq(subscription.stripeSubscriptionId, stripeSubscriptionId)).returning({ organizationId: subscription.organizationId })
            .then(res => res[0])
        await db.update(organization).set({
            currentSubscriptionId: null,
            updatedAt: new Date().toDateString(),
        }).where(eq(organization.id, organizationId))
        console.log('Subscription cancelled')
        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}