import { updateBusinessColumn } from "@/server/data/business"
import { getSubscriptionById } from "@/server/data/subscription"
import { db } from "@/server/db"
import { subscription } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export async function cancelSubscriptionAction(subscriptionId: string) {
    try {
        //Check to see that the subscription exists
        const { dbSubscription } = await getSubscriptionById(subscriptionId)
        if (!dbSubscription) {
            return { error: "Subscription not found" }
        }
        //Change the subscription to inactive, but do not delete it
        await db
            .update(subscription)
            .set({
                active: false,
                updatedAt: new Date().toDateString(),
            })
            .where(eq(subscription.id, subscriptionId))
            .returning()
            .then(res => res[0])

        //Update the business to remove the current subscription
        const { dbBusiness } = await updateBusinessColumn({
            id: dbSubscription.businessId,
            currentSubscriptionId: ''
        })

        return { success: true }

    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}