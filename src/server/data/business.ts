import { db } from "@/server/db";
import { business } from "@/server/db/schema";
import { eq } from "drizzle-orm";


/**
 * Find business object by id.
 * @param business_id {number}
 * @returns {Business}
 */
export async function getBusinessById(business_id: number) {
    try {
        const user = await db.select().from(business).where(
            eq(business.id, business_id)
        ).then(res => res[0]);
        return user
    } catch {
        return null;
    }
}