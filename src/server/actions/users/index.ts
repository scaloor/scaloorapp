import { auth } from "@/auth";
import { getUserById } from "@/server/data/users";

export async function getAuthUserDetails() {
    const session = await auth();
    if (!session?.user?.id) {
        console.log("Not Authenticated");
        return null;
    }
    const user = await getUserById(session?.user?.id);
    return user
}