'use server';

import { eq } from "drizzle-orm";
import { db } from "../db";
import { funnel } from "../db/schema";
import { InsertFunnel } from "../db/schema";

/**
 * Add new funnel
 */
export async function addFunnel(funnelDetails: InsertFunnel) {
    try {
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
    description?: string;
    subDomainName?: string;
    published?: boolean;
    favicon?: string;
}

/**
 * Update funnel
 */
export async function updateFunnelColumns({
    id,
    name,
    description,
    subDomainName,
    published,
    favicon,
}: UpdateFunnelColumns) {
    try {
        const dbFunnel = await db
            .update(funnel)
            .set({
                ...(name ? { name } : {}),
                ...(description ? { description } : {}),
                ...(subDomainName ? { subDomainName } : {}),
                ...(published ? { published } : {}),
                ...(favicon ? { favicon } : {}),
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
        return { dbFunnel }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function getFunnelsByBusinessId(businessId: string) {
    try {
        const funnels = await db.select().from(funnel).where(
            eq(funnel.businessId, businessId)
        ).then(res => res);
        return { funnels }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}
