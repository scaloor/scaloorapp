'use server';
import { db } from "@/server/db";
import { business } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { Business } from "../db/types";


/**
 * Find business object by id.
 * @param business_id {number}
 * @returns {Business}
 */
export async function getBusinessById(business_id: number) {
    try {
        const dbBusiness = await db.select().from(business).where(
            eq(business.id, business_id)
        ).then(res => res[0]);
        return dbBusiness
    } catch {
        throw Error('Unable to find business');
    }
}

export async function addBusiness(businessDetails: Business) {
    try {
        const insertBusiness = async (businessDetails: Business) => {
            return await db.insert(business).values(businessDetails).returning().then(res => res[0])
        }
        const dbBusiness = insertBusiness(businessDetails)

        return dbBusiness
    } catch {
        throw Error('Unable to add business');
    }
}

export async function updateBusiness(businessDetails: Business) {
    try {
        await db
            .update(business)
            .set({
                ...businessDetails,
                updatedAt: new Date().toDateString(),
            })
            .where(eq(business.id, businessDetails.id!));

        return true
    } catch {
        return console.log('Unable to update business');
    }
}

export async function updateBusinessSubscription(businessId: number, subscriptionId: number) {
    try {
        await db
            .update(business)
            .set({
                currentSubscriptionId: subscriptionId,
            })
            .where(eq(business.id, businessId));

        return true
    } catch {
        return console.log('Unable to update business subscription');
    }
}