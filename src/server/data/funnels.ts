import 'server-only'
import { eq } from "drizzle-orm";
import { db } from "../db";
import { funnel } from "../db/schema";
import { InsertFunnel } from "../db/schema";
import { canAccessFunnel } from "../authorization/funnel";

/**
 * Add new funnel
 */
export async function addFunnel(funnelDetails: InsertFunnel) {
    try {
        if (!await canAccessFunnel(funnelDetails.businessId)) {
            return { error: 'You do not have access to add a funnel to this business' }
        }
        const insertFunnel = async (funnelDetails: InsertFunnel) => {
            return await db.insert(funnel).values(funnelDetails).returning().then(res => res[0])
        }
        const dbFunnel = insertFunnel(funnelDetails)

        return { dbFunnel }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

/**
 * Update funnel
 * @param funnelDetails 
 * @returns 
 */
export async function updateFunnel(funnelDetails: InsertFunnel) {
    try {
        const dbFunnel = await db
            .update(funnel)
            .set({
                ...funnelDetails,
                updatedAt: new Date().toISOString()
            })
            .where(eq(funnel.id, funnelDetails.id!));

        return { dbFunnel }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

type UpdateFunnelColumns = {
    id: string;
    name?: string;
    pathName?: string;
    published?: boolean;
    favicon?: string;
    checkoutProduct?: string;
    domainId?: string;
}

/**
 * Update funnel
 */
export async function updateFunnelColumns(funnelDetails: UpdateFunnelColumns) {
    try {
        /* if (!await canAccessFunnel(funnelDetails.id)) {
            return { error: 'You do not have access to update this funnel' }
        } */
        const { id, ...updateData } = funnelDetails;
        const dbFunnel = await db
            .update(funnel)
            .set({
                ...updateData,
                updatedAt: new Date().toISOString()
            })
            .where(eq(funnel.id, id));

        return { dbFunnel }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

/**
 * Delete funnel
 * @param funnel_id 
 * @returns 
 */
export async function deleteFunnel(funnel_id: string) {
    try {
        await db.delete(funnel).where(eq(funnel.id, funnel_id));
        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

/**
 * Find funnel object by id.
 * @param funnel_id {number}
 * @returns {Funnel}
 */
export async function getFunnelById(funnel_id: string) {
    try {
        const dbFunnel = await db.select().from(funnel).where(
            eq(funnel.id, funnel_id)
        ).then(res => res[0]);
        if (!await canAccessFunnel(dbFunnel.businessId)) {
            return { error: 'You do not have access to view this funnel' }
        }
        return { dbFunnel }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function getFunnelsByBusinessId(businessId: string) {
    try {
        if (!await canAccessFunnel(businessId)) {
            return { error: 'You do not have access to view these funnels' }
        }
        const funnels = await db.select().from(funnel).where(
            eq(funnel.businessId, businessId)
        ).then(res => res);
        return { funnels }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}
