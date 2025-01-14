'use server'
import { getSessionUser } from "@/app//app/(auth)/provider/authenticated-route";
import { getOrganizationById } from "@/server/data/organization";
import { getUserByEmail, getUserById } from "@/server/data/users";

export async function getAuthUserDetails() {
    const { user } = await getSessionUser()
    if (!user) return { error: "User not found" }
    try {
        const { dbUser } = await getUserByEmail(user?.email!)
        if (!dbUser || !dbUser.organizationId) return { error: "User not found" }
        const { dbOrganization } = await getOrganizationById(dbUser.organizationId)
        if (!dbOrganization) return { error: "Organization not found" }
        return { dbUser, dbOrganization };
    } catch (error: any) {
        console.log('No user found:', error)
        return { error: error.message }
    }
}

