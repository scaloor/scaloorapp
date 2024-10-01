'use server'

import { db } from "@/server/db";
import { emailAddress } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function addToWaitlist(email: string) {
    try {
        const existingEmail = await db.select().from(emailAddress).where(eq(emailAddress.email, email))
        if (existingEmail.length > 0) {
            throw new Error("Email already on waitlist")
        }
        await db.insert(emailAddress).values({ email })
        return { success: true }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}
