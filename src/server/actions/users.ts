'use server'

import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

/**
 * Add new user
 * @param {user}
 * 
 */
export async function addUser({ name, email, hashedPassword }:
    { name?: string, email: string, hashedPassword?: string }) {

    type NewUser = typeof users.$inferInsert;

    const insertUser = async (user: NewUser) => {
        return await db.insert(users).values(user).returning().then(res => res[0])
    }

    const user: NewUser = {
        id: crypto.randomUUID(),
        name,
        email,
        password: hashedPassword,
    }
    const user_id = insertUser(user)

    return user_id

}

export async function updateUser(
    { user_id, name, email }:
        { user_id: string, name: string, email: string }
) {
    try {

        await db
            .update(users)
            .set({
                name,
                email,
            })
            .where(eq(users.id, user_id))

        return true

    } catch {
        return Error('Unable to update user');
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
        return user
    } catch {
        return null;
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
        return null
    }
}