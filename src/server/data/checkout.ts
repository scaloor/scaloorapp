import 'server-only'
import { db } from "@/server/db";
import { checkout } from "@/server/db/schema";
import { InsertCheckout } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function addCheckout(checkoutData: InsertCheckout) {
    try {
        const dbCheckout = await db.insert(checkout).values(checkoutData).returning().then(res => res[0]);
        return { dbCheckout }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function getCheckoutById(checkoutId: string) {
    try {
        const dbCheckout = await db.select().from(checkout).where(eq(checkout.id, checkoutId)).then(res => res[0]);
        return { dbCheckout };
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function getCheckoutsByOrganizationId(organizationId: string) {
    try {
        const checkouts = await db.select().from(checkout).where(eq(checkout.organizationId, organizationId));
        return { data: checkouts };
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

export async function updateCheckout(checkoutId: string, updates: Partial<InsertCheckout>) {
    try {
        console.log("updates", updates)
        const dbCheckout = await db
            .update(checkout)
            .set(updates)
            .where(eq(checkout.id, checkoutId))
            .returning()
            .then(res => res[0]);
            
        return { dbCheckout };
    } catch (error: any) {
        console.log(error);
        return { error: error.message };
    }
}

