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
        return null;
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