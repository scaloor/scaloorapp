'use server'

import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { User } from "../db/types";

/**
 * Add new user
 * @param {user}
 * 
 */
export async function addUser(userDetails: User) {
    try {
        const insertUser = async (user: User) => {
            return await db.insert(users).values(user).returning().then(res => res[0])
        }
        const user_id = insertUser(userDetails)

        return user_id
    } catch {
        throw Error('Unable to add user');
    }
}

/**
 * Update user
 * @param param0 
 * @returns 
 */
export async function updateUser(userDetails: User) {
    try {
        await db
            .update(users)
            .set({ 
                ...userDetails,
                updatedAt: new Date().toISOString()
             })
            .where(eq(users.id, userDetails.id!))

    } catch {
        return Error('Unable to update user');
    }

}


/**
 * Find user object by id.
 * @param id
 * @returns {user}
 */
export async function getUserById(user_id: number) {
    try {
        const user = await db.select().from(users).where(
            eq(users.id, user_id)
        ).then(res => res[0]);
        return user
    } catch {
        throw Error('Unable to find user');
    }
}

/**
 * Find user object by email.
 * @param email 
 * @returns {user}
 */
export async function getUserByEmail(email: string) {
    try {
        const user = await db.select().from(users).where(
            eq(users.email, email)
        ).then(res => res[0]);
        return user
    } catch {
        throw Error('Unable to find user');
    }
}