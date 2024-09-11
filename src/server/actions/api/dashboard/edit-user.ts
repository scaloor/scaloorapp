'use server'

import { updateUserColumns } from "@/server/data/users";

export async function editUserAction(
    {
        id,
        firstName,
        lastName,
        email,
        mobile,
        image
    }: {
        id: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        mobile?: string;
        image?: string;
    }
) {
    const { error } = await updateUserColumns({
        id,
        firstName,
        lastName,
        email,
        mobile,
        image
    })
    if (error) {
        return { error: error.message }
    }
    return { success: "User updated successfully" }
}
