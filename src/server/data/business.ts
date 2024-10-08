import 'server-only';
import { db } from "@/server/db";
import { business } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { InsertBusiness } from "@/server/db/schema";
import { canAccessBusiness, canCreateBusiness } from "../authorization/business";
import { getFunnelById } from './funnels';


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

export async function addBusiness(businessDetails: InsertBusiness, userId: string) {
    try {
        // Note: We might need a separate authorization check for adding a business
        if (!await canCreateBusiness(userId)) {
            return { error: "You are not authorized to add a business" }
        }
        const insertBusiness = async (businessDetails: InsertBusiness) => {
            return await db.insert(business).values(businessDetails).returning().then(res => res[0])
        }
        const dbBusiness = await insertBusiness(businessDetails)

        return { dbBusiness }
    } catch (error: any) {
        console.log('Add Business Error: ', error);
        return { error: error.message }
    }
}

export async function updateBusiness(businessDetails: InsertBusiness) {
    try {
        if (!await canAccessBusiness(businessDetails.id!)) {
            return { error: "You are not authorized to update this business" }
        }
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

type UpdateBusinessOptions = {
    id: string;
    name?: string;
    businessEmail?: string;
    businessLogo?: string;
    country?: string;
    currentSubscriptionId?: string;
    paymentsEnabled?: boolean;
    stripeAccountId?: string;
};

export async function updateBusinessColumn(businessDetails: UpdateBusinessOptions) {
    try {
        const { dbBusiness } = await getBusinessById(businessDetails.id);
        if (!dbBusiness) {
            return { error: 'Business not found' };
        }
        if (await canAccessBusiness(businessDetails.id)) {
            const { id, ...updateData } = businessDetails;
            const updatedBusiness = await db
                .update(business)
                .set({
                    ...updateData,
                    updatedAt: new Date().toISOString(),
                })
                .where(eq(business.id, id))
                .returning()
                .then(res => res[0]);
            return { dbBusiness: updatedBusiness };
        }
        return { error: 'You do not have access to update this business' };
    } catch (error: any) {
        console.log(error);
        return { error: error.message };
    }
}

export async function getStripeAccountIdByFunnelId(funnelId: string) {
    // This has an authorization check, will probably have to remove it
    const { dbFunnel } = await getFunnelById(funnelId)
    console.log('dbFunnel', dbFunnel?.businessId)
    if (!dbFunnel?.businessId) return { error: 'Funnel not found' }
    const { dbBusiness } = await getBusinessById(dbFunnel.businessId)
    if (!dbBusiness?.stripeAccountId) return { error: 'Business does not have a Stripe account' }
    return { stripeAccountId: dbBusiness.stripeAccountId }
}

