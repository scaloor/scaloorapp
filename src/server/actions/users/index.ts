'use server'
import { getSessionUser } from "@/app//app/(auth)/provider/authenticated-route";
import { getUserByEmail, getUserById } from "@/server/data/users";

export async function getAuthUserDetails() {
    const { user } = await getSessionUser()
    if (!user) return { error: "User not found" }
    try {
        const { dbUser } = await getUserByEmail(user?.email!)
        return { dbUser };
    } catch (error: any) {
        console.log('No user found:', error)
        return { error: error.message }
    }
}

