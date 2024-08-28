'use server'

import { db } from "@/server/db"
import { desc, eq } from "drizzle-orm"
import { funnel } from "@/server/db/schema"


export async function getRecentFunnels({ businessId }: { businessId: string }) {
    try {
        const funnels = await db.query.funnel.findMany({
            where: eq(funnel.businessId, businessId),
            orderBy: [desc(funnel.updatedAt)],
            limit: 5,
        })
        return { funnels }
    } catch (error: any) {
        console.log(error)
        return { error: error.message }
    }
}