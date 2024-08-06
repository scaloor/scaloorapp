'use server'
import { getSessionUser } from "@/app/auth/provider/authenticated-route";
import { getUserByEmail, getUserById } from "@/server/data/users";

export async function getAuthUserDetails() {
    const { user } = await getSessionUser()
    try {
        const { dbUser } = await getUserByEmail(user?.email!)
        return { dbUser };
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}

