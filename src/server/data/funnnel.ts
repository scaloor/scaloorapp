'use server';

import { eq } from "drizzle-orm";
import { db } from "../db";
import { funnel } from "../db/schema";
import { Funnel } from "../db/types";

/**
 * Add new funnel
 */
export async function addFunnel(funnelDetails: Funnel) {
    try {
        const insertFunnel = async (funnelDetails: Funnel) => {
            return await db.insert(funnel).values(funnelDetails).returning().then(res => res[0])
        }
        const funnel_id = insertFunnel(funnelDetails)

        return funnel_id
    } catch {
        return console.log('Unable to add funnel');
    }
}
/**
 * Update funnel
 * @param funnelDetails 
 * @returns 
 */
export async function updateFunnel(funnelDetails: Funnel) {
    try {
        await db
            .update(funnel)
            .set({
                name: funnelDetails.name,
                description: funnelDetails.description,
                published: funnelDetails.published,
                subDomainName: funnelDetails.subDomainName,
                favicon: funnelDetails.favicon,
            })
            .where(eq(funnel.id, funnelDetails.id));

        return true
    } catch {
        return console.log('Unable to update funnel');
    }
}


/**
 * Find funnel object by id.
 * @param funnel_id {number}
 * @returns {Funnel}
 */
export async function getFunnelById(funnel_id: number) {
    try {
        const findFunnel = await db.select().from(funnel).where(
            eq(funnel.id, funnel_id)
        ).then(res => res[0]);
        return findFunnel
    } catch {
        return console.log('Unable to find funnel');
    }
}

/**
 * Delete funnel
 * @param funnel_id 
 * @returns 
 */
export async function deleteFunnel(funnel_id: number) {
    try {
        await db.delete(funnel).where(eq(funnel.id, funnel_id));
        return true
    } catch {
        return console.log('Unable to delete funnel');
    }
}