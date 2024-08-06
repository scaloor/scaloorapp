'use server'

import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { InsertUser } from "../db/schema";

/**
 * Add new user
 * @param {InsertUser}
 * 
 */
export async function addUser(userDetails: InsertUser) {
    try {
        const insertUser = async (user: InsertUser) => {
            return await db.insert(users).values(user).returning().then(res => res[0])
        }
        const dbUser = insertUser(userDetails)

        return { dbUser }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

/**
 * Update user
 * @param param0 
 * @returns 
 */
export async function updateUser(userDetails: InsertUser) {
    try {
        const dbUser = await db
            .update(users)
            .set({
                ...userDetails,
                updatedAt: new Date().toISOString()
            })
            .where(eq(users.id, userDetails.id!))
            .returning().then(res => res[0]);
        return { dbUser }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }

}

/**
 * Find user object by id.
 * @param id
 * @returns {user}
 */
export async function getUserById(user_id: string) {
    try {
        const user = await db.select().from(users).where(
            eq(users.id, user_id)
        ).then(res => res[0]);
        return { user }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

/**
 * Find user object by email.
 * @param email 
 * @returns {user}
 */
export async function getUserByEmail(email: string) {
    try {
        const dbUser = await db.select().from(users).where(
            eq(users.email, email)
        ).then(res => res[0]);
        return { dbUser }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}