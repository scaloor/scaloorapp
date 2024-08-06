'use server';
import { db } from "@/server/db";
import { business } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { InsertBusiness } from "@/server/db/schema";


/**
 * Find business object by id.
 * @param business_id {number}
 * @returns {Business}
 */
export async function getBusinessById(business_id: string) {
    try {
        const dbBusiness = await db.select().from(business).where(
            eq(business.id, business_id)
        ).then(res => res[0]);
        return { dbBusiness }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}

export async function addBusiness(businessDetails: InsertBusiness) {
    try {
        const insertBusiness = async (businessDetails: InsertBusiness) => {
            return await db.insert(business).values(businessDetails).returning().then(res => res[0])
        }
        const dbBusiness = await insertBusiness(businessDetails)

        return { dbBusiness }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}

export async function updateBusiness(businessDetails: InsertBusiness) {
    try {
        const dbBusiness = await db
            .update(business)
            .set({
                ...businessDetails,
                updatedAt: new Date().toDateString(),
            })
            .where(eq(business.id, businessDetails.id!))
            .returning().then(res => res[0]);

        return { dbBusiness }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}

export async function updateBusinessSubscription(businessId: string, subscriptionId: string | null) {
    try {
        await db
            .update(business)
            .set({
                currentSubscriptionId: subscriptionId,
            })
            .where(eq(business.id, businessId));

        return { success: true }
    } catch (error: any) {
        console.log(error);
        return { error: error.message }
    }
}