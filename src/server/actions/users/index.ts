import { auth } from "@/auth";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getAuthUserDetails() {
    const session = await auth();
    if (!session?.user?.id) {
        console.log("Not Authenticated");
        return Error("Not Authenticated");
    }
    const user = db.select().from(users).where(eq(users.id, session?.user?.id)).then(res => res[0]);
    return user
}