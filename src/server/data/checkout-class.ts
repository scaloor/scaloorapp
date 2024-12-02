import 'server-only'
import { db } from "@/server/db";
import { checkout } from "@/server/db/schema";
import { InsertCheckout } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export class Checkout {
    /**
     * Creates a new checkout record
     */
    static async create(checkoutData: InsertCheckout) {
        try {
            const dbCheckout = await db
                .insert(checkout)
                .values(checkoutData)
                .returning()
                .then(res => res[0]);
            return { dbCheckout };
        } catch (error: any) {
            console.log(error);
            return { error: error.message };
        }
    }

    /**
     * Retrieves a checkout by its ID
     */
    static async getById(checkoutId: string) {
        try {
            const dbCheckout = await db
                .select()
                .from(checkout)
                .where(eq(checkout.id, checkoutId))
                .then(res => res[0]);
            return { dbCheckout };
        } catch (error: any) {
            console.log(error);
            return { error: error.message };
        }
    }

    /**
     * Retrieves all checkouts for a business
     */
    static async getByBusinessId(businessId: string) {
        try {
            const checkouts = await db
                .select()
                .from(checkout)
                .where(eq(checkout.businessId, businessId));
            return { data: checkouts };
        } catch (error: any) {
            console.log(error);
            return { error: error.message };
        }
    }

    /**
     * Updates a checkout record
     */
    static async update(checkoutId: string, updates: Partial<InsertCheckout>) {
        try {
            console.log("updates", updates);
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

    /**
     * Deletes a checkout record by ID
     */
    static async deleteById(checkoutId: string) {
        try {
            const deletedCheckout = await db
                .delete(checkout)
                .where(eq(checkout.id, checkoutId))
                .returning()
                .then(res => res[0]);
            
            return { deletedCheckout };
        } catch (error: any) {
            console.log(error);
            return { error: error.message };
        }
    }
}

